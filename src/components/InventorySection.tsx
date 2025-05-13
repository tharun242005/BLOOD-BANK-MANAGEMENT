
import { BloodTypeCard } from "./BloodTypeCard";

export function InventorySection() {
  // Mock data - this would come from your database
  const bloodInventory = [
    { bloodType: "O+", units: 45, maxUnits: 100 },
    { bloodType: "O-", units: 20, maxUnits: 100 },
    { bloodType: "A+", units: 67, maxUnits: 100 },
    { bloodType: "A-", units: 15, maxUnits: 100 },
    { bloodType: "B+", units: 52, maxUnits: 100 },
    { bloodType: "B-", units: 12, maxUnits: 100 },
    { bloodType: "AB+", units: 32, maxUnits: 100 },
    { bloodType: "AB-", units: 8, maxUnits: 100 },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Current Blood Inventory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {bloodInventory.map((blood) => (
            <BloodTypeCard
              key={blood.bloodType}
              bloodType={blood.bloodType}
              units={blood.units}
              maxUnits={blood.maxUnits}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
