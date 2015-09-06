angular.module('food-tinder')
  .controller('LocationController', ['$scope', 'lodash', 'UserService', 'MapsService',
    function ($scope, _, userService, mapsService) {

      $scope.chosenPlace = '';

      function getPosition() {
        $scope.chosenPlace = userService.getLocation().address;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(position) { handleLocationRequest(position); },
            function(error) { triggerLocationPrompt(); }
          );
        }
        else {
          triggerLocationPrompt();
        }
      }

      function handleLocationRequest(position) {
        mapsService.getAddress(position.coords.latitude, position.coords.longitude)
          .then(function(address) {
            var location = {};
            location.lat = position.coords.latitude;
            location.lng = position.coords.longitude;
            location.address = address;

            updateLocation(location);
          });
      }

      function triggerLocationPrompt(error) {
        _.defer(function() {
          $('#modalLocation').openModal(
            { complete: modalClose }
          );
        });
      }

      function modalClose() {
        if ($scope.chosenPlace === '')
          getPosition();
        else
          mapsService.getLatLng($scope.chosenPlace)
            .then(function(position) {
              position.address = $scope.chosenPlace;
              updateLocation(position);
            });
      }

      function updateLocation(location) {
        userService.setLocation(location);
        $scope.address = location.address;
        _.defer(function() { $scope.$digest(); });
      }

      getPosition();
  }]);
