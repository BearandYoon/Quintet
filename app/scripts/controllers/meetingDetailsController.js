'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:meetingDetailsController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('meetingDetailsController', function (mainService, $scope, $state, $http, $stateParams) {
            console.log("meetingDetailsController is running now...");

            $scope.id = $stateParams.id;
            $scope.meeting = {};

            console.log("stateParams: " + $stateParams);

            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/meeting/index",
                params: {
                    id: $stateParams.id,
                    token: mainService.getToken()
                }
            }).then(function (resp) {
                console.log("RESPONSE:");
                console.log(resp.data);
                $scope.meeting = resp.data;

                console.log("Data loaded!");
                // console.log($scope.contact_list);
                console.log($scope.meeting);
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            });

            $scope.getRoleName = function (role) {
                switch (role) {
                    case "INVESTOR":
                        return "Investor";
                    case "PRIMARY_CLIENT":
                        return "Client";
                    case "REPRESENTATIVE":
                        return "Trout Representative";
                    default:
                        return role;
                }
            };

            console.log("meetingDetailsController is running now... Done.");
        });
