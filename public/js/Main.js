require.config({
    paths: {
        'jquery' : 'vendor/jquery',
        'timeago' : 'vendor/jquery.timeago',
		'color' : 'vendor/jquery.color',
        'underscore' : 'vendor/underscore',
        'backbone' : 'vendor/backbone',
		'backboneStorage' : 'vendor/backbone.localstorage',
		'd3' : 'vendor/d3',
		'text' : 'vendor/text'
    },
	shim: {
		d3: {
            exports: 'd3'
        },
		underscore: {
			exports: '_'
		},
		timeago : {
			deps: ["jquery"],
			exports: "timeago" 
		},
		color : {
			deps: ["jquery"],
			exports: "color" 
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}  
	 } 
});

require([
  'App',
  'Zoom'
], function(App,Zoom){

	Backbone.history.start();                   
	
	//Makes App Global. Only needed if debugging.
	window.App = App;
	
	//Resize window for mobile devices
	Zoom();
	
});