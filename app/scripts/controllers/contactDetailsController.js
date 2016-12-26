'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:contactDetailsController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('contactDetailsController', function (mainService, $scope, $state, $http, $stateParams) {

            console.log("stateParams: " + $stateParams);

            $scope.id = $stateParams.id;
            $scope.contact = {};
            $scope.meetings = [];
            $scope.contact_lists = []

            /**
             * Loads all contact lists
             * @returns {undefined}
             */
            $scope.loadContactLists = function () {
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: mainService.getControllerUrl() + "/contact_list/by_contact",
                    params: {
                        token: mainService.getToken(),
                        contact_id: $stateParams.id,
                    }
                }).then(function (resp) {
                    console.log("RESPONSE: " + resp);
                    console.log(resp.data);
                    $scope.contact_lists = resp.data;
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                });
            };

            /**
             * Changes the subscription of a the loaded contact
             * @param {type} operation
             * @param {type} contact_list_id
             * @returns {undefined}
             */
            $scope.changeSubscription = function (operation, contact_list_id) {
                console.log("Now changing...");

                var promise = $http({
                    method: "POST",
                    cache: false,
                    url: mainService.getControllerUrl() + "/contact_list/change",
                    data: {
                        contact_id: $stateParams.id,
                        contact_list_id: contact_list_id,
                        token: mainService.getToken(),
                        operation: operation,
                    }
                }).then(function (resp) {
                    console.log("RESPONSE: " + resp.data);
                    if (resp.data.indexOf("ERROR") == -1) {
                        alert(resp.data.replace("OK ", ""));
                        $scope.loadContactLists();
                    } else {
                        alert(resp.data.replace("ERROR ", ""));
                    }
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                });
            };


            console.log("contactDetailsController is running now...");

            mainService.showSpinner("Loading Contact...");
            var promise_data = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/contact/index",
                params: {
                    id: $stateParams.id,
                    token: mainService.getToken()
                }
            }).then(function (resp) {
                console.log("RESPONSE:");
                console.log(resp.data);
                $scope.contact = resp.data;
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            }).finally(function() {
                mainService.hideSpinner();
            });

            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/meeting",
                params: {
                    token: mainService.getToken(),
                    contact_id: $stateParams.id,
                }
            }).then(function (resp) {
                console.log("RESPONSE: " + resp);
                console.log(resp.data);
                $scope.meetings = resp.data;
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            });

            $scope.loadContactLists();

            console.log("contactDetailsController is running now... Done.");
        });
