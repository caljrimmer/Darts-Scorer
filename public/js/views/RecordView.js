define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'text!templates/record.html',
], function($, _, Backbone, Registry, recordTemplate){
	
	
	var RecordView = Backbone.View.extend({
		
		template : _.template(recordTemplate),
	
		initialize : function(){
			_.bindAll(this,'render','updateRecord'); 
			this.games = Registry.collections.games;
			this.model.bind('change',this.render);
			this.model.bind('reset',this.render);
			this.model.bind('updateRecord',this.updateRecord)
		},
	
		render : function(){
			var renderContent = this.template(this.model.toJSON());
			$(this.el).html(renderContent);
			return this;
		},
		
		/**
		* This is to create the average 3 Darts over the last 10 games
		* This can be calculated on the server but will be out of date once a game is scored
		*/
		
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
			this.model.fetch();
		}
	
	});
	
	return RecordView;

});