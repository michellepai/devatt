(function($, undefined) {

	var globalResults = [
		{ page: 'Speech API',					url: '/api/speech' },
		{ page: 'Speech API Documentation',		url: '/api/speech/docs'},
		{ page: 'Payment API',					url: '/api/payment' },
		{ page: 'Payment API Documentation',	url: '/api/payment/docs'},
		{ page: 'SMS and MMS APIs',				url: '/api/sms-mms' },
		{ page: 'SMS API Documentation',		url: '/api/sms/docs'},
		{ page: 'MMS API Documentation',		url: '/api/mms/docs'},
		{ page: 'IMMN API',						url: '/api/immn' },
		{ page: 'IMMN API Documentation',		url: '/api/immn/docs'},
		{ page: 'ARO',							url: '/aro'},
		{ page: 'Community',					url: '/community'},
		{ page: 'Hackathons & Events',			url: '/community/events'},
		{ page: 'Case Studies',					url: '/stories'},
		{ page: 'Error Center',					url: '/api/errors'},
		{ page: 'Error POL00001 - Policy Error',url: '/api/errors/POL00001'}
	];

	var $suggestedResults = $('#suggested-result ul');

	var highlight = function(str) { return '<b>'+str+'</b>'; };

	$('#search').keyup(function(e) {
		var $this = $(this);
		var query = $this.val().toLowerCase(),
			regex = new RegExp(query, 'i'),
			results = [],
			i;

		if (!query.match(/^\s*$/)) {
			for (i = 0; i < globalResults.length; i++) {
				if (globalResults[i].page.match(regex)) {

					// Prevent copying by reference
					results.push({ page: globalResults[i].page, url: globalResults[i].url });
					results[results.length - 1].page = results[results.length - 1].page.replace(regex, highlight);
				}
			}
		}

		if (results.length) {
			$suggestedResults.empty();
			for (i = 0; i < results.length; i++) {
				var $a = $('<a/>').html(results[i].page).attr('href', results[i].url);
				var $li = $('<li/>').append($a);
				$suggestedResults.append($li);
			}
			$suggestedResults.parent().show();
		} else {
			$suggestedResults.parent().hide();
		}

	});

})(jQuery);
