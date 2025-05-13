
import { Droplet } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="blood-drop-pulse rounded-full bg-bloodRed-500 p-2 flex items-center justify-center">
        <Droplet size={24} className="text-white" />
      </div>
    </div>
  );
}
