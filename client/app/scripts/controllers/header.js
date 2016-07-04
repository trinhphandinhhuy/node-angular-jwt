'use strict';

angular.module('jwtPluralsightApp')
  .controller('HeaderCtrl', function (authToken) {
    this.isAuthenticated = authToken.isAuthenticated;
  });
