define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/scorer-dart.html'
], function($, _, Backbone, scorerDartTemplate){

	var ScorerDartView = Backbone.View.extend({
		
		template : _.template(scorerDartTemplate),
		tagName : 'div',
		className : 'dart_score',
	
		initialize : function(){
			this.dart = this.options.dart;
		},
	
		render : function(){
            var that = this;
			var renderContent = this.template(this.dart);
			$(this.el).html(renderContent); 
			return this;
		}
		
	});
	
	return ScorerDartView;

});