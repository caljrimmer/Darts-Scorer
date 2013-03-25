define([
  'jquery',
  'underscore',
  'backbone',
  'AreaSelect',
  'text!templates/game-row.html',
], function($, _, Backbone, AreaSelect, gameRowTemplate){
	
	var $gameArea = $('#gameArea');

	var GamesRowView = Backbone.View.extend({
	
		tagName : 'tr',
		template : _.template(gameRowTemplate), 
	
		events : {
			'click .button' : 'deleteGame'
		},
	
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			$(this.el).html(renderContent); 
			return this;
		},
	
		deleteGame : function(){
			this.collection.trigger('updateRemoveGame',this.model);
		}
		
	});
	
	return GamesRowView;

});