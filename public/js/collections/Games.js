define([
  'jquery',
  'underscore',
  'backbone',
  'Registry',
  'models/Game'
], function($, _, Backbone, Registry, Game){

	var Games = Backbone.Collection.extend({
		model : Game,
		url : '/api/games/',
		sync : function(method,model,options){
		    $.ajaxSetup({headers:{userid:Registry.userid}});
		    Backbone.sync(method,model,options);
		}
	});
	
	return Games;

});