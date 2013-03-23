define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'text!templates/record.html',
], function($, _, Backbone, Registry, recordTemplate){
	
	
	var RecordView = Backbone.View.extend({
		
		template : _.template(recordTemplate),
	
		initialize : function(){
			_.bindAll(this,'render','updateRecord'); 
			this.games = Registry.collections.games;
			this.model.bind('change',this.render);
			this.model.bind('reset',this.render);
			this.model.bind('updateRecord',this.updateRecord)
		},
	
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		},
		
		/**
		* This is to create the average 3 Darts over the last 10 games
		* This can be calculated on the server but will be out of date once a game is scored
		*/
		
		setAverage : function(){
			var gamesAveArray = this.games.pluck('ave'),
				gamesAveTotal = 0,
				index = 0,
				gamesAve;
				
			$.each(gamesAveArray,function(k,v){
				if(k < 10){
					gamesAveTotal = gamesAveTotal + v;
					index = k + 1;
				}else{
					index = 10 + 1;
				}
			});
			       
			return Math.round((gamesAveTotal/index)*100)/100;
			
		},
		
		updateRecord : function(game){ 
			
			var currentRecord = this.model.toJSON(),
				newRecord = game.toJSON();
				
				if(newRecord.ave > currentRecord.bestAve){
					currentRecord.bestAve = newRecord.ave;
				}
				
				if(newRecord.numberDarts < currentRecord.leastDarts){
				 	currentRecord.leastDarts = newRecord.numberDarts;	
				}
				
				if(newRecord.achievements.highest3d > currentRecord.highest3d){
				 	currentRecord.highest3d = newRecord.achievements.highest3d;	
				}
				
				if(newRecord.achievements.checkout > currentRecord.bestCheckout){
				 	currentRecord.bestCheckout = newRecord.achievements.checkout;	
				}
				
				currentRecord.bullseye += newRecord.achievements.bullseye;
				currentRecord.greeneye += newRecord.achievements.greeneye;
				currentRecord.singles += newRecord.achievements.singles;
				currentRecord.doubles += newRecord.achievements.doubles;
				currentRecord.trebles += newRecord.achievements.trebles;
				currentRecord.oneEighty += newRecord.achievements.oneEighty;
				currentRecord.oneForty += newRecord.achievements.oneForty;
				currentRecord.oneHundred += newRecord.achievements.oneHundred;
				currentRecord.oneTwenty += newRecord.achievements.oneTwenty;
				currentRecord.shanghai += newRecord.achievements.shanghai;
				currentRecord.ave = this.setAverage();
				currentRecord.games += 1
				
				this.model.save(currentRecord) 
				
		}
	
	});
	
	return RecordView;

});