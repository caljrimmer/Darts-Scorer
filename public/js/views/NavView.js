define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'GA',
  'text!templates/nav.html'
], function($, _, Backbone, Registry, GA, navTemplate){
	
	var NavView = Backbone.View.extend({

		template : _.template(navTemplate),
	   
		el : $('#nav_topbar'),             
		
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
	
	return NavView;

});