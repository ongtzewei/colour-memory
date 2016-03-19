(function() {
	"use strict";
	var app = angular.module("gameApp");
	app.controller("SplashCtrl", function($scope, $state, $timeout) {
		$timeout(function() {$scope.fadeIn = true;}, 500);
		$timeout(function() {$state.go("home");}, 3500);
	});
})();