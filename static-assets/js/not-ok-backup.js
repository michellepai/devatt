$(function() {
    /* Initialize ZeroClipboard for copying text. */
    ZeroClipboard.setDefaults({moviePath: '/static-assets/flash/ZeroClipboard.swf'});
    var clip = new ZeroClipboard();
    var notification = $('.notification');
    var initializeCopyButtons = function() {
        $('.copy-button').each(function() {
            var button = $(this);
            var pre = button.siblings("pre");
            button.attr('data-clipboard-text', pre.text().trim());
            clip.glue(button);
        });

        clip.on('complete', function(client, args) {
            notification.addClass('success');
            notification.find('span').text('Successfully copied to clipboard.');
            notification.slideDown();
            setTimeout(function() {
                notification.fadeOut();
            }, 3000);
        });

        $(window).resize(function() {
            clip.reposition();
        });
        clip.off('load', initializeCopyButtons);
    };
    clip.on('load', initializeCopyButtons);

    $(".tabs").tabs();
    $('.tab_nav li a').click(function() {
        $(this).parents().find('ul:first a.selected').removeClass('selected');
        $(this).addClass('selected');
    });
    apidoc_responsive();
    toc_scroll();

    $(window).resize(function() {
        apidoc_responsive();
        toc_scroll();
    });

    $('.inner span.toggleMenu').click(function() {
        $('#toc').toggle();
    });

    function apidoc_responsive() {
        if ($(window).width() < 1200) {
            if ($('.sub-header').length !== 0) {
                $('.sub-header').width($(window).width());
            }
            if ($(window).width() >= 600) {
                $('#toc').show();
                if ($('.main').length !== 0)
                    $('.main').eq(1).width($(window).width() - 300);
                if ($('.status').length !== 0)
                    $('.status').width($(window).width() - 300);
                $(window).scroll(function() {
                    $(window).scrollLeft(0);
                });


            } else if ($(window).width() < 600) {
                $('#toc').hide();
                if ($('.main').length !== 0)
                    $('.main').eq(1).width($(window).width() - 20);
                if ($('.status').length !== 0)
                    $('.status').width($(window).width() - 20);

            }
            $('#footer-common').width($(window).width());
            $('#att-footer.container').width($(window).width());
        } else {
            if ($('.sub-header').length !== 0)
                $('.sub-header').width(1200);
        }
    }

    function toc_scroll() {
        $('#toc').height($(window).height() - calculate_height());
    }

    function calculate_height() {
        api_doc_header = $('#api-docs-header').length === 0 ? 0 : $('#api-docs-header').height();
        short = $('.sub-header').height() + $('#api-docs-header').height();
        tall = short + parseInt(api_doc_header);
        height = $('.fixed-scroll').length === 1 ? tall : short;
        return height;
    }

    $('#toc a, .back-to-top a').click(function() {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - calculate_height() // minus the header height.
        }, 1);
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

            var scrollY = $this.scrollTop() + 250;
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

            if ($('.highlighted').parents('.level-2')) {
                $('.highlighted').parents('.level-2').parents('ul.level-1 li').addClass('highlighted');
            }
        });
    }
    
    $('#nav_sample-apps a').click(function() {
        setTimeout(function() {
            $('.highlighted').removeClass('highlighted');
            $('#nav_sample-apps').addClass('highlighted');
        }, 50);
    });
    
    $('#nav_quickstart a').click(function() {
        setTimeout(function() {
            $('.highlighted').removeClass('highlighted');
            $('#nav_quickstart').addClass('highlighted');
        }, 50);
    });
    
    var $el = $('#toc');
    var $window = $(window);
    var ftd = document.getElementById('footer-common');
    var toc = document.getElementById('toc');
    var nav = null;
    if (document.getElementById('toc')) {
        var nav = toc.getElementsByTagName('ul')[0];
    }

    var navBottom = 0;
    var headerConstant
            = document.getElementById('api-docs-header') === null ? 100 : 170;

    var ftdRect = ftd.getBoundingClientRect();
    if (navBottom > ftdRect.top) {
        var dy = navBottom - ftdRect.top;
        $el.css({
            top: (headerConstant - dy) + "px",
            bottom: "auto"
        });

    }

    var dy = 0;
    $window.bind("scroll resize", function() {
        var ftdRect = ftd.getBoundingClientRect();
        if (navBottom > ftdRect.top) {
            dy = navBottom - ftdRect.top;
            $el.css({
                top: (headerConstant - dy) + "px",
                bottom: "auto"
            });

        } else {
            $el.css({
                top: headerConstant + "px",
                bottom: "auto"
            });
            dy = 0;
        }
    });
    //toggle resources sub-sections
    $('#toc .level-2').hide();
    $('#toc #nav_resources a:first').click(function() {
        $('#toc .level-2').toggle();
        navBottom = nav.getBoundingClientRect().bottom + dy;
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.sub-header, #api-docs-header, #toc').addClass('fixed-scroll');

            navBottom = nav.getBoundingClientRect().bottom + dy;
        }
        else {
            $('.sub-header, #api-docs-header, #toc').removeClass('fixed-scroll');
        }
    });
});
