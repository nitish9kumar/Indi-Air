import React from "react";
import { Button } from "@/components/ui/button";
import { AppleIcon } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";

const Promotion: React.FC = () => {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] via-[#138808] to-[#4361EE] opacity-70 animate-gradient-x"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-bold text-3xl md:text-4xl mb-4">Download Our App</h2>
              <p className="text-neutral-700 mb-6">
                Book flights, check status, and manage your journey from the convenience of your smartphone.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-black text-white hover:bg-black/80 flex items-center"
                >
                  <AppleIcon className="mr-2 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Download on the</span>
                    <span className="font-medium">App Store</span>
                  </div>
                </Button>
                <Button
                  className="bg-black text-white hover:bg-black/80 flex items-center"
                >
                  <FaGooglePlay className="mr-2 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">GET IT ON</span>
                    <span className="font-medium">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <img
                src="https://www.qatarairways.com/content/dam/images/renditions/square/campaigns/global/formula1/s-f1-early-bird-2025.jpg"
                alt="Mobile App"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#4361EE] bg-opacity-30 flex items-center justify-center">
                <div className="bg-white p-1 rounded-3xl shadow-lg transform rotate-12">
                  <div className="border-8 border-black rounded-2xl overflow-hidden w-48 h-96">
                    <img
                      src="https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                      alt="App Screenshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
