'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contact_listController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('contact_listController', function ($scope, $state, $http, cfgService) {
        $scope.contact_lists = [];

        console.log("contact_listController is running now...");

        cfgService.showSpinner("Loading lists...");

        var promise = $http({
            method: "GET",
            cache: false,
            url: cfgService.getControllerUrl() + "/contact_list",
            params: {
                token: cfgService.getToken()
            }
        }).then(function (resp) {
            console.log("RESPONSE: " + resp);
            $scope.contact_lists = resp.data;
        }, function (resp) {
            cfgService.httpErrorCallback(resp);
        }).finally(function() {
            cfgService.hideSpinner();
        });

        console.log("contact_listController is running now... Done.");
    });