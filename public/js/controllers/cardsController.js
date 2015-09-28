angular.module('food-tinder')
  .controller('CardsController', ['$scope', '$rootScope', '$timeout', 'lodash', 'chroma', 'RequestService', 'BroadcastService', 'UserService', 'MapsService',
    function ($scope, $rootScope, $timeout, _, chroma, requestService, broadcastService, userService, mapsService) {
      $scope.cards = [];
      $scope.mapStyle = mapsService.getMapStyle();
      var index = 1;
      var dismissScale = chroma.chroma.scale(['#ffffff', '#ee6e73']);
      var favouriteScale = chroma.chroma.scale(['#ffffff', '#63DF99']);

      $scope.$on('stack-init', function(event, newStack) {
        $scope.stack = newStack;
      });

      $scope.dragmove = function(eventName, eventObject) {
        var color = '';

        if (eventObject.throwDirection === 1)
          color = favouriteScale(eventObject.throwOutConfidence);
        else
          color = dismissScale(eventObject.throwOutConfidence);

        $rootScope.bgColor = { background: color };
        _.defer(function() {
          $rootScope.$apply();
        });
      };

      $scope.dragend = function(eventName, eventObject) {
        $rootScope.bgColor = { background: 'white' };
        _.defer(function() {
          $rootScope.$apply();
        });
      };

      $scope.throwoutleft = function(eventName, eventObject, $index) {
          $timeout(function() {
            $scope.cards.splice($scope.cards.length - 1, 1);
          }, 200);
      };

      $scope.throwoutright = function(eventName, eventObject, $index) {
          $timeout(function() {
            $scope.cards.splice($scope.cards.length - 1, 1);
            console.log($scope.stack);
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
              initCards(results);
            });
        });
      }

      function initCards(results) {
        $scope.loading = false;
        console.log('results', results);
        $scope.cards = results.places;
        setDirections($scope.cards);
        rotateCards($scope.cards);
      }

      function setDirections(cards) {
        var location = userService.getLocation();
        $scope.origin = location.lat + ', ' + location.lng;

        _.each(cards, function(card) {
          card.destination = card.geo_location.lat + ', ' + card.geo_location.lng;
        });
      }

      function rotateCards(cards) {
        _.each(cards, function(card, index) {
          var rotation = (Math.round(Math.random() * 5) + 1);
          rotation = Math.random() < 0.5 ? -1 * rotation : rotation;
          card.rotation = "transform: rotate(" + rotation + "deg);";
        });
      }

      waitForLocation();

  }]);
