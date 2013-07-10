define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'GA',
  'text!templates/scorerButton.html'
], function($, _, Backbone, Registry, GA, scorerButtonTemplate){
	
	var ScorerButtonView = Backbone.View.extend({

		template : _.template(scorerButtonTemplate),
	   
		el : $('#NewScorerButton'),
		
		events : {
			'click a' : 'eventTrack'
		},
	
		initialize : function(){
			this.render();
		},
		
		render : function(){
			$(this.el).html(this.template(this.model));
			return this;
		},
		
		eventTrack : function(e){
			GA.PageButtonClicked($(e.target).attr('href'));
		}
	  
	});
	
	return ScorerButtonView;

});