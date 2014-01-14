(function($) {
  function FancySelect(selectNode) {
    $(selectNode).wrap('<div class="fancy-select"></div>');

    this.selectNode = selectNode;
    this.wrapper = $(selectNode).parent();

    this.wrapper.
      append('<span class="cover"><span class="text"></span></span>').
      append('<span class="arrow form-icon"></span>');

    $(this.selectNode).change($.proxy(this.setCoverText, this));
    this.setCoverText();
  }

  FancySelect.prototype.setCoverText = function() {
    var selectedLabel = $('option:selected', this.selectNode).text();
    $('.cover .text', this.wrapper).text(selectedLabel);
  };

  $('select').each(function() {
    if ( $(this).data('fancy-select') ) {
      return true;
    }

    $(this).data('fancy-select', new FancySelect(this));
  });
}) (jQuery);
