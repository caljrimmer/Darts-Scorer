define(['LocalStorage'], function(LocalStorage) {
    var Registry = {
		store : "local",
		userid : "",
		adminid : LocalStorage.get(),
		models : {},
		collections : {},
		App : {}
	};  
    return Registry;
});