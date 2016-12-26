'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:accountDetailsController
 * @description
 * Controller of the Quintet
 */
angular.module('Quintet')
        .controller('accountDetailsController', function (mainService, $scope, $state, $http, $stateParams) {
            $scope.id = 0;
            $scope.account = {};
            $scope.contacts = [];
            $scope.characteristics = [];
            $scope.peer_accounts = [];
            $scope.stocktwits = [];

            $scope.ownership = {};

            $scope.ownership_loading = false;

            $scope.holdings = {};
            $scope.holdings_filter = "false";
            $scope.holdings_loading = false;

            /**
             * Load basic information about an account
             * @returns {undefined}
             */
            $scope.loadAccountData = function () {
                mainService.showSpinner("Loading Account...");
                $http({
                    method: "GET",
                    cache: false,
                    url: mainService.getControllerUrl() + "/account/index",
                    params: {
                        id: $stateParams.id,
                        token: mainService.getToken()
                    }
                }).then(function (resp) {
                    console.log("RESPONSE:");
                    console.log(resp.data);

                    $scope.account = resp.data.account;
                    $scope.contacts = resp.data.contacts;
                    $scope.characteristics = resp.data.characteristics;
                    $scope.peer_accounts = resp.data.peer_accounts;

                    $scope.loadStockTwits($scope.account.wkn);
                    $scope.loadStockChart($scope.account.company, $scope.account.wkn_tv);
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                }).finally(function() {
                    mainService.hideSpinner();
                });
            };


            /**
             * Toogle the peer-grou status of an account
             * @param {type} operation
             * @returns {undefined}
             */
            $scope.changePeer = function (operation) {
                console.log("Now changing...");
                mainService.showSpinner("Changing status...");
                var promise = $http({
                    method: "POST",
                    cache: false,
                    url: mainService.getControllerUrl() + "/peer_group/change",
                    data: {
                        id: $stateParams.id,
                        token: mainService.getToken(),
                        operation: operation,
                    }
                }).then(function (resp) {
                    console.log("RESPONSE: " + resp.data);
                    if (resp.data.indexOf("ERROR") == -1) {
                        alert(resp.data.replace("OK ", ""));
                        $scope.loadAccountData();
                    } else {
                        alert(resp.data.replace("ERROR ", ""));
                    }
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                }).finally(function() {
                    mainService.hideSpinner();
                });
            };

            /**
             * Load the holdings
             * @param {type} filter
             * @returns {undefined}
             */
            $scope.loadHoldings = function (filter) {
                if (!filter) {
                    filter = "false";
                }
                $scope.holdings_filter = filter
                $scope.holdings = [];

                $scope.holdings_loading = false;
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: mainService.getControllerUrl() + "/account/holdings",
                    params: {
                        id: $stateParams.id,
                        token: mainService.getToken(),
                        restrict_ownings: filter,
                    }
                }).then(function (resp) {
                    // console.log("RESPONSE:");
                    // console.log(resp.data);
                    $scope.holdings = resp.data;
                    $scope.holdings_loading = false;
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                    $scope.holdings_loading = false;
                });
                $scope.holdings_loading = true;
            };

            // Load Ownership
            $scope.loadOwnership = function () {
                $scope.ownership_loading = false;
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: mainService.getControllerUrl() + "/account/ownership",
                    params: {
                        id: $stateParams.id,
                        token: mainService.getToken()
                    }
                }).then(function (resp) {
                    $scope.ownership = resp.data;
                    $scope.ownership_loading = false;
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                    $scope.ownership_loading = false;
                });
                $scope.ownership_loading = true;
            };

            /**
             * Load the stock twits for an account
             * @param {type} wkn
             * @returns {undefined}
             */
            $scope.loadStockTwits = function (wkn) {
                console.log("Now loading Stock twits for " + wkn);
                if (wkn) {
                    var promise = $http({
                        method: "GET",
                        cache: false,
                        url: mainService.getControllerUrl() + "/account/stocktwits",
                        params: {
                            wkn: wkn,
                            limit: 10,
                            token: mainService.getToken(),
                        }
                    }).then(function (resp) {
                        // console.log("RESPONSE STOCKTWITS:");
                        // console.log(resp.data);

                        $scope.stocktwits = resp.data.messages;
                    }, function (resp) {
                        mainService.httpErrorCallback(resp);
                    });
                }
            };

            /** Load the stock chart information of an account */
            $scope.loadStockChart = function (name, wkn) {
                console.log("Loading stock chart for " + wkn);
                if (wkn) {
                    new TradingView.MediumWidget({
                        "container_id": "account_details_stock_chart",
                        "symbols": [
                            [wkn, wkn],
                        ],
                        "gridLineColor": "#E9E9EA",
                        "fontColor": "#83888D",
                        "underLineColor": "#dbeffb",
                        "trendLineColor": "#4bafe9",
                        "width": "100%",
                        "height": "100%",
                        "tradeItWidget": false,
                        "locale": "en"
                    });
                }
            };

            console.log("accountDetailsController is running now...");

            // Copy Account ID from $stateParams
            $scope.id = $stateParams.id;

            // And now load the account data...
            $scope.loadAccountData();

            // Load Holdings and Ownership in parallel
            $scope.loadHoldings();
            $scope.loadOwnership();

            console.log("accountDetailsController is running now... Done.");
        });
