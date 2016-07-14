'use strict';

angular.module('jwtPluralsightApp')
  .controller('LoginCtrl', function ($http, alert, auth) {
    var vm = this;
    vm.submit = function () {
      
      auth.login(vm.email, vm.password)
        .success(function (res) { 
          alert('success', 'Welcome', 'Thanks for coming back ' + res.user.email + '!');          
        })
        .error(function (err) {
          alert('warning', 'Something went wrong', err.message);
        })
    };
  });
