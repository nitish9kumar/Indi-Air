import React from "react";
import { Star, StarHalf } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  name: string;
  route: string;
  initials: string;
  avatarColor: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "The in-flight entertainment and food were exceptional. I felt like I was experiencing Indian hospitality at its finest, even at 30,000 feet!",
    name: "Raj Sharma",
    route: "Delhi to London",
    initials: "RS",
    avatarColor: "bg-[#FF9933]",
    rating: 5,
  },
  {
    id: 2,
    content: "The cabin crew was attentive and friendly. The seats were comfortable, and the traditional Indian meals were a delightful surprise.",
    name: "Anjali Patel",
    route: "Mumbai to Singapore",
    initials: "AP",
    avatarColor: "bg-[#4361EE]",
    rating: 4.5,
  },
  {
    id: 3,
    content: "Business class with IndiAir was worth every penny. The lie-flat beds, premium amenities, and curated menu made my long-haul flight actually enjoyable!",
    name: "Vikram Khanna",
    route: "Bangalore to New York",
    initials: "VK",
    avatarColor: "bg-[#138808]",
    rating: 5,
  },
];

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-[#FFD700] fill-[#FFD700]" />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half-star" className="h-5 w-5 text-[#FFD700] fill-[#FFD700]" />);
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-[#FFD700]" />);
  }

  return stars;
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            What Our Passengers Say
          </h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Real experiences from our valued customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">{renderStars(testimonial.rating)}</div>
              </div>
              <p className="mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 ${testimonial.avatarColor} rounded-full flex items-center justify-center mr-4`}
                >
                  <span className="text-white font-semibold">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-600">
                    {testimonial.route}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
