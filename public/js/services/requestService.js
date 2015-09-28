angular.module('food-tinder')
  .factory('RequestService', ['$http', 'UserService',
    function($http, userService) {

    var currentRestaurants = null;
    var currentBars = null;

    function getRestaurants(body, update) {
      if (currentRestaurants === null || update === true)
        currentRestaurants = $http.post('/api/food', body);
      return currentRestaurants;
    }

    function getBars(body, update) {
      if (currentBars === null || update === true)
        currentBars = $http.post('/api/drinks', body);
      return currentBars;
    }

    function getLocations(update) {
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
        return getRestaurants(body, update);
      else
        return getBars(body, update);
    }

    return {
      getLocations: getLocations
    };
  }]);
