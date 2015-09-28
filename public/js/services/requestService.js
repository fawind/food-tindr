angular.module('food-tinder')
  .factory('RequestService', ['$http', 'UserService',
    function($http, userService) {

    var currentRestaurants = null;
    var currentBars = null;

    function getRestaurants(body) {
      if (currentRestaurants === null)
        currentRestaurants = $http.post('/api/food', body);

      return currentRestaurants;
    }

    function getBars(body) {
      if (currentBars === null)
        currentBars = $http.post('/api/drinks', body);

      return currentBars;
    }

    function getLocations() {
      var userId = userService.getUserId();
      var settings = userService.getSettings();
      var location = userService.getLocation();

      var body = {
        user_id: userId,
        lat_lng: {
          lat: location.lat,
          lng: location.lng
        },
        radius: settings.radius,
        transportation: settings.transportation
      };

      if (settings.food)
        return getRestaurants(body);
      else
        return getBars(body);
    }

    return {
      getLocations: getLocations
    };
  }]);
