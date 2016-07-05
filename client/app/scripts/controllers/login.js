'use strict';

angular.module('jwtPluralsightApp')
  .controller('LoginCtrl', function ($http, API_URL, alert, authToken) {
    var vm = this;
    vm.submit = function () {
      var url = API_URL + 'login';
      var user = {
        email: vm.email,
        password: vm.password
      };
      $http.post(url, user)
        .success(function (res) { 
          alert('success', 'Welcome', 'Thanks for coming back ' + res.user.email + '!');
          authToken.setToken(res.token)
        })
        .error(function (err) {
          alert('warning', 'Something went wrong', err.message);
        })
    };
  });
