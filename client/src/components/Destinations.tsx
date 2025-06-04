import React, { useEffect, useState } from "react";
import  { useNavigate  } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlaneTakeoff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import baliImage from "@/assets/images/family-snorkeling-underwater-in-bali.jpg";
import tokiyoImage from "@/assets/images/tokyo-disneyland-japan.jpg";
import phuketImage from "@/assets/images/tourists-with-elephants-at-the-phuket-elephant-sanctuary.jpg";
import barcelonaImage from "@/assets/images/BARCELONA.jpg";
import veniceImage from "@/assets/images/Rialtobridge_20220718170000.jpg";
import viennaImage from "@/assets/images/Wien_-_Graben_28229_20190714104413.jfif";
import { string } from "zod";

interface Destination {
  id: number;
  name: string;
  image: string;
  from: string;
  price: string;
  departure: string;
  arrival: string;
  flightNumber: string;
  airline?: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
}

interface DestinationsProps {
  user: string | null;
}

let name1  = "Dubai";
let image1 = "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/sponsorships/hn-intermilan-crew-2025.jpg";
let from1  = "New Delhi";
let price1 = "₹24,999";
let departure1 = "New Delhi";
let arrival1 = "Dubai";
let flightNumber1 = "AI9781";
let duration1 = "8h 23m";
let departureTime1 = "2025-05-08T09:21:53.033Z";
let arrivalTime1 = "2025-05-08T11:21:53.033Z";

let name2  = "London";
let image2 = "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/psg/2024-25/hn-psg-kv1.jpg";
let from2  = "Mumbai";
let price2 = "₹49,999";
let departure2 = "Mumbai";
let arrival2 = "London";
let flightNumber2 = "AI9782";
let duration2 = "7h 15m";
let departureTime2 = "2025-05-08T09:21:53.033Z";
let arrivalTime2 = "2025-05-08T11:21:53.033Z";

let name3  = "Singapore";
let image3 = "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/qatar/stopover/hn-family-nmoq-qatar-stopover.jpg";
let from3  = "Bangalore";
let price3 =  "₹32,499";
let departure3 = "Bangalore";
let arrival3 = "Singapore";
let flightNumber3 = "AI9783";
let duration3 = "6h 20m";
let departureTime3 = "2025-05-08T09:21:53.033Z";
let arrivalTime3 = "2025-05-08T11:21:53.033Z";

const defaultDestinations: Destination[] = [
  {
    id: 1,
    name: name1,
    image: image1,
    from: from1,
    price: price1,
    departure:departure1,
    arrival:arrival1,
    flightNumber:flightNumber1,
    duration:duration1,
    departureTime:departureTime1,
    arrivalTime:arrivalTime1,
  },
  {
    id: 2,
    name: name2,
    image: image2, 
    from: from2,
    price: price2,
    departure: departure2,
    arrival: arrival2,
    flightNumber:flightNumber2,
    duration:duration2,
    departureTime:departureTime2,
    arrivalTime:arrivalTime2,
  },
  {
    id: 3,
    name: name3,
    image: image3,
    from: from3,
    price: price3,
    departure:departure3,
    arrival:arrival3,
    flightNumber:flightNumber3,
    duration:duration3,
    departureTime:departureTime3,
    arrivalTime:arrivalTime3,
  }
];


const Destinations: React.FC<DestinationsProps> = ({ user }) => {
const navigate = useNavigate();
//const [destinations, setDestinations] = useState(defaultDestinations);

const [destinations, setDestinations] = useState<Destination[]>(defaultDestinations);

useEffect(()=>{

if(user === 'user1'){
  name1  = "Bali";
  image1 = baliImage;
  from1  = "New Delhi";
  price1 = "₹24,999";
  departure1 = "New Delhi";
  arrival1 ="Bali";
  flightNumber1 = "BI9781";
  duration1 = "6h 20m";
  departureTime1 = "2025-05-08T09:21:53.033Z";
  arrivalTime1 = "2025-05-08T11:21:53.033Z";
  
  name2  = "Tokiyo";
  image2 = tokiyoImage;
  from2  = "Mumbai";
  price2 = "₹24,999";
  departure2 = "Mumbai";
  arrival2 ="Tokiyo";
  flightNumber2 = "TI9781";
  duration2 = "5h 20m";
  departureTime2 = "2025-05-08T09:21:53.033Z";
  arrivalTime2 = "2025-05-08T11:21:53.033Z";
  
  name3  = "Phuket";
  image3 = phuketImage;
  from3  = "New Delhi";
  price3 = "₹24,999";
  departure3 = "New Delhi";
  arrival3 ="Phuket";
  flightNumber3 = "BI9781";
  duration3 = "6h 20m";
  departureTime3 = "2025-05-08T09:21:53.033Z";
  arrivalTime3 = "2025-05-08T11:21:53.033Z";

} else if(user === 'user2') {
  name1  = "Barcelona";
  image1 = barcelonaImage;
  from1  = "New Delhi";
  price1 = "₹24,999";
  departure1 = "Barcelona";
  arrival1 ="New Delhi";
  flightNumber1 = "BAR9781";
  duration1 = "6h 20m";
  departureTime1 = "2025-05-08T09:21:53.033Z";
  arrivalTime1 = "2025-05-08T11:21:53.033Z";
  
  name2  = "Venice";
  image2 = veniceImage;
  from2  = "Mumbai";
  price2 = "₹24,999";
  departure2 = "Mumbai";
  arrival2 ="Venice";
  flightNumber2 = "VN9781";
  duration2 = "5h 20m";
  departureTime2 = "2025-05-08T09:21:53.033Z";
  arrivalTime2 = "2025-05-08T11:21:53.033Z";
  
  name3  = "Vienna";
  image3 = viennaImage;
  from3  = "New Delhi";
  price3 = "₹24,999";
  departure3 = "New Delhi";
  arrival3 ="Vienna";
  flightNumber3 = "VI9781";
  duration3 = "6h 20m";
  departureTime3 = "2025-05-08T09:21:53.033Z";
  arrivalTime3 = "2025-05-08T11:21:53.033Z";
}

  const destinationsData: Destination[] = [
    {
      id: 1,
      name: name1,
      image: image1,
      from: from1,
      price: price1,
      departure:departure1,
      arrival:arrival1,
      flightNumber:flightNumber1,
      duration:duration1,
      departureTime:departureTime1,
      arrivalTime:arrivalTime1,
    },
    {
      id: 2,
      name: name2,
      image: image2,
      from: from2,
      price: price2,
      departure:departure2,
      arrival:arrival2,
      flightNumber:flightNumber2,
      duration:duration2,
      departureTime:departureTime2,
      arrivalTime:arrivalTime2,
    },
    {
      id: 3,
      name: name3,
      image: image3,
      from: from3,
      price: price3,
      departure:departure3,
      arrival:arrival3,
      flightNumber:flightNumber3,
      duration:duration3,
      departureTime:departureTime3,
      arrivalTime:arrivalTime3,
    }
  ];

  setDestinations(destinationsData);
  //setDestinations(prevItems => [...prevItems, ...destinationsData]);


},[user]);


 const handleSelectFlight = (flight: any) => {
  const flightData = {
    ...flight,
    departureTime: new Date(flight.departureTime || Date.now()),
    arrivalTime: new Date(flight.arrivalTime || Date.now() + 2 * 60 * 60 * 1000),
  };
  navigate('/seat-selection', { state: { flight: flightData, offers:true } });
};
  

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
               onClick={() => handleSelectFlight(destination)}
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
