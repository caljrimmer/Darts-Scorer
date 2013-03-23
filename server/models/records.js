var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecordSchema = new Schema({
	userID : {type : String, required : true},
	games : {type :Number, required : true},
	ave : {type :Number, required : true},
	bestAve : {type :Number, required : true},
	bestCheckout : {type :Number, required : true}, 
	highest3d : {type :Number, required : true}, 
	leastDarts : {type :Number, required : true}, 
	oneEighty : {type :Number, required : true}, 
	oneForty : {type :Number, required : true}, 
	oneTwenty : {type :Number, required : true}, 
	oneHundred : {type :Number, required : true},
	greeneye : {type :Number, required : true},
	bullseye : {type :Number, required : true},
	singles : {type :Number, required : true},
	doubles : {type :Number, required : true},
	trebles : {type :Number, required : true},
	shanghai : {type :Number, required : true} 
}); 

//Initiate
mongoose.model('Record',RecordSchema);
exports.model = mongoose.model('Record');
