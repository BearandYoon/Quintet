'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:chartController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('chartController', function (cfgService, $scope, $timeout, $http, $state) {
        $scope.account = {};
        $scope.account.wkn = cfgService.getUserInfo().account_wkn;
        $scope.account.wkn_tv = cfgService.getUserInfo().account_wkn_tv;
        $scope.peer_group = [];
        $scope.ownership;

        // Dashboard
        $scope.stats = {
            contact_updates: 'N/A',
            upcoming_meetings: 'N/A',
            upcoming_roadshowss: 'N/A',
            target_lists: 'N/A',
            peer_group_companies: 'N/A',
            projects: 'N/A'
        };

        // Configure Chart for Meetings and Feedback
        /* $scope.line = {
         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
         series: ['Series A', 'Series B'],
         data: [
         [65, 59, 80, 81, 56, 55, 40],
         [28, 48, 40, 19, 86, 27, 90]
         ],
         onClick: function (points, evt) {
         console.log(points, evt);
         }
         }; */
        $scope.line = {
            labels: [],
            series: [],
            data: [],
            onClick: function (points, evt) {
                /* canvas.onclick = function(evt){
                 var activePoints = myLineChart.getElementsAtEvent(evt);
                 }; */
                console.log(points);

                if (points) {
                    var label = points[0].label;
                    console.log("The label is " + label);
                }
                // console.log(evt);
                $state.go("quintet.meetings", {quarter: label});
            }
        };

        var loadStockTwits = function (wkn) {
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
        };

        var loadStockChart = function (wkn) {
            // Erst die Peer Group laden...
            var promise = $http({
                method: "GET",
                cache: false,
                url: cfgService.getControllerUrl() + "/peer_group/index",
                params: {
                    token: cfgService.getToken(),
                    no_quotes: 'true'
                }
            }).then(function (resp) {

                $scope.peer_group = resp.data;

                // Jetzt die stock symbols extrahierenm
                var symbols = [[wkn, wkn]];
                resp.data.forEach(function (account) {
                    if (account.wkn_tv) {
                        symbols.push([account.wkn_tv, account.wkn_tv]);
                    }
                });

                console.log("symbols :", symbols);

                //new TradingView.MediumWidget({
                //    "container_id": "dashboard_stock_chart",
                //    "symbols": symbols,
                //    "gridLineColor": "#E9E9EA",
                //    "fontColor": "#83888D",
                //    "underLineColor": "#dbeffb",
                //    "trendLineColor": "#4bafe9",
                //    "width": "100%",
                //    "height": "100%",
                //    "tradeItWidget": false,
                //    "locale": "en"
                //});

                new TradingView.MiniWidget({
                    container_id: 'tv-miniwidget-2',
                    tabs: [
                        'Commodities', 'Equities', 'Bonds', 'Forex'
                    ],
                    symbols: {
                        Equities: ['S&P500', 'NQ100', 'Dow30', 'Nikkei225', 'Apple', 'Google'],
                        Commodities: ['Emini', 'Euro', 'Gold', 'Oil', 'Gas', 'Corn'],
                        Bonds: ['US 2YR', 'US 10YR', 'US 30YR', 'Euro Bund', 'Euro BTP', 'Euro BOBL'],
                        Forex: ['FX:EURUSD', 'FX:GBPUSD', 'FX:USDJPY', 'FX:USDCHF', 'FX:AUDUSD', 'FX:USDCAD']
                    },
                    symbols_description: {
                        'S&P500': ' SPX500',
                        'NQ100': ' NAS100',
                        'Dow30': 'DOWI',
                        'Nikkei225': 'JPN225',
                        'Apple': ' BATS:AAPL ',
                        'Google': 'BATS:GOOG',
                        'Emini': 'ES1!',
                        'Euro': 'E61!',
                        'Gold': 'GC1!',
                        'Oil': 'CL1!',
                        'Gas': 'NG1!',
                        'Corn': 'ZC1!',
                        'US 2YR': 'TUZ2013',
                        'US 10YR': 'TYZ2013',
                        'US 30YR': 'USZ2013',
                        'Euro Bund': 'FX:BUND',
                        'Euro BTP': 'EUREX:II1!',
                        'Euro BOBL': 'EUREX:HR1!'
                    },
                    //large_chart_url: 'http://www.futuresmag.com/page/interactive-charts',
                    "width": "100%",
                    "height": "339px"
                });
            }, function (resp) {
                cfgService.httpErrorCallback(resp);
            });
        };

        cfgService.showSpinner("Loading data...");

        // Load numbers for Dashboard
        var promise_a = $http({
            method: "GET",
            cache: false,
            url: cfgService.getControllerUrl() + "/stats/index",
            params: {
                token: cfgService.getToken()
            }
        }).then(function (resp) {
            console.log("RESPONSE-1: ", resp);
            $scope.stats = resp.data.stats;
        }, function (resp) {
            cfgService.httpErrorCallback(resp);
        }).finally(function () {
            cfgService.hideSpinner();
        });

        // Dashboard (Zahlen) laden
        var promise_b = $http({
            method: "GET",
            cache: false,
            url: cfgService.getControllerUrl() + "/stats/meetings_feedacks",
            params: {
                token: cfgService.getToken()
            }
        }).then(function (resp) {
            console.log("RESPONSE-2 : ", resp);
            $scope.line.labels = resp.data.labels;
            $scope.line.series = resp.data.series;
            $scope.line.data = resp.data.data;
        }, function (resp) {
            cfgService.httpErrorCallback(resp);
        });

        var promise_c = $http({
            method: "GET",
            cache: false,
            url: cfgService.getControllerUrl() + "/account/ownership",
            params: {
                id: "MINE",
                token: cfgService.getToken()
            }
        }).then(function (resp) {
            console.log("RESPONSE OWNERSHIP = :", resp);
            $scope.ownership = resp.data;
            // console.log($scope.ownership);
        }, function (resp) {
            cfgService.httpErrorCallback(resp);
        });

        loadStockChart($scope.account.wkn_tv);
        loadStockTwits($scope.account.wkn);
    });