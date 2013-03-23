// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'AreaSelect',
  'models/Game',
  'models/Record', 
  'collections/Games',
  'views/RecordView',
  'views/AchievementView',
  'views/GameView',
  'views/GamesView',
  'views/ScorerView'
], function($, _, Backbone, Registry, AreaSelect, Game, Record, Games, RecordView, AchievementView, GameView, GamesView, ScorerView){
	
	var $dashboardArea = $('#dashboardArea'),
		$scorerArea = $('#scorerArea'),
		$gameArea = $('#gameArea');
  
	var Router = Backbone.Router.extend({
	
		routes : {
			'dashboard' : 'dashboard',
			'scoregame' : 'scoregame',
			'game/:gameid' : 'gameDetail'
		},
	
		initialize : function(){     
		
			this.recordView = new RecordView({
				model : Registry.models.record
			});
		
			this.achievementView = new AchievementView({
				model : Registry.models.record
			}); 
		
			this.gamesView = new GamesView({
				collection : Registry.collections.games
			}); 
		
		},
	
		dashboard : function(){
			
			AreaSelect($dashboardArea);
			
			Registry.collections.games.fetch({
				success : function(){
					$dashboardArea.find('#history table tbody').append(Registry.App.gamesView.render().el);
					$dashboardArea.find('#history').show();
				}
			});

			//Initial grab dashboard data on load
			Registry.models.record.fetch({
				success : function(){
					$dashboardArea.find('#johnsonbox').html(Registry.App.recordView.render().el);
					$dashboardArea.find('#achievements').html(Registry.App.achievementView.render().el);
					$dashboardArea.find('#achievements').show();
				}
			});
			       
		},
	
		scoregame : function(){

			var $scorerWrapper = $scorerArea.find('#scorer');
			AreaSelect($scorerArea);
			this.scorerView = new ScorerView({
				model : new Game({isNew:true})
			});
			$scorerWrapper.empty(); 
			$scorerWrapper.append(this.scorerView.render().el);
		},
		
		gameDetail : function(gameid){
			
			var $gameWrapper = $gameArea.find('#gameDetail'),
			  	that = this;

			this.gameView = new GameView({
				model : new Game({id:gameid})
			});
			
			this.gameView.model.fetch({
				success : function(){
					$gameWrapper.empty();
					$gameWrapper.append(that.gameView.render().el);
				}
			});

		}
	
	});
	
	return Router;

});