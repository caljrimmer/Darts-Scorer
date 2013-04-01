define([
  'Router',
  'Registry',
  'models/Record',
  'collections/Games'
], function(Router, Registry, Record, Games){
                                         
	Registry.collections.games = new Games();
	Registry.models.record = new Record();
    Registry.App = new Router(); 
	return Registry; 

}); 