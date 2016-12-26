'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:contactListDetailsController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('contactListDetailsController', function (mainService, $scope, $state, $http, $stateParams) {
            console.log("stateParams: " + $stateParams);

            $scope.id = $stateParams.id;
            $scope.contact_list = {};
            $scope.contacts = {};
            $scope.stat = {};

            $scope.pie = {
                labels: ["Met", "Not Met"],
                data: [0, 0]
            };

            // Ratio of charts should be variable
            Chart.defaults.global.maintainAspectRatio = false;


            /**
             * Changes the subscription of a Contact on the loaded ContactList
             * @param {type} operation
             * @param {type} contact_id
             * @returns {undefined}
             */
            $scope.changeSubscription = function (operation, contact_id, contact_name) {
                console.log("Now changing...");

                if (confirm("Are you sure to remove " + contact_name + " from this list?")) {
                    mainService.showSpinner("Removing Contact...");

                    var promise = $http({
                        method: "POST",
                        cache: false,
                        url: mainService.getControllerUrl() + "/contact_list/change",
                        data: {
                            contact_id: contact_id,
                            contact_list_id: $scope.id,
                            token: mainService.getToken(),
                            operation: operation,
                        }
                    }).then(function (resp) {
                        console.log("RESPONSE: " + resp.data);
                        if (resp.data.indexOf("ERROR") == -1) {
                            // alert(resp.data.replace("OK ", "") + " => Hiding " + "#contacts_on_contactlist tr[data-contact-id='" + contact_id + "']");
                            $("#contacts_on_contactlist tr[data-contact-id='" + contact_id + "']").hide();
                        } else {
                            alert(resp.data.replace("ERROR ", ""));
                        }
                    }, function (resp) {
                        mainService.httpErrorCallback(resp);
                    }).finally(function () {
                        mainService.hideSpinner();
                    });
                }
            };



            console.log("contactListDetailsController is running now...");

            mainService.showSpinner("Loading data...");
            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/contact_list/index",
                params: {
                    id: $stateParams.id,
                    token: mainService.getToken()
                }
            }).then(function (resp) {
                console.log("RESPONSE:");
                console.log(resp.data);
                $scope.contact_list = resp.data.ContactList;
                $scope.contacts = resp.data.Contacts;
                $scope.stat = resp.data.Stat;

                $scope.pie.data = [$scope.stat.met, $scope.stat.not_met];
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            }).finally(function () {
                mainService.hideSpinner();
            });

            console.log("contactListDetailsController is running now... Done.");
        });
