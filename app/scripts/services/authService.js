/**
 * Created by bear on 12/27/16.
 */
'use strict';

/**
 * @ngdoc service
 * @name Quintet.AuthService
 * @description
 * # AuthService
 * Service in the sbAdminApp.
 */
angular.module('Quintet')
  .service('AuthService', function ($http, $state, mainService, $q) {

    function login(username, pass, callback) {
      var url = mainService.getControllerUrl() + "/login/login";
      return $http.post(url, {
        username: username,
        password: pass,
        app_version: mainService.getAppVersion()
      }).then(
        function successCallback(response) {
          console.log('login-response = ', response);
          callback(response);
        },
        function errorCallback(response) {
          console.log('login-response-error = ', response);
          callback(false);
        }
      )
    }

    return ({
      login: login
    });
  });
