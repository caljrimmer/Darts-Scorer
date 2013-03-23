define([
  'jquery',
  'underscore',
  'backbone',
  'models/Game'
], function($, _, Backbone, Game){

	var Games = Backbone.Collection.extend({
		model : Game,
		url : '/api/games'
	});
	
	return Games;

});