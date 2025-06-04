import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DEMO_FLIGHTS } from '@/lib/constants';
import thumbnailImg from "@/assets/images/small-size-image.jpg"
import { pushToDataLayer } from "@/utils/dataLayer";

const FlightResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { source, destination } = location.state || {};

  // Generate random flights if no matches are found
  const generateRandomFlights = (source: string, destination: string) => {
    const airlines = ["Air India", "Indigo", "Etihad Airways"];
    const flights: {
      flightNumber: string;
      departure: string;
      arrival: string;
      airline: string;
      duration: string;
      price: string;
    }[] = [];

    airlines.forEach((airline) => {
      for (let i = 0; i < 5; i++) {
        flights.push({
          flightNumber: `${airline.split(' ')[0].toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`,
          departure: source,
          arrival: destination,
          airline: airline,
          duration: `${Math.floor(2 + Math.random() * 10)}h ${Math.floor(Math.random() * 60)}m`,
          price: `₹${Math.floor(5000 + Math.random() * 20000)}`,
        });
      }
    });

    return flights;
  };

  // Filter flights based on source and destination
  const filteredFlights = DEMO_FLIGHTS.filter(
    (flight) => flight.departure === source && flight.arrival === destination
  );

  const finalFlights = [
    ...filteredFlights,
    ...generateRandomFlights(source || "Unknown", destination || "Unknown"),
  ];

  const handleSelectFlight = (flight: any) => {
    pushToDataLayer({
      event: 'button_click',
      buttonName: 'Select Flight',
      location: 'Flight results',
      timestamp: new Date().toISOString(),
    });
    const flightData = {
      ...flight,
      departureTime: new Date(flight.departureTime || Date.now()),
      arrivalTime: new Date(flight.arrivalTime || Date.now() + 2 * 60 * 60 * 1000),
    };
    navigate('/seat-selection', { state: { flight: flightData } });
  };

  return (
    <div className="flight-results">
      <h2>Flights from {source || "Unknown"} to {destination || "Unknown"}</h2>
      <div className="flight-cards">
      {finalFlights.map((flight) => (
  <div key={flight.flightNumber} className="flight-card relative">
    <h4><span>Flight Number:</span> {flight.flightNumber}</h4>
    <p><span>Airline:</span> {flight.airline}</p>
    <p><span>From: </span>{flight.departure}</p>
    <p><span>To:</span> {flight.arrival}</p>
    <p><span>Duration:</span> {flight.duration}</p>
    <p className="price"><span>Price:</span> {flight.price}</p>
    <button
      className="select-flight-button"
      onClick={() => handleSelectFlight(flight)}
    >
      Select Flight
    </button>
    <img src={thumbnailImg} className="absolute top-16 right-4 md:top-4 md:right-4 md:size-40 size-24" />
  </div>
))}
      </div>
    </div>
  );
};

export default FlightResults;