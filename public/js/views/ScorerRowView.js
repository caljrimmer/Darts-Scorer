define([
  'jquery',
  'underscore',
  'backbone',
  'views/ScorerDartView',
  'text!templates/scorer-row.html'
], function($, _, Backbone, ScorerDartView, scorerRowTemplate){

	var ScorerRowView = Backbone.View.extend({
		
		template : _.template(scorerRowTemplate),
		tagName : 'tr',
	
		initialize : function(){
			this.round = this.options.round;
			this.darts = this.options.round.darts;
			_.bindAll(this,'render');

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
					model:that.model,
					round:that.round
				});
				that.$("td").eq(i+1).html(dart.render().el);
				that.$(".score_total").html(that.round.score);
			});
		}
		
	});
	
	return ScorerRowView;

});