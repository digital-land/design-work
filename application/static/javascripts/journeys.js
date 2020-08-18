(function($, window) {

  $(function() {
    // Full height images toggle
    $(".js-full-height").click(function( event ) {
      $('body').toggleClass('full-height');
    });

    // Close all scenarios by default
    // $('.image-set-images').hide();
    // $('.toolbar').hide();


    // toggle a scenario
    $(".image-set-title").click(function( event ) {
      $(this).toggleClass('open')
      $(this).next().toggle();

      // Show toolbar if at least one set is open
      if ($('.image-set-title.open').length) {
        $('.toolbar').show();
      } else {
        $('.toolbar').hide();
      }

      // If all are open, make sure toggle is set to 'Close all'
      if ($('.image-set-title').length == $('.image-set-title.open').length){
        console.log('all open!');
        $(".js-close-all").show();
        $(".js-open-all").hide();
      }

      // If all closed, make sure toggle is set to 'Open all'
      if (!$('.image-set-title.open').length) {
        console.log('all closed!');
        $(".js-close-all").hide();
        $(".js-open-all").show();
      }

    });

    // If there's only one image set, don't bother with all the toggle stuff
    if($('.image-set-title').length == 1) {
      $('.image-set-title')[0].click();
      $('.all-toggle').hide();
    }

    // Open all scenarios
    $(".js-open-all").click(function( event ) {

      $('.image-set-images').show();
      $('.image-set-title').addClass('open');
      $(".js-close-all").show();
      $('.toolbar').show();
      $(this).hide();
    });

    // Close all scenarios
    $(".js-close-all").click(function( event ) {

      $('.image-set-images').hide();
      $('.image-set-title').removeClass('open');
      $(".js-open-all").show();
      $('.toolbar').hide();
      $(this).hide();
    });


    function updateHash(txt) {
      window.location.hash = txt;
    }

    // Opens full-screen view of current image
    $(".js-open-screen").click(function( event ) {
      var img_wrapper = this;
      //var screen = $(this).parents('.image')
      var img_name = img_wrapper.dataset.imageName;
      //openScreen(screen);
      updateHash(img_name);
    });

    // Go to next image when in full-screen view
    $(".js-next-screen").click(function( event ) {
      var screen = $(this).parents('.image');
      updateHash(screen.next().find(".js-open-screen").data("imageName"))
    });

    // Go to previous image when in full-screen view
    $(".js-prev-screen").click(function( event ) {
      var screen = $(this).parents('.image');
      updateHash(screen.prev().find(".js-open-screen").data("imageName"))
    });

    // Close full-screen view
    $(".js-close-screen").click(function( event ) {
      var screen = $(this).parents('.image');
      closeScreen(screen);
      // removes the hash
      history.replaceState(null, null, ' ');
    });




    // Handle keyboard
    $(document).keydown(function( event ) {
      // Find the currently zoomed image
      var screen = $('.zoomed-in');
      switch (event.which) {
        case 39: openScreen(screen.next()); break; // Right
        case 37: openScreen(screen.prev()); break; // Left
        case 27: closeScreen(screen); break;
      }
    });

    // Slider
    $("#slider").on("input change", function() {
      updateSlider(this.value);
    });

    // Opens an image in full-screen view
    function openScreen(screen){

      // Close any currently zoomed in images
      $('.zoomed-in').removeClass('zoomed-in');

      // Scroll all images back to top
      $('.image-wrapper').scrollTop(0);

      if(screen.length){
        $('body').addClass('js-zoomed');
        screen.addClass('zoomed-in');
        // Stop rest of page from scrolling when scrolling the popup
        if ($(document).height() > $(window).height()) {
          var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
          $('html').addClass('noscroll').css('top',-scrollTop);
        }
      } else {
        closeScreen(screen)
      }

    };


    // Closes an image in full-screen view
    function closeScreen(screen){

      // Scroll all images back to top
      $('.image-wrapper').scrollTop(0);

      screen.removeClass('zoomed-in');
      $('body').removeClass('js-zoomed');

      // Re-enable scrolling of rest of page
      var scrollTop = parseInt($('html').css('top'));
      $('html').removeClass('noscroll');
      $('html,body').scrollTop(-scrollTop);

    };



    // Zoom slider
    function updateSlider(slideAmount) {

      $('.image-wrapper').css('font-size', slideAmount+"%");

      // Allow v-scroll if zoom is over 100%
      if (slideAmount > 100) {
        $('.image-wrapper').addClass('scrollable');
      } else if (slideAmount <= 100) {
        $('.image-wrapper').removeClass('scrollable');
      }

      // Hide captions if zoom is less than 50%
      if (slideAmount > 50) {
        $('.image-title').removeClass('hidden');
      } else if (slideAmount <= 50) {
        $('.image-title').addClass('hidden');
      }

      // Show notes if zoom is over 300%
      if (slideAmount > 300) {
        $('.note').addClass('visible');
      } else if (slideAmount <= 300) {
        $('.note').removeClass('visible');
      }
    }


    function hashHandler(e) {
      var hash = window.location.hash.split("#")[1]
      var image = document.querySelector(`[data-image-name="${hash}"]`)
      //var image = document.querySelector(`[data-image-name="specification-entry"]`)
      var screen = $(image).parents('.image')
      openScreen(screen)
    }
  
    window.addEventListener('hashchange', hashHandler, false);


    // there is an issue if opening a screenshot straight away
    // => the app hasn't had change to close (and set up) all the journey sets
    // => need to reorganise code so that it
    // => looks for presence of hash
    // => if hash, set up journey sets, leaving one "open" and closing the others, then open the image fullscreen
    // => if no hash, set up all journey sets, all should be closed

    // check if hash is set to something
    var initial_hash = window.location.hash
    if( initial_hash.length ) {
      initial_hash = initial_hash.split("#")[1]
      if( initial_hash.length > 0 ) {
        var image = document.querySelector(`[data-image-name="${initial_hash}"]`)
        var screen = $(image).parents('.image')
        openScreen(screen)
      }
    } else {
      $('.image-set-images').hide();
      $('.toolbar').hide();
    }

  });

}).call(this, jQuery, window);
