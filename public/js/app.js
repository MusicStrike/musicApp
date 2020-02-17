$('body').append('<div id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function(){
  setTimeout(removeLoader, 1000); //wait for page load PLUS one seconds.
});
function removeLoader(){
    $( "#loadingDiv" ).fadeOut(500, function() {
      // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
  });  
}


