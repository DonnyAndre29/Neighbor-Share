const apiKey = 'f855e062782300ad36a1dc15d727ecff';
const photoContainer = document.getElementById('photo-container');

// Run each photo id through Flickr method flickr.tags.getListPhoto to get the tag list
// Apply tags as classes in the containing div for the photo filter
function getTags(x) {
    const photo_id = x;
    var photoDiv = document.getElementById(x);
    const flickrTagslist = `https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=${apiKey}&photo_id=${photo_id}&format=json&nojsoncallback=1`;
    fetch(flickrTagslist)
        .then(response => response.json())
        .then(data => {
            const tags = data.photo.tags.tag;
            tags.forEach(tag => {
                const userTag = tag._content;
                console.log(userTag);
                photoDiv.classList.add(userTag);
            })
        })
}

// The "Go" button in step one of the user flow i.e. "Enter your key:"
let searchButton = document.getElementById('searchKey');

searchButton.addEventListener("click", function () {
    let input = document.getElementById("yourKey");
    let filterEl = document.getElementById("listingsFilter");
    filterEl.classList.remove("hidden");
    console.log("input is " + input.value);
    const tags = 'neighbor-share, ' + input.value;
    console.log("tags are " + tags);
    // Flickr API endpoint for fetching photos with user-specific tags
    const flickrEndpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&tag_mode=all&format=json&nojsoncallback=1`;

    // Fetch data from Flickr API - starter code from ChatGPT
    fetch(flickrEndpoint)
        .then(response => response.json())
        .then(data => {
            const photos = data.photos.photo;
            // Extracting information about each photo from API pull
            photos.forEach(photo => {
                const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                const imgElement = document.createElement('img');
                imgElement.src = photoUrl;
                imgElement.alt = photo.title;

                const photoDiv = document.createElement('div');
                photoDiv.appendChild(imgElement);
                photoDiv.classList.add('column', 'column-block', 'filter-simple-item');
                // Applying photo.id as an div id to match the photo container to the photo tags
                photoDiv.id = photo.id;
                photoContainer.appendChild(photoDiv);
                // Calling on function to add tags to photo container
                getTags(photo.id);
            });
        })
        .catch(error => console.error('Error fetching data from Flickr API:', error));
});

/* Function that adds classes to pictures tagged as "tools" etc from Foundation Building Blocks */

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