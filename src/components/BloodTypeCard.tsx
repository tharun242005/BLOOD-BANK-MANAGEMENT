
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplet } from "lucide-react";

interface BloodTypeCardProps {
  bloodType: string;
  units: number;
  maxUnits: number;
}

export function BloodTypeCard({ bloodType, units, maxUnits }: BloodTypeCardProps) {
  const percentage = (units / maxUnits) * 100;
  
  return (
    <Card className="border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <Droplet className="mr-2 h-5 w-5 text-bloodRed-500" />
          <h3 className="text-lg font-bold">{bloodType}</h3>
        </div>
        <span className="text-sm text-gray-500">{units} units</span>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-2" />
        <p className="text-sm text-gray-500 mt-2">
          {percentage < 30 
            ? "Low stock! Donors needed" 
            : percentage < 70 
              ? "Moderate stock available" 
              : "Good stock available"}
        </p>
      </CardContent>
    </Card>
  );
}
