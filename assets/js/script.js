
function initMap() {
    // console.log("Maps JavaScript API loaded.");
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

     // Create a Places Autocomplete object for the search input field
   var input = document.getElementById('addressInput');
   var autocomplete = new google.maps.places.Autocomplete(input);

   // Set the bounds to the visible map area
   autocomplete.bindTo('bounds', map);

   // Add an event listener for when a place is selected
   autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();

      if (!place.geometry) {
         // User entered the name of a Place that was not suggested
         return;
      }

      // If the place has a geometry, center the map on it
      if (place.geometry.viewport) {
         map.fitBounds(place.geometry.viewport);
      } else {
         map.setCenter(place.geometry.location);
         map.setZoom(17);  // Zoom in to a specific level
      }
   });
}
  
//   window.initMap = initMap;