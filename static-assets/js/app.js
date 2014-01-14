(function($) {
  // Activate current tab nav in sub header.
  if (typeof window.app.activeButton !== 'undefined') {
    $('.sub-header li').removeClass('active');
    $('.sub-header li.' + window.app.activeButton).addClass('active');
  }
 
  // Activate modal
  $('.modal').modal();
  $('.free-trial-modal').modal('show');
 
  // Activate info tooltip
  $('.info').mouseenter(function() {
    $(this).find('.tooltip').show();
  }).mouseleave(function(){
   $(this).find('.tooltip').hide();
  })
 
  // Functionality for tabs.
  $('.tabs .tab_nav a').on('click', function (e) {
    e.preventDefault();
 
    var $container = $(this).closest('.tabs');
    var $tabs = $container.children('div');
 
    // Hide the old tab and show the new one.
    $tabs.hide();
    $(this.hash).show();
 
    // Mark the current tab link as active.
    $container.find('.tab_nav a').removeClass('selected');
    $(this).addClass('selected');
  })
 
  // Select the first tab by default.
  $('.tabs .tab_nav').each(function() {
    $(this).find('a:first').addClass('selected');
  });
 
  // Functionality for apps manage nav.
  $('.manage-sandbox .key, .manage-production .key').click(function() {
    var $manage = $(this).closest('.manage');
 
    $manage.find('.key').removeClass('selected');
    $(this).addClass('selected');
    $manage.find('.sandbox, .production').toggle();
    $manage.find('.sandbox').addClass('selected');
  })
 
  // Functionality delete apps.
  $('.app .delete').click(function() {
    var $lastApp = $(this).closest('.app');
 
    $('#delete-app').click(function() {
      $lastApp.fadeOut();
    });
  });
 
  // Header dropdown nav.
  $('.dropdown').mouseenter(function() {
    $('.dropdown-menu').hide();
    $(this).find('.dropdown-menu').show();
    // Hides searchbox module when header nav is show.
    $('#suggested-result').hide();
    $('#quick-search').addClass('hide-border');
  }).mouseleave(function(){
    $(this).find('.dropdown-menu').hide();
  });

  // Header slide down nav for responsive only.
  $('.dropdown').click(function() {
    $(this).find('.slide-menu').slideToggle();
  });
 
  // Hides header nav and searchbox module when click outside.
  $('body').click(function() {
    $(this).find('.dropdown-menu').removeClass('open');
    $(this).find('#quick-search').addClass('hide-border');
    $(this).find('#suggested-result').hide();
  });
 
  // Set the attribute src for the embed video.
  var video = $(".player").attr("src");
 
  // Show the video player and hides the rest of te elements.
  $('.play-video').click(function() {
    $(this).parent().hide();
    $(this).parent().siblings().hide();
    $('.container').find('#show-video').show();
    // Add the attribute autoplay for the video to play when show.
    $(".player").attr("src",video+"?autoplay=1");
  });
 
  // Hide and the video player and hides the rest of te elements.
  $('.close-video').click(function() {
    $(this).parent().hide();
    $(this).parent().siblings().show();
    // Remove the attribute autoplay for the video to stop.
    $(".player").attr("src",video+"?autoplay=0");
  });
 
  // Activates Jquery UI datepicker functionality
  $( "#from" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    changeYear: true,
    onClose: function( selectedDate ) {
      $( "#to" ).datepicker( "option", "minDate", selectedDate );
    }
  });
  $( "#to" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    changeYear: true,
    onClose: function( selectedDate ) {
      $( "#from" ).datepicker( "option", "maxDate", selectedDate );
    }
  });
 
  // Remove checkbox row in Premium Access Edit App page.
  $('#edit-app-production .row').hide().filter(function() {
    return $(this).find('input:checked').length > 0;
  }).show();
 
  // Remove margin of last api-block, forums-block and rounded-box for IE compatibility.
  $('.choose-your-api nav a:last-child, .rounded-box:last-child, .forums-block:last-child').addClass('omega');
 
  // Loads the page with the header search already on focus.
  $('#search').focus();

})(jQuery);
