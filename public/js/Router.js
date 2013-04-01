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
  'views/ScorerView', 
  'views/NavView',
], function($, _, Backbone, Registry, AreaSelect, Game, Record, Games, RecordView, AchievementView, GameView, GamesView, ScorerView,NavView){
  
	var Router = Backbone.Router.extend({

		routes: {
			'dashboard': 'dashboard',
			'scoregame': 'scoregame',
			'stats': 'stats',
			'game/:gameid': 'gameDetail',
			'': 'default',
			'*notFound': 'default'
		},
		
		initialize : function(){
			
			//Builds Record Model
			Registry.collections.games.fetch({
				success : function(){
					Registry.models.record.gamesToRecord(Registry.collections.games.toJSON());
				}
			});
			
			Registry.views.recordView = new RecordView({
				model: Registry.models.record
			});

			Registry.views.gamesView = new GamesView({
				collection: Registry.collections.games
			});
			
			Registry.views.achievementView = new AchievementView({
				model : Registry.models.record,
				collection : Registry.collections.games
			});
			
			this.navView = new NavView();
			
		},

		dashboard: function(userid) {
			AreaSelect($('#dashboardArea'));
		},

		scoregame: function() {
			
			if(Registry.views.scorerView){
		      	Registry.views.scorerView.dispose();
		    }
			 
			Registry.views.scorerView = new ScorerView({
				model: new Game({
					newlyCreated: true
				})
			});
			
			Registry.views.scorerView.render();
	        AreaSelect($('#scorerArea'));
		},

		gameDetail: function(gameid) {
			Registry.views.gameView = new GameView({
				model: new Game({
					id: gameid
				})
			});
			AreaSelect($('#gameArea'));
		},

		stats: function(userid) {
			Registry.views.achievementView.updateAchievements();
			AreaSelect($('#statsArea'));
		},

		default: function() {
			Registry.App.navigate('/dashboard', true);
		}

	});

	return Router; 


});