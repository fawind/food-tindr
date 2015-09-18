angular.module('food-tinder')
  .factory('MapsService', ['$http', function($http) {

    var apiKey = 'AIzaSyAI-Lcxi-u3YBnDTL7JRVZpmj2Eitp-9WU';

    var addressToLatLngUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address={{address}}&key=' + apiKey;
    var LatLngToAddressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={{lat}},{{lng}}&key=' + apiKey;

    function getLatLng(address) {
      var requestUrl = addressToLatLngUrl
        .replace('{{address}}', address.replace(' ', '+'));
      return $http.get(requestUrl)
        .then(function(res) {
          return res.data.results[0].geometry.location;
        });
    }

    function getAddress(lat, lng) {
      var requestUrl = LatLngToAddressUrl
        .replace('{{lat}}', lat)
        .replace('{{lng}}', lng);
      return $http.get(requestUrl)
        .then(function(res) {
          return res.data.results[0].formatted_address;
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
