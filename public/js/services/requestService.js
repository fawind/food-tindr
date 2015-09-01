angular.module('food-tinder')
  .factory('RequestService', ['$http', function($http) {

    function getRestaurants(config) {
      return $http.post('/api/food', config);
    }

    return {
      getRestaurants: getRestaurants
    };
  }]);
