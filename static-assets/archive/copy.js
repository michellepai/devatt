    $(".copy-button").click(function() {
        self = $(this);
        copy_content = $(this).siblings("pre").text().trim();
        alert(copy_content);
        self.zclip({
            path: 'http://www.steamdev.com/zclip/js/ZeroClipboard.swf',
            copy: copy_content,
            afterCopy: function() {
                alert('copy');
            }
        });
    });