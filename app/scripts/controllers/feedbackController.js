'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:meetingController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('feedbackController', function ($scope, $state, $http, $stateParams, cfgService) {
            // Erstmal prüfen, ob ein Quartal angegeben wurde. Wenn nein, dann FUTURE nehmen!
            console.log("Quarter ist " + $stateParams.quarter);
            if (!$stateParams.quarter) {
                $stateParams.quarter = "FUTURE";
            }

            $scope.quarters = [];
            $scope.quarter = $stateParams.quarter;

            $scope.feedbacks = [];

            /** Selects the CSS class for presentation, red for negative and green for positive difference */
            $scope.getColor = function (a) {
                a = parseInt(a);
                console.log("Color for " + a);
                if (a < 0) {
                    return "redNumbers";
                } else if (a > 0) {
                    return "greenNumbers";
                } else {
                    return "";
                }
            }



            console.log("meetingController is running now...");

            cfgService.showSpinner("Loading Meetings...");

            /** Loads all available quarters */
            var promise = $http({
                method: "GET",
                cache: false,
                url: cfgService.getControllerUrl() + "/feedback/quarters",
                params: {
                    token: cfgService.getToken(),
                }
            }).then(function (resp) {
                console.log("RESPONSE: " + resp);
                console.log(resp.data);
                $scope.quarters = resp.data;
            }, function (resp) {
                cfgService.httpErrorCallback(resp);
            });

            /** Loads all the meetings in the quarter */
            var promise = $http({
                method: "GET",
                cache: false,
                url: cfgService.getControllerUrl() + "/feedback/index",
                params: {
                    token: cfgService.getToken(),
                    quarter: $stateParams.quarter
                }
            }).then(function (resp) {
                console.log("RESPONSE: " + resp);
                console.log(resp.data);
                $scope.feedbacks = resp.data;
            }, function (resp) {
                cfgService.httpErrorCallback(resp);
            }).finally(function () {
                cfgService.hideSpinner();
            });

            console.log("meetingController is running now... Done.");
        });