define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/achievement.html',
], function($, _, Backbone, achievementTemplate){
	
	var AchievementView = Backbone.View.extend({
		
		template : _.template(achievementTemplate), 
	
		initialize : function(){
			_.bindAll(this,'render');
			this.model.bind('change',this.render);
			this.model.bind('reset',this.render);
		},
	
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			$(this.el).html(renderContent); 
			return this;
		}, 
	

	});
	
	return AchievementView;

});