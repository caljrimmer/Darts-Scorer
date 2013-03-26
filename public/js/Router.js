define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'AreaSelect',
  'ApiKey',
  'LocalStorage',
  'models/Game',
  'models/Record', 
  'collections/Games',
  'views/RecordView',
  'views/AchievementView',
  'views/GameView',
  'views/GamesView',
  'views/ScorerView', 
  'views/LoginView',
  'views/NavView',
], function($, _, Backbone, Registry, AreaSelect, ApiKey, LocalStorage, Game, Record, Games, RecordView, AchievementView, GameView, GamesView, ScorerView,LoginView,NavView){
	
	var $dashboardArea = $('#dashboardArea'),
		$scorerArea = $('#scorerArea'),
		$gameArea = $('#gameArea'),
		$statsArea = $('#statsArea');
  
	var Router = Backbone.Router.extend({
	
		routes : {
			'dashboard/:userid' : 'dashboard',
			'scoregame' : 'scoregame',
			'stats/:userid' : 'stats',
			'game/:gameid' : 'gameDetail',
			'logout' : 'logout',
			'' : 'default', 
			'*notFound' : 'notFound'
		},
	
		dashboard : function(userid){    
			
			if(this.controllerUserIDCheck(userid)){
				
				Registry.userid = userid;
				
				this.recordView = new RecordView({
					model : Registry.models.record
				});
				
				Registry.models.record.fetch({
					success : function(){
						$dashboardArea.find('#johnsonbox').html(Registry.App.recordView.render().el);
					}
				});

				this.gamesView = new GamesView({
					collection : Registry.collections.games
				});
				
				Registry.collections.games.fetch({
					success : function(){
						$dashboardArea.find('#history table tbody').append(Registry.App.gamesView.render().el);
						$dashboardArea.find('#history').show();
					}
				});
				 
				AreaSelect($dashboardArea);
				this.generateNavView(userid);
			}
			       
		},
	
		scoregame : function(){
			              
			if(Registry.adminid !== ""){
				
				Registry.userid = Registry.adminid;
				
				this.scorerView = new ScorerView({
					model : new Game({isNew:true,userid:Registry.userid})
				});
			    
				AreaSelect($scorerArea)
				$scorerArea.find('#scorer').empty(); 
				$scorerArea.find('#scorer').append(this.scorerView.render().el);
				
				this.generateNavView(Registry.userid);
				 
			}else{
				this.notFound();
			}
			
		},
		
		gameDetail : function(gameid){ 
			var that = this;

			this.gameView = new GameView({
				model : new Game({id:gameid})
			});
		
			this.gameView.model.fetch({
				success : function(){
					gameArea.find('#gameDetail').empty();
					gameArea.find('#gameDetail').append(that.gameView.render().el);
				}
			});
			
			this.generateNavView(Registry.userid); 
		},
		
		stats : function(userid){
			
			if(this.controllerUserIDCheck(userid)){
				
				Registry.userid = userid;
				
				this.achievementView = new AchievementView({
					model : Registry.models.record
				});
				
				Registry.models.record.fetch({
					success : function(){
						$statsArea.find('#achievements').html(Registry.App.achievementView.render().el);
						$statsArea.find('#achievements').show();
					}
				});
				
				AreaSelect($statsArea);			
                this.generateNavView(userid);
			} 
			
		},
		
		generateNavView : function(userid){
			
			if(this.controllerRegistryContinuity(userid)){
				this.navView = new NavView({
					model : Registry
				});
			}else{ 
				$('#nav_topbar').empty();
			}
			
		},
		
		default : function(){
			if(Registry.adminid !== ""){
				Registry.App.navigate('/dashboard/'+Registry.adminid, true);
			}else{
				this.notFound();
			}
		},
		
		logout : function(){
			LocalStorage.set('');
			Registry.adminid = "";
			this.notFound();
		},
		
		notFound : function(){
			$('#nav_topbar').empty();
        	this.loginView = new LoginView();
		},
		
		controllerUserIDCheck : function(userid){
			
			if(!ApiKey.validateEmail(ApiKey.toString(userid))){
				this.notFound();
				return false;
			}else{
				return true;
			} 
			
		},
		
		controllerRegistryContinuity : function(userid){
			return userid === Registry.adminid;
		}
	
	});
	
	return Router;

});