import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IoAirplane } from "react-icons/io5";

interface SeatSelectionProps {
  flight: {
    id: number;
    airline: string;
    flightNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
    duration: string;
    source: string;
    destination: string;
  };
  onProceed: (selectedSeats: string[]) => void;
  onBack: () => void;
}

// Create a grid of seats (e.g., 20 rows, 6 seats per row)
const generateSeats = () => {
  const rows = 20;
  const seatsPerRow = 6;
  const seats: { id: string; status: "available" | "unavailable" | "selected" }[] = [];
  
  // Business class (rows 1-2)
  for (let row = 1; row <= 2; row++) {
    for (let seat = 0; seat < 4; seat++) {
      const seatLetter = String.fromCharCode(65 + seat);
      const seatId = `${row}${seatLetter}`;
      
      // Randomly make some seats unavailable
      const status = Math.random() > 0.3 ? "available" : "unavailable";
      seats.push({ id: seatId, status });
    }
  }
  
  // Economy class (rows 3-20)
  for (let row = 3; row <= rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const seatLetter = String.fromCharCode(65 + seat);
      const seatId = `${row}${seatLetter}`;
      
      // Randomly make some seats unavailable
      const status = Math.random() > 0.25 ? "available" : "unavailable";
      seats.push({ id: seatId, status });
    }
  }
  
  return seats;
};

