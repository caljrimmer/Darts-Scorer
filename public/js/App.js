define([
  'jquery',
  'underscore',
  'backbone',
  'Router',
  'Registry',
  'models/Record',
  'collections/Games',
  'views/LoginView'
], function($, _, Backbone, Router, Registry, Record, Games, LoginView){
                                         
	Registry.collections.games = new Games();
	Registry.models.record = new Record();
    Registry.App = new Router(); 
	return Registry; 

}); 