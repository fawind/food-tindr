angular.module('food-tinder')
  .factory('BroadcastService', ['$rootScope', function($rootScope) {

    var locationSet = {
      broadcast: function() {
        $rootScope.$broadcast('location-set');
      },
      listen: function(callback) {
        $rootScope.$on('location-set', function() {
          callback();
        });
      }
    };

    return {
      locationSet: locationSet
    };
  }]);
