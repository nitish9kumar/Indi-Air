import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Offer {
  id: number;
  title: string;
  description: string;
  image: string;
  badge: {
    text: string;
    color: string;
  };
  validUntil: string;
}

const offers: Offer[] = [
  {
    id: 1,
    title: "Diwali Special",
    description: "Celebrate the festival of lights with special fares on international flights.",
    image: "https://www.qatarairways.com/content/dam/images/renditions/square/campaigns/global/formula1/s-f1-early-bird-2025.jpg",
    badge: {
      text: "20% OFF",
      color: "bg-[#FF9933]",
    },
    validUntil: "31 Oct 2023",
  },
  {
    id: 2,
    title: "Business Class Upgrade",
    description: "Upgrade to business class for just ₹15,000 on select international routes.",
    image: "https://www.qatarairways.com/content/dam/images/renditions/square/campaigns/qatar/visit-qatar/s-qatar-stopver-beach-800.jpg",
    badge: {
      text: "PREMIUM",
      color: "bg-[#4361EE]",
    },
    validUntil: "15 Nov 2023",
  },
  {
    id: 3,
    title: "Family Vacation Package",
    description: "Special rates for families. Children under 12 fly at 50% off.",
    image: "https://www.qatarairways.com/content/dam/images/renditions/square/campaigns/qatar/visit-qatar/s-qatar-stopver-beach-800.jpg",
    badge: {
      text: "FAMILY",
      color: "bg-[#138808]",
    },
    validUntil: "31 Dec 2023",
  },
  {
    id: 4,
    title: "Student Discount",
    description: "Special discounts for students traveling internationally for studies.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    badge: {
      text: "15% OFF",
      color: "bg-[#4361EE]",
    },
    validUntil: "31 Jan 2024",
  },
];

const Offers: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h2 className="font-bold text-3xl md:text-4xl mb-2">Special Offers</h2>
            <p className="text-neutral-700">Exclusive deals to make your journey more affordable</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute top-4 right-4 ${offer.badge.color} text-white px-3 py-1 rounded-full font-medium`}
                    >
                      {offer.badge.text}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">{offer.title}</h3>
                    <p className="text-neutral-700 mb-4">
                      {offer.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">
                        Valid till: {offer.validUntil}
                      </span>
                      <Button
                        variant="link"
                        className="text-[#4361EE] font-medium hover:text-[#FF9933] transition-colors p-0"
                      >
                        Book Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
