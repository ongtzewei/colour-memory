(function() {
	"use strict";
	var app = angular.module("gameApp");
	app.controller("GameCtrl", function($scope, $state, $timeout, $uibModal) {
		$scope.name = "Game Controller";
		$scope.cards = [];
		$scope.exposedCards = [];
		$scope.clearedCards = 0;
		$scope.state = undefined;
		
		$scope.toggleSound = function() {
			$scope.playSound = (arguments.length)?arguments[0]:!$scope.playSound;
			GAME.PLAY_SOUND = $scope.playSound;
			GAME.AUDIO.BGM.currentTime = 0;
			if(!$scope.playSound) {
				GAME.AUDIO.BGM.pause();
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
			$scope.toggleSound(GAME.PLAY_SOUND);
			
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
			// prevent exposed cards from exceeding the required number
			if($scope.exposedCards.length==GAME.REQUIRED_NUM_MATCHES) return;
			
			card.flip();
			$scope.exposedCards.push(card);
			$scope.checkGameConditions();
		};
		
		$scope.checkGameConditions = function() {
			
			switch($scope.exposedCards.length) {
				case 1: 
					//when only 1 card is uncovered, wait for player action
				break;
				
				case GAME.REQUIRED_NUM_MATCHES:
					//when number of cards matching requirements are uncovered,
					//if cards match, remove both cards and increment score
					//if cards do not match, cover  cards and deduct score
					var match = true;
					for(var i=0;i<$scope.exposedCards.length-1;i++) {
						match &= $scope.exposedCards[i].matches($scope.exposedCards[i+1]);
					} 
					if(match) {
						for(var i in $scope.exposedCards) {
							$scope.exposedCards[i].matchFound();
						}
						$scope.state.score += GAME.MATCH_REWARD;
						$scope.clearedCards += GAME.REQUIRED_NUM_MATCHES;
						$scope.exposedCards.length=0;
						
						if(GAME.PLAY_SOUND) { GAME.AUDIO.Match.play(); }
						
					} else {
						$timeout(function() {
							for(var i in $scope.exposedCards) {
								$scope.exposedCards[i].flip();
							}
							$scope.exposedCards.length=0;
						}, 1500);
						$scope.state.score -= GAME.MISMATCH_PENALTY;
						if(GAME.PLAY_SOUND) { GAME.AUDIO.NoMatch.play(); }
					}
				break;
			}
			
			// no more uncovered cards, player wins
			if($scope.clearedCards==GAME.NUM_CARDS) {
				GAME.AUDIO.GameWin.play();
				$scope.showModal(GAME.MODAL.GAME_WIN);
			}
			// when score reaches zero, player loses
			if($scope.state.score<=0) {
				GAME.AUDIO.GameLose.play();
				$scope.showModal(GAME.MODAL.GAME_LOSE);
			}
		};
		
		$scope.promptExit = function() {
			$scope.showModal(GAME.MODAL.GAME_EXIT);
		};
		
		$scope.promptRestart = function() {
			$scope.showModal(GAME.MODAL.GAME_RESTART);
		};
		
		$scope.restartGame = function() {
			$state.go($state.current, {}, {reload: true});
		};
		
		$scope.returnMain = function() {
			GAME.AUDIO.BGM.pause();
			$state.go("home");
		};
		
		$scope.showModal = function(modalId) {
			var modalInstance = $uibModal.open({
				animation: true,
				backdrop: "static",
				keyboard: false,
				windowClass: "game-state",
				templateUrl: modalId,
				resolve: { 
					parentScope: function() { return $scope },
				},
				controller: "GameModalCtrl",
			});
		};
		
	});
	
})();
