import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other", "Prefer not to say"];

const donorSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 18 && Number(val) <= 65, {
      message: "Age must be between 18 and 65",
    }),
  gender: z.string().min(1, { message: "Please select your gender" }),
  bloodType: z.string().min(1, { message: "Please select your blood type" }),
  contactNumber: z.string().min(10, { message: "Contact number is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  address: z.string().min(5, { message: "Address is required" }),
  medicalHistory: z.string().optional(),
});

type DonorForm = z.infer<typeof donorSchema>;

const Donate = () => {
  const [formData, setFormData] = useState<DonorForm>({
    fullName: "",
    age: "",
    gender: "",
    bloodType: "",
    contactNumber: "",
    email: "",        // Now fully editable
    address: "",
    medicalHistory: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DonorForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof DonorForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      donorSchema.parse(formData);
      setIsSubmitting(true);

      const { error } = await supabase.from("donors").insert({
        full_name: formData.fullName,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        blood_type: formData.bloodType,
        contact_number: formData.contactNumber,
        email: formData.email,
        address: formData.address,
        medical_history: formData.medicalHistory || null,
      });

      if (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to register as donor. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Thank you for registering as a donor!",
        });
        setFormData({
          fullName: "",
          age: "",
          gender: "",
          bloodType: "",
          contactNumber: "",
          email: "",
          address: "",
          medicalHistory: "",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) fieldErrors[e.path[0] as keyof DonorForm] = e.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto p-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-bloodRed-500 mb-6">
              Register as a Blood Donor
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="font-medium">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label htmlFor="age" className="font-medium">
                    Age
                  </label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label htmlFor="gender" className="font-medium">
                    Gender
                  </label>
                  <Select
                    value={formData.gender}
                    onValueChange={(val) => handleChange("gender", val)}
                  >
                    <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                </div>

                {/* Blood Type */}
                <div className="space-y-2">
                  <label htmlFor="bloodType" className="font-medium">
                    Blood Type
                  </label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(val) => handleChange("bloodType", val)}
                  >
                    <SelectTrigger className={errors.bloodType ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bloodType && <p className="text-sm text-red-500">{errors.bloodType}</p>}
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <label htmlFor="contactNumber" className="font-medium">
                    Contact Number
                  </label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => handleChange("contactNumber", e.target.value)}
                    className={errors.contactNumber ? "border-red-500" : ""}
                  />
                  {errors.contactNumber && (
                    <p className="text-sm text-red-500">{errors.contactNumber}</p>
                  )}
                </div>

                {/* Email (now editable) */}
                <div className="space-y-2">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label htmlFor="address" className="font-medium">
                  Address
                </label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>

              {/* Medical History */}
              <div className="space-y-2">
                <label htmlFor="medicalHistory" className="font-medium">
                  Medical History (comma separated, leave empty if none)
                </label>
                <Textarea
                  id="medicalHistory"
                  placeholder="e.g., Diabetes, High Blood Pressure"
                  value={formData.medicalHistory}
                  onChange={(e) => handleChange("medicalHistory", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-bloodRed-500 hover:bg-bloodRed-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Register as Donor"}
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

export default Donate;