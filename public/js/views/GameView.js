define([
  'jquery',
  'underscore',
  'backbone',
  'AreaSelect',
  'views/ScorerRowView',
  'text!templates/game.html',
], function($, _, Backbone, AreaSelect, ScorerRowView, gameTemplate){
	
	var $gameArea = $('#gameArea');
	
	var GameView = Backbone.View.extend({

		template : _.template(gameTemplate), 
	
		initialize : function(){
			_.bindAll(this,'render');
			this.model.bind('change',this.render);
			this.model.bind('reset',this.render);
			this.model.fetch()
		},
		
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			AreaSelect($gameArea);
			$(this.el).html(renderContent);
			this.renderRow(); 
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
		}
	  
	});
	
	return GameView;

});