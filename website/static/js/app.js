(function() {	
	"use strict";
	var modules = ["ngAnimate", "ngCookies", "ngResource", "angular-loading-bar", "ui.bootstrap", "ui.router"]; 
	var app = angular.module("gameApp",modules);
	app.config(["$interpolateProvider","$resourceProvider", "cfpLoadingBarProvider", function($interpolateProvider, $resourceProvider, cfpLoadingBarProvider) {
		$interpolateProvider.startSymbol("{[{");
		$interpolateProvider.endSymbol("}]}");
		$resourceProvider.defaults.stripTrailingSlashes = false;
		cfpLoadingBarProvider.includeBar = false;
		cfpLoadingBarProvider.spinnerTemplate = "<div class='animated-loading'></div>";
	}]).run(function($rootScope, $http, $cookies) {
		// append, overwrite angular settings 
		$http.defaults.headers.post["X-CSRFToken"] = $cookies.get("csrftoken");	
		$http.defaults.headers.put["X-CSRFToken"] = $cookies.get("csrftoken");
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.defaults.transformRequest = [function(data) {
			if(data===undefined) return data;
			return $.param(data);
		}];
		$http.defaults.withCredentials = true;
	});
})();