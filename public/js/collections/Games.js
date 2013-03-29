define([
  'jquery',
  'underscore',
  'backbone',
  'backboneStorage',
  'Registry',
  'models/Game'
], function($, _, Backbone, BackboneStorage, Registry, Game){
	
	if(Registry.store === "local"){ 
		
		var Games = Backbone.Collection.extend({
			model : Game,
			localStorage: new Store("Game")
		});

		return Games;
		
	}
	
	if(Registry.store === "live"){
		
		var Games = Backbone.Collection.extend({
			model : Game,
			url : '/api/games/',
			sync : function(method,model,options){
			    $.ajaxSetup({headers:{userid:Registry.userid}});
			    Backbone.sync(method,model,options);
			}
		});

		return Games;
		
	}



});