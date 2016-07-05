'use strict';


angular.module('jwtPluralsightApp')
  .controller('RegisterCtrl', function ($http, $rootScope, alert, authToken, API_URL) {
    var vm = this;
    vm.submit = function () {
      var url = API_URL + 'register';
      var user = {
        email: vm.email,
        password: vm.password
      };
      $http.post(url, user)
        .success(function (res) { 
          alert('success', 'Account Created', 'Welcome, ' + res.user.email + '!');
          authToken.setToken(res.token)
        })
        .error(function (err) {
          alert('warning', 'Something went wrong', err.message);
        })
    };
  });
