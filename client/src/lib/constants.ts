// Indian departure cities
export const DEPARTURE_CITIES = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kochi",
  "Goa",
];

// International arrival cities
export const ARRIVAL_CITIES = [
  "London",
  "Dubai",
  "Singapore",
  "New York",
  "Paris",
  "Tokyo",
  "Sydney",
  "Hong Kong",
  "Toronto",
  "Bangkok",
  "Kuala Lumpur",
  "San Francisco",
];

// India-themed colors
export const INDIA_COLORS = {
  saffron: "#FF9933",
  white: "#FFFFFF",
  green: "#138808",
  blue: "#4361EE",
  navy: "#0A1128",
};

// Demo flights (permutations of departure and arrival cities)
export const DEMO_FLIGHTS = DEPARTURE_CITIES.flatMap((departure) => 
  ARRIVAL_CITIES.map((arrival) => ({
    departure,
    arrival,
    airline:0,
    flightNumber: `AI${Math.floor(1000 + Math.random() * 9000)}`, // Random flight number
    duration: `${Math.floor(2 + Math.random() * 10)}h ${Math.floor(Math.random() * 60)}m`, // Random duration
    price: `₹${Math.floor(5000 + Math.random() * 20000)}`, // Random price
  }))
);
