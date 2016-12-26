'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:projectDetailsController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('projectDetailsController', function (mainService, $scope, $state, $http, $stateParams) {
            console.log("projectDetailsController is running now...");

            $scope.id = $stateParams.id;
            // $scope.contact_list = {};
            $scope.project = {};
            $scope.phas = [];

            console.log("stateParams: " + $stateParams);

            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/project/index",
                params: {
                    id: $stateParams.id,
                    token: mainService.getToken()
                }
            }).then(function (resp) {
                console.log("RESPONSE:");
                console.log(resp.data);
                // $scope.contact_list = resp.data.ContactList;
                $scope.project = resp.data.Project;
                $scope.phas = resp.data.PHAs;

                console.log("Data loaded!");
                // console.log($scope.contact_list);
                console.log($scope.project);
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            });

            console.log("projectDetailsController is running now... Done.");
        });
