'use strict';

angular.module('jwtPluralsightApp')
    .service('auth', function ($http, authToken, API_URL, $state) {
        var vm = this;
        var url = API_URL + 'login';
        /*var user = {
          email: vm.email,
          password: vm.password
        };*/
        function authSuccessful(res) {
            authToken.setToken(res.token);
            $state.go('main');
        }

        vm.login = function (email, password) {
            return $http.post(API_URL + 'login', {
                email: email,
                password: password
            }).success(authSuccessful);
        };

        vm.register = function (email, password) {
            return $http.post(API_URL + 'register', {
                email: email,
                password: password
            }).success(authSuccessful);
        }

    });
