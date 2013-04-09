define([
  'jquery',
  'underscore',
  'backbone',
  'AreaSelect',
  'Registry',
  'Lang',
  'views/ScorerRowView',
  'text!templates/game.html',
], function($, _, Backbone, AreaSelect, Registry, Lang, ScorerRowView, gameTemplate){
	
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
			var model = this.model.toJSON();
			model = _.extend(model,Lang[Registry.lang].Template.Scorer)
			var renderContent = this.template(model);
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
		},
		
		updateGame : function(){
			this.model.fetch();
		}
	  
	});
	
	return GameView;

});