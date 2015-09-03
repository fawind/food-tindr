angular.module('food-tinder')
  .controller('CardsController', ['$scope', 'lodash', 'RequestService',
    function ($scope, _, requestService) {
      $scope.cards = [
          {name: 'clubs', symbol: '♣'},
          {name: 'diamonds', symbol: '♦'},
          {name: 'hearts', symbol: '♥'},
          {name: 'spades', symbol: '♠'}
      ];

      $scope.throwout = function (eventName, eventObject, $index) {
          console.log('throwout', eventObject);
          eventObject.target.remove();
      };

  }]);
