'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:peer_groupController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
    .controller('peer_groupController', function ($scope, $state, $http, mainService) {
        $scope.accounts = [];
        $scope.symbols = [];

        var promise = $http({
            method: "GET",
            cache: false,
            url: mainService.getControllerUrl() + "/peer_group/index",
            params: {
                token: mainService.getToken()
            }
        }).then(function (resp) {
            console.log("RESPONSE: ");
            console.log(resp);
            $scope.accounts = resp.data;
            loadStockChart();
        }, function (resp) {
            mainService.httpErrorCallback(resp);
        });

        var loadStockChart = function () {
            var symbols = [];
            $scope.accounts.forEach(function (account) {
                if (account.wkn) {
                    symbols.push([account.wkn_tv, account.wkn_tv]);
                }
            });

            console.log(symbols);
            $scope.symbols = symbols;

            if (symbols.length) {
                new TradingView.MediumWidget({
                    "container_id": "peer_group_stock_chart",
                    "symbols": symbols,
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

        /** Selects the CSS class for presentation, red for negative and green for positive difference */
        $scope.getColor = function (a, b) {
            var aval = parseFloat(a);
            var bval = parseFloat(b);

            if (aval < bval) {
                return "redNumbers";
            } else if (aval > bval) {
                return "greenNumbers";
            } else {
                return "";
            }
        };
    });
