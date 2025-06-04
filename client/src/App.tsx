import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import FlightResults from "./components/FlightResults";
import SeatSelection from "./components/SeatSelection";
import PaymentPageWrapper from "./pages/PaymentPageWrapper";
import BookingConfirmation from "./components/BookingConfirmation";
import Layout from "./components/Layout";
import PageTracker from "./components/PageTracker";

function Router() {
  return (
    <Switch>
     
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/flight-results">
      <Layout pageTitle="Flight Results Page">
        <FlightResults />
      </Layout>  
      </Route> 
      <Route path="/seat-selection">
        <Layout pageTitle="Seat Selection Page">
          <SeatSelection/>
        </Layout>
      </Route>
      <Route path="/payment" component={PaymentPageWrapper}/>
      <Route path="/booking-confirmation" component={BookingConfirmation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageTracker />
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
