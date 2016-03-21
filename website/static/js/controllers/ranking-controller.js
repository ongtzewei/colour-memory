(function() {
	"use strict";
	var app = angular.module("gameApp");
	app.controller("RankingCtrl", function($scope, $cookieStore, $state, Ranking) {
		$scope.initRanking = function() {
			$scope.ranking = $cookieStore.get('ranking');
		};
		$scope.restartGame = function() {
			$state.go("game", {}, {reload:true});
		};
		$scope.returnMain = function() {
			$state.go("home");
		};
	});
})();
