'use strict';


angular.module('jwtPluralsightApp')
  .controller('JobsCtrl', function ($http, API_URL, alert) {
    var vm = this;
    $http.get(API_URL + 'jobs').success(function (jobs) {
      vm.jobs = jobs;
      })
    .error(function (err) {
      alert('warning', 'Unable to get jobs', err.message);
      });
  });
