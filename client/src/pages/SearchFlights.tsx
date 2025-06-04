import React, { useState,useEffect } from "react";
import axios from "axios";
import { DEMO_FLIGHTS } from '../lib/constants';
import { useNavigate } from 'react-router-dom';

const SearchFlights: React.FC = () => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    departureDate: "",
  });
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('pageName', 'Search Flight Page');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("/api/booking", formData);
      setResults(response.data.data);
      navigate('/flight-results', { state: { source: formData.source, destination: formData.destination } });
    } catch (err: any) {
      // If API fails, fallback to DEMO_FLIGHTS
      const filteredFlights = DEMO_FLIGHTS.filter(
        (flight) =>
          flight.departure === formData.source &&
          flight.arrival === formData.destination
      );
      if (filteredFlights.length > 0) {
        setResults(filteredFlights);
        // Navigate to /flight-results with dummy data when API fails
        navigate('/flight-results', { state: { source: formData.source, destination: formData.destination, flights: filteredFlights } });
      } else {
        setError(err.response?.data?.message || "No flights available for the selected route.");
      }
    }
  };

  return (
    <div className="search-flights">
      <h1>Search Flights</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Source:</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Departure Date:</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="results">
        {results.map((flight, index) => (
          <div key={index} className="flight-result">
            <p>Airline: {flight.airline}</p>
            <p>Source: {flight.source}</p>
            <p>Destination: {flight.destination}</p>
            <p>Departure Date: {flight.departureDate}</p>
            <p>Price: ${flight.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFlights;