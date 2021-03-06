(function() {
	"use strict";
	var app = angular.module("gameApp");
	app.controller("HomeCtrl", function($scope, $state, Ranking) {
		$scope.name = "Home Controller";
		$scope.initHome = function() {
			Ranking.get(function(response) {
				$scope.ranking = response.results;
			});
		};
		$scope.startGame = function() {
			$state.go("game");
		};
	});
})();
