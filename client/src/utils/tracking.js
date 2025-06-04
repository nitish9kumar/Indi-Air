// Initialize an empty array to store user events
let userEvents = [];

// Function to capture page load event
function capturePageLoad() {
    let pageLoadEvent = {
        eventType: "pageLoad",
        timestamp: new Date().toISOString(),
        url: window.location.href,
        pageName: localStorage.getItem('pageName')
    };
    userEvents.push(pageLoadEvent);
}

// Function to capture click events
function captureClickEvent(event) {
    let clickEvent = {
        eventType: "click",
        timestamp: new Date().toISOString(),
        element: event.target.tagName,
        id: event.target.id,
        button: event.target.textContent
    };
    userEvents.push(clickEvent);
}

// Function to send data to the server
function sendDataToServer(data) {
    fetch('http://localhost:5000', { // Ensure this matches your server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));
}

// Function to capture user journey
function captureUserJourney() {
    let userJourney = {
        eventType: "userJourney",
        timestamp: new Date().toISOString(),
        journey: userEvents
    };
    //console.log(JSON.stringify(userJourney, null, 2));
    sendDataToServer(userJourney);
}

// Add event listeners
//window.addEventListener('load', capturePageLoad);
//document.addEventListener('click', captureClickEvent);

// Example of capturing user journey after some time (e.g., 10 seconds)
setTimeout(captureUserJourney, 3000);
