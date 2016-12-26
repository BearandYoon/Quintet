'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:projectController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('projectController', function ($scope, $state, $http, mainService) {
            console.log("projectController is running now...");

            $scope.projects = [];

            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/project",
                params: {
                    token: mainService.getToken()
                }
            }).then(function (resp) {
                console.log("RESPONSE: " + resp);
                console.log(resp.data);
                $scope.projects = resp.data;
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            });

            console.log("projectController is running now... Done.");
        });
