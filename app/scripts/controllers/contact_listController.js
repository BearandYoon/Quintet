'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:contact_listController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('contact_listController', function ($scope, $state, $http, mainService) {
            $scope.contact_lists = [];

            console.log("contact_listController is running now...");

            mainService.showSpinner("Loading lists...");

            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/contact_list",
                params: {
                    token: mainService.getToken()
                }
            }).then(function (resp) {
                console.log("RESPONSE: " + resp);
                $scope.contact_lists = resp.data;
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            }).finally(function() {
                mainService.hideSpinner();
            });

            console.log("contact_listController is running now... Done.");
        });
