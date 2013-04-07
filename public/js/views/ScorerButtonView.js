define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'text!templates/scorerButton.html'
], function($, _, Backbone, Registry, scorerButtonTemplate){
	
	var ScorerButtonView = Backbone.View.extend({

		template : _.template(scorerButtonTemplate),
	   
		el : $('#NewScorerButton'),
	
		initialize : function(){
			this.render();
		},
		
		render : function(){
			$(this.el).html(this.template(this.model));
			return this;
		}
	  
	});
	
	return ScorerButtonView;

});