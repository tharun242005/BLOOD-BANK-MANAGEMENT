
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BloodDrop3D } from "./BloodDrop3D";

export function Hero() {
  return (
    <div className="bg-bloodRed-500 text-white py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blood Bank Management System
            </h1>
            <p className="text-lg mb-8">
              Register as a donor or make blood requests. No account required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-bloodRed-500 hover:bg-gray-100" asChild>
                <Link to="/donate">Donate Blood</Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-white text-bloodRed-500 hover:bg-gray-100" asChild>
                <Link to="/request">Request Blood</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <BloodDrop3D />
          </div>
        </div>
      </div>
    </div>
  );
}
