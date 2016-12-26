'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:loginController
 * @description
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('loginController', function ($http, $scope, $state, $rootScope, mainService) {

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

                var promise = $http({
                    method: "POST",
                    cache: false,
                    url: mainService.getControllerUrl() + "/login/login",
                    data: {
                        username: $scope.username,
                        password: $scope.password,
                        app_version: mainService.getAppVersion()
                    }
                }).then(function (resp) {
                    console.log("RESPONSE:");
                    console.log(resp.data);
                    console.log(JSON.stringify(resp.data));
                    if (resp.data.token.indexOf("ERROR") == -1) {
                        // Erfolgreich!
                        mainService.setToken(resp.data.token);
                        mainService.setUserInfo(resp.data);
                        $state.go("quintet.home");
                    } else {
                        // Nicht erfolgreich => Abmeldung erzwingen.
                        mainService.setToken("");
                        alert("Login not possible: " + resp.data.token.replace("ERROR ", ""));
                    }
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                });
            };
        });
