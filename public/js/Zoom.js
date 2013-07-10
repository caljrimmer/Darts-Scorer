define([
  'jquery',
], function($){
	
	var viewPortWidth = 400;
    function setViewport() {
		var wW0 = window.screen.width;
		var scale = wW0/viewPortWidth;
		var vPort = "width="+viewPortWidth+", maximum-scale="+scale+", minimum-scale="+scale+", initial-scale="+scale+", user-scalable=yes";
		$('[name="viewport"]').attr("content", vPort);  
    }

	return setViewport;

});

