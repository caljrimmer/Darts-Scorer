define([
  'jquery',
  'underscore',
  'backbone', 
  'AreaSelect',
  'text!templates/achievement.html',
], function($, _, Backbone, AreaSelect, achievementTemplate){
	
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
			AreaSelect($(this.el).parents('.mainBlock')); 
			return this;
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