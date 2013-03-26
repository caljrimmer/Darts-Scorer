var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
	id : {type : String, required: true}, 
	userid : {type : String},
	gameStart : {type : Date, default : new Date()},
	gameEnd : {type : Date},
	score : {type : Number, default: 501}, 
	ave : {type : Number, default: 0.00},
	numberDarts : {type : Number, default: 0},  
	type : {type : Number, default: 501},
	achievements : {
		checkout : {type :Number, default:0}, 
		highest3d : {type :Number, default:0}, 
		oneEighty : {type :Number, default:0}, 
		oneForty : {type :Number, default:0}, 
		oneTwenty : {type :Number, default:0}, 
		oneHundred : {type :Number, default:0},
		greeneye : {type :Number, default:0},
		bullseye : {type :Number, default:0},
		singles : {type :Number, default:0},
		doubles : {type :Number, default:0},
		trebles : {type :Number, default:0},
		shanghai : {type :Number, default:0}
	},
	rounds : {type : Array}
}); 

//Initiate
exports.model = mongoose.model('Game',GameSchema);