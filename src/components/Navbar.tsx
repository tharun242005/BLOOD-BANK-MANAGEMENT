
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-bloodRed-500">BloodBank Manager</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Home size={20} />
            <span>Home</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" className="bg-bloodRed-500 hover:bg-bloodRed-600" asChild>
            <Link to="/donate">Donate Blood</Link>
          </Button>
          <Button variant="default" className="bg-bloodRed-500 hover:bg-bloodRed-600" asChild>
            <Link to="/request">Request Blood</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
