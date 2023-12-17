//Hide message confirmation upon loading page
function hideAddressConfirmation(){
   var confirmationMessage = document.getElementById('confirmation-message');
   confirmationMessage.style.display ="none";
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

      // Save the location information to local storage
      var locationData = {
         name: place.name,
         address: place.formatted_address,
         latitude: place.geometry.location.lat(),
         longitude: place.geometry.location.lng()
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

//Event lisener for google maps 
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
            // photoDiv.appendChild(imgElement);
            console.log(photoUrl)
            document.getElementById('Pictures').appendChild(imgElement) 
            /*console.log(photoDiv);
            const pClass = document.createElement('p');
            pClass.addClass("text-center featured-image-block-title");
            pClass.appendChild(photo.title);
            photoDiv.appendChild(pClass);
            console.log(photoDiv);*/

            photoContainer.appendChild(photoDiv);
         });
      })
      .catch(error => console.error('Error fetching data from Flickr API:', error));
});

function copyToClipboard() {
   // Get the text field
   var copyText = document.getElementById("myInput");

   // Select the text field
   copyText.select();
   copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
   navigator.clipboard.writeText(copyText.value);

   // Alert the copied text
   alert("Copied the text: " + copyText.value);
}

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
   const allLowercase = "abcdefghijklmnopqrstuvwxyz";
   const allUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const allNumber = "0123456789";
   let arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
   let tempKey = "";
   // How long should the unique ID be?
   let n = 8;
   for (let i = 0; i < n; i++) {
      tempKey = tempKey.concat(arr[getRandomInt(arr.length)]);
      console.log("Generating: " + tempKey);
   }
   console.log("Generated neighbor key is: ", tempKey);
   // let temp = shuffle(tempKey);
   // console.log("Shuffled key is " + temp);
   // console.log("Key length is " + temp.length);
   return tempKey;
}

// Writes unique ID to the #neighborkey text box
function writeKey() {
   let key = generateKey();
   document.querySelector("#neighborkey").textContent = key;
}
   
  

// Fetch user information from GitHub API for about.html
// Replace 'YOUR_USERNAME' with the GitHub username you want to fetch the avatar for
const username = 'kerilsen';

// GitHub API endpoint to get user information
const apiUrl = `https://api.github.com/users/${username}`;
fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
    }
    return response.json();
})
.then(data => {
    // Get the avatar URL from the response data
    const avatarUrl = data.avatar_url;

    // Display the avatar in the img element
    document.getElementById('avatar').src = avatarUrl;
})
.catch(error => {
    console.error('Error fetching GitHub user data:', error);
});

hideAddressConfirmation();

