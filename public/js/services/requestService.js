angular.module('food-tinder')
  .factory('RequestService', ['$http', 'UserService',
    function($http, userService) {

    var currentRestaurants = null;
    var currentBars = null;

    function _getRestaurants(body, update) {
      if (currentRestaurants === null || update === true)
        currentRestaurants = $http.post('/api/food', body);
      return currentRestaurants;
    }

    function _getBars(body, update) {
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
        return _getRestaurants(body, update);
      else
        return _getBars(body, update);
    }

    function getPlaceDetails(placeId) {
      return $http.get('/api/place/' + placeId);
    }

    return {
      getLocations: getLocations,
      getPlaceDetails: getPlaceDetails
    };
  }]);
