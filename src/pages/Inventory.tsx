
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type BloodInventoryItem = {
  id: string;
  bloodType: string;
  quantity: number;
  status: "Low" | "Medium" | "High";
  lastUpdated: string;
  expiryDate: string;
  location: string;
};

const mockInventoryData: BloodInventoryItem[] = [
  {
    id: "INV001",
    bloodType: "O+",
    quantity: 45,
    status: "Medium",
    lastUpdated: "2025-05-01",
    expiryDate: "2025-06-01",
    location: "Main Storage"
  },
  {
    id: "INV002",
    bloodType: "O-",
    quantity: 20,
    status: "Low",
    lastUpdated: "2025-05-02",
    expiryDate: "2025-06-02",
    location: "Main Storage"
  },
  {
    id: "INV003",
    bloodType: "A+",
    quantity: 67,
    status: "High",
    lastUpdated: "2025-05-03",
    expiryDate: "2025-06-03",
    location: "Secondary Storage"
  },
  {
    id: "INV004",
    bloodType: "A-",
    quantity: 15,
    status: "Low",
    lastUpdated: "2025-05-04",
    expiryDate: "2025-06-04",
    location: "Main Storage"
  },
  {
    id: "INV005",
    bloodType: "B+",
    quantity: 52,
    status: "High",
    lastUpdated: "2025-05-05",
    expiryDate: "2025-06-05",
    location: "Secondary Storage"
  },
  {
    id: "INV006",
    bloodType: "B-",
    quantity: 12,
    status: "Low",
    lastUpdated: "2025-05-06",
    expiryDate: "2025-06-06",
    location: "Main Storage"
  },
  {
    id: "INV007",
    bloodType: "AB+",
    quantity: 32,
    status: "Medium",
    lastUpdated: "2025-05-07",
    expiryDate: "2025-06-07",
    location: "Cold Storage"
  },
  {
    id: "INV008",
    bloodType: "AB-",
    quantity: 8,
    status: "Low",
    lastUpdated: "2025-05-08",
    expiryDate: "2025-06-08",
    location: "Cold Storage"
  }
];

const Inventory = () => {
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const filteredInventory = mockInventoryData.filter(item => {
    // Apply blood type filter
    if (bloodTypeFilter !== "all" && item.bloodType !== bloodTypeFilter) return false;
    
    // Apply status filter
    if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    
    // Apply search filter
    if (searchTerm && !item.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });
  
  const bloodTypes = ["all", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const statuses = ["all", "Low", "Medium", "High"];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "low":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "high":
        return "bg-green-100 text-green-700";
      default:
        return "";
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-bloodRed-500 mb-6">Blood Inventory</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search by blood type or location..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Blood Type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Blood Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Statuses" : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button 
              variant="outline" 
              onClick={() => {
                setBloodTypeFilter("all");
                setStatusFilter("all");
                setSearchTerm("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableCaption>Current blood inventory as of {new Date().toLocaleDateString()}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead className="text-right">Quantity (Units)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.bloodType}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>{item.expiryDate}</TableCell>
                    <TableCell>{item.location}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No inventory items match your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inventory;