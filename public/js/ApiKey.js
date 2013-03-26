define([
], function(){
	
	var ApiKey = {
		
		validateEmail: function(email) { 
		    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		},
		
		toHex : function (string) {
		    var hex = '',
		        i = 0,
		        string_len = string.length,
		        store;
		    for (i ; i< string_len; i += 1) {
		        store = string.charCodeAt(i);
		        hex += store.toString(16);
		    }
		    return hex;
		},
		
		toString : function(hex) {
		    var arr = hex.match(/.{1,2}/g),
		        string = '',
		        i = 0,
		        arr_len = arr.length,
		        store;
		    for (i ; i < arr_len ; i += 1) {
		        store = String.fromCharCode(parseInt(arr[i],16));
		        string += store;
		    }
		    return string;
		}
		
	}    
	
	return ApiKey;

});