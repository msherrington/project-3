angular.module('skillsApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window){
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link($scope, element){
      const map = new $window.google.maps.Map(element[0], {
        zoom: 14,
        scrollwheel: false,
        center: $scope.center
      });

      const currentLocationWindow = new google.maps.InfoWindow({
        map: map
      });

      const marker = new $window.google.maps.Marker({
        position: $scope.center,
        map
      });
      console.log(element);

      const slider = document.getElementById('slider');
      const sliderDiv = document.getElementById('sliderAmount');
      // let infowindow = null;
      const circle = new google.maps.Circle({
        fillColor: '#3399FF',
        fillOpacity: 0.2,
        strokeColor: '#0099FF',
        strokeOpacity: 0.4,
        map: map,
        center: $scope.center,
        radius: 1000
      });

      console.log(circle.radius);

    //map circle radius function
      slider.onchange = function() {
        console.log('Changed!');
        sliderDiv.innerHTML = this.value;
        circle.radius = sliderDiv.innerHTML;
        //Store val of slider
        circle.setRadius(parseFloat(circle.radius));
        console.log(circle.radius);
      };


      //geolocation..
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude)
          };

          // currentLocationWindow.setPosition(pos);
          // currentLocationWindow.setContent('Current Location');
          marker.setPosition(pos);
          map.setCenter(pos);
          circle.setCenter(pos);
        }, function () {
          handleLocationError(true,  googleMap.getCenter());
        });
      } else {
      // Browser doesn't support Geolocation
        handleLocationError(false, googleMap.getCenter());
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        currentLocationWindow.setPosition(pos);
        currentLocationWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      }


    }
  };

  return directive;
}
