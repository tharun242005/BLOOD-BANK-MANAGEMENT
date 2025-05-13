
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InventorySection } from "@/components/InventorySection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <InventorySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
