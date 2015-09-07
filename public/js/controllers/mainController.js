angular.module('food-tinder')
  .controller('MainController', ['$scope', 'UserService',
    function ($scope, userService) {

      $scope.drink = '';
      $scope.food = 'active';

      $scope.toggleSettings = function() {
        $('#modalSettings').openModal();
      };

      $scope.toggleDrink = function() {
        $scope.food = '';
        $scope.drink = 'active';
        userService.setFood(false);
      };

      $scope.toggleFood = function() {
        $scope.drink = '';
        $scope.food = 'active';
        userService.setFood(true);
      };

  }]);
