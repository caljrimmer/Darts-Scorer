define([
  'jquery',
  'underscore',
  'backbone',
  'timeago',
  'views/GamesRowView',
], function($, _, Backbone, timeago, GamesRowView){
	
	
	var GamesView = Backbone.View.extend({
	
		initialize : function(){
			_.bindAll(this,'render','removeGame','addGame');                 
			this.collection.bind('remove',this.render);
			this.collection.bind('reset',this.render);         
			this.collection.bind('addGame',this.addGame)
			this.collection.bind('removeGame',this.removeGame);
		},
	
		render : function(){
		
			var $games = $('#history table tbody'),
				collection = this.collection,
				that = this;
		
			$games.find('tr').not('.tb_subheader').remove();
		 
			collection.each(function(gameItem){
				that.timeAgo(gameItem);     
				that.achievements(gameItem);
				var view = new GamesRowView({
					model: gameItem,
					collection : collection
				}); 
				$games.append(view.render().el);
			});
		
			return this;
			                                  
		},
		
		addGame : function(game){
			this.collection.unshift(game);
			this.render();
		},
	
		removeGame : function(game){
			game.destroy();         
			this.collection.fetch();
			//TODO need to remove Game from DB then refetch all the games from DB. 
			//This can then reset the records correctly (i.e thier may be no currently fetched game that the record belongs too).
		},
	
		timeAgo : function(game){ 
			time = $.timeago(game.get('gameEnd'));
			game.set({gameEndFormat:time});
		},
	
		achievements : function(game){
		
			var achArray = [],
				achMedal,
				ach = game.get('achievements');
			
			$.each(ach,function(k,v){
			
				if(v>0 && !( k==="checkout" || k==="highest3d")){
					achArray.push(k)
				}
			
				if(k==="checkout" && v > 49){
					achArray.push( k + ' was ' + v);
				}
			
			});
		
			if(achArray.length > 1 || achArray.length == 0){
				achMedal = achArray.length + ' Achievements'
			}else{
				achMedal = '1 Achievement';
			}
		
			game.set({achArray:achArray,achMedal:achMedal});
		
		}
	
	});
	
	return GamesView;

});