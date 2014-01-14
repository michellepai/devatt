/*global jQuery,app,Base,setTimeout,clearTimeout*/

(function($) {
    /**
     * The AutoSlider object provides the basic functionality
     * for a slider to work.
     *
     * Objects that extend this object need to provide a `show` function which
     * is in charge of displaying a target element
     * and hiding the other ones.
     */
    app.AutoSlider = Base.extend({
        setSlideInterval: function() {
            this.slideTimeout = setTimeout($.proxy(function() {
                this.slide();
                this.setSlideInterval();
            }, this), 10000);
        },

        clearTimeout: function() {
            if (this.slideTimeout) {
                clearTimeout(this.slideTimeout);
            }
        },

        slide: function(target) {
            var curr = $('a.active', this.$controls);
            var next = target || curr.parent().next().find('a');

            if (next.length === 0) {
                next = $('a:first', this.$controls);
            }

            curr.removeClass('active');
            next.addClass('active');

            this.show(next);
        }
    });

    app.DotsSlideshow = app.AutoSlider.extend({
        initialize: function($wrapper) {
            this.options = $.parseJSON($wrapper.data('slideshow-options') || '{}');
            this.$wrapper = $wrapper;
            this.$controls = $('ul.slideshow-controls', $wrapper);

            this.bindEvents();
            this.setSlideInterval();
        },

        bindEvents: function() {
            this.$controls.delegate('a', 'click', $.proxy(function(ev) {
                ev.preventDefault();

                this.clearTimeout();
                this.slide($(ev.currentTarget));
            }, this));
        },

        show: function(target) {
            var target = target.data('target');
            var $prevNodes = $('article.active', this.$wrapper);
            var $currNodes = $(target, this.$wrapper);

            $prevNodes.fadeOut(220, function() {
                $prevNodes.removeClass('active');

                $currNodes.fadeIn(220, function() {
                    $currNodes.addClass('active');
                });
            });
        }
    });
})(jQuery);
