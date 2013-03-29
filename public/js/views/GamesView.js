define([
  'jquery',
  'underscore',
  'backbone',
  'timeago',
  'Registry',
  'AreaSelect',
  'views/GamesRowView',
], function($, _, Backbone, timeago, Registry, AreaSelect, GamesRowView){
	
	
	var GamesView = Backbone.View.extend({
		
		el : $('#history'),
	
		initialize : function(){
			_.bindAll(this,'render','updateRemoveGame','updateAddGame');                 
			this.collection.bind('remove',this.render);
			this.collection.bind('reset',this.render); 
			this.collection.bind("change", this.render);        
			this.collection.bind('updateAddGame',this.updateAddGame)
			this.collection.bind('updateRemoveGame',this.updateRemoveGame); 
			this.updateGames();
		},
	
		render : function(){
			var $games = $(this.el).find('table tbody'),
				collection = this.collection,
				that = this;                 
				
			if(collection.length){
				$games.find('tr').not('.tb_subheader').remove();
				collection.each(function(gameItem){
					gameItem.set({
						achArray : that.controllerAchievements(gameItem.get('achievements')),
						gameEndFormat : that.controllerTimeAgo(gameItem.get('gameEnd'))
					},{silent:true}); 
					var view = new GamesRowView({
						model: gameItem,
						collection : collection
					}); 
					
					if(Registry.store === "live"){
						$games.append(view.render().el);
					}else{
						$games.prepend(view.render().el);
						$games.prepend($games.find('tr.tb_subheader'))
					}   
					
				});  
			}
			return this;                                
		},
	
		controllerTimeAgo : function(time){ 
			return $.timeago(time);
		},
	
		controllerAchievements : function(ach,gameEnd){
			var achArray = [],
				achMedal;
			$.each(ach,function(k,v){
				if(v>0 && !( k==="checkout" || k==="highest3d")){
					achArray.push(k)
				}
				if(k==="checkout" && v > 49){
					achArray.push( k + ' was ' + v);
				}
			});
			return achArray;
		},
		
		updateAddGame : function(game){
			this.collection.unshift(game);
			this.render();
		},
	
		updateRemoveGame : function(game){
			game.destroy();         
			this.collection.fetch();
			Registry.models.record.fetch();
		},
		
		updateGames : function(){
			this.collection.fetch();
		}
	
	});
	
	return GamesView;

});