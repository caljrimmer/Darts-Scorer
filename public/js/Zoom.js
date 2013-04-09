define([
  'jquery',
], function($){
                                         
	var designWidth = 442; // zoom to fit this ratio
	var scaleChange = 1; // % change in scale from above #s

	function zoomScreen() {
		var docWidth = screen.width;
		var scaleX = docWidth / designWidth;
		$('body').css('zoom', scaleX);
	}

	return zoomScreen; 

});

