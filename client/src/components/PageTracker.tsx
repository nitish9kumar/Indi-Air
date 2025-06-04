
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDeviceInfo, pushToDataLayer } from '../utils/dataLayer';

interface PageTrackerProps {
  user: {
    userID: string;
    loginStatus: string;
    loyaltyTier: string;
    customerType: string;
  };
  device: {
    deviceType: string;
    os: string;
    browser: string;
    screenResolution: string;
  };
  flightContext: {
    tripType: string;
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    passengerCount: number;
    cabinClass: string;
  };
}

const PageTracker: React.FC<PageTrackerProps> = ({ user, device, flightContext }) => {
  const location = useLocation();


  useEffect(() => {
    const pageData = {
      event: 'pageload',
      page: {
        pageName: location.pathname.replace('/', '') || 'home',
        pageURL: window.location.href,
        referrer: document.referrer,
        language: navigator.language,
        siteSection: 'booking',
        siteSubSection: 'flight-search',
        pageType: 'landing',
        country: 'IN',
      },
      user:  {
        userID: localStorage.getItem("loggedInUser"),  // if logged in
        loginStatus: localStorage.getItem("loggedInUser")? "logged-in" : "guest",
        loyaltyTier: "Gold",  // if applicable
        customerType: "frequent-flyer"  // or "guest", "corporate"
      },
      device:  getDeviceInfo(),
      //flightContext,
      timestamp: new Date().toISOString(),
    };

    pushToDataLayer(pageData);

    // Push flight_search event if flightContext is provided
    if (flightContext) {
      const flightSearchData = {
        event: 'flight_search',
        flightContext: {
          tripType: flightContext.tripType,
          origin: flightContext.origin,
          destination: flightContext.destination,
          departureDate: flightContext.departureDate,
          returnDate: flightContext.returnDate || '',
          passengerCount: flightContext.passengerCount,
          cabinClass: flightContext.cabinClass,
        },
        timestamp: new Date().toISOString(),
      };

      pushToDataLayer(flightSearchData);
    }
  }, [location, flightContext]);



  return null;
};

export default PageTracker;
