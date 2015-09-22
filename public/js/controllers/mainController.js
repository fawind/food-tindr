angular.module('food-tinder')
  .controller('MainController', ['$scope', 'UserService',
    function ($scope, userService) {

      $scope.food = true;
      $scope.lable = 'Food';

      $scope.toggleSettings = function() {
        $('#modalSettings').openModal();
      };

      $scope.toggleFood = function() {
        if ($scope.food) {
          $scope.food = false;
          $scope.lable = 'Bar';
          userService.setFood(false);
        } else {
          $scope.food = true;
          $scope.lable = 'Food';
          userService.setFood(true);
        }
      };

  }]);
