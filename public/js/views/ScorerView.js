define([
  'jquery',
  'underscore',
  'backbone',
  'DartsScorer',
  'Registry',
  'AreaSelect',
  'Lang',
  'views/BaseView',
  'views/ScorerRowView',
  'text!templates/scorer.html',
], function($, _, Backbone, DartsScorer, Registry, AreaSelect, Lang, BaseView, ScorerRowView, scorerTemplate){

	var ScorerView = BaseView.extend({
		
		el  :$('#scorer'),
		
		template : _.template(scorerTemplate),
		
		events : {
			'click #addScore' : 'eventAddScore',
			'click #graphicScorer a' : 'eventAddGraphicScore',
			'click .dart_score h2,.dart_score p' : 'eventDeleteDart',
			'click #newGame' : 'eventNewGame',
			'keypress #scoreInput' : 'eventEnter',
			'click #keyboardView' : 'eventkeyboardView',
			'click #graphicView' : 'eventgraphicView'
		},
	
		initialize : function(){
			_.bindAll(this,'render');
			this.model.set({checkoutRoute:DartsScorer.checkoutCalculation(1000)});
			this.model.set({scorerInput:'graphic'});
			this.model.bind('change',this.render);
		},
	
		render : function(){
			var model = this.model.toJSON();       
			model = _.extend(model,Lang[Registry.lang].Template.Scorer)
			var renderContent = this.template(model); 
			$(this.el).html(renderContent);
			this.renderRow(); 
			this.renderScorerInput();
			return this; 
		},
		
		renderRow : function(){ 
			var rounds = this.model.toJSON().rounds,
				that = this;
			$.each(rounds,function(i){
				var view = new ScorerRowView({
                    round : rounds[i]
                });
				that.$("tbody").prepend(view.render().el);
			});
		},
		
		renderScorerInput: function($target,$button){
			var scorerInput = this.model.get('scorerInput');
			if(scorerInput === "graphic"){
				$(this.el).find('#graphicView').addClass('on');
				$(this.el).find('#graphicScorer').show();
			}else{
				$(this.el).find('#keyboardView').addClass('on');
				$(this.el).find('#score_buttons').show();
			}
		}, 
		
		afterRender : function(){ 
			this.$('#score_buttons').hide();
			this.$('#restart_buttons').show();
		},                      
		
		controllerDartListObj : function(value){
			return {
				desc : DartsScorer.scoreSanitise(value),
				score : DartsScorer.scoreParse(value)
			}
		},
		
		controllerAverage : function(type,score,numberDarts){
			return Math.round(((type - score) / numberDarts) * 3 *100)/100 
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
		
		controllerEndGameCheck : function(score,curScore,desc){
			if((score >= curScore) && (score - curScore !== 1)){
				if(score === curScore){
					return DartsScorer.doublesValidate(desc);
				} 
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
		
		controllerRoundMaker : function(list){
			var count = list.length,
				that = this,
				obj = {
					total : 0,
					score : 501,
					darts : []
				},
				score = 0,       
				loop = 0,
				parentArray = [];
			                     
			$.each(list,function(k,v){
				var curScore = DartsScorer.scoreParse(v.desc);
				v.index = k;
				score -= curScore; 
				obj.total += curScore;
				     
				if(that.controllerEndGameCheck(obj.score,curScore,v.desc)){
					obj.score -= curScore;
				}
				
				v.score = obj.score;
				
				obj.darts.push(v);
				parentArray[loop] = obj;
				if ((k + 1) % 3 === 0){
					loop = ((k + 1) / 3)
					tmp = [];
					obj = {
						total : 0,
						score : obj.score,
						darts : []
					};
				}
			});
			
			return parentArray;
		},
		
		controllerAchievementsCalculate : function(ach,rounds){
			var that = this;
			$.each(rounds,function(k,v){
				if(v.darts.length === 3){
					ach = that.controllerUpdateAchievements(ach,v);
				}
			});
			
			return this.controllerEndGame(ach,rounds);
		},
		
		updateDartListAdd : function(scoreObj){
			var list = this.model.get('list');
			
			list.push(scoreObj);
			this.model.set({
				list:list,
				rounds:this.controllerRoundMaker(list)
			});
			
			this.updateGameModelNew();

		},
		
		updateDartListRemove : function(e){
			var needle = parseInt($(e.target).data('index')),
				list = this.model.get('list');
				
			list.splice(needle,1);
			this.model.set({
				list:list,
				rounds:this.controllerRoundMaker(list)
			});
			
			this.updateGameModelNew();
		},
		
		updateGameModelNew : function(){  
			
			var rounds = this.model.get('rounds'),
				score = rounds[rounds.length-1].score,
				that = this;
				
			this.model.set({
				score:score,
				numberDarts : this.model.get('list').length,
				checkoutRoute:DartsScorer.checkoutCalculation(score),
				ave : this.controllerAverage(
					this.model.get('type'),
					score,
					this.model.get('list').length
				)
			});
			
			if(this.model.isFinished()){
				
				this.model.set({
					newlyCreated: false,
					gameEnd:new Date(),
					achievements: this.controllerAchievementsCalculate(this.model.get('achievements'),rounds) 
				});

				this.model.save({},{
					success : function(model, response, options){ 
						Registry.collections.games.trigger('updateGames',model);
						that.afterRender();
					}
				});
			}
			
		},
		
		eventNewGame : function(){
			Registry.App.scoregame();
		},
		
		eventAddScore : function(){
			 
			var scoreInput = this.$('#scoreInput'),
				rounds = this.model.get('rounds');
 
			if(DartsScorer.scoreValidate(scoreInput.val())){
				this.updateDartListAdd(this.controllerDartListObj(scoreInput.val()));
			}else{
				scoreInput.addClass('input_error');
			}
		
			this.$('#scoreInput').focus();    

		},
		
		eventAddGraphicScore : function(e){
			e.preventDefault();
			
			var scoreInput = $(e.target).attr('data-desc'),
				rounds = this.model.get('rounds');
 
			if(DartsScorer.scoreValidate(scoreInput)){
				this.$('#scoreInput').val(scoreInput)
				this.updateDartListAdd(this.controllerDartListObj(scoreInput));
			}
		},
		
		eventEnter : function(e){
			this.$('#scoreInput').removeClass('input_error');
			if (e.keyCode == 13) {
				this.eventAddScore();
			}
		},
		
		eventDeleteDart : function(e){
			var that = this;           
			if(this.model.get('newlyCreated')){
				$(e.target).parents('.dart_score').animate({
					opacity : 0.5
				},500,function(){
					that.updateDartListRemove(e)
				});                                 
			}
		},
		
		eventkeyboardView : function(e){
			e.preventDefault();
			this.model.set({scorerInput:'keyboard'});
		},
		
		eventgraphicView : function(e){
			e.preventDefault();   
			this.model.set({scorerInput:'graphic'});
		}
		
	});
	
	return ScorerView;

});