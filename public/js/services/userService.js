angular.module('food-tinder')
  .factory('UserService', ['$cookies', function($cookies) {

    var userId;
    var location;

    function _generateUUID(){
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r&0x3 | 0x8)).toString(16);
      });

      return uuid;
    }

    function _loadSettings() {
      userId = $cookies.get('user_id');
      location = $cookies.getObject('location');

      if (!userId) {
        userId = _generateUUID();
        $cookies.put('user_id', userId);
      }
      if (!location) {
        location = {};
      }
    }

    function getLocation() {
      return location;
    }

    function setLocation(newLocation) {
      location = newLocation;
      $cookies.putObject('location', location);
    }

    function getUserId() {
      return userId;
    }

    _loadSettings();

    return {
      getLocation: getLocation,
      setLocation: setLocation,
      getUserId: getUserId
    };
  }]);
