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
			_.bindAll(this,'render','updateRemoveGame','updateGames');                 
			this.collection.bind('remove',this.render);
			this.collection.bind('add',this.render);
			this.collection.bind('reset',this.render); 
			this.collection.bind("change", this.render);
			this.collection.bind('updateGames',this.updateGames);        
			this.collection.bind('updateRemoveGame',this.updateRemoveGame); 
		},
	
		render : function(){
			var $games = $(this.el).find('table tbody'),
				collection = this.collection,
				count = collection.length,
				that = this;                 
			
			$games.find('tr').not('.tb_subheader').remove();	
			if(count){
				collection.each(function(gameItem,i){
					if(i > (count - 10)){
						gameItem.set({
							achArray : that.controllerAchievements(gameItem.get('achievements')),
							gameEndFormat : that.controllerTimeAgo(gameItem.get('gameEnd'))
						},{silent:true}); 
						var view = new GamesRowView({
							model: gameItem,
							collection : collection
						}); 
						$games.prepend(view.render().el);
					}  
				});
			}else{
				 $games.prepend('<tr><td colspan="4"><p class="empty">No games have been scored yet</p></td></tr>');
			}
			$games.prepend($games.find('tr.tb_subheader')); 
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
	
		updateRemoveGame : function(game){
			this.collection.remove(game);
			game.destroy(); 
			this.render();           
			Registry.models.record.trigger('updateRecord');
		},
		
		updateGames : function(game){  
			this.collection.add(game);
			game.unbind();
			Registry.models.record.trigger('updateRecord');
		}
	
	});
	
	return GamesView;

});