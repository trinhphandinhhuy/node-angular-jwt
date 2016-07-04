'use strict';


angular.module('jwtPluralsightApp')
  .controller('RegisterCtrl', function ($http, $rootScope, alert) {
    this.submit = function () {
      var url = '/';
      var user = {};
      $http.post(url, user)
        .success(function (res) { 
          alert('success', 'OK!', 'You are now register!');
        })
        .error(function (err) {
          alert('warning', 'Opps', 'Could not register');
        })
    };
  });
