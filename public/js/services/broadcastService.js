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

    var settingsChanged = {
      broadcast: function() {
        $rootScope.$broadcast('settings-changed');
      },
      listen: function(callback) {
        $rootScope.$on('settings-changed', function() {
          callback();
        });
      }
    };

    return {
      locationSet: locationSet,
      settingsChanged: settingsChanged
    };
  }]);
