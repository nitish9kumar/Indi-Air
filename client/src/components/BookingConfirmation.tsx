import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MdFlight, MdAirlineSeatReclineNormal, MdLocationOn, MdPerson, MdReceipt, MdEmail, MdOutlineDownload } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import type { PaymentFormValues } from "./PaymentPage";
import { useToast } from "@/hooks/use-toast";

interface BookingConfirmationProps {
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
  selectedSeats: string[];
  totalAmount: number;
  paymentDetails: PaymentFormValues;
  onBookAnother: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  flight,
  selectedSeats,
  totalAmount,
  paymentDetails,
  onBookAnother
}) => {
  const { toast } = useToast();
  const [bookingNumber] = useState(`IN${Math.floor(100000 + Math.random() * 900000)}`);
  const [pnrNumber] = useState(`PNR${Math.floor(10000 + Math.random() * 90000)}`);
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    toast({
      title: "Sharing Feature Coming Soon",
      description: "This feature will be available in the next update.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Generating PDF",
      description: "Your ticket PDF is being generated.",
    });
    
    // In a real application, this would generate and download a PDF
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Your e-ticket has been downloaded.",
      });
    }, 1500);
  };

  const handleEmailTicket = () => {
    toast({
      title: "Email Sent",
      description: "Your e-ticket has been sent to your email address.",
    });
  };

  return (
    <div className="booking-confirmation-container p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-neutral-800 mb-2">Booking Confirmed!</h2>
        <p className="text-neutral-600">
          Your flight ticket has been successfully booked. Have a great trip!
        </p>
      </div>

      <div className="booking-details bg-gray-50 p-6 rounded-lg mb-6" ref={ticketRef}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-sm text-neutral-500">Booking Reference</div>
            <div className="text-xl font-bold">{bookingNumber}</div>
            <div className="text-sm text-neutral-500 mt-1">PNR: {pnrNumber}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xl font-bold text-[#FF9933]">{flight.airline}</div>
            <div className="text-sm font-medium">{flight.flightNumber}</div>
          </div>
        </div>

        <div className="border-t border-dashed border-neutral-300 pt-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <MdLocationOn className="text-xl text-[#FF9933] mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">From</div>
                <div className="font-medium">{flight.source}</div>
              </div>
            </div>
            <div className="flex items-start">
              <MdLocationOn className="text-xl text-[#138808] mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">To</div>
                <div className="font-medium">{flight.destination}</div>
              </div>
            </div>
            <div className="flex items-start">
              <BsCalendarDate className="text-xl text-neutral-600 mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">Date</div>
                <div className="font-medium">
                  {format(flight.departureTime, "EEEE, MMMM d, yyyy")}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <IoTimeOutline className="text-xl text-neutral-600 mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">Time</div>
                <div className="font-medium">
                  {format(flight.departureTime, "h:mm a")} - {format(flight.arrivalTime, "h:mm a")}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <MdFlight className="text-xl text-neutral-600 mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">Flight Duration</div>
                <div className="font-medium">{flight.duration}</div>
              </div>
            </div>
            <div className="flex items-start">
              <MdAirlineSeatReclineNormal className="text-xl text-neutral-600 mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">Seat(s)</div>
                <div className="font-medium">{selectedSeats.join(", ")}</div>
              </div>
            </div>
            <div className="flex items-start">
              <MdPerson className="text-xl text-neutral-600 mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">Passenger</div>
                <div className="font-medium">{paymentDetails.cardholderName}</div>
              </div>
            </div>
            <div className="flex items-start">
              <MdReceipt className="text-xl text-neutral-600 mt-1 mr-3" />
              <div>
                <div className="text-sm text-neutral-500">Total Paid</div>
                <div className="font-bold text-[#138808]">₹{totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg mb-4">
          <div className="flex">
            <div className="mr-3 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-blue-800">Important Information</div>
              <div className="text-sm text-blue-600">
                Please arrive at the airport at least 2 hours before the scheduled departure time.
                Don't forget to carry your government-issued ID for verification.
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-neutral-600 text-sm">
          Thank you for choosing {flight.airline}. We wish you a pleasant journey!
        </div>
      </div>

      <div className="action-buttons flex flex-wrap gap-3 justify-center mb-6">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleEmailTicket}
        >
          <MdEmail className="mr-2" /> Email Ticket
        </Button>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleDownload}
        >
          <MdOutlineDownload className="mr-2" /> Download Ticket
        </Button>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleShare}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </Button>
      </div>

      <div className="text-center">
        <Button
          onClick={onBookAnother}
          className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] hover:from-[#F08620] hover:to-[#FF9933]"
        >
          Book Another Flight
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;