const SeatSelection: React.FC<SeatSelectionProps> = ({ flight, onProceed, onBack }) => {
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const isBusinessClass = (seatId: string) => {
    const row = parseInt(seatId.match(/\d+/)?.[0] || "0");
    return row <= 2;
  };
  
  const handleSeatClick = (seatId: string, currentStatus: "available" | "unavailable" | "selected") => {
    if (currentStatus === "unavailable") return;
    
    setSeats(seats.map(seat => 
      seat.id === seatId 
        ? { ...seat, status: seat.status === "selected" ? "available" : "selected" } 
        : seat
    ));
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };
  
  const calculateTotalPrice = () => {
    const basePrice = flight.price;
    const businessClassSeats = selectedSeats.filter(isBusinessClass).length;
    const economyClassSeats = selectedSeats.length - businessClassSeats;
    
    // Business class seats cost 3x the economy price
    return (businessClassSeats * basePrice * 3) + (economyClassSeats * basePrice);
  };
  
  const renderSeat = (seat: { id: string; status: "available" | "unavailable" | "selected" }) => {
    const isSelected = seat.status === "selected";
    const isUnavailable = seat.status === "unavailable";
    const isBusiness = isBusinessClass(seat.id);
    
    let bgColor = "bg-neutral-100 hover:bg-blue-100";
    if (isSelected) bgColor = "bg-blue-500 text-white";
    if (isUnavailable) bgColor = "bg-neutral-300 cursor-not-allowed opacity-50";
    if (isBusiness && !isUnavailable) bgColor = isSelected ? "bg-indigo-600 text-white" : "bg-indigo-100 hover:bg-indigo-200";
    
    const seatClasses = `seat flex items-center justify-center w-10 h-10 rounded-t-lg ${bgColor} transition-colors cursor-pointer border border-neutral-200 font-medium text-sm`;
    
    return (
      <TooltipProvider key={seat.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={seatClasses} 
              onClick={() => handleSeatClick(seat.id, seat.status)}
            >
              {seat.id}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isUnavailable ? (
              <p>Seat unavailable</p>
            ) : isBusiness ? (
              <p>Business Class: ₹{(flight.price * 3).toLocaleString()}</p>
            ) : (
              <p>Economy Class: ₹{flight.price.toLocaleString()}</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  const renderSeatingLayout = () => {
    const seatsByRow: Record<string, typeof seats> = {};
    
    // Group seats by row
    seats.forEach(seat => {
      const row = seat.id.match(/\d+/)?.[0] || "";
      if (!seatsByRow[row]) seatsByRow[row] = [];
      seatsByRow[row].push(seat);
    });
    
    return Object.entries(seatsByRow).map(([row, rowSeats]) => {
      // Business class has 4 seats per row (2-2 configuration)
      const rowNum = parseInt(row);
      
      if (rowNum <= 2) {
        return (
          <div key={row} className="flex items-center mb-2">
            <div className="row-number text-sm font-medium mr-2 w-6 text-center">
              {row}
            </div>
            <div className="flex gap-1">
              {rowSeats.slice(0, 2).map(renderSeat)}
            </div>
            <div className="aisle-space mx-8"></div>
            <div className="flex gap-1">
              {rowSeats.slice(2, 4).map(renderSeat)}
            </div>
          </div>
        );
      }
      
      // Economy class has 6 seats per row (3-3 configuration)
      return (
        <div key={row} className="flex items-center mb-2">
          <div className="row-number text-sm font-medium mr-2 w-6 text-center">
            {row}
          </div>
          <div className="flex gap-1">
            {rowSeats.slice(0, 3).map(renderSeat)}
          </div>
          <div className="aisle-space mx-4"></div>
          <div className="flex gap-1">
            {rowSeats.slice(3, 6).map(renderSeat)}
          </div>
        </div>
      );
    });
  };
  
  return (
    <div className="seat-selection-container p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Select Your Seats</h2>
        <div className="text-sm text-neutral-600">
          <span className="font-medium">{flight.airline} {flight.flightNumber}</span> |
          <span className="ml-2">{flight.source} to {flight.destination}</span>
        </div>
      </div>
      
      <div className="flight-info p-4 bg-gray-50 rounded-lg mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <div className="text-sm text-neutral-500">Departure</div>
            <div className="text-lg font-semibold">
              {flight.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-neutral-500">{flight.duration}</div>
            <div className="flex items-center">
              <div className="w-24 h-0.5 bg-neutral-300 relative">
                <div className="absolute -top-1.5 right-0 w-3 h-3 rounded-full bg-[#138808]"></div>
                <IoAirplane className="text-[#FF9933] text-lg absolute -top-2.5 left-1/2 transform -translate-x-1/2" />
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Arrival</div>
            <div className="text-lg font-semibold">
              {flight.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="seating-layout mb-6">
        <div className="seat-legend flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-neutral-100 border border-neutral-200 rounded mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-neutral-300 opacity-50 rounded mr-2"></div>
            <span className="text-sm">Unavailable</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-indigo-100 border border-neutral-200 rounded mr-2"></div>
            <span className="text-sm">Business Class</span>
          </div>
        </div>
        
        <div className="airplane-body bg-neutral-50 p-6 rounded-lg">
          <div className="airplane-front flex justify-center mb-4 pb-4 border-b border-dashed border-neutral-300">
            <div className="cockpit w-20 h-10 bg-neutral-200 rounded-t-full flex items-center justify-center text-sm font-medium">
              Front
            </div>
          </div>
          
          {/* Business class section */}
          <div className="business-class mb-6 pb-4 border-b border-dashed border-neutral-300">
            <div className="text-center mb-3 text-sm font-medium text-indigo-600">Business Class</div>
            <div className="seats-grid">{renderSeatingLayout().slice(0, 2)}</div>
          </div>
          
          {/* Economy class section */}
          <div className="economy-class">
            <div className="text-center mb-3 text-sm font-medium text-blue-600">Economy Class</div>
            <div className="seats-grid overflow-y-auto max-h-96">{renderSeatingLayout().slice(2)}</div>
          </div>
        </div>
      </div>
      
      <div className="booking-summary bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Booking Summary</h3>
            <div className="text-sm text-neutral-500">
              {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'} selected
            </div>
          </div>
          <div className="text-right">
            <div className="text-neutral-500 text-sm">Total Price</div>
            <div className="text-2xl font-bold text-[#138808]">
              ₹{calculateTotalPrice().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-neutral-300"
        >
          Back to Flights
        </Button>
        
        <Button 
          onClick={() => onProceed(selectedSeats)} 
          disabled={selectedSeats.length === 0}
          className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] hover:from-[#F08620] hover:to-[#FF9933]"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;