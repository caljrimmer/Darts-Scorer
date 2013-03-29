define([
  'jquery',
  'underscore',
  'backbone', 
  'AreaSelect',
  'Chart',
  'text!templates/achievement.html',
], function($, _, Backbone, AreaSelect, Chart, achievementTemplate){
	
	var AchievementView = Backbone.View.extend({
		
		el : $('#achievements'),
		
		template : _.template(achievementTemplate), 
	
		initialize : function(){
			_.bindAll(this,'render');
			this.model.bind('reset',this.render);
			this.model.bind("change", this.render);
			this.updateAchievements();
		},
	
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		},
		
		renderChart : function(){
			this.chart = new Chart();                 
			this.chart.bar(this.collection.toJSON(),'#barChart');
			this.chart.block(this.collection.toJSON(),'#blockChart');
		},
		
		updateAchievements : function(){
			var that = this;
			
			this.model.fetch({
				success : function(){
					that.render();
				}
			});
			
			this.collection.fetch({
				success : function(){
					that.renderChart();
				}
			});
			
		} 

	});
	
	return AchievementView;

});