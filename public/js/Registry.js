define(['LocalStorage'], function(LocalStorage) {
    var Registry = {
		userid : "",
		adminid : LocalStorage.get(),
		models : {},
		collections : {},
		App : {}
	};  
    return Registry;
});