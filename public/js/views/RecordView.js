define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'AreaSelect',
  'text!templates/record.html',
], function($, _, Backbone, Registry, AreaSelect, recordTemplate){
	
	
	var RecordView = Backbone.View.extend({
		
		 el : $('#johnsonbox'),
		
		template : _.template(recordTemplate),
	
		initialize : function(){
			_.bindAll(this,'render','updateRecord'); 
			this.model.bind('change',this.render);
			this.model.bind('reset',this.render);
			this.model.bind('updateRecord',this.updateRecord);
			this.updateRecord();
		},
	
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		},
		
		controllerSetAverage : function(gamesAveArray){
			var gamesAveTotal = 0,
				index = 0,
				gamesAve;
			$.each(gamesAveArray,function(k,v){
				if(k < 10){
					gamesAveTotal = gamesAveTotal + v;
					index = k + 1;
				}else{
					index = 10 + 1;
				}
			});
			return Math.round((gamesAveTotal/index)*100)/100;
		},
		
		updateRecord : function(){
			var that = this; 
			this.model.fetch({
				success : function(){
					that.render();
				}
			});
		}
	
	});
	
	return RecordView;

});