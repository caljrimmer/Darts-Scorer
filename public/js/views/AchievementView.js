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
			this.newModel = this.achievementsFlags(this.model.toJSON());
			var renderContent = this.template(this.newModel);
			$(this.el).html(renderContent); 
			return this;
		}, 
	
		achievementsFlags : function(model){
		
			var leastDarts = model.leastDarts,
				bestCheckout = model.bestCheckout;

			$.each(model,function(k,v){
				if(v > 0){
					model[k] = "special_medal";
				}else{
					model[k] = "special_off";
				}
			});
		
			model = this.modelCull(model);
			model = this.darter(leastDarts,model);
			model = this.checkout(bestCheckout,model);
		
			return model;
		
		},
	
		modelCull : function(model){ 
			delete model.ave;
			delete model.bestAve;
			delete model.id;
			delete model.highest3d;
			delete model.games;
			delete model.userId;
			return model;
		},
	
		// These are a bit verbose but as they are in the view it is acceptable
		// Work done before Template Generate decreases parse time
	
		darter : function(value,model){      
		
		    $.extend(model,{
				Darter24 : 'special_off',
				Darter21 : 'special_off',
				Darter18 : 'special_off',
				Darter15 : 'special_off',
				Darter12 : 'special_off',
				Darter9 : 'special_off'
			});
			
			if(value === 0) value = 100;
		
			if(value < 25) { model.Darter24 = "special_medal"; }
			if(value < 22) { model.Darter21 = "special_medal"; }
			if(value < 19) { model.Darter18 = "special_medal"; }
			if(value < 16) { model.Darter15 = "special_medal"; }
			if(value < 13) { model.Darter12 = "special_medal"; }
			if(value < 10) { model.Darter9 = "special_medal"; }
		
			return model;
		
		},
	
		// These are a bit verbose but as they are in the view it is acceptable
		// Work done before Template Generate decreases parse time
	
		checkout : function(value,model){
		
			$.extend(model,{
				CO50 : 'special_off',
				CO75 : 'special_off',
				CO100 : 'special_off',
				CO125 : 'special_off',
				CO150 : 'special_off',
				CO170 : 'special_off'
			});
		
			if(value > 49) { model.CO50 = "special_medal"; }
			if(value > 74) { model.CO75 = "special_medal"; }
			if(value > 99) { model.CO100 = "special_medal"; }
			if(value > 124) { model.CO125 = "special_medal"; }
			if(value > 149) { model.CO150 = "special_medal"; }
			if(value > 169) { model.CO170 = "special_medal"; }
		
			return model;
		
		}
	});
	
	return AchievementView;

});