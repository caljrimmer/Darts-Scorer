define([
  'jquery',
  'underscore',
  'backbone',
  'AreaSelect',
  'Registry',
  'Lang',
  'views/BaseView',
  'moment',
  'views/ScorerRowView',
  'text!templates/game.html',
], function($, _, Backbone, AreaSelect, Registry, Lang, BaseView, Moment, ScorerRowView, gameTemplate){
	
	var GameView = BaseView.extend({
		
		el : $('#gameDetail'),

		template : _.template(gameTemplate), 
	
		initialize : function(){
			_.bindAll(this,'render');
			this.bindTo(this.model, 'change', this.render);
			this.bindTo(this.model, 'reset', this.render);
			this.updateGame();                
		},
		
		render : function(){                
			var model = this.model.toJSON();
			model = _.extend(model,Lang[Registry.lang].Template.Scorer);
			model.duration = Math.ceil((new Date(model.gameEnd).getTime() - new Date(model.gameStart).getTime())/1000); 
			model.gameStart = Moment(model.gameStart).format('DD/MM/YYYY, hh:mm:ss');
			model.gameEnd = Moment(model.gameEnd).format('DD/MM/YYYY, hh:mm:ss');
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
					view : that,
                    round: rounds[i],
					model : that.model
                });
				that.subViewTo(view);
				that.$("tbody").append(view.render().el);
			});
		},
		
		updateGame : function(){
			this.model.fetch();
		}
	  
	});
	
	return GameView;

});