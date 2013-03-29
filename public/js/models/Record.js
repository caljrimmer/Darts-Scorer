define([
  'jquery',
  'underscore',
  'backbone',
  'backboneStorage',
  'Registry'
], function($, _, Backbone, BackboneStorage, Registry){
                           
	if(Registry.store === "local"){
		
		var Record = Backbone.Model.extend({
		
			localStorage: new Store("Record"),
			
			//This is a shared method from Node Server. It emulates Records being returned.
			gamesToRecord : function(results){
						  
				 var recordObj = {
					userid : Registry.adminid,
					games : results.length,
					ave : 0.00,
					bestAve : 0.00,
					bestCheckout : 0, 
					highest3d : 0, 
					leastDarts : 1000, 
					oneEighty : 0, 
					oneForty : 0, 
					oneTwenty : 0, 
					oneHundred : 0,
					greeneye : 0,
					bullseye : 0,
					singles : 0,
					doubles : 0,
					trebles : 0,
					shanghai : 0
				},
					index = 0;

				_.each(results,function(result,i){                  

					var iteration = 0;

					if(i < 30){
						recordObj.ave += result.ave;
						index = (i + 1)
					}

	            	if(result.ave > recordObj.bestAve){
		            	recordObj.bestAve = result.ave;
					}

					if(result.achievements.checkout > recordObj.bestCheckout){
		            	recordObj.bestCheckout = result.achievements.checkout;
					} 

					if(result.achievements.highest3d > recordObj.highest3d){
		            	recordObj.highest3d = result.achievements.highest3d;
					}         

					if(result.numberDarts < recordObj.leastDarts && result.numberDarts > 0){
		            	recordObj.leastDarts = result.numberDarts;
					}

					_.each(recordObj,function(v,k){
						if(iteration > 6){  
							if(result.achievements[k] > 0){
				            	recordObj[k] = recordObj[k] + result.achievements[k];
							}
						}
						iteration +=1;
					});

				});

				if(index > 0){
					recordObj.ave = Math.round(recordObj.ave/index * 100)/100;
				}

				if(recordObj.leastDarts === 1000){
					recordObj.leastDarts = 0;
				}
				
				this.set(recordObj)    

			}
		
		});
		
		return Record;
	
	}
	
	if(Registry.store === "live"){
		
		var Record = Backbone.Model.extend({
		
			urlRoot : '/api/records/',
		
			defaults : {
				games: 0,
				ave: 0.00,
				bestAve: 0.00,
				bestCheckout: 0,
				highest3d: 0,
				leastDarts: 0,
				oneEighty: 0,
				oneForty: 0,
				oneTwenty: 0,
				oneHundred: 0,
				greeneye: 0,
				bullseye: 0,
				singles: 0,
				doubles: 0,
				trebles: 0,
				shanghai: 0
			},
		
			sync : function(method,model,options){
			    $.ajaxSetup({headers:{userid:Registry.userid}});
			    Backbone.sync(method,model,options);
			}

		});
	
		return Record; 
	
	}

});