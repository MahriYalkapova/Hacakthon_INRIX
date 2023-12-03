// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
const googleMapsApiKey = 'AIzaSyDeSFPRdveLKclLmu6UD7sswtRfM76R6TA';

// Declare map variable globally
let map;

// Initialize the Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 47.608013, lng: -122.335167 }, // Default center (San Francisco)
        zoom: 13,
    });

    // Enable the Places library for autocomplete
    const inputOrigin = document.getElementById('origin-input');
    const autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
    autocompleteOrigin.bindTo('bounds', map);

    const inputDestination = document.getElementById('destination-input');
    const autocompleteDestination = new google.maps.places.Autocomplete(inputDestination);
    autocompleteDestination.bindTo('bounds', map);

    // Set up event listener for when a place is selected from the dropdown
    autocompleteDestination.addListener('place_changed', function () {
        const selectedPlace = autocompleteDestination.getPlace();
        if (!selectedPlace.geometry) {
            console.error("Selected place has no geometry");
            return;
        }

        // Optionally, you can use selectedPlace data as needed
        console.log(selectedPlace);

        // You can also trigger the route calculation here if desired
        // calculateRoute();
    });
}

// Function to calculate the route based on the selected travel mode
function calculateRoute() {
    // Get the origin and destination from user input
    const origin = document.getElementById('origin-input').value;
    const destination = document.getElementById('destination-input').value;

    // Create a DirectionsRequest object
    const request = {
        origin,
        destination,
        travelMode: 'TRANSIT', // Set travel mode to transit for bus routes
    };

    // Make a request to the DirectionsService
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            // Display the route on the map
            directionsRenderer.setDirections(result);
        } else {
            console.error('Error calculating the route:', status);
        }
    });
}

// Load the Google Maps API script and initialize the map
function loadMapScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Append the script to the document
    document.head.appendChild(script);
}

// Load the map script when the page is loaded
window.onload = loadMapScript;
