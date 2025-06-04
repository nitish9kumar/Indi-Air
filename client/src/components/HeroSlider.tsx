import React, { useState, useEffect } from "react";
import BookingWizard from "./BookingWizard";

interface HeroSliderProps {
  user: string | null;
}

let image1 = "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/web-summit/hn-man-on-mobile.jpg";
let alt1 = "Taj Mahal in Agra, India";
let image2 = "https://assets.bizclikmedia.net/900/f1f1313ebb40b288bab012fc2eaf77c0:77c47bfdfb8bd088c3e65b92e6440f10/490377-wrap-up-a3afe8-large-1687769659.webp";
let alt2 = "Gateway of India in Mumbai";
let image3 = "https://techmgzn.com/wp-content/uploads/2024/03/qatar-airways-unveils-the-worlds-first-ai-cabin-crew-sama-2.0.jpg";
let alt3 = "Jaipur City Palace"

const defaultSlides = [
  {
    id: 1,
    image: image1,
    alt: "Taj Mahal in Agra, India"
  },
  {
    id: 2,
    image: image2,
    alt: "Gateway of India in Mumbai"
  },
  {
    id: 3,
    image: image3,
    alt: "Jaipur City Palace"
  }
];

const HeroSlider: React.FC<HeroSliderProps> = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
    console.log(user)
  useEffect(() => {

if(user==='user1'){
  image1 = "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/qatar/stopover/hn-family-nmoq-qatar-stopover.jpg";
  alt1 = "Taj Mahal in Agra, India";
  image2 = "https://www.ttrweekly.com/site/wp-content/uploads/2023/08/Air-India_1-1920x1197.jpg";
  alt2 = "Air india";
  image3 = "https://www.timesaerospace.aero/sites/aerospace/times/files/styles/lead_image_2_1280x720_/public/2023-12/Unknown-1.jpeg?itok=x2fp6fG-";
  alt3 = "new indi"
} else if(user==='user2') {
  image1 = "https://a.loveholidays.com/images/holidays/turkey/antalya/side/horus-paradise-luxury-resort-all-inclusive.jpg";
  alt1 = "Taj Mahal in Agra, India";
  image2 = "https://content.r9cdn.net/rimg/himg/58/24/92/leonardo-1158517-BNAMP_4228916961_O-248255.jpg?width=1200&height=630&crop=false";
  alt2 = "Air india";
  image3 = "https://www.timesaerospace.aero/sites/aerospace/times/files/styles/lead_image_2_1280x720_/public/2023-12/Unknown-1.jpeg?itok=x2fp6fG-";
  alt3 = "new indi"
}


    const slidesData = [
      {
        id: 1,
        image: image1,
        alt: alt1
      },
      {
        id: 2,
        image: image2,
        alt: alt2
      },
      {
        id: 3,
        image: image3,
        alt: alt3
      }
    ];

    setSlides(slidesData);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <section className="relative h-screen pt-16 overflow-hidden1">

      {/* Slider */}
      {user}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <div 
            className="absolute inset-0 bg-black bg-opacity-40"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="text-center text-white mb-8">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Experience the <span className="text-[#FF9933]">Sky</span> of India
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {!user &&`Connecting India to the world with comfort, culture, and care`}
            {user === "user1" && `Connecting Families Globally with Love, Tradition, and Comfort`}
            {user === "user2" && `Journey Solo, Experience the World with Culture and Comfort`}
          </p>
        </div>

        {/* Booking Form */}
        <BookingWizard />
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20 hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
