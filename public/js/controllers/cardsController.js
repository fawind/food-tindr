angular.module('food-tinder')
  .controller('CardsController', ['$scope', '$timeout', 'lodash', 'RequestService', 'BroadcastService', 'UserService', 'MapsService',
    function ($scope, $timeout, _, requestService, broadcastService, userService, mapsService) {
      $scope.cards = [];
      $scope.mapStyle = mapsService.getMapStyle();
      var index = 1;

      $scope.$on('stack-init', function(event, newStack) {
        $scope.stack = newStack;
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

      function rotateCards() {
        _.each($scope.cards, function(card) {
          var rotation = (Math.round(Math.random() * 5) + 1);
          rotation = Math.random() < 0.5 ? -1 * rotation : rotation;
          card.rotation = "transform: rotate(" + rotation + "deg)";
        });
      }

      function waitForLocation() {
        $scope.loading = true;
        broadcastService.locationSet.listen(function() {
          requestService.getLocations()
            .success(function(results) {
              initCards(results);
            });
        });
      }

      function initCards(results) {
        $scope.loading = false;
        console.log('results', results);
        $scope.cards = results.places;
        setDirections($scope.cards);
        rotateCards();
      }

      function setDirections(cards) {
        var location = userService.getLocation();
        $scope.origin = location.lat + ', ' + location.lng;

        _.each(cards, function(card) {
          card.destination = card.geo_location.lat + ', ' + card.geo_location.lng;
        });
      }

      waitForLocation();

  }]);
