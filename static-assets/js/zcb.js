$(function() {

 
    $(".tabs").tabs();
    $('.tab_nav li a').click(function() {
        $(this).parent().parent().find('a.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    $('#toc a, .back-to-top a').click(function() {
        api_doc_header = $('#api-docs-header')? $('#api-docs-header').height():0;
        short =  $('.sub-header').height() + $('#api-docs-header').height();
        tall = $('#header-common').height() + $('.sub-header').height() + api_doc_header;
        height = $('.fixed-scroll').length === 1?tall:short;
      $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - height // minus the header height.
      }, 500);
      return false;
    });

    //Highlight menu active item functionality
    if ($('#toc').length > 0 && $('#technical-library').length < 1) {
        var menuItems = $("#toc a"),
                scrollItems = menuItems.map(function() {
                    var item = $(this.hash);
                    if (item.length)
                        return item;
                }),
                lastActiveId;
        $(window).scroll(function() {
            var $this = $(this);

            var scrollY = $this.scrollTop() + 190;
            var hiddenItems = scrollItems.map(function() {
                var $this = $(this);
                if ($this.offset().top < scrollY) {
                    return $this;
                }
            });

            var currentItem = (hiddenItems.length) ?
                    (hiddenItems[hiddenItems.length - 1]) :
                    scrollItems[0];
            var currentId = currentItem.attr("id");

            if (lastActiveId !== currentId) {
                lastActiveId = currentId;
                menuItems.parent().removeClass("highlighted")
                        .end()
                        .filter("[href=#" + currentId + "]")
                        .parent().addClass("highlighted");
            }
        });
    }
    
    var $el = $('#toc');
    var $window = $(window);
    var ftd = document.getElementById('footer-common');
    var toc = document.getElementById('toc');
    var subNavHeight = $('#toc .level-2')? $('#toc .level-2').height(): 0;
    //todo - move error related scripts to another file
    var nav = null;
    if (document.getElementById('toc')) {
        var nav = toc.getElementsByTagName('ul')[0];
    }

    var navBottom = 0;
    var headerConstant
            = document.getElementById('api-docs-header') === null ? 100 : 170;
    
    var ftdRect = ftd.getBoundingClientRect();
        if (navBottom > ftdRect.top) {
            var dy = navBottom - ftdRect.top + subNavHeight +10;
            $el.css({
                top: (headerConstant - dy) + "px",
                bottom: "auto"
            });

        }

    $window.bind("scroll resize", function() {
        var ftdRect = ftd.getBoundingClientRect();
        if (navBottom > ftdRect.top) {
            var dy = navBottom - ftdRect.top + subNavHeight +10;
            $el.css({
                top: (headerConstant - dy) + "px",
                bottom: "auto"
            });

        } else {
            $el.css({
                top: headerConstant + "px",
                bottom: "auto"
            });
        }
    });


    
    //toggle resources sub-sections
    $('#toc .level-2').hide();
    $('#toc #nav_resources a:first').click(function() {
        $('#toc .level-2').toggle();
    });


    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.sub-header, #api-docs-header, #toc').addClass('fixed-scroll');

            if (navBottom <= 0 && nav != null) {
                navBottom = nav.getBoundingClientRect().bottom;
            }
        }
        else {
            $('.sub-header, #api-docs-header, #toc').removeClass('fixed-scroll');
        }
    });

    $('.dropdown').mouseenter(function() {
        $('.dropdown-menu').hide();
        $(this).find('.dropdown-menu').show();
        // Hides searchbox module when header nav is show.
        $('#suggested-result').hide();
        $('#quick-search').addClass('hide-border');
    }).mouseleave(function() {
        $(this).find('.dropdown-menu').hide();
    });

    $('#version').change(function() {
        window.location = $(this).val();
    });

    //select current version according to url
    var string = location.href;
    var if_v = string.indexOf("/v");
    var version = string.slice(if_v + 1, if_v + 3);
    $('#version option').each(function() {
        if ($(this).val().indexOf(version) !== -1)
            $(this).attr('selected', 1);
    });
});
