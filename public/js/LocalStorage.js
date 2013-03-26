define(['underscore'], function(_) {
	
	var LocalStoraage = {
		
		set : function(value){
			if(this.test()){
				localStorage.dartsScorer = value
			}
		},
		
		get : function(){
			if(this.test()){
				return localStorage.dartsScorer;
			}
			
			return "";
		},
		
		test : function(){
			return 'localStorage' in window && window['localStorage'] !== null;
		}
		
	}
 
    return LocalStoraage;
});