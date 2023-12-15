
function initMap() {
   
   var storedLocation = localStorage.getItem('userLocation');
   var userLocation = storedLocation ? JSON.parse(storedLocation) : null;

   var map = new google.maps.Map(document.getElementById('map'), {
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

//   window.initMap = initMap;
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