
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Normal", "Urgent", "Critical"];

const requestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  contactNumber: z.string().min(10, { message: "Contact number is required" }),
  bloodType: z.string().min(1, { message: "Please select blood type required" }),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Quantity must be greater than 0",
  }),
  hospitalName: z.string().min(2, { message: "Hospital name is required" }),
  patientName: z.string().min(2, { message: "Patient name is required" }),
  urgency: z.string().min(1, { message: "Please select urgency level" }),
  patientCondition: z.string().optional(),
});

type RequestForm = z.infer<typeof requestSchema>;

const Request = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<RequestForm>({
    name: "",
    contactNumber: "",
    bloodType: "",
    quantity: "1",
    hospitalName: "",
    patientName: "",
    urgency: "Normal",
    patientCondition: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof RequestForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof RequestForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      requestSchema.parse(formData);
      setIsSubmitting(true);
      
      // Insert data into Supabase
      const { error } = await supabase
        .from('blood_requests')
        .insert({
          name: formData.name,
          contact_number: formData.contactNumber,
          blood_type: formData.bloodType,
          quantity: parseInt(formData.quantity),
          hospital_name: formData.hospitalName,
          patient_name: formData.patientName,
          urgency: formData.urgency,
          patient_condition: formData.patientCondition || null,
        });
      
      if (error) {
        console.error("Error submitting request:", error);
        toast({
          title: "Error",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Blood request submitted successfully!",
        });
        
        // Reset form
        setFormData({
          name: "",
          contactNumber: "",
          bloodType: "",
          quantity: "1",
          hospitalName: "",
          patientName: "",
          urgency: "Normal",
          patientCondition: "",
        });
      }
      
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof RequestForm] = err.message;
          }
        });
        setErrors(newErrors);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto p-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-bloodRed-500 mb-6">Make a Blood Request</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-medium">Your Name</label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contactNumber" className="font-medium">Contact Number</label>
                  <Input 
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => handleChange("contactNumber", e.target.value)}
                    className={errors.contactNumber ? "border-red-500" : ""}
                    placeholder="Enter your contact number"
                  />
                  {errors.contactNumber && <p className="text-sm text-red-500">{errors.contactNumber}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bloodType" className="font-medium">Blood Type Required</label>
                  <Select 
                    value={formData.bloodType} 
                    onValueChange={(value) => handleChange("bloodType", value)}
                  >
                    <SelectTrigger className={errors.bloodType ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bloodType && <p className="text-sm text-red-500">{errors.bloodType}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="quantity" className="font-medium">Quantity (Units)</label>
                  <Input
                    id="quantity"
                    type="number" 
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    className={errors.quantity ? "border-red-500" : ""}
                  />
                  {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="hospitalName" className="font-medium">Hospital Name</label>
                  <Input 
                    id="hospitalName"
                    value={formData.hospitalName}
                    onChange={(e) => handleChange("hospitalName", e.target.value)}
                    className={errors.hospitalName ? "border-red-500" : ""}
                    placeholder="Enter hospital name"
                  />
                  {errors.hospitalName && <p className="text-sm text-red-500">{errors.hospitalName}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="patientName" className="font-medium">Patient Name</label>
                  <Input 
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleChange("patientName", e.target.value)}
                    className={errors.patientName ? "border-red-500" : ""}
                    placeholder="Enter patient name"
                  />
                  {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="urgency" className="font-medium">Urgency Level</label>
                  <Select 
                    value={formData.urgency} 
                    onValueChange={(value) => handleChange("urgency", value)}
                  >
                    <SelectTrigger className={errors.urgency ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.urgency && <p className="text-sm text-red-500">{errors.urgency}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="patientCondition" className="font-medium">
                  Patient Condition (Optional)
                </label>
                <Textarea 
                  id="patientCondition"
                  placeholder="Enter details about patient's condition"
                  value={formData.patientCondition}
                  onChange={(e) => handleChange("patientCondition", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-bloodRed-500 hover:bg-bloodRed-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Blood Request"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Request;
