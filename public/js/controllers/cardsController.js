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
          }, 200);
          showDetails($scope.cards[$scope.cards.length - 1]);
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

      function showDetails(card) {
        $scope.card = card;
        $scope.modalOpen = true;
        $('#modalDetails').openModal();

        requestService.getPlaceDetails(card.id)
          .success(function(results) {
            $scope.card.phone = results.details.formatted_phone_number;
            $scope.card.website = results.details.website;
            $scope.card.is_open = results.details.is_open;
            $scope.card.directionsLink = getDirectionsLink($scope.card.address);
            $scope.card.phoneLink = getPhoneLink($scope.card.phone);
          });
      }

      $scope.closeDetails = function() {
        $scope.modalOpen = false;
        $('#modalDetails').closeModal();
      };

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

      function getDirectionsLink(address) {
        var url = 'https://www.google.com/maps?saddr=My+Location&daddr=';
        if (!address)
          return url;
        return url + address.replace(' ', '+').replace(',', '+');
      }

      function getPhoneLink(phone) {
        if (!phone)
          return '';
        return phone.replace(' ', '');
      }

      function rotateCards(cards) {
        _.each(cards, function(card, index) {
          var rotation = (Math.round(Math.random() * 5) + 1);
          rotation = Math.random() < 0.5 ? -1 * rotation : rotation;
          card.rotation = "transform: rotate(" + rotation + "deg);";
        });
      }

      waitForLocation();

      broadcastService.settingsChanged.listen(function() {
        $scope.loading = true;
        requestService.getLocations(true)
          .success(function(results) {
            initCards(results);
          });
      });

  }]);
