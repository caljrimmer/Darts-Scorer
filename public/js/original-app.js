/**
* Backbone App in a Closure to protect Global Scope
*/

(function($) {
	
	//Kick off when all Dom Loaded
	$(function(){

		var $dashboardArea = $('#dashboardArea'),
			$scorerArea = $('#scorerArea');
	
		var Record = Backbone.Model.extend({
			urlRoot : '/records',
		});
	
		var RecordView = Backbone.View.extend({
			
			template : _.template($('#record-template').html()),
		
			initialize : function(){
				_.bindAll(this,'render');
				this.model.bind('change',this.render);
				this.model.bind('reset',this.render);
			},
		
			render : function(){
				var renderContent = this.template(this.model.toJSON()); 
				$(this.el).html(renderContent); 
				return this;
			}
		
		});
	
		var AchievementView = Backbone.View.extend({
			
			template : _.template($('#achievement-template').html()), 
		
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
	 
		var Game = Backbone.Model.extend({
		
			defaults : {
			    gameStart: new Date(),
				gameEnd: new Date(),
			    numberDarts: 0,
				ave: 0.00,
				type: 501,
				score : 501,
				
			},
			
			initialize : function(){
				this.setNestedDefaults();
			},
			
			//The correctly resets the defaults when creating a new Game model.
			setNestedDefaults : function(){
				this.set({achievements : {
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
					score : 501
				}]});
			},
		
			inProgress : function(){
				return this.get('numberDarts') > 0;
			},
		
			isFinished : function(){
				return this.get('score') === 0;
			}
		
		});
	
		var ScorerView = Backbone.View.extend({
			
			template : _.template($('#scorer-template').html()),
			
			events : {
				'click #addScore' : 'addScore',
				'click #newGame' : 'newGame'
			},
		
			initialize : function(){
				_.bindAll(this,'render');
				this.numberDarts = 0;
				//Use a save state as it collates all data before set method. Thus not firing view updates too often.
				this.saveState = {};
				this.collection = games;
				this.record = record;
				this.model.bind('change',this.render);
				this.model.bind('reset',this.render);
			},
		
			render : function(){
				var renderContent = this.template(this.model.toJSON());
				$(this.el).html(renderContent);
				this.renderRow(); 
				return this;
			},
			
			renderRow : function(){
				var rounds = this.model.toJSON().rounds,
					that = this;
				$.each(rounds,function(i){
					var view = new ScorerRowView({
	                    round: rounds[i],
						model : that.model
	                });
					that.$("tbody").append(view.render().el);
				});
			},
			
			newGame : function(){
				App.scoregame();
			},
			
			addScore : function(){
				var scoreInput = $('#scoreInput'),
					scoreObj = {},
					rounds = this.model.get('rounds');
					
				scoreInput.removeClass('input_error');
				
				if(dartsScorer.scoreValidate(scoreInput.val())){
					this.scoreObjCreate(scoreObj,scoreInput.val());
					this.updateGameModel(scoreObj,rounds)
				}else{
					scoreInput.addClass('input_error');
				}   
			},
			
			createRound : function() {
				this.model.get('rounds').unshift({
					darts:[],
					total:0,
					score:this.model.get('score')
				});
			},
			
			scoreObjCreate : function(scoreObj,rawScore){ 
				
				scoreObj.score = this.model.get('score') - dartsScorer.scoreParse(rawScore);
				scoreObj.desc = dartsScorer.scoreSanitise(rawScore); 
				
				if(this.model.get('score') > (dartsScorer.scoreParse(rawScore) + 1)){
                	return scoreObj;
				}else if(this.endGameCheck(dartsScorer.scoreParse(rawScore),scoreObj.desc)){
					return scoreObj;
				}else{
					scoreObj.score = this.model.get('score');
					return scoreObj;
				}  

			},
			
			updateGameModel : function(scoreObj,rounds){
				this.saveState = {};
				this.updateScore(scoreObj.score);
				this.updateRound(scoreObj,rounds);
				this.updateNumberOfDarts();
				this.updateAverage(scoreObj.score);
				this.model.set(this.saveState)
				if(this.model.isFinished()){
					this.finishGame();
				}
			},
			
			updateAverage : function(score){
				var type = this.model.get('type'),
					ave;
				ave = Math.round(((type - score) / this.numberDarts) * 3 *100)/100
				this.saveState.ave = ave;
			},
			
			updateNumberOfDarts : function(){
				this.saveState.numberDarts = this.numberDarts;
			},
			
			updateScore : function(score){
				this.model.set({score:score});
			},
			
			updateRound : function(scoreObj,rounds){
				rounds[0].darts.push(scoreObj);
				this.model.set({rounds:rounds});
				++this.numberDarts;
				if(this.numberDarts % 3 === 0){
					this.updateAchievements()
					this.createRound();	
				}
			},
			
			updateAchievements : function(){
				
				var achievements = this.model.get('achievements'),
					round = this.model.get('rounds')[0],
					total = dartsScorer.scoreParse(round.darts[0].desc) 
							+ dartsScorer.scoreParse(round.darts[1].desc) 
							+ dartsScorer.scoreParse(round.darts[2].desc);
			
				if(achievements.highest3d < total){
					achievements.highest3d = total;
				}
			
				if(total === 180){
					++achievements.oneEighty;
				}
			
				if(total > 139 && total < 180){
					++achievements.oneForty;
				}
			
				if(total > 119 && total < 140){
					++achievements.oneTwenty;
				}
			
				if(total > 99 && total < 120){
					++achievements.oneHundred;
				}
			
				if(dartsScorer.singlesAch(round.darts)){
					++achievements.singles;
				}
			
				if(dartsScorer.doublesAch(round.darts)){
					++achievements.doubles;
				}
			
				if(dartsScorer.treblesAch(round.darts)){
					++achievements.trebles;
				}
			
				if(dartsScorer.bullsEyeAch(round.darts)){
					++achievements.bullseye;
				}
			
				if(dartsScorer.greenEyeAch(round.darts,total)){
					++achievements.greeneye;
				}
			
				if(dartsScorer.shanghaiAch(round.darts,total)){
					++achievements.shanghai;
				}
			
				this.saveState.achievements = achievements;  
				
			},
			
			endGameCheck : function(score,desc){
				if(this.model.get('score') - score === 0 && dartsScorer.doublesValidate(desc)){
					return true;
				}else{
					return false;
				}
			},
			
			recordUpdate : function(){
			    this.record.trigger('updateRecord',this.model);
			},
			
			gamesUpdate : function(){
				this.collection.trigger('addGame',this.model);
			},
			
			finishGame : function(){
			    this.recordUpdate();
				this.gamesUpdate();
				this.model.set({gameEnd:new Date()});  
				this.$('#score_buttons').hide();
				this.$('#restart_buttons').show();
			}
			
		});
		
		var ScorerRowView = Backbone.View.extend({
			
			template : _.template($('#scorer-template-row').html()),
			tagName : 'tr',
		
			initialize : function(){
				this.round = this.options.round;
				this.darts = this.options.round.darts;
				_.bindAll(this,'render');

			},
		
			render : function(){                              
				var renderContent = this.template(this.round);
				$(this.el).html(renderContent);
				this.renderIndividualDarts();
				return this;
			},
			
			renderIndividualDarts : function(){ 
				var that = this;                                  
				$.each(this.darts,function(i){
					var dart = new ScorerDartView({dart: that.darts[i],model:that.model,round:that.round});
					that.$("td").eq(i+1).html(dart.render().el);
					that.$(".score_total").html(that.round.score);
				});
			}
			
		});
		
		var ScorerDartView = Backbone.View.extend({
			
			template : _.template($('#scorer-template-row-individual').html()),
			tagName : 'div',
			className : 'dart_score',
			
			events : {
				'dblclick h2,p' : 'deleteDart'
			},
		
			initialize : function(){
				this.dart = this.options.dart;
				_.bindAll(this,'render');
			},
		
			render : function(){
                var that = this;
				var renderContent = this.template(this.dart);
				$(this.el).html(renderContent); 
				return this;
			},
			
			deleteDart : function(){
				console.log('dblclick');
			}
			
		}); 
	
		var Games = Backbone.Collection.extend({
			model : Game,
			url : '/games'
		}); 
	
		var GameView = Backbone.View.extend({
		
			tagName : 'tr',
			template : _.template($('#game-row').html()), 
		
			events : {
				'click .button' : 'deleteGame'
			},
		
			initialize : function(){
				
			},
		
			render : function(){
				var renderContent = this.template(this.model.toJSON());
				$(this.el).html(renderContent); 
				return this;
			},
		
			deleteGame : function(){
				this.collection.trigger('removeGame',this.model);
			}
		
		});
	
		var GamesView = GameView.extend({
		
			initialize : function(){
				_.bindAll(this,'render','removeGame','addGame');                 
				this.collection.bind('remove',this.render)
				this.collection.bind('reset',this.render);         
				this.collection.bind('addGame',this.addGame)
				this.collection.bind('removeGame',this.removeGame);
			},
		
			render : function(){
			
				var $games = $('#history table tbody'),
					collection = this.collection,
					that = this;
			
				$games.find('tr').not('.tb_subheader').remove();
			 
				collection.each(function(game){
					that.timeAgo(game);
					that.achievements(game);
					var view = new GameView({
						model: game,
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
				this.collection.remove(game);
			},
		
			timeAgo : function(game){ 
				time = $.timeago(game.get('gameEnd'));
				game.set({gameEndFormat:time})
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
	
	
		var Router = Backbone.Router.extend({
		
			routes : {
				'' : 'dashboard',
				'scoregame' : 'scoregame'
			},
		
			initialize : function(){
			
				this.recordView = new RecordView({
					model : record
				});
			
				this.achievementView = new AchievementView({
					model : record
				}); 
			
				this.gamesView = new GamesView({
					collection : games
				}); 
			
			},
		
			dashboard : function(){
				$scorerArea.hide();
				$dashboardArea.show();          
			},
		
			scoregame : function(){

				var $scorerWrapper = $scorerArea.find('#scorer');
				$scorerArea.show();
				$dashboardArea.hide();
				
				this.scorerView = new ScorerView({
					model : new Game()
				});

				$scorerWrapper.empty(); 
				$scorerWrapper.append(this.scorerView.render().el);
			}
		
		});
	    
		/**
		* Build Models and Kick off App
		* All namespaced within this closure
		*/

			record = new Record({id:Server.userId}),
			games = new Games(),
		    dartsScorer = new DartsScorer(),
		    App = new Router();
		
		//Initial grab dashboard data on load
		record.fetch({
			success : function(){
				$dashboardArea.find('#johnsonbox').append(App.recordView.render().el);
				$dashboardArea.find('#achievements').append(App.achievementView.render().el);
			}
		});
	
		games.fetch({
			success : function(){
				$dashboardArea.find('#history table tbody').append(App.gamesView.render().el);
			}
		}); 
		
		Backbone.history.start();

	});

})(jQuery);