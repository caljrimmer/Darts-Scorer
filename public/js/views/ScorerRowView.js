define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'views/ScorerDartView',
  'text!templates/scorer-row.html'
], function($, _, Backbone, Registry, ScorerDartView, scorerRowTemplate){

	var ScorerRowView = Backbone.View.extend({
		
		template : _.template(scorerRowTemplate),
		tagName : 'tr',
	
		initialize : function(){
			this.view = this.options.view;
			this.round = this.options.round;
			this.darts = this.options.round.darts;
		},
	
		render : function(){                              
			var renderContent = this.template(this.round);
			$(this.el).html(renderContent);
			this.renderIndividualDarts();
			return this;
		},
		
		renderIndividualDarts : function(){ 
			var that = this;                                  
			$.each(this.darts,function(i){
				var dart = new ScorerDartView({
					dart: that.darts[i],
					round:that.round 
				});
				that.view.subViewTo(dart);
				that.$("td").eq(i+1).html(dart.render().el);
				that.$(".score_total").html(that.round.score);
			});
		}
		
	});
	
	return ScorerRowView;

});