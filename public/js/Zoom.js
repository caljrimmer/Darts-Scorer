define([
  'jquery',
], function($){
                                         
	var designWidth = 470; // zoom to fit this ratio
	var scaleChange = 1; // % change in scale from above #s
    
	function IsMobile(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
		 return true;
		}           
		return false;
	}


	function zoomScreen() {
		var docWidth = window.outerWidth;
		if (docWidth  <  960 && IsMobile()) {
			var scaleX = docWidth / designWidth;
			$('body').css('zoom', scaleX);
		}
	}

	return zoomScreen; 

});

