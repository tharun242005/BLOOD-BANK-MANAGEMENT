import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-12">
      <div className="container mx-auto">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Blood Bank Manager</h3>
            <p className="text-gray-300">
              A comprehensive solution for blood banks and donation centers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/donate" className="text-bloodRed-500 hover:underline">
                  Donate Blood
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-bloodRed-500 hover:underline">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-bloodRed-500 hover:underline">
                  Blood Inventory
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>Email: run40081@gmail.com</p>
              <p className="flex items-center gap-1">
                <Github size={16} />
                <a 
                  href="https://github.com/tharun242005/BLOOD-BANK-MANAGEMENT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-bloodRed-500 hover:underline"
                >
                  github.com/tharun242005
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>© TP 2025</p>
        </div>
      </div>
    </footer>
  );
}
