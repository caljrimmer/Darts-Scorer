define(['underscore'], function(_) {
    var Registry = {
		lang : 'en',
		models : {},
		collections : {},
		views : {},
		App : {}
	};
	
	if(_.has(localStorage,'lang')){
		Registry.lang = localStorage.lang
	}
	  
    return Registry;
});