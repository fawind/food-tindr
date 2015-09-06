angular.module('food-tinder')
  .factory('RequestService', ['$http', 'UserService',
    function($http, userService) {

    function getRestaurants(body) {
      return $http.post('/api/food', body);
    }

    function getBars(body) {
      return $http.post('/api/drinks', body);
    }

    function getLocations() {
      var userId = userService.getUserId();
      var settings = userService.getSettings();
      var location = userService.getLocation();

      var body = {
        user_id: userId,
        location: {
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
