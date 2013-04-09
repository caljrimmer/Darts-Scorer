define([
  'jquery',
  'underscore',
  'backbone',
  'Registry', 
  'AreaSelect',
  'Chart',
  'Lang',
  'text!templates/achievement.html',
], function($, _, Backbone, Registry, AreaSelect, Chart, Lang, achievementTemplate){
	
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
			var model = this.model.toJSON();                                       
			model = _.extend(model,Lang[Registry.lang].Template.AchievementsTable);
			var renderContent = this.template(model);
			this.renderChart();
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
			
		} 

	});
	
	return AchievementView;

});