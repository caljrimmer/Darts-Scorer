// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'Router',
  'Registry',
  'models/Record',
  'collections/Games'
], function($, _, Backbone, Router, Registry, Record, Games){
	
	var $dashboardArea = $('#dashboardArea');
    
    //Registry is used for shared objects that have been instansiated
    Registry.models.record = new Record();
	Registry.collections.games = new Games();
   	Registry.App = new Router();
	
	//Returning Registry gets associated to window.App in main.js.
	return Registry; 

}); 