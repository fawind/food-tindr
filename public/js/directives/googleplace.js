angular.module('food-tinder')
  .directive('googleplace', function() {
    return {
      require: 'ngModel',
      scope: {},
      link: function(scope, element, attrs, model) {
        var options = {
          types: [],
          componentRestrictions: {}
        };
        var gPlace = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(gPlace, 'place_changed', function() {
          scope.$apply(function() {
            model.$setViewValue(element.val());
          });
        });
      }
    };
  });
