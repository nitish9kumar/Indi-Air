import React from "react";
import { Bed, Utensils, Film, Headphones } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    icon: <Bed className="h-6 w-6 text-[#FF9933]" />,
    title: "Comfort First",
    description: "Spacious seats and premium amenities for a relaxing journey",
    color: "bg-[#FF9933] bg-opacity-10 text-[#FF9933]",
  },
  {
    icon: <Utensils className="h-6 w-6 text-[#138808]" />,
    title: "Authentic Cuisine",
    description: "Savor the flavors of India with our curated in-flight meals",
    color: "bg-[#138808] bg-opacity-10 text-[#138808]",
  },
  {
    icon: <Film className="h-6 w-6 text-[#4361EE]" />,
    title: "Entertainment",
    description: "Enjoy Bollywood hits and international content onboard",
    color: "bg-[#4361EE] bg-opacity-10 text-[#4361EE]",
  },
  {
    icon: <Headphones className="h-6 w-6 text-[#FFD700]" />,
    title: "Atithi Devo Bhava",
    description: "Experience the warmth of Indian hospitality at 30,000 feet",
    color: "bg-[#FFD700] bg-opacity-10 text-[#FFD700]",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Why Fly With <span className="text-[#FF9933]">IndiAir</span>?
          </h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Experience the best of Indian hospitality with our world-class services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {service.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
              <p className="text-neutral-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
