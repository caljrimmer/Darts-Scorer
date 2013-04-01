define([
  'jquery',
  'underscore',
  'backbone',
  'backboneStorage',
  'Registry',
  'models/Game'
], function($, _, Backbone, BackboneStorage, Registry, Game){

	var Games = Backbone.Collection.extend({
		model : Game,
		localStorage: new Store("Game")
	});

	return Games;   

});