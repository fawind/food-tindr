angular.module('food-tinder')
  .controller('CardsController', ['$scope', '$timeout', 'lodash', 'RequestService', 'BroadcastService',
    function ($scope, $timeout, _, requestService, broadcastService) {
      $scope.cards = [];

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
        $scope.loading = true;
        broadcastService.locationSet.listen(function() {
          requestService.getLocations()
            .success(function(results) {
              $scope.loading = false;
              console.log('results', results);
              $scope.cards = results.places;
            });
        });
      }

      waitForLocation();

  }]);
