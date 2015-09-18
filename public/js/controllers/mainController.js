angular.module('food-tinder')
  .controller('MainController', ['$scope', 'UserService',
    function ($scope, userService) {

      $scope.food = true;
      $scope.lable = 'Food';

      $scope.toggleSettings = function() {
        $('#modalSettings').openModal();
      };

      $scope.toggleDrink = function() {
        $scope.food = '';
        $scope.drink = 'active';
        userService.setFood(false);
      };

      $scope.toggleFood = function() {
        if ($scope.food) {
          $scope.food = false;
          $scope.lable = 'Bar';
          userService.setFood(true);
        } else {
          $scope.food = true;
          $scope.lable = 'Food';
          userService.setFood(false);
        }
      };

  }]);
