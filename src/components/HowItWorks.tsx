
import { Droplet, User, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 bg-bloodRed-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-bloodRed-500" />
              </div>
              <div>
                <CardTitle>Become a Blood Donor</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Fill out a simple form with your details and medical history. No account needed!
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 bg-bloodRed-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-bloodRed-500" />
              </div>
              <div>
                <CardTitle>Request Blood</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Submit a blood request for a patient in need. Simple process with no login required.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
