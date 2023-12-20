//Hide message confirmation upon loading page
function hideAddressConfirmation() {
    var confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = "none";
}

// Display confirmation message after user presses 'search'
function displayAddressConfirmation() {
    var confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = "block";
}

// Simple helper function to concantenate strings
function concatString(x, y) {
    return x.concat(y);
}

// Simple helper function to get random integer
function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

// Function to generate unique key to associate with user address
function generateKey() {
    let arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let tempKey = "";
    // Setting the unique ID at 8 character length
    let n = 8;
    for (let i = 0; i < n; i++) {
        tempKey = tempKey.concat(arr[getRandomInt(arr.length)]);
        console.log("Generating: " + tempKey);
    }
    console.log("Generated neighbor key is: ", tempKey);
    return tempKey;
}

// Google maps initializing map function 
function initMap() {

    /* var storedLocation = localStorage.getItem('userLocation');
    var userLocation = storedLocation ? JSON.parse(storedLocation) : null;*/
    // Reformatted by Sarun Thunyapauksanon
    const userLocation = JSON.parse(localStorage.getItem('userLocation')) || {};
    // end reformatting

    var mapContainer = document.getElementById('map');
    var map = new google.maps.Map(mapContainer, {
        zoom: 12


    });

    // Check if there's a stored location
    if (userLocation) {
        var initialLocation = {
            lat: userLocation.latitude,
            lng: userLocation.longitude
        };

        // Set the map center to the stored location
        map.setCenter(initialLocation);

        // Optionally, you can add a marker for the stored location
        var marker = new google.maps.Marker({
            position: initialLocation,
            map: map,
            title: userLocation.name
        });

        // You may also adjust the zoom level as needed
        map.setZoom(17);
    }

    // Create a Places Autocomplete object for the search input field
    var input = document.getElementById('addressInput');
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Set the bounds to the visible map area
    autocomplete.bindTo('bounds', map);

    // Add an event listener for when a place is selected
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            // User entered the name of a place that was not suggested
            return;
        }
        // Call on function to generate unique ID to associate with locationData
        let neighborKey = generateKey();

        // Write key to page
        let keyEl = document.getElementById("yourkey");
        keyEl.classList.remove("hidden");
        let keyText = document.getElementById("neighborkey");
        keyText.textContent = neighborKey;

        // Save the location information to local storage
        const locationData = {
            name: place.name,
            address: place.formatted_address,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            key: neighborKey
        };

        // Generate custom message to share key with neighbors
        const message = `Hi Neighbor! I just set up a new neighbor lending space at Neighbor Share at ${locationData.name}. 
  
You will be able to borrow and lend all sorts of items exclusively with our neighbors. Go to https://donnyandre29.github.io/Neighbor-Share/ and enter the key ${locationData.key} to check out my listings and add your own on Flickr.
        
Please feel free to share with anybody in the neighborhood!`;

        let messageEl = document.getElementById("input");
        messageEl.value = message;

        // Convert the location data to a JSON string and store it in local storage
        localStorage.setItem('userLocation', JSON.stringify(locationData));

        // If the place has a geometry, center the map on it
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Zoom in to a specific level
        }
    });
}

hideAddressConfirmation();