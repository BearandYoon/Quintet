'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:accountDetailsController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('accountDetailsController', function (cfgService, $scope, $state, $http, $stateParams, AccountService, ContactService, $uibModal) {
        $scope.id = 0;
        $scope.account = {};
        $scope.favorite_accounts = [];
        $scope.contacts = [];
        $scope.characteristics = [];
        $scope.peer_accounts = [];
        $scope.stocktwits = [];
        $scope.ownership = {};
        $scope.ownership_loading = false;

        $scope.holdings = {};
        $scope.holdings_filter = "false";
        $scope.holdings_loading = false;

        $scope.default_recipients = [];
        $scope.emails = {
            recipients: [],
            subject: '',
            body: ''
        };

        /**
         * Load basic information about an account
         * @returns {undefined}
         */
        $scope.loadAccountData = function () {
            cfgService.showSpinner("Loading Account...");

            AccountService.loadAccountData($stateParams.id, function(response) {
                if(response) {
                    console.log('loadAccountData = ', response);
                    $scope.account = response.account;
                    $scope.contacts = response.contacts;
                    $scope.characteristics = response.characteristics;
                    $scope.peer_accounts = response.peer_accounts;

                    $scope.loadStockTwits($scope.account.wkn);
                    $scope.loadStockChart($scope.account.company, $scope.account.wkn_tv);
                }
                cfgService.hideSpinner();
            });
        };

        /**
         * Toogle the peer-grou status of an account
         * @param {type} operation
         * @returns {undefined}
         */
        $scope.changePeer = function (operation) {
            //console.log("Now changing...");
            cfgService.showSpinner("Changing status...");

            AccountService.changePeer(operation, $stateParams.id, function(response) {
                if(response) {
                    if (response.data.indexOf("ERROR") == -1) {
                        alert(response.data.replace("OK ", ""));
                        $scope.loadAccountData();
                    } else {
                        alert(response.data.replace("ERROR ", ""));
                    }
                }
                cfgService.hideSpinner();
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
            $scope.holdings_filter = filter;
            $scope.holdings = [];

            $scope.holdings_loading = false;

            AccountService.loadHoldings($stateParams.id, filter, function(response) {
               if(response) {
                   $scope.holdings = response.data;
                   $scope.holdings_loading = false;
               }
                $scope.holdings_loading = true;
            });
        };

        // Load Ownership
        $scope.loadOwnership = function () {
            $scope.ownership_loading = false;
            var promise = $http({
                method: "GET",
                cache: false,
                url: cfgService.getControllerUrl() + "/account/ownership",
                params: {
                    id: $stateParams.id,
                    token: cfgService.getToken()
                }
            }).then(function (resp) {
                $scope.ownership = resp.data;
                $scope.ownership_loading = false;
            }, function (resp) {
                cfgService.httpErrorCallback(resp);
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
            //console.log("Now loading Stock twits for " + wkn);
            if (wkn) {
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: cfgService.getControllerUrl() + "/account/stocktwits",
                    params: {
                        wkn: wkn,
                        limit: 10,
                        token: cfgService.getToken()
                    }
                }).then(function (resp) {
                    // console.log("RESPONSE STOCKTWITS:");
                    // console.log(resp.data);

                    $scope.stocktwits = resp.data.messages;
                }, function (resp) {
                    cfgService.httpErrorCallback(resp);
                });
            }
        };

        /** Load the stock chart information of an account */
        $scope.loadStockChart = function (name, wkn) {
            //console.log("Loading stock chart for " + wkn);
            if (wkn) {
                new TradingView.MediumWidget({
                    "container_id": "account_details_stock_chart",
                    "symbols": [
                        [wkn, wkn]
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

        //console.log("accountDetailsController is running now...");

        // Copy Account ID from $stateParams
        $scope.id = $stateParams.id;

        // And now load the account data...
        $scope.loadAccountData();

        // Load Holdings and Ownership in parallel
        $scope.loadHoldings();
        $scope.loadOwnership();

        $scope.openEmailModal = function() {
            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'views/email/sendEmail-modal.html',
                controller: 'sendEmailController',
                controllerAs: '$ctrl',
                size: 'medium-st',
                //backdrop  : 'static',
                keyboard  : false,
                resolve: {
                    param: function () {
                        return {
                            'isAccount': true,
                            'id' : $scope.id,
                            'sel_contact_name' : $scope.account.company
                        };
                    }
                }
            });
        };

        $scope.favoriteAccount = function() {
            $scope.account.is_favorite = !$scope.account.is_favorite;

            if($scope.account.is_favorite) {
                AccountService.setFavorite($stateParams.id, function(response) {
                    if(!response) {
                        $scope.account.is_favorite = !$scope.account.is_favorite;
                    }
                })
            } else {
                AccountService.removeFavorite($stateParams.id, function(response) {
                    if(!response) {
                        $scope.account.is_favorite = !$scope.account.is_favorite;
                    }
                })
            }
        };
    });