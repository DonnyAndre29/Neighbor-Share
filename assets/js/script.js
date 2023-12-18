// Function to copy contents to clipboard
$('#copy').on('click', () => {
   navigator.clipboard.writeText($('#input').val());
});