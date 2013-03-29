define([
  'Router',
  'Registry',
  'models/Record',
  'collections/Games'
], function(Router, Registry, Record, Games){
                                         
	Registry.collections.games = new Games();
	Registry.models.record = new Record();
	if(Registry.store === "local"){
		Registry.collections.games.fetch({
			success : function(){
				Registry.models.record.gamesToRecord(Registry.collections.games.toJSON())
			}
		})
		
	}
    Registry.App = new Router(); 
	return Registry; 

}); 