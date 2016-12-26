'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:meetingController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('meetingController', function ($scope, $state, $http, $stateParams, mainService) {
            // Erstmal prüfen, ob ein Quartal angegeben wurde. Wenn nein, dann FUTURE nehmen!
            console.log("Quarter ist " + $stateParams.quarter);
            if (!$stateParams.quarter) {
                $stateParams.quarter = "FUTURE";
            }

            $scope.quarters = [];
            $scope.meetings = [];
            $scope.quarter = $stateParams.quarter;

            mainService.showSpinner("Loading Meetings...");


            console.log("meetingController is running now...");

            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/meeting/quarters",
                params: {
                    token: mainService.getToken(),
                }
            }).then(function (resp) {
                console.log("RESPONSE: " + resp);
                console.log(resp.data);
                $scope.quarters = resp.data;
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            });

            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/meeting",
                params: {
                    token: mainService.getToken(),
                    quarter: $stateParams.quarter
                }
            }).then(function (resp) {
                console.log("RESPONSE: " + resp);
                console.log(resp.data);
                $scope.meetings = resp.data;
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            }).finally(function () {
                mainService.hideSpinner();
            });

            console.log("meetingController is running now... Done.");
        });
