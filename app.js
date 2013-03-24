//Required Modules
var express = require('express');
var app = express();
var controllers = require('./server/controllers/main.js');
var mongoDB; 

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session(
	{ secret: 'SpecialObsfication', 
	  cookie: {maxAge: 60000 * 60 * 24 * 30} //30 Days
	}
  ));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('test', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//Routes 

//Games

app.get('/api/games', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  controllers.games.readAll(req,res);
});

app.get('/api/games/:id', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  controllers.games.readOne(req,res);
});

app.post('/api/games', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  controllers.games.create(req,res);
});

app.put('/api/games/:id?', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  controllers.games.update(req,res);
});

app.delete('/api/games/:id?', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  controllers.games.destroy(req,res);
});  

//Record

app.get('/api/records', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  controllers.records.readOne(req,res);
});

app.post('/api/records', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  controllers.records.create(req,res);
});

app.put('/api/records/:id?', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  controllers.records.update(req,res);
});


//Kick of Server
app.listen(5000);
console.log("SERVER STARTS" + new Date()); 
console.log("Express server listening on port %d in %s mode", 5000, app.settings.env); 
