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

    return {
      getLatLng: getLatLng,
      getAddress: getAddress
    };
  }]);
