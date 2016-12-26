'use strict';

/**
 * @ngdoc overview
 * @name Quintet
 * @description
 * # Quintet
 *
 * Main module of the application.
 */
angular
  .module('Quintet', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl:  'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });

    $urlRouterProvider.otherwise('/home');
  });
