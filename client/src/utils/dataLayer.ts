declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const pushToDataLayer = (eventData: Record<string, any>): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
  }
};


export const getDeviceInfo = () => ({
  deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
  os: navigator.platform,
  browser: navigator.userAgent,
  screenResolution: `${window.screen.width}x${window.screen.height}`,
});

/** Refrence code to write on click and form submit */
const handleFormSubmit = () => {
  pushToDataLayer({
    event: 'new_subscriber',
    formLocation: 'footer',
    timestamp: new Date().toISOString(),
  });
};

const handleClick = () => {
  pushToDataLayer({
    event: 'button_click',
    buttonName: 'Book Now',
    location: 'homepage-banner',
    timestamp: new Date().toISOString(),
  });
};


  
