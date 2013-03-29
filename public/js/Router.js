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
			'game': 'gameDetail',
			'': 'default',
			'*notFound': 'default'
		},

		dashboard: function(userid) {

			this.recordView = new RecordView({
				model: Registry.models.record
			});

			this.gamesView = new GamesView({
				collection: Registry.collections.games
			});
               
			AreaSelect($('#dashboardArea'));
			this.generateNavView(userid); 

		},

		scoregame: function() {

			this.scorerView = new ScorerView({
				model: new Game({
					isNew: true,
					userid: Registry.userid
				})
			});
	              AreaSelect($('#scorerArea'));
			this.generateNavView(Registry.userid); 

		},

		gameDetail: function(gameid) {
			var that = this;

			this.gameView = new GameView({
				model: new Game({
					id: gameid
				})
			});
            
			AreaSelect($('#gameArea'));
			this.generateNavView(Registry.userid);

		},

		stats: function(userid) {
			Registry.userid = userid;

			this.achievementView = new AchievementView({
				model : Registry.models.record,
				collection : Registry.collections.games
			});
			
			AreaSelect($('#statsArea'));
			this.generateNavView(userid);  
		},

		generateNavView: function(userid) {
			this.navView = new NavView({
				model: Registry
			});     
		},

		default: function() {
			Registry.App.navigate('/dashboard/' + Registry.adminid, true);
		}

	});

	return Router; 


});