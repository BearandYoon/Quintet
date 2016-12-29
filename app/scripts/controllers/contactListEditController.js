'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactListEditController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('contactListEditController', function (cfgService, $scope, $state, $http, $stateParams) {

            $scope.id = $stateParams.id;
            $scope.contact_list = {};

            /**
             * Saves information about the contact list
             * @returns {undefined}
             */
            $scope.submitContactList = function () {
                console.log("Now changing...");

                var data = $scope.contact_list;
                data.token = cfgService.getToken();
                
                cfgService.showSpinner("Saving data...");

                var promise = $http({
                    method: "PUT",
                    // cache: false,
                    url: cfgService.getControllerUrl() + "/contact_list/index",
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
                    cfgService.httpErrorCallback(resp);
                }).finally(function () {
                    cfgService.hideSpinner();
                });
            };

            console.log("contactListEditController is running now...");
            
            cfgService.showSpinner("Loading data...");
            if ($scope.id && $scope.id > 0) {
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: cfgService.getControllerUrl() + "/contact_list/index",
                    params: {
                        id: $stateParams.id,
                        token: cfgService.getToken(),
                        no_contacts: true,
                    }
                }).then(function (resp) {
                    console.log("RESPONSE:");
                    console.log(resp.data);

                    $scope.contact_list = resp.data.ContactList;

                    console.log("Data loaded!");
                }, function (resp) {
                    cfgService.httpErrorCallback(resp);
                }).finally(function () {
                    cfgService.hideSpinner();
                });
            }

            console.log("contactListEditController is running now... Done.");
        });