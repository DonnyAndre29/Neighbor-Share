// Function to copy contents to clipboard
$('#copy').on('click', () => {
   navigator.clipboard.writeText($('#input').val());
});

// Generates message to share key with neighbors
function generateMessage() {
   let message = "Hi Neighbor! I just set up a new neighbor lending space at Neighbor Share.<br><br>You will be able to borrow and lend all sorts of items exclusively with our neighbors. You can access it using the passcode below:<br><br>";

}