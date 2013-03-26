define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'text!templates/nav.html'
], function($, _, Backbone, Registry, navTemplate){
	
	var NavView = Backbone.View.extend({

		template : _.template(navTemplate),
	   
		el : $('#nav_topbar'),
	
		initialize : function(){
			this.render();
		},
		
		render : function(){
			$(this.el).html(this.template(this.model));
			return this;
		}
	  
	});
	
	return NavView;

});