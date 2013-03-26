define([
  'jquery',
  'underscore',
  'backbone',
  'Registry'
], function($, _, Backbone, Registry){

	var Record = Backbone.Model.extend({
		
		urlRoot : '/api/records/',
		
		defaults : {
			games: 0,
			ave: 0.00,
			bestAve: 0.00,
			bestCheckout: 0,
			highest3d: 0,
			leastDarts: 0,
			oneEighty: 0,
			oneForty: 0,
			oneTwenty: 0,
			oneHundred: 0,
			greeneye: 0,
			bullseye: 0,
			singles: 0,
			doubles: 0,
			trebles: 0,
			shanghai: 0
		},
		
		sync : function(method,model,options){
		    $.ajaxSetup({headers:{userid:Registry.userid}});
		    Backbone.sync(method,model,options);
		}

	});
	
	return Record;

});