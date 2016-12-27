'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:loginController
 * @description
 * Controller of the Quintet
 */
angular.module('Quintet')
  .controller('loginController', function ($http, $scope, $state, $rootScope, mainService, AuthService) {
      // TODO Prüfen, ob Login notwendig ist. Wenn nein, dann sofort weiterleiten...

      $scope.username = "";
      $scope.password = "";
      $scope.client = mainService.getClient();

      $scope.clients = [
          {key: "TROUT", lable: "Trout Group"},
          {key: "NEWCO", lable: "Newco"},
          {key: "DEMO", lable: "Trout Demo"},
          {key: "DEV", lable: "Trout Group DEV"}
      ];

      $scope.clientChange = function () {
          /* console.log("Client is now: " + $scope.client);
          mainService.setClient($scope.client); */
      };

      $scope.login = function () {
          console.log("Username: " + $scope.username);
          console.log("Password: " + $scope.password);
          console.log("Client: " + $scope.client);

          mainService.setClient($scope.client);

          AuthService.login($scope.username, $scope.password, function(response) {
            if(response) {
              mainService.setToken(response.data.token);
              mainService.setUserInfo(response.data);
              $state.go('quintet.home');
            } else {
              mainService.setToken("");
            }
          });
      };
  });
