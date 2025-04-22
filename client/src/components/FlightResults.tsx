import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { format, addHours, addMinutes } from "date-fns";
import { TiPlane } from "react-icons/ti";
import { INDIA_COLORS } from "@/lib/constants";
import SeatSelection from "./SeatSelection";
import PaymentPage, { PaymentFormValues } from "./PaymentPage";
import BookingConfirmation from "./BookingConfirmation";

interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  duration: string;
  stops: number;
}

interface FlightResultsProps {
  source: string;
  destination: string;
  departureDate: string;
  onClose: () => void;
}

// Helper function to generate mock flights based on search criteria
const generateFlights = (source: string, destination: string, departureDate: string): Flight[] => {
  // Parse the departure date
  const baseDepartureDate = new Date(departureDate);
  
  // Generate 3-5 flights
  const numberOfFlights = Math.floor(Math.random() * 3) + 3;
  const flights: Flight[] = [];
  
  const airlines = ["IndiAir", "Air India", "Vistara", "Indigo", "SpiceJet"];
  
  for (let i = 0; i < numberOfFlights; i++) {
    // Generate a random departure time between 6 AM and 10 PM
    const departureHour = 6 + Math.floor(Math.random() * 16);
    const departureMinute = Math.floor(Math.random() * 60);
    
    const departureTime = new Date(baseDepartureDate);
    departureTime.setHours(departureHour, departureMinute, 0);
    
    // Flight duration between 1.5 hours and 16 hours depending on if it's domestic or international
    const isInternational = !destination.includes("Delhi") && 
                           !destination.includes("Mumbai") && 
                           !destination.includes("Bangalore") && 
                           !destination.includes("Chennai") && 
                           !destination.includes("Kolkata") && 
                           !destination.includes("Hyderabad") && 
                           !destination.includes("Ahmedabad");
    
    const minDuration = isInternational ? 3 : 1.5;
    const maxDuration = isInternational ? 16 : 3.5;
    const durationHours = minDuration + Math.random() * (maxDuration - minDuration);
    const durationMinutes = Math.floor(durationHours * 60);
    
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + durationMinutes);
    
    // Calculate duration string
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationString = `${hours}h ${minutes}m`;
    
    // Generate a price based on duration and randomness
    const basePrice = isInternational ? 15000 : 3500;
    const priceVariation = isInternational ? 25000 : 6500;
    const price = basePrice + Math.floor(Math.random() * priceVariation);
    
    // Generate stops
    const stops = isInternational ? (Math.random() > 0.3 ? Math.floor(Math.random() * 2) + 1 : 0) : 
                                  (Math.random() > 0.7 ? 1 : 0);
    
    flights.push({
      id: i + 1,
      flightNumber: `${airlines[i % airlines.length].substring(0, 2).toUpperCase()}${100 + Math.floor(Math.random() * 900)}`,
      airline: airlines[i % airlines.length],
      departureTime,
      arrivalTime,
      price,
      duration: durationString,
      stops
    });
  }
  
  // Sort by price
  return flights.sort((a, b) => a.price - b.price);
};

// Adding booking steps management
type BookingStep = 'flights' | 'seats' | 'payment' | 'confirmation';

