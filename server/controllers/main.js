var _ = require('underscore'),
	mongoose = require('mongoose'),
	util = require('util'),
	Game = require('../models/games.js').model,
	Record = require('../models/records.js').model;

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
	
	Model : Record, 
	
	create : function(req,res) {
		
		var record = new this.Model();
		
		if(req.params.id){
			sendApiError('If you wish to CREATE record then use /api/records not /api/records/:id',res);
			return false;
		}
		
		create(record,req,res);
		
	},
	
    readOne : function(req,res){
	
		var id = userID;
		
		if(!id){
			sendApiError('If you wish to READ record then use /api/records/:id not /api/records',res);
			return false;    
		}
	
		readOne(this.Model,id,req,res); 
		
	},
	
	update : function(req,res){
		
		var id = userID;
		
		if(!id){
			sendApiError('If you wish to UPDATE record then use /api/records/:id not /api/records',res);
			return false;
		}
		
		update(this.Model,id,req,res)

	}
	
}
 