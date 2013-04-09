define([
  'jquery',
  'underscore',
  'backbone', 
  'Registry',
  'AreaSelect',
  'Lang',
  'text!templates/games-row.html',
], function($, _, Backbone, Registry, AreaSelect, Lang, gameRowTemplate){
	
	var $gameArea = $('#gameArea');

	var GamesRowView = Backbone.View.extend({
	
		tagName : 'tr',
		template : _.template(gameRowTemplate),
		
		events : {
			'click a.showGame' : 'eventShowGame',
			'click .button' : 'eventDeleteGame'
		},
	
		render : function(){
			var model = this.model.toJSON();
			model = _.extend(model,Lang[Registry.lang].Template.HistoryTable);
			var renderContent = this.template(model);
			$(this.el).html(renderContent); 
			return this;
		},
		
		eventShowGame : function(e){
			e.preventDefault();
			var id = $(e.target).data('id');
			Registry.App.navigate('/detail',false)
			Registry.App.gameDetail(id);
		},
	
		eventDeleteGame : function(){
			this.collection.trigger('updateRemoveGame',this.model);
		}
		
	});
	
	return GamesRowView;

});