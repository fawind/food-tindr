angular.module('food-tinder')
  .controller('CardsController', ['$scope', '$timeout', 'lodash', 'RequestService', 'BroadcastService',
    function ($scope, $timeout, _, requestService, broadcastService) {
      $scope.cards = [
          {name: 'clubs', symbol: '♣'},
          {name: 'diamonds', symbol: '♦'},
          {name: 'hearts', symbol: '♥'},
          {name: 'spades', symbol: '♠'}
      ];

      var index = 1;

      $scope.$on('stack-init', function(event, data) {
        $scope.stack = data;
      });

      $scope.throwoutleft = function (eventName, eventObject, $index) {
          $timeout(function() {
            $scope.cards.splice($scope.cards.length - 1, 1);
          }, 200);
      };

      $scope.throwoutright = function (eventName, eventObject, $index) {
          $timeout(function() {
            $scope.cards.splice($scope.cards.length - 1, 1);
          }, 200);
      };

      $scope.dismiss = function() {
        swipe(-600, -50);
      };

      $scope.favourite = function() {
        swipe(600, -50);
      };

      function swipe(dX, dY) {
        var cards = $scope.stack.cards;
        if (index === cards.length + 1)
          return;

        cards[cards.length - index].throwOut(dX, dY);
        index++;
      }

      function waitForLocation() {
        broadcastService.locationSet.listen(function() {
          console.log('==> location Set!');
          requestService.getLocations()
            .success(function(results) {
              console.log('results', results);
            });
        });
      }

      waitForLocation();

  }]);
