(function() {
	"use strict";
	var app = angular.module("gameApp");
	
	app.controller("SplashCtrl", function($scope, $state, $timeout) {
		$timeout(function() {
			$scope.fadeIn = true;
		}, 500);
		$timeout(function() {
			$state.go("home");
		}, 3500);
		
	});
	
	app.controller("HomeCtrl", function($scope) {
		$scope.name = "Home Controller";
	});
	
	app.controller("GameCtrl", function($scope, $timeout, $uibModal) {
		$scope.name = "Game Controller";
		$scope.cards = [];
		$scope.exposedCards = [];
		$scope.playSound = false;
		$scope.state = undefined;
		
		$scope.toggleSound = function() {
			$scope.playSound = (arguments.length)?arguments[0]:!$scope.playSound;
			if(!$scope.playSound) {
				GAME.AUDIO.BGM.pause();
				GAME.AUDIO.BGM.currentTime = 0;	
			} else {
				GAME.AUDIO.BGM.play();
				GAME.AUDIO.BGM.loop = true;
			}
		};

		$scope.initGame = function() {
			var card;
			var random_position;
			var randomized_cards = [];
			
			// initialize game sound
			$scope.toggleSound(false);
			
			// initialize game state
			$scope.state = {
				remaining: GAME.NUM_CARDS,
				score: GAME.STARTING_SCORE,
			};
			
			// generate 8 pairs of coloured cards randomly
			for(var i=0;i<GAME.NUM_CARDS>>1;i++) {
				randomized_cards.push(new Card(i));
				randomized_cards.push(new Card(i));
			}
			// randomize positions of cards
			for(var i=0;i<GAME.NUM_CARDS;i++) {
				card = randomized_cards[i];
				random_position = Math.floor(Math.random()*GAME.NUM_CARDS);
				randomized_cards[i] = randomized_cards[random_position];
				randomized_cards[random_position] = card;
			}
			for(var i=0;i<GAME.GRID_ROWS;i++) {
				var sliced = randomized_cards.slice(i*GAME.GRID_COLS, (i+1)*GAME.GRID_COLS);
				$scope.cards.push(sliced);
			}
		};
		
		$scope.flipCard = function(card) {
			card.flip();
			$scope.exposedCards.push(card);
			
			// no more uncovered cards, player wins
			
			
			switch($scope.exposedCards.length) {
				
				/*
				 * when only 1 card is uncovered, wait for player action
				 */
				case 1: break;
				
				/* when number of cards matching requirements are uncovered,
				 * if cards match, remove both cards and increment score
				 * if cards do not match, cover  cards and deduct score
				 */
				case GAME.REQUIRED_NUM_MATCHES:
					var match = true;
					for(var i=0;i<$scope.exposedCards.length-1;i++) {
						match &= $scope.exposedCards[i].matches($scope.exposedCards[i+1]);
					} 
					if(match) {
						for(var i in $scope.exposedCards) {
							$scope.exposedCards[i].matchFound();
						}
						$scope.state.score += GAME.MATCH_POINTS;
						GAME.AUDIO.Match.play();
						$scope.exposedCards.length=0;
					} else {
						$timeout(function() {
							for(var i in $scope.exposedCards) {
								$scope.exposedCards[i].flip();
							}
							$scope.exposedCards.length=0;
						}, 1500);
						$scope.state.score -= GAME.MISMATCH_PENALTY;
						GAME.AUDIO.NoMatch.play();
					}
				break;
			} 
			
		};
		
		
		
		$scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/static/html/home.html',
      controller: function($scope) {
      	$scope.name = "adasdasdass";
      },
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    
  };
		
		
	});
	
})();
