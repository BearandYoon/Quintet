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
    'ngTouch',
    'permission'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('quintet', {
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        },
        templateUrl: 'views/main.html'
      })
      .state('quintet.home', {
        url: '/home',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        },
        views: {
          'content': {
            templateUrl: 'views/dashboard/home.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('quintet.account_search', {
        url: '/account/search',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        },
        views: {
          'content': {
            templateUrl: 'views/account/search.html',
            controller: 'accountSearchController'
          }
        },
        params: {
          mode: null
        }
      })
      .state('quintet.account_details', {
        url: '/account/search',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        },
        views: {
          'content': {
            templateUrl: 'views/account/details.html',
            controller: 'accountDetailsController'
          }
        },
        params: {
          id: null
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/login.html',
        controller: 'loginController'
      })
      .state('quintet.about', {
        url: '/about',
        views: {
          'content': {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          }
        }
      });


    $urlRouterProvider.otherwise('/home');
  })
  .run(function ($rootScope, Permission, mainService) {
    $rootScope.IsLoggedIn = false;

    function isAnonymousUser () {
      return _.isEmpty(mainService.getToken());
    }

    Permission
      .defineRole('anonymous', isAnonymousUser);
  })
  .constant('Config', {

  });
