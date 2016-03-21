(function() {
	"use strict";
	var app = angular.module("gameApp");
	app.controller("GameModalCtrl", function($scope, $cookieStore, $uibModalInstance, parentScope, Player) {
		$scope.restartGame = function() {
			$uibModalInstance.dismiss('cancel');
			parentScope.restartGame();
		};
		$scope.submitScore = function() {
			$scope.player.score = parentScope.state.score;
			Player.post($scope.player, function(response) {
				$uibModalInstance.dismiss('cancel');
				$cookieStore.put('ranking', response);
				parentScope.showRanking();
			});
		};
		$scope.dismissModal = function() {
			$uibModalInstance.dismiss('cancel');
		};
		$scope.returnMain = function() {
			$uibModalInstance.dismiss('cancel');
			parentScope.returnMain();
		};
	});
})();