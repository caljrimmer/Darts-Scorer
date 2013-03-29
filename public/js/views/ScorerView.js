define([
  'jquery',
  'underscore',
  'backbone',
  'DartsScorer',
  'Registry',
  'AreaSelect',
  'views/ScorerRowView',
  'text!templates/scorer.html',
], function($, _, Backbone, DartsScorer, Registry, AreaSelect, ScorerRowView, scorerTemplate){

	var ScorerView = Backbone.View.extend({
		
		el : $('#scorer'),
		
		template : _.template(scorerTemplate),
		
		events : {
			'click #addScore' : 'eventAddScore',
			'click #newGame' : 'eventNewGame',
			'keypress #scoreInput' : 'eventEnter'
		},
	
		initialize : function(){
			_.bindAll(this,'render','updateTasks');
			this.numberDarts = 0;
			this.saveState = {};
			this.collection = Registry.collections.games;
			this.record = Registry.models.record;
			this.model.set({checkoutRoute:DartsScorer.checkoutCalculation(1000)});
			this.render();
			this.model.bind('sync',this.updateTasks);
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
		
		afterRender : function(){ 
			this.$('#score_buttons').hide();
			this.$('#restart_buttons').show();
		},
		
		controllerScoreObjCreate : function(scoreObj,rawScore,currentScore){
			scoreObj.score = currentScore - DartsScorer.scoreParse(rawScore);
			scoreObj.desc = DartsScorer.scoreSanitise(rawScore); 
			if((currentScore > (DartsScorer.scoreParse(rawScore) + 1)) ||
			 	this.controllerEndGameCheck(DartsScorer.scoreParse(rawScore),scoreObj.desc)){
			}else{   
				scoreObj.score = currentScore;
			}
			return scoreObj;  
		},
		
		controllerAverage : function(type,score,numberDarts){
			return Math.round(((type - score) / this.numberDarts) * 3 *100)/100 
		},
		
		controllerUpdateAchievements : function(achievements,round){
			var total = DartsScorer.scoreParse(round.darts[0].desc) 
					  + DartsScorer.scoreParse(round.darts[1].desc) 
					  + DartsScorer.scoreParse(round.darts[2].desc);
		
			if(achievements.highest3d < total){
				achievements.highest3d = total;
			}
			
			if(DartsScorer.oneEightyAch(total)){
				++achievements.oneEighty;
			}
			
			if(DartsScorer.oneFortyAch(total)){
				++achievements.oneForty;
			} 
			
			if(DartsScorer.oneTwentyAch(total)){
				++achievements.oneTwenty;
			}
		
			if(DartsScorer.oneHundredAch(total)){
				++achievements.oneHundred;
			}
		
			if(DartsScorer.singlesAch(round.darts)){
				++achievements.singles;
			}
		
			if(DartsScorer.doublesAch(round.darts)){
				++achievements.doubles;
			}
		
			if(DartsScorer.treblesAch(round.darts)){
				++achievements.trebles;
			}
		
			if(DartsScorer.bullsEyeAch(round.darts)){
				++achievements.bullseye;
			}
		
			if(DartsScorer.greenEyeAch(round.darts,total)){
				++achievements.greeneye;
			}
		
			if(DartsScorer.shanghaiAch(round.darts,total)){
				++achievements.shanghai;
			}
		
			return achievements;  
		},
		
		controllerEndGameCheck : function(score,desc){
			if(this.model.get('score') - score === 0 && DartsScorer.doublesValidate(desc)){
				return true;
			}else{
				return false;
			}
		},
		
		controllerEndGame : function(achievements,rounds){
			if(rounds[0].score === 0){
				achievements.checkout = rounds[1].score;
			}else{
				achievements.checkout = rounds[0].score; 
			}
		   return achievements;
		}, 
		
		updateGameModel : function(scoreObj,rounds){
			this.saveState = {};
			this.model.set({score:scoreObj.score,checkoutRoute:DartsScorer.checkoutCalculation(scoreObj.score)});
			this.updateRound(scoreObj,rounds);
			this.saveState.numberDarts = this.numberDarts;
			this.saveState.ave = this.controllerAverage(
				this.model.get('type'),
				this.model.get('score'),
				this.numberDarts
			);
			this.model.set(this.saveState);
			if(this.model.isFinished()){
				this.model.set({
					isNew: false,
					gameEnd:new Date(),
					achievements: this.controllerEndGame(
						this.model.get('achievements'),
						this.model.get('rounds')
					) 
				});
				this.model.save();
			}
		},

		updateRound : function(scoreObj,rounds){ 
			rounds[0].total = rounds[0].total + DartsScorer.scoreParse(scoreObj.desc);;
			rounds[0].darts.push(scoreObj);
			this.model.set({rounds:rounds});
			++this.numberDarts;
			if(this.numberDarts % 3 === 0){
				this.saveState.achievements = this.controllerUpdateAchievements(
					this.model.get('achievements'),
					this.model.get('rounds')[0]
				)
				this.model.get('rounds').unshift({
					darts:[],
					total:0,
					score:this.model.get('score')
				});	  
			}
		},
		
		updateTasks : function(model, response, options){ 
		    this.record.trigger('updateRecord',this.model);
			this.collection.trigger('updateAddGame',this.model);
			this.afterRender();
		},
		
		eventNewGame : function(){
			Registry.App.scoregame();
		},
		
		eventAddScore : function(){
			var scoreInput = this.$('#scoreInput'),
				scoreObj = {},
				rounds = this.model.get('rounds');
				
			scoreInput.removeClass('input_error');
			
			if(DartsScorer.scoreValidate(scoreInput.val())){
				this.controllerScoreObjCreate(scoreObj,scoreInput.val(),this.model.get('score'));
				this.updateGameModel(scoreObj,rounds)
			}else{
				scoreInput.addClass('input_error');
			}
			   
		},
		
		eventEnter : function(e){
			if (e.keyCode == 13) {
				this.eventAddScore();
				this.$('#scoreInput').focus();
			}
		}
		
	});
	
	return ScorerView;

});