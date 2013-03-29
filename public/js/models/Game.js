define([
  'jquery',
  'underscore',
  'backbone',
  'backboneStorage',
  'Registry'
], function($, _, Backbone, BackboneStorage, Registry){
	
	
	if(Registry.store === "local"){ 
		
		var Game = Backbone.Model.extend({

			localStorage: new Store("Game"),

			defaults : {
			    gameStart: new Date(),
				gameEnd: new Date(),
			    numberDarts: 0,
				ave: 0.00,
				type: 501,
				score : 501
			},

			initialize : function(){
				this.setNestedDefaults();
			},

			setNestedDefaults : function(){ 

				//We only want this set if it is a new game

				if(this.get('isNew')){
					this.set({
					achievements : {
						checkout : 0,
						highest3d : 0,
						oneEighty : 0,
						oneForty : 0,
						oneTwenty : 0,
						oneHundred : 0,
						greeneye : 0,
						bullseye : 0,
						singles : 0,
						doubles : 0,
						trebles : 0,
						shanghai : 0  
					},
					rounds : [{
						darts : [],
						total : 0,
						score : 501
					}]});  
				}
			},

			inProgress : function(){
				return this.get('numberDarts') > 0;
			},

			isFinished : function(){
				return this.get('score') === 0;
			}

		});

		return Game;
		
	}
	
	if(Registry.store === "live"){
		
		var Game = Backbone.Model.extend({

			urlRoot : '/api/games',

			defaults : {
			    gameStart: new Date(),
				gameEnd: new Date(),
			    numberDarts: 0,
				ave: 0.00,
				type: 501,
				score : 501
			},

			initialize : function(){
				this.setNestedDefaults();
			},

			setNestedDefaults : function(){ 

				//We only want this set if it is a new game

				if(this.get('isNew')){
					this.set({
					achievements : {
						checkout : 0,
						highest3d : 0,
						oneEighty : 0,
						oneForty : 0,
						oneTwenty : 0,
						oneHundred : 0,
						greeneye : 0,
						bullseye : 0,
						singles : 0,
						doubles : 0,
						trebles : 0,
						shanghai : 0  
					},
					rounds : [{
						darts : [],
						total : 0,
						score : 501
					}]});  
				}
			},

			inProgress : function(){
				return this.get('numberDarts') > 0;
			},

			isFinished : function(){
				return this.get('score') === 0;
			}

		});

		return Game;
		
	}
	
	



});