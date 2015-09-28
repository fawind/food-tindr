angular.module('food-tinder')
  .controller('MainController', ['$scope', 'UserService', 'BroadcastService',
    function ($scope, userService, broadcastService) {

      $scope.food = true;
      $scope.titlePrefix = 'Food';
      $scope.radiusModel = 2;
      $scope.transportationModel = 'walk';
      var changes = false;


      $scope.toggleSettings = function() {
        $('#modalSettings').openModal({
          complete: function() {
            if (changes) {
              broadcastService.settingsChanged.broadcast();
              changes = false;
            }
          }
        });
        $('.collapsible').collapsible({});
      };


      $scope.updateSettings = function() {
        changes = true;
        userService.setRadius($scope.radiusModel * 1000);
        userService.setTransportation($scope.transportationModel);
      };


      $scope.toggleFood = function() {
        if ($scope.food) {
          $scope.food = false;
          $scope.titlePrefix = 'Bar';
          userService.setFood(false);
        } else {
          $scope.food = true;
          $scope.titlePrefix = 'Food';
          userService.setFood(true);
        }
        broadcastService.locationSet.broadcast();
      };

  }]);
