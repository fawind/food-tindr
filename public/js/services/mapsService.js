angular.module('food-tinder')
  .factory('MapsService', ['$http', '$q', function($http, $q) {

    var geocoder = new google.maps.Geocoder();

    function getLatLng(address) {
      return $q(function(resolve, reject) {
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latlng = results[0].geometry.location;
            resolve({ lat: latlng.lat(), lng: latlng.lng() });
          } else {
            reject(status);
          }
        });
      });
    }

    function getAddress(lat, lng) {
      var location = { 'location': { lat: lat, lng: lng } };
      return $q(function(resolve, reject) {
        geocoder.geocode(location, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0].formatted_address) {
              resolve(results[0].formatted_address);
            } else {
              reject('No address found.');
            }
          } else {
            reject(status);
          }
        });
      });
    }

    function getMapStyle() {
      return '[{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"},{lightness:33}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2e5d4"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#c5dac6"}]},{featureType:"poi.park",elementType:"labels",stylers:[{visibility:"on"},{lightness:20}]},{featureType:"road",elementType:"all",stylers:[{lightness:20}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#c5c6c6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#e4d7c6"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#fbfaf7"}]},{featureType:"water",elementType:"all",stylers:[{visibility:"on"},{color:"#acbcc9"}]}]';
    }

    return {
      getLatLng: getLatLng,
      getAddress: getAddress,
      getMapStyle: getMapStyle
    };
  }]);