const FlightResults: React.FC<FlightResultsProps> = ({ 
  source, 
  destination, 
  departureDate,
  onClose
}) => {
  const flights = generateFlights(source, destination, departureDate);
  const [currentStep, setCurrentStep] = useState<BookingStep>('flights');
  const [selectedFlight, setSelectedFlight] = useState<Flight & { source: string; destination: string } | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState<PaymentFormValues | null>(null);
  
  const handleBookNow = (flight: Flight) => {
    setSelectedFlight({
      ...flight,
      source,
      destination
    });
    setCurrentStep('seats');
  };
  
  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
    
    // Calculate the total amount based on the selected seats and flight
    const businessClassSeats = seats.filter(seatId => {
      const row = parseInt(seatId.match(/\d+/)?.[0] || "0");
      return row <= 2;
    }).length;
    
    const economySeats = seats.length - businessClassSeats;
    const total = selectedFlight ? 
      (businessClassSeats * selectedFlight.price * 3) + (economySeats * selectedFlight.price) : 
      0;
    
    setTotalAmount(total);
    setCurrentStep('payment');
  };
  
  const handlePaymentComplete = (details: PaymentFormValues) => {
    setPaymentDetails(details);
    setCurrentStep('confirmation');
  };
  
  const handleBookAnother = () => {
    setCurrentStep('flights');
    setSelectedFlight(null);
    setSelectedSeats([]);
    setTotalAmount(0);
    setPaymentDetails(null);
    onClose();
  };
  
  // Render the appropriate step
  if (currentStep === 'seats' && selectedFlight) {
    return (
      <SeatSelection 
        flight={selectedFlight} 
        onProceed={handleSeatSelection}
        onBack={() => setCurrentStep('flights')}
      />
    );
  }
  
  if (currentStep === 'payment' && selectedFlight) {
    return (
      <PaymentPage 
        flight={selectedFlight}
        selectedSeats={selectedSeats}
        totalAmount={totalAmount}
        onBack={() => setCurrentStep('seats')}
        onComplete={handlePaymentComplete}
      />
    );
  }
  
  if (currentStep === 'confirmation' && selectedFlight && paymentDetails) {
    return (
      <BookingConfirmation 
        flight={selectedFlight}
        selectedSeats={selectedSeats}
        totalAmount={totalAmount}
        paymentDetails={paymentDetails}
        onBookAnother={handleBookAnother}
      />
    );
  }

  return (
    <div className="flight-results bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Available Flights</h2>
        <Button 
          variant="outline" 
          onClick={onClose}
          className="text-sm border-neutral-300"
        >
          New Search
        </Button>
      </div>
      
      <div className="journey-details flex items-center p-4 mb-6 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="text-lg font-semibold">{source} → {destination}</div>
          <div className="text-sm text-neutral-500">{format(new Date(departureDate), "EEE, MMM d, yyyy")}</div>
        </div>
      </div>
      
      <div className="flight-list space-y-4">
        {flights.map((flight) => (
          <div 
            key={flight.id} 
            className="flight-card p-4 border border-neutral-200 rounded-lg hover:border-[#FF9933] transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="airline-info flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#FF9933] to-[#FFB366] rounded-full mr-3">
                  <TiPlane className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{flight.airline}</div>
                  <div className="text-sm text-neutral-500">{flight.flightNumber}</div>
                </div>
              </div>
              
              <div className="schedule flex-1 flex flex-col md:flex-row items-start md:items-center justify-center">
                <div className="departure text-center mr-4">
                  <div className="text-lg font-semibold">{format(flight.departureTime, "hh:mm a")}</div>
                  <div className="text-sm text-neutral-500">{source}</div>
                </div>
                
                <div className="flight-path flex flex-col items-center mx-4 my-2 md:my-0">
                  <div className="text-xs text-neutral-500">{flight.duration}</div>
                  <div className="relative w-20 md:w-32 h-0.5 bg-neutral-300 my-1">
                    <div className="absolute -top-1.5 left-0 w-3 h-3 rounded-full bg-[#FF9933]"></div>
                    <div className="absolute -top-1.5 right-0 w-3 h-3 rounded-full bg-[#138808]"></div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {flight.stops === 0 ? "Non-stop" : `${flight.stops} ${flight.stops === 1 ? "stop" : "stops"}`}
                  </div>
                </div>
                
                <div className="arrival text-center ml-4">
                  <div className="text-lg font-semibold">{format(flight.arrivalTime, "hh:mm a")}</div>
                  <div className="text-sm text-neutral-500">{destination}</div>
                </div>
              </div>
              
              <div className="booking-info text-right">
                <div className="price text-2xl font-bold text-[#138808]">₹{flight.price.toLocaleString()}</div>
                <Button 
                  className="mt-2 bg-gradient-to-r from-[#FF9933] to-[#FFB366] hover:from-[#F08620] hover:to-[#FF9933]"
                  onClick={() => handleBookNow(flight)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;