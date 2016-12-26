'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:accountSearchController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
    .controller('accountSearchController', function (mainService, $scope, $stateParams, AccountService) {
        $scope.accounts = [];
        $scope.loading = false;
        $scope.hasDisplayedSpinner = false;
        $scope.mode = ($stateParams.mode) ? $stateParams.mode : "all";

        // Load the last search query
        $scope.query = (mainService.cache.accountSearchController_last_query) ? mainService.cache.accountSearchController_last_query : "";

        $scope.runQuery = function () {
            console.log("Update is running for query=", $scope.query);

            var query = $scope.query.trim();
            mainService.cache.accountSearchController_last_query = query;

            $scope.loading = true;

            AccountService.getAccountList($scope.mode, query, function(response) {
                if(response) {
                    $scope.accounts = response;
                }
                if ($scope.hasDisplayedSpinner) {
                    mainService.hideSpinner();
                    $scope.hasDisplayedSpinner = false;
                }
                $scope.loading = false;
            });
        };

        mainService.showSpinner("Loading Accounts...");
        $scope.hasDisplayedSpinner = true;
        $scope.runQuery();
    });
