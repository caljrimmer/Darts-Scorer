define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'text!templates/dashboard.html'
], function($, _, Backbone, Registry, dashboardTemplate){
	
	var DashboardView = Backbone.View.extend({

		template : _.template(dashboardTemplate),
	   
		el : $('#dashboardArea'),
	
		initialize : function(){
			this.render();
		},
		
		render : function(){
			$(this.el).html(this.template(this.model));
			return this;
		}
	  
	});
	
	return DashboardView;

});