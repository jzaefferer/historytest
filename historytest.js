(function() {
	function submitToBrowserscope(result) {
		submitResultButton.hide();
		// console.log("submit", result);
		// return;
		window._bTestResults = result;
		window.browserscopeCallback = function() {
			$.getScript('http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnINCxIEVGVzdBiXl_gQDA?o=js');
		}

		// Beacon the results to Browserscope.
		(function(document) {
			var testKey = 'agt1YS1wcm9maWxlcnINCxIEVGVzdBiXl_gQDA';
			var newScript = document.createElement('script'),
					firstScript = document.getElementsByTagName('script')[0];
			newScript.src = 'http://www.browserscope.org/user/beacon/' + testKey;
			newScript.src += '?callback=browserscopeCallback';
			firstScript.parentNode.insertBefore(newScript, firstScript);
		}(document));
		$('#thanks').show();

	}

	function collapse() {
		stepTwo.hide();
		gatherFeedback.hide();
		submitResultButton.show();
	}

	var stepTwo = $('#step-two'),
		gatherFeedback = $('#gathering-feedback'),
		detail = $('#detail-result'),
		submitResultButton = $('#submit-result').click(function() {
			submitToBrowserscope({
				'basic-support': basicSupport ? 1 : 0,
				'address-updated': addressChanged ? 1 : 0
			});
		});

	var basicSupport = !!(window.history && history.pushState),
		addressChanged = 0;

	$('#basic-support').text(basicSupport ? 'yep' : 'nope');

	if (!basicSupport) {
		submitResultButton.show();
	} else {
		stepTwo.show();
		$('#change-history').click(function() {
			history.pushState({}, null, '?test-state');
			gatherFeedback.show();
		});
	}

	$('#success').click(function() {
		addressChanged = true;
		detail.text( "Success! - " );
		collapse();
	});
	$('#failure').click(function() {
		detail.text( "Doh - " );
		collapse();
	});

}());
