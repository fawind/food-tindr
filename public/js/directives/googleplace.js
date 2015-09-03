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
          var geoComponents = gPlace.getPlace();
          var lat = geoComponents.geometry.location.lat();
          var lng = geoComponents.geometry.location.lng();

          scope.$apply(function() {
            var location = { lat: lat, lng: lng, address: element.val() };
            model.$setViewValue(location);
          });
        });
      }
    };
  });
