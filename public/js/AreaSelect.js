define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
	
	var AreaSelect = function(area){
		$('.mainBlock').hide();
		area.show();
	};
	
	return AreaSelect;

});