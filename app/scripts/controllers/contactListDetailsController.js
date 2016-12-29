'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactListDetailsController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('contactListDetailsController', function (cfgService, $scope, $state, $http, $stateParams) {
        console.log("stateParams: " + $stateParams);

        $scope.id = $stateParams.id;
        $scope.contact_list = {};
        $scope.contacts = {};
        $scope.stat = {};
        $scope.emails = {
            recipients: [],
            subject: '',
            body: ''
        };

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
                cfgService.showSpinner("Removing Contact...");

                var promise = $http({
                    method: "POST",
                    cache: false,
                    url: cfgService.getControllerUrl() + "/contact_list/change",
                    data: {
                        contact_id: contact_id,
                        contact_list_id: $scope.id,
                        token: cfgService.getToken(),
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
                    cfgService.httpErrorCallback(resp);
                }).finally(function () {
                    cfgService.hideSpinner();
                });
            }
        };



        console.log("contactListDetailsController is running now...");

        cfgService.showSpinner("Loading data...");
        var promise = $http({
            method: "GET",
            cache: false,
            url: cfgService.getControllerUrl() + "/contact_list/index",
            params: {
                id: $stateParams.id,
                token: cfgService.getToken()
            }
        }).then(function (resp) {
            console.log("RESPONSE:");
            console.log(resp.data);
            $scope.contact_list = resp.data.ContactList;
            $scope.contacts = resp.data.Contacts;
            $scope.stat = resp.data.Stat;

            $scope.pie.data = [$scope.stat.met, $scope.stat.not_met];
        }, function (resp) {
            cfgService.httpErrorCallback(resp);
        }).finally(function () {
            cfgService.hideSpinner();
        });

        $scope.sendEmail = function() {
            console.log('email = ', $scope.emails);
            var recips = [];
            for(var i = 0; i < $scope.emails.recipients.length; i++) {
                recips.push($scope.emails.recipients[i].email);
            }
            $scope.emails.recipients = recips;
            console.log('custom-email = ', $scope.emails);

            cfgService.sendEmail($scope.emails, function(response) {
                if(response) {
                    console.log('mainController-sendEmail-response = ', response);
                }
            })
        };

        console.log("contactListDetailsController is running now... Done.");
    });