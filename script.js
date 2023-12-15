
function jsonFlickrFeed(data) {
    var photoContainer = document.getElementById("photo-container");
  
    if (photoContainer) {
      data.items.forEach(function (item) {
        var img = document.createElement("img");
        img.src = item.media.m;
        photoContainer.appendChild(img);
      });
    }
  }
  
  