$(function() {

// Overwrites contains
    jQuery.expr[':'].Contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
    };
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
    };

    //check query string
    var keyup = '';
    if (qs('api') && qs('api').length !== -1) {
        $('.filter #api-selector').val(qs('api'));
    }

    if (qs('callback_keyup') || qs('api')) {
        api = (qs('callback_keyup')) ? qs('callback_keyup') : qs('api');
    } else {
        api = 'all';
    }
    if (qs('callback_keyup')) {
        keyup = qs('callback_keyup');
        $('input#errorcode').val(keyup);
        $('input#errorcode').focus();
        keyup_search(keyup);
    }

    //filter current api list
    show_api(api);

    //filters
    $('#api-selector').change(function() {
        api = $(this).val();
        show_api(api);
    });
    $('#type-selector').change(function() {
        $('.errors-grid .grid-row:not(.header)').hide();
        type = $(this).val();
        if (type === 'all') {
            show_api(api);
        } else if (type !== 'all') {
            if (api === 'all')
                api = 'grid-row';
            $('.errors-grid').find('div.' + api).each(function() {
                item = $(this).children('.error-code').text().slice(0, 3);
                if (item === type)
                    $(this).show();
            });
        }
    });
    $('#errorcode').keyup(function() {

        val = $(this).val().toLowerCase();
        keyup_search(val);

    });

    $('#errorcode').keydown(function(e) {
        if (e.keyCode == 13) { 
            return false; 
        }
    });

    function keyup_search(val) {
        $('.errors-grid .grid-row:not(.header)').hide();
        if (val === "") {
            show_api(api);
        }

        $('.errors-grid .error-code:contains("' + val + '"), .errors-grid .message:contains("' + val + '")').each(function() {
            if ($(this).parent().hasClass(api)||api==='all')
                $(this).parent().show();
            
        });
    }

    $(".errors-grid .grid-row").click(function() {
        error_code = $(this).find('.error-code').text();
        var api = $('#api-selector').val().toLowerCase();
        var error_type = $('#type-selector').val().toLowerCase();
        api_str = (api === "all") ? "" : "&selected_api=" + api;
        type_str = (error_type === "all") ? "" : "&selected_type=" + error_type;
        url = "error_detail?error_code=" + error_code + api_str + type_str;
        if (error_code !== '')
            window.location = url;
    });

    $('.grid-row').hover(function() {
        $(this).toggleClass('hover');
    });



    //detail page
    error_detail = {
        selectedApi: function() {
            return qs('selected_api');
        },
        selectedType: function() {
            return qs('selected_type');
        }
    };
    //mark api & type on select
    if ($(".detail_filter").length === 1) {
        selected_api = error_detail.selectedApi();
        selected_type = error_detail.selectedType();
        if (selected_api)
            $('.detail_filter #api-selector').val(selected_api);
        if (selected_type)
            $('.detail_filter #type-selector').val(selected_type.toUpperCase());

        //change api links anchor tag typo
        $('.api').each(function() {
            href = $(this).attr('href');
            href = href.replace('/api/', '/apis/');
            $(this).attr('href', href);
        });


    }
    $('.detail_filter  #api-selector').change(function() {
        val = $(this).val().toLowerCase();
        window.location = "errors?api=" + val;
    });
    $('.detail_filter #type-selector').change(function() {
        window.location = 'errors';
    });
    $('.detail_filter #errorcode').keyup(function() {
        val = $(this).val().toLowerCase();
        window.location = "errors?callback_keyup=" + val;
    });

    //show api list after filtering
    function show_api(api) {
        $('.errors-grid .grid-row:not(.header)').hide();
        if (api === 'all') {
            $('.grid-row').show();
        } else {
            $('.errors-grid').find('div.' + api).each(function() {
                $(this).show();
            });
        }
    }

    //get query string
    function qs(key) {
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx control chars
        var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }

});