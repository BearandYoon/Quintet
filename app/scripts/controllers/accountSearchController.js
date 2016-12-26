'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:accountSearchController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('accountSearchController', function (cfgService, $scope, $stateParams, AccountService) {
        $scope.accounts = [];
        $scope.loading = false;
        $scope.hasDisplayedSpinner = false;
        $scope.mode = ($stateParams.mode) ? $stateParams.mode : "all";

        // Load the last search query
        $scope.query = (cfgService.cache.accountSearchController_last_query) ? cfgService.cache.accountSearchController_last_query : "";

        $scope.runQuery = function () {
            console.log("Update is running for query=", $scope.query);

            var query = $scope.query.trim();
            cfgService.cache.accountSearchController_last_query = query;

            $scope.loading = true;

            AccountService.getAccountList($scope.mode, query, function(response) {
                if(response) {
                    $scope.accounts = response;
                }
                if ($scope.hasDisplayedSpinner) {
                    cfgService.hideSpinner();
                    $scope.hasDisplayedSpinner = false;
                }
                $scope.loading = false;
            });
        };

        cfgService.showSpinner("Loading Accounts...");
        $scope.hasDisplayedSpinner = true;
        $scope.runQuery();

        $scope.getFavoriteAccounts = function() {
            AccountService.getFavoriteAccounts(function(response) {
                if(response) {
                    $scope.favorite_accounts = response;
                }
            });
        };

        $scope.getFavoriteAccounts();
    });