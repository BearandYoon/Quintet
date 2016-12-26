'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:contactListEditController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('contactListEditController', function (mainService, $scope, $state, $http, $stateParams) {

            $scope.id = $stateParams.id;
            $scope.contact_list = {};

            /**
             * Saves information about the contact list
             * @returns {undefined}
             */
            $scope.submitContactList = function () {
                console.log("Now changing...");

                var data = $scope.contact_list;
                data.token = mainService.getToken();

                mainService.showSpinner("Saving data...");

                var promise = $http({
                    method: "PUT",
                    // cache: false,
                    url: mainService.getControllerUrl() + "/contact_list/index",
                    data: data,
                }).then(function (resp) {
                    console.log("RESPONSE: " + resp.data);
                    if (resp.data.indexOf("ERROR") == -1) {
                        var new_ID = resp.data.replace("OK ", "");
                        $state.go("quintet.contact_list_details", {id: new_ID});
                    } else {
                        alert(resp.data.replace("ERROR ", ""));
                    }
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                }).finally(function () {
                    mainService.hideSpinner();
                });
            };

            console.log("contactListEditController is running now...");

            mainService.showSpinner("Loading data...");
            if ($scope.id && $scope.id > 0) {
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: mainService.getControllerUrl() + "/contact_list/index",
                    params: {
                        id: $stateParams.id,
                        token: mainService.getToken(),
                        no_contacts: true,
                    }
                }).then(function (resp) {
                    console.log("RESPONSE:");
                    console.log(resp.data);

                    $scope.contact_list = resp.data.ContactList;

                    console.log("Data loaded!");
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                }).finally(function () {
                    mainService.hideSpinner();
                });
            }

            console.log("contactListEditController is running now... Done.");
        });
