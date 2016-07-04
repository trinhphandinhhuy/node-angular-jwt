'use strict';
angular.module('jwtPluralsightApp')
    .config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
       $stateProvider
       .state('main', {
            url: '/',
            templateUrl: '/views/main.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/views/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'Register'
        })
        .state('logout', {
            url: '/register',
            controller: 'LogoutCtrl',
            controllerAs: 'Logout'
        })
        .state('jobs', {
            url: '/jobs',
            templateUrl: '/views/jobs.html',
            controller: 'JobsCtrl',
            controllerAs: 'Jobs'
        });
        $httpProvider.interceptors.push('authInterceptor'); 
    })
    .constant('API_URL', 'http://localhost:3000/');