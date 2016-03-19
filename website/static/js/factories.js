(function() {
	var app = angular.module("gameApp");
	app.factory("Player", ["$rootScope", "$resource", function($rootScope, $resource) {
		var actions = {
			post: {method:"POST",withCredentials:true},
		};
		return $resource($rootScope.GAME.URL.APIPlayer, null, actions);
	}]);
	app.factory("Ranking", ["$rootScope", "$resource", function($rootScope, $resource) {
		var actions = {
			get: {method:"GET",withCredentials:true},
		};
		return $resource($rootScope.GAME.URL.APIRanking, null, actions);
	}]);
})();
