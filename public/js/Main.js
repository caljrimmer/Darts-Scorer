require.config({
    paths: {
        'jquery' : 'vendor/jquery',
        'timeago' : 'vendor/jquery.timeago',
        'underscore' : 'vendor/underscore',
        'backbone' : 'vendor/backbone',
		'text' : 'vendor/text'
    },
	shim: {
		underscore: {
			exports: '_'
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