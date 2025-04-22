import React from "react";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Destination {
  id: number;
  name: string;
  image: string;
  from: string;
  price: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    from: "New Delhi",
    price: "₹24,999"
  },
  {
    id: 2,
    name: "London",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    from: "Mumbai",
    price: "₹49,999"
  },
  {
    id: 3,
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    from: "Bangalore",
    price: "₹32,499"
  }
];

const Destinations: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-12">
          <div>
            <h2 className="font-bold text-3xl md:text-4xl mb-2">Popular Destinations</h2>
            <p className="text-neutral-700">Explore our most sought-after flight routes</p>
          </div>
          <a href="#" className="text-[#4361EE] font-medium hover:text-[#FF9933] transition-colors">
            View All Destinations <span className="ml-1">→</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 rounded-xl">
              <div className="relative h-56">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="text-white font-bold text-xl">{destination.name}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <PlaneTakeoff className="text-[#FF9933] mr-2 h-5 w-5" />
                    <span>From {destination.from}</span>
                  </div>
                  <span className="font-bold text-[#4361EE]">{destination.price}</span>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border border-[#4361EE] text-[#4361EE] hover:bg-[#4361EE] hover:text-white rounded-lg py-2 transition-colors"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
