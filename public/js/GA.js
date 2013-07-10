define([
  'jquery',
], function($){

	var gaPlugin;

	var GA = {

		initialize : function() {
			document.addEventListener("deviceready", this.onDeviceReady, true); 
		},

		onDeviceReady : function() {
		
			gaPlugin = window.plugins.gaPlugin;        

			gaPlugin.init(
				this.nativePluginResultHandler, 
				this.nativePluginErrorHandler, 
				"UA-40507442-1", 
				10
			);
		
		},

		permissionCallback : function(button) {
			if (button === 1){
				gaPlugin.init(
					this.nativePluginResultHandler, 
					this.nativePluginErrorHandler, 
					"UA-40507442-1", 
					10
				);
			}
		},

		nativePluginResultHandler : function(result) {
			console.log('result: '+result);

		},

		nativePluginErrorHandler : function(error) {
			console.log('error: '+error);
		},

		Track : function(options) {
			if(gaPlugin){
				gaPlugin.trackEvent(
					this.nativePluginResultHandler,
					this.nativePluginErrorHandler,
					options.category,
					options.action,
					options.label,
					1
				);           
			}
		},

		Variable : function(options) {
			if(gaPlugin){
				gaPlugin.setVariable(
					this.nativePluginResultHandler,
					this.nativePluginErrorHandler,
					options.name,
					options.variable,
					2
				);  
			}
		},

		PageButtonClicked : function(url) {
			if(gaPlugin){                  
				gaPlugin.trackPage(
					this.nativePluginResultHandler, 
					this.nativePluginErrorHandler, 
				   	url
				); 
			}
		},

		goingAway : function() {
			gaPlugin.exit(
				this.nativePluginResultHandler, 
				this.nativePluginErrorHandler
			);
		}
	 
	}   

	return GA;  

});

			