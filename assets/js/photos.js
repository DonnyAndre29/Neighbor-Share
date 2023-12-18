const apiKey = 'f855e062782300ad36a1dc15d727ecff';
const photoContainer = document.getElementById('photo-container');

// Run each photo id through Flickr method flickr.tags.getListPhoto to get the tag list
function getTags(x) {

    const photo_id = x;
    const imageContainer = document.getElementById(photo_id);
    const flickrTagslist = `https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=${apiKey}&photo_id=${photo_id}&format=json&nojsoncallback=1`;
    let tagList = "";
    fetch(flickrTagslist)
        .then(response => response.json())
        .then(data => {
            const tags = data.photo.tags.tag;
            // tagList = "";
            tags.forEach(tag => {
                const userTag = tag._content;
                imageContainer.classList.add(userTag);
            })
        })
}

//Event listener for Flickr API pull
document.addEventListener("DOMContentLoaded", function () {

    const tags = 'neighbor-share, Dublin, 94568, happy-82ay9J5';

    // Flickr API endpoint for fetching photos with user-specific tags
    const flickrEndpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&tag_mode=all&format=json&nojsoncallback=1`;

    // Fetch data from Flickr API
    fetch(flickrEndpoint)
        .then(response => response.json())
        .then(data => {
            // Extract photo information from the API response
            const photos = data.photos.photo;

            // Create separate function to do that
            // Create HTML elements for each photo and append them to the container
            photos.forEach(photo => {
                const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                const imgElement = document.createElement('img');
                imgElement.src = photoUrl;
                imgElement.alt = photo.title;

                // You can customize this part to add more information or styling

                const photoDiv = document.createElement('div');
                photoDiv.appendChild(imgElement);
                photoDiv.setAttribute('id', photo.id);
                console.log(photo.id);
                photoDiv.classList.add('column', 'column-block', 'filter-simple-item');
                getTags(photo.id);
                /*
                                if (tagsArr.includes('outdoor')) { photoDiv.classList.add('outdoor') };
                                if (tagsArr.includes('tools')) { photoDiv.classList.add('tools') };
                                if (tagsArr.includes('camping')) {
                                    photoDiv.classList.add('camping');
                                }
                                else if (tagsArr.includes('events')) {
                                    photoDiv.classList.add('events');
                                }*/
                console.info(imgElement);
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