define([
  'jquery',
  'underscore',
  'backbone',
  'DartsScorer',
  'Registry',
  'views/ScorerRowView',
  'text!templates/scorer.html',
], function($, _, Backbone, DartsScorer, Registry, ScorerRowView, scorerTemplate){

	var ScorerView = Backbone.View.extend({
		
		template : _.template(scorerTemplate),
		
		events : {
			'click #addScore' : 'addScore',
			'click #newGame' : 'newGame'
		},
	
		initialize : function(){
			_.bindAll(this,'render','syncTasks');
			this.numberDarts = 0;
			//Use a save state as it collates all data before set method. Thus not firing view updates too often.
			this.saveState = {};
			this.collection = Registry.collections.games;
			this.record = Registry.models.record;
			this.model.bind('sync',this.syncTasks);
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
			Registry.App.scoregame();
		},
		
		addScore : function(){
			var scoreInput = this.$('#scoreInput'),
				scoreObj = {},
				rounds = this.model.get('rounds');
				
			scoreInput.removeClass('input_error');
			
			if(DartsScorer.scoreValidate(scoreInput.val())){
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
			
			scoreObj.score = this.model.get('score') - DartsScorer.scoreParse(rawScore);
			scoreObj.desc = DartsScorer.scoreSanitise(rawScore); 
			
			if(this.model.get('score') > (DartsScorer.scoreParse(rawScore) + 1)){
            	return scoreObj;
			}else if(this.endGameCheck(DartsScorer.scoreParse(rawScore),scoreObj.desc)){
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
			rounds[0].total = rounds[0].total + DartsScorer.scoreParse(scoreObj.desc);;
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
				total = DartsScorer.scoreParse(round.darts[0].desc) 
						+ DartsScorer.scoreParse(round.darts[1].desc) 
						+ DartsScorer.scoreParse(round.darts[2].desc);
		
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
		
			this.saveState.achievements = achievements;  
			
		},
		
		endGameCheck : function(score,desc){
			if(this.model.get('score') - score === 0 && DartsScorer.doublesValidate(desc)){
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
		
		endGameUpdate : function(){
			var achievements = this.model.get('achievements');
				
			if(this.model.get('rounds')[0].score === 0){
				achievements.checkout = this.model.get('rounds')[1].score;
			}else{
				achievements.checkout = this.model.get('rounds')[0].score; 
			}

			this.model.set({gameEnd:new Date(),achievements:achievements}); 
		},
		
		UITidy : function(){ 
			this.$('#score_buttons').hide();
			this.$('#restart_buttons').show();
		}, 
		
		syncTasks : function(model, response, options){
			this.recordUpdate();
			this.gamesUpdate();
			this.UITidy();
		},
		
		finishGame : function(){
			this.endGameUpdate();
			this.model.save();
		}
		
	});
	
	return ScorerView;

});