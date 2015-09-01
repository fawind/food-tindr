angular.module('food-tinder')
  .controller('CardsController', ['$scope', 'lodash', 'RequestService',
    function ($scope, _, requestService) {

    var config = {
      location: { lat: 49.412552, lng: 8.713001 },
      radius: 2000,
      transportation: {
        walk: true,
        car: false,
        public_trasport: false
      },
      user_id: "uuid"
    };

    $scope.dismiss = function() {
      console.log('dismiss');
    };

    $scope.favourite = function() {
      console.log('favourite');
    };

    function loadCards() {
      requestService.getRestaurants(config)
        .success(function(results) {
          console.log(results);
        })
        .error(function(error) {
          console.error(error);
        });
    }

    loadCards();

  }]);
