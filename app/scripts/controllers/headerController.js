'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:headerController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('headerController', function ($scope, $state, mainService) {
            console.log("headerController is running now...");

            $scope.app_version = mainService.getAppVersion();

            $scope.user_info = mainService.getUserInfo();

            $scope.$watch(function() {
                return $state.current.name;
            }, function() {
                console.log("UPDATE " + $state.current.name);
                $scope.current_state_name = $state.current.name;
            });

            $scope.current_state_name = $state.current.name;

            /**
             * Do a logout
             * @returns {undefined}
             */
            $scope.logout = function () {
                console.log("logout...");

                mainService.setToken(null);
                $scope.user_info = mainService.getUserInfo();

                $state.go("login");
            };

            /**
             * Action for the back button
             * @returns {undefined}
             */
            $scope.back = function() {
                window.history.back();
            };

            console.log("headerController is running now... done.");
        });
