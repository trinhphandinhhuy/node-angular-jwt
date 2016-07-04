'use strict';


angular.module('jwtPluralsightApp')
  .controller('RegisterCtrl', function ($http, $rootScope, alert) {
    var vm = this;
    vm.submit = function () {
      var url = 'http://localhost:3000/register';
      var user = {
        email: vm.email,
        password: vm.password
      };
      $http.post(url, user)
        .success(function (res) { 
          alert('success', 'OK!', 'You are now register!');
        })
        .error(function (err) {
          alert('warning', 'Opps', 'Could not register');
        })
    };
  });
