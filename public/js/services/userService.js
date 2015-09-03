angular.module('food-tinder')
  .factory('UserService', [function() {

    var location = {};

    return {
      location: location
    };
  }]);
