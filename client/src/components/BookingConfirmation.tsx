import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, selectedSeats = [], totalAmount = 0, bookingId, source, destination } = location.state || {};

  if (!flight || !bookingId || !source || !destination) {
    return <p>No booking details found. Please go back and complete a booking.</p>;
  }

  const totalAmountFormatted = totalAmount > 0 ? `₹${totalAmount.toLocaleString()}` : "Not Available";

  const handleDownloadReceipt = () => {
    const receiptContent = `Booking Confirmation\n\nBooking ID: ${bookingId}\nFlight: ${flight.airline} ${flight.flightNumber}\nFrom: ${source}\nTo: ${destination}\nSeats: ${selectedSeats.join(", ")}\nTotal Amount: ${totalAmountFormatted}\n\nThank you for booking with us!`;
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Booking_Receipt_${bookingId}.txt`;
    link.click();
  };

  return (
    <div className="booking-confirmation-container p-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-neutral-800 mb-4">Booking Successful!</h2>
      <p className="text-lg text-neutral-600 mb-6">Your booking has been confirmed.</p>

      <div className="booking-details bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Flight:</strong> {flight.airline} {flight.flightNumber}</p>
        <p><strong>From:</strong> {source}</p>
        <p><strong>To:</strong> {destination}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
        <p><strong>Total Amount:</strong> {totalAmountFormatted}</p>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleDownloadReceipt} className="bg-blue-500 hover:bg-blue-600 text-white">
          Download Receipt
        </Button>
        <Button onClick={() => navigate("/")} className="bg-green-500 hover:bg-green-600 text-white">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;