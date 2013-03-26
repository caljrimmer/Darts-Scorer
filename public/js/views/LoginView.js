define([
  'jquery',
  'underscore',
  'backbone',
  'AreaSelect',
  'ApiKey',
  'Registry',
  'LocalStorage',
  'views/NavView',
  'text!templates/login.html',
], function($, _, Backbone, AreaSelect, ApiKey, Registry, LocalStorage, NavView, loginTemplate){
	
	var LoginView = Backbone.View.extend({

		template : _.template(loginTemplate),
	   
		el : $('#loginArea'),
	 
		events : {
			'click #emailSubmit' : 'eventButton',
			'keypress #emailInput' : 'eventEnter'
		}, 
	
		initialize : function(){
			this.render();
		},
		
		render : function(){
			AreaSelect($(this.el));
			$(this.el).html(this.template({}));
			return this;
		},
		
		renderLoginError : function(){
			$(this.el).find('#loginError').show();
		},
		
		renderLoginSuccess : function(){
			$(this.el).find('#loginForm').hide();
			$(this.el).find('#loginSuccess').show();
			this.navView = new NavView({
				model : Registry
			});
			Registry.App.navigate('/dashboard/'+Registry.adminid, true)
		},
		
		controllerMakeApiKey : function(string){
			if(ApiKey.validateEmail(string)){
				return ApiKey.toHex(string);
			}
			return false;
		},
		
		eventButton : function(){
			var value = $(this.el).find('[type="email"]').val().toLowerCase(),
				apiKey = this.controllerMakeApiKey(value);
			
			if(apiKey){
				LocalStorage.set(apiKey);
				Registry.adminid = apiKey;
				this.renderLoginSuccess(); 
			}else{
				this.renderLoginError();
			}
		},
		
		eventEnter : function(e){
			if (e.keyCode == 13) {
				this.eventButton();
			}
		}
	  
	});
	
	return LoginView;

});