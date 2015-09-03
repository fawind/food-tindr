angular.module('food-tinder')
  .controller('MainController', ['$scope', 'lodash', 'UserService', 'MapsService',
    function ($scope, _, userService, mapsService) {

      function getPosition() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
            var location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            userService.location = location;
            mapsService.getAddress(location.lat, location.lng)
              .then(function(address) {
                location.address = address.replace('\n', '');
                updateLocation(location);
              });
          },
          function(error) {
            _.defer(function() {
              $('#modalLocation').openModal(
                { complete: function() {
                  updateLocation($scope.chosenPlace);
                } }
              );
            });
          });
        }
      }

      function updateLocation(location) {
        userService.location = location;
        $scope.address = userService.location.address;
        _.defer(function() { $scope.$digest(); });
      }

      getPosition();

  }]);
