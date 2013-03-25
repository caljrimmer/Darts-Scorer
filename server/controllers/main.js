var _ = require('underscore'),
	mongoose = require('mongoose'),
	util = require('util'),
	Game = require('../models/games.js').model;

mongoose.connect("mongodb://localhost/dartscorer");

// This is currently programmed to be a single user application
// To extend for a multi-user application then I will need to add something like "Passport" npm.
// Hard-coding UserID for now

var userID = "unique1";                
	
//Send to Browser Methods

var sendResult = function sendResult(result,res){
	
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(result));  
	
}

var sendApiError = function sendApiError(err,res){

	res.writeHead(200, { 'Content-Type': 'application/json' });
	var error = {};
	error.error = err;
	res.end(JSON.stringify(error));
	
}

//Generate GUID

var guidGenerate = function guidGenerate(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

//CRUD

var create = function create(model,req,res){ 
	
	model = _.extend(model,req.body);
	model.id = guidGenerate();
	model.userID = userID;
	model.save(function(err){
		if(err) {
			sendApiError(err,res);
			return false;
		} 
    	sendResult(model,res)
	}); 
	
	
};

var readOne = function read(model,needle,req,res){
	
	var query = {id:needle};
	
	model.findOne(query,function(err, results){
		if(err) {
			sendApiError(err,res);
			return false;
		} 
    	sendResult(results,res);
	});
	
}; 

var readAll = function read(model,limit,req,res){
	
	var dealWithResults = function dealWithResults(err, results){
		if(err) {
			sendApiError(err,res);
			return false;
		} 
    	sendResult(results,res);
	} 
    
	if(limit > 0){
		model
		.where('userID',userID)
		.sort('gameEnd',-1)
		.limit(30)
		.execFind(function(err, results){
			dealWithResults(err, results)
		});
	}else{
		model.find({userID:userID},function(err, results){
			dealWithResults(err, results)
		});
	}
	
};

var update = function update(model,needle,req,res){ 
	 
	//update method not user as it doesn't allow middleware
	model.findOne({id:needle}, function (err, doc) {
		if(err) {
			sendApiError(err,res);
			return false;
		}
		doc = _.extend(doc,req.body);
	  	doc.save(function(err){
			if(err) new Error(err); 
	    	sendResult(doc,res)
		});
	});
	
};

var destroy = function destroy(model,needle,req,res){
	
	model.remove({id:needle}, function (err, doc) {
		if(err) {
			sendApiError(err,res);
			return false;
		}
		sendResult({id:needle},res);
	});
	
};

	
//Public Methods

exports.games = {
	
	Model : Game, 
	
	create : function(req,res) {
		
		var game = new this.Model();
		
		if(req.params.id){
			sendApiError('If you wish to CREATE game then use /api/games not /api/games/:id',res);
			return false;
		}
		
		create(game,req,res);
		
	},
	
    readOne : function(req,res){
	
		var id = req.params.id;
		
		if(!id){
			sendApiError('If you wish to READ game then use /api/games/:id not /api/games',res);
			return false;    
		}
	
		readOne(this.Model,id,req,res); 
		
	},
	
	readAll : function(req,res){
	
		readAll(this.Model,30,req,res);
		
	},
	
	update : function(req,res){
		
		var id = req.params.id;
		
		if(!id){
			sendApiError('If you wish to UPDATE game then use /api/games/:id not /api/games',res);
			return false;
		}
		
		update(this.Model,id,req,res)

	},
	
	destroy : function(req,res){
		
		var id = req.params.id;
		
		if(!id){
			sendApiError('If you wish to DELETE game then use /api/games/:id not /api/games',res);
			return false;
		}
		
		destroy(this.Model,id,req,res);
		
	}
	
}

exports.records = {
	
	Model : Game, 
	
    readAll : function(req,res){
	
		var id = userID;
		
		if(!id){
			sendApiError('If you wish to READ record then use /api/records/:id not /api/records',res);
			return false;    
		}

		var dealWithResults = function dealWithResults(err, results){
			
			if(err) {
				sendApiError(err,res);
				return false;
			} 
			
			var recordObj = {
				userID : id,
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

			recordObj.ave = Math.round(recordObj.ave/index * 100)/100;
	    	sendResult(recordObj,res);
	
		} 
		
		Game
		.where('userID',id)
		.sort('gameEnd',-1)
		.execFind(function(err, results){
			dealWithResults(err, results)
		});    

		
	}
	
}
 