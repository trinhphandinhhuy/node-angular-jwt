'use strict';


angular.module('jwtPluralsightApp')
  .controller('RegisterCtrl', function (alert, auth) {
    var vm = this;
    vm.submit = function () {

      auth.register(vm.email, vm.password)
        .success(function (res) { 
          alert('success', 'Account Created', 'Welcome, ' + res.user.email + '!');
        })
        .error(function (err) {
          alert('warning', 'Something went wrong', err.message);
        })
    };
  });
