define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
	
	var AreaSelect = function(area){
		var areas = [$('#dashboardArea'),$('#scorerArea'),$('#gameArea')];
		
		for (var i=0;i<areas.length;i++)
		{ 
			areas[i].hide();
		}
		
		area.show();
	};
	
	return AreaSelect;

});