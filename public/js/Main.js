require.config({
    paths: {
        'jquery' : 'vendor/jquery',
        'timeago' : 'vendor/jquery.timeago',
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
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}  
	 } 
});

require([
  'App',
], function(App){

	Backbone.history.start();                   
	
	//Makes App Global. Only needed if debugging.
	window.App = App;
	
});