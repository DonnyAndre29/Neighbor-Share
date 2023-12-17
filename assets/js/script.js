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

// Google maps initializing map function 
function initMap() {

   var storedLocation = localStorage.getItem('userLocation');
   var userLocation = storedLocation ? JSON.parse(storedLocation) : null;


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
         // User entered the name of a Place that was not suggested
         return;
      }
      let neighborKey = generateKey();
      // Save the location information to local storage
      var locationData = {
         name: place.name,
         address: place.formatted_address,
         latitude: place.geometry.location.lat(),
         longitude: place.geometry.location.lng(),
         key: neighborKey
      };

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

//Event listener for Flickr 
document.addEventListener("DOMContentLoaded", function () {
   const apiKey = 'f855e062782300ad36a1dc15d727ecff';
   const userId = "199652929@N05"; // Your Flickr user ID
   const photoContainer = document.getElementById('photo-container');

   // Flickr API endpoint for fetching recent photos
   const flickrEndpoint = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

   // Fetch data from Flickr API
   fetch(flickrEndpoint)
      .then(response => response.json())
      .then(data => {
         // Extract photo information from the API response
         const photos = data.photos.photo;

         // Create HTML elements for each photo and append them to the container
         photos.forEach(photo => {
            const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            const imgElement = document.createElement('img');
            imgElement.src = photoUrl;
            imgElement.alt = photo.title;

            // You can customize this part to add more information or styling
            const photoDiv = document.createElement('div');
            /*photoDiv.addClass("featured-image-block column");*/
            photoDiv.appendChild(imgElement);
            console.log(photoUrl)
            photoContainer.appendChild(photoDiv);
         });
      })
      .catch(error => console.error('Error fetching data from Flickr API:', error));
});

/* Function that adds classes to pictures tagged as "tools" etc */

// shows and hides filtered items
$(".filter-simple-button").click(function () {
   var value = $(this).attr('data-filter');
   if (value === "all") {
      $('.filter-simple-item').show('1000');
   } else {
      $(".filter-simple-item").not('.' + value).hide('3000');
      $('.filter-simple-item').filter('.' + value).show('3000');
   }
});

// changes active class on filter buttons
$('.filter-simple-button').click(function () {
   $(this).siblings().removeClass('is-active');
   $(this).addClass('is-active');
});

// Simple helper function to concantenate strings
function concatString(x, y) {
   return x.concat(y);
}

// Simple helper function to get random integer
function getRandomInt(n) {
   return Math.floor(Math.random() * n);
}

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

// Writes unique ID to the #neighborkey text box
function writeKey() {
   let key = generateKey();
   document.querySelector("#neighborkey").textContent = key;
}

hideAddressConfirmation();

