define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){

	var BaseView = function (options) {

	    this.bindings = [];
	    Backbone.View.apply(this, [options]);
	};

	_.extend(BaseView.prototype, Backbone.View.prototype, {

	    bindTo: function (model, ev, callback) {

	        model.bind(ev, callback, this);
	        this.bindings.push({ model: model, ev: ev, callback: callback });
	    },

	    unbindFromAll: function () {
	        _.each(this.bindings, function (binding) {
	            binding.model.unbind(binding.ev, binding.callback);
	        });
	        this.bindings = [];
	    },

	    dispose: function () {
	        this.unbindFromAll();
	        this.unbind(); 
	        this.$el.empty();
	                      
	    }

	});
	
	BaseView.extend = Backbone.View.extend;

	return BaseView    

});