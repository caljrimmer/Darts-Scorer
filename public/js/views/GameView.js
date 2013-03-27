define([
  'jquery',
  'underscore',
  'backbone',
  'AreaSelect',
  'views/ScorerRowView',
  'text!templates/game.html',
], function($, _, Backbone, AreaSelect, ScorerRowView, gameTemplate){
	
	var GameView = Backbone.View.extend({
		
		el : $('#gameDetail'),

		template : _.template(gameTemplate), 
	
		initialize : function(){
			_.bindAll(this,'render');
			this.model.bind('change',this.render);
			this.model.bind('reset',this.render);
			this.updateGame();                
		},
		
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			$(this.el).html(renderContent);
			this.renderRow();
			AreaSelect($(this.el).parents('.mainBlock')); 
			return this;
		},
		
		renderRow : function(){
			var rounds = this.model.toJSON().rounds,
				that = this;
			
			$.each(rounds,function(i){
				var view = new ScorerRowView({
                    round: rounds[i],
					model : that.model
                });
				that.$("tbody").append(view.render().el);
			});
		},
		
		updateGame : function(){
			this.model.fetch();
		}
	  
	});
	
	return GameView;

});