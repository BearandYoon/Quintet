'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:mainController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
    .controller('mainController', function (mainService, $scope, $timeout, $http, $state) {
        $scope.account = {};
        $scope.account.wkn = mainService.getUserInfo().account_wkn;
        $scope.account.wkn_tv = mainService.getUserInfo().account_wkn_tv;
        $scope.peer_group = [];
        $scope.ownership;
        $scope.emails = {
            recipients: [],
            subject: '',
            body: ''
        };

        // Dashboard
        $scope.stats = {
            contact_updates: 'N/A',
            upcoming_meetings: 'N/A',
            upcoming_roadshowss: 'N/A',
            target_lists: 'N/A',
            peer_group_companies: 'N/A',
            projects: 'N/A'
        };

        $scope.line = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            series: ['Series A', 'Series B'],
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ],
            onClick: function (points, evt) {
                console.log(points, evt);
            }
        };

        $scope.bar = {
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            series: ['Series A', 'Series B'],
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]

        };

        $scope.donut = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data: [300, 500, 100]
        };

        $scope.radar = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            data: [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ]
        };

        $scope.pie = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data: [300, 500, 100]
        };

        $scope.polar = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data: [300, 500, 100, 40, 120]
        };

        $scope.dynamic = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data: [300, 500, 100, 40, 120],
            type: 'PolarArea',
            toggle: function ()
            {
                this.type = this.type === 'PolarArea' ?
                    'Pie' : 'PolarArea';
            }
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
                }
                // console.log(evt);
                $state.go("quintet.meetings", {quarter: label});
            }
        };

        var loadStockTwits = function (wkn) {
            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/account/stocktwits",
                params: {
                    wkn: wkn,
                    limit: 10,
                    token: mainService.getToken()
                }
            }).then(function (resp) {
                // console.log("RESPONSE STOCKTWITS:");
                // console.log(resp.data);

                $scope.stocktwits = resp.data.messages;
            }, function (resp) {
                mainService.httpErrorCallback(resp);
            });
        };

        var loadStockChart = function (wkn) {
            // Erst die Peer Group laden...
            var promise = $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/peer_group/index",
                params: {
                    token: mainService.getToken(),
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
                mainService.httpErrorCallback(resp);
            });
        };

        mainService.showSpinner("Loading data...");

        // Load numbers for Dashboard
        var promise_a = $http({
            method: "GET",
            cache: false,
            url: mainService.getControllerUrl() + "/stats/index",
            params: {
                token: mainService.getToken()
            }
        }).then(function (resp) {
            $scope.stats = resp.data.stats;
        }, function (resp) {
            mainService.httpErrorCallback(resp);
        }).finally(function () {
            mainService.hideSpinner();
        });

        // Dashboard (Zahlen) laden
        var promise_b = $http({
            method: "GET",
            cache: false,
            url: mainService.getControllerUrl() + "/stats/meetings_feedacks",
            params: {
                token: mainService.getToken()
            }
        }).then(function (resp) {
            $scope.line.labels = resp.data.labels;
            $scope.line.series = resp.data.series;
            $scope.line.data = resp.data.data;
        }, function (resp) {
            mainService.httpErrorCallback(resp);
        });

        var promise_c = $http({
            method: "GET",
            cache: false,
            url: mainService.getControllerUrl() + "/account/ownership",
            params: {
                id: "MINE",
                token: mainService.getToken()
            }
        }).then(function (resp) {
            $scope.ownership = resp.data;
            // console.log($scope.ownership);
        }, function (resp) {
            mainService.httpErrorCallback(resp);
        });

        loadStockChart($scope.account.wkn_tv);
        loadStockTwits($scope.account.wkn);

        $scope.sendEmail = function() {
            console.log('email = ', $scope.emails);
            var recips = [];
            for(var i = 0; i < $scope.emails.recipients.length; i++) {
                recips.push($scope.emails.recipients[i].email);
            }
            $scope.emails.recipients = recips;
            console.log('custom-email = ', $scope.emails);

            mainService.sendEmail($scope.emails, function(response) {
                if(response) {
                    console.log('mainController-sendEmail-response = ', response);
                }
            })
        }
    });
