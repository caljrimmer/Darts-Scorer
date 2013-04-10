define([
  'jquery',
  'underscore',
  'backbone',
  'Registry'
], function($, _, Backbone, Registry){

	var BaseView = function (options) {

	    this.bindings = [];
		this.subviews = [];
	    Backbone.View.apply(this, [options]);
	};

	_.extend(BaseView.prototype, Backbone.View.prototype, {

	    bindTo: function (model, ev, callback) {
	        model.bind(ev, callback, this);
	        this.bindings.push({ model: model, ev: ev, callback: callback });
	    },
	
		subViewTo : function(view){
			this.subviews.push(view)
		},

	    unbindFromAll: function () {
	        _.each(this.bindings, function (binding) {
	            binding.model.unbind(binding.ev, binding.callback);
	        });
	
	        this.bindings = [];
	    },
	
		clean : function(view){
	        view.unbind();
			view.undelegateEvents();
			view.$el.empty();
		},
	
		cleanSubViews : function(){
			var that = this;                     
			_.each(this.subviews, function (subview) {
				that.clean(subview)
	        });
		},

	    dispose: function () {
			this.unbindFromAll();
			this.clean(this)
			this.cleanSubViews();         
	    }

	});
	
	BaseView.extend = Backbone.View.extend;

	return BaseView    

});