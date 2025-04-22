import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FaRegCreditCard } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentPageProps {
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
  onBack: () => void;
  onComplete: (paymentDetails: PaymentFormValues) => void;
}

// Define validation schema - simplified for demo purposes
const paymentFormSchema = z.object({
  paymentMethod: z.enum(["creditCard", "debitCard", "netBanking", "wallet"]).default("creditCard"),
  cardholderName: z.string().min(1, "Name is required").default(""),
  cardNumber: z.string().min(1, "Card number is required").default(""),
  expiryMonth: z.string().default(""),
  expiryYear: z.string().default(""),
  cvv: z.string().default(""),
  saveCard: z.boolean().optional(),
  billingAddress: z.object({
    street: z.string().default(""),
    city: z.string().default(""),
    state: z.string().default(""),
    zipCode: z.string().default(""),
    country: z.string().default("India"),
  }).default({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  }),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentPage: React.FC<PaymentPageProps> = ({ 
  flight, 
  selectedSeats,
  totalAmount,
  onBack,
  onComplete
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "creditCard",
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      saveCard: false,
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
      },
    },
  });
  
  const handleSubmit = (data: PaymentFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Always succeed (this is a dummy payment processor)
      onComplete(data);
      
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed!",
      });
    }, 2000);
  };
  
  // For demo purposes - allow completing payment regardless of form state
  const handleQuickPayment = () => {
    const demoData: PaymentFormValues = {
      paymentMethod: "creditCard",
      cardholderName: "John Doe",
      cardNumber: "4111111111111111",
      expiryMonth: "12",
      expiryYear: "2025",
      cvv: "123",
      billingAddress: {
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        country: "India",
      }
    };
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete(demoData);
      
      toast({
        title: "Demo Payment Successful",
        description: "Your booking has been confirmed!",
      });
    }, 1000);
  };
  
  // Generate months
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      value: month.toString().padStart(2, '0'),
      label: month.toString().padStart(2, '0'),
    };
  });
  
  // Generate years (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  });

  return (
    <div className="payment-container p-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Payment Details</h2>
        <div className="text-sm text-neutral-600">
          <span className="font-medium">{flight.airline} {flight.flightNumber}</span> |
          <span className="ml-2">{flight.source} to {flight.destination}</span>
        </div>
      </div>
      
      <div className="booking-summary bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <div className="text-sm text-neutral-500">Seats</div>
            <div className="font-medium">{selectedSeats.join(", ")}</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Flight</div>
            <div className="font-medium">{flight.airline} {flight.flightNumber}</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Date</div>
            <div className="font-medium">{flight.departureTime.toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Time</div>
            <div className="font-medium">
              {flight.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
              {flight.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <div className="text-neutral-500 text-sm">Total Amount</div>
          <div className="text-2xl font-bold text-[#138808]">₹{totalAmount.toLocaleString()}</div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="payment-form-container max-h-[60vh] overflow-y-auto pr-2">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex flex-wrap gap-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="creditCard" id="creditCard" />
                        <Label htmlFor="creditCard">Credit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="debitCard" id="debitCard" />
                        <Label htmlFor="debitCard">Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="netBanking" id="netBanking" />
                        <Label htmlFor="netBanking">Net Banking</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet">Wallet</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="card-details border border-neutral-200 rounded-lg p-4 mt-6">
              <div className="flex items-center mb-4">
                <FaRegCreditCard className="text-neutral-500 mr-2" />
                <h3 className="text-lg font-medium">Card Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" maxLength={16} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="col-span-1 grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="expiryMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Month</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem key={month.value} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="expiryYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="YYYY" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        CVV <MdSecurity className="ml-1 text-neutral-500" />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123" maxLength={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="billing-address border border-neutral-200 rounded-lg p-4 mt-6">
              <h3 className="text-lg font-medium mb-4">Billing Address</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="billingAddress.street"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="billingAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="billingAddress.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="billingAddress.zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" maxLength={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="billingAddress.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          
          {/* Fixed position action buttons */}
          <div className="sticky bottom-0 pt-4 pb-4 bg-white flex flex-wrap gap-2 justify-between">
            <Button 
              type="button"
              variant="outline" 
              onClick={onBack}
              className="border-neutral-300"
              disabled={isProcessing}
            >
              Back
            </Button>
            
            <div className="flex gap-2">
              <Button 
                type="button" 
                onClick={handleQuickPayment}
                disabled={isProcessing}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Quick Demo Pay
              </Button>
              
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] hover:from-[#F08620] hover:to-[#FF9933]"
                size="lg"
              >
                {isProcessing ? "Processing..." : "Complete Payment"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentPage;