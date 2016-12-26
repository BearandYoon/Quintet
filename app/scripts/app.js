'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
        .module('sbAdminApp', [
            'ngSanitize',
            'oc.lazyLoad',
            'ui.router',
            'ui.bootstrap',
            'angular-loading-bar',
            'ui.calendar',
            'ngTagsInput',
            'ui.select'
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
                $ocLazyLoadProvider.config({
                    debug: false,
                    events: true
                });

                // Default: Home anzeigen. Wenn das nicht geht, wird zu login weitergeleitet.
                $urlRouterProvider.otherwise('/home');

                $stateProvider
                        .state('dashboard', {
                            // url: '/dashboard',
                            templateUrl: 'views/dashboard/main.html',
                            resolve: {
                                loadMyDirectives: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(
                                            {
                                                name: 'sbAdminApp',
                                                files: [
                                                    'scripts/directives/header/header.js',
                                                    'scripts/directives/header/header-notification/header-notification.js',
                                                    'scripts/directives/sidebar/sidebar.js',
                                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                                                ]
                                            }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'toggle-switch',
                                                        files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                                            "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                                        ]
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngAnimate',
                                                        files: ['bower_components/angular-animate/angular-animate.js']
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngCookies',
                                                        files: ['bower_components/angular-cookies/angular-cookies.js']
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngResource',
                                                        files: ['bower_components/angular-resource/angular-resource.js']
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngSanitize',
                                                        files: ['bower_components/angular-sanitize/angular-sanitize.js']
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngTouch',
                                                        files: ['bower_components/angular-touch/angular-touch.js']
                                                    })
                                }
                            }
                        })

                        .state('quintet', {
                            // url: '/dashboard',
                            templateUrl: 'views/dashboard/main.html',
                            resolve: {
                                loadMyDirectives: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(
                                            {
                                                name: 'sbAdminApp',
                                                files: [
                                                    'scripts/directives/header/header.js',
                                                    'scripts/directives/header/header-notification/header-notification.js',
                                                    'scripts/directives/sidebar/sidebar.js',
                                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                                                ]
                                            }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'toggle-switch',
                                                        files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                                            "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                                        ]
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngAnimate',
                                                        files: ['bower_components/angular-animate/angular-animate.js']
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngCookies',
                                                        files: ['bower_components/angular-cookies/angular-cookies.js']
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngResource',
                                                        files: ['bower_components/angular-resource/angular-resource.js']
                                                    }),
                                            $ocLazyLoad.load(
                                                    {
                                                        name: 'ngSanitize',
                                                        files: ['bower_components/angular-sanitize/angular-sanitize.js']
                                                    })
                                    $ocLazyLoad.load(
                                            {
                                                name: 'ngTouch',
                                                files: ['bower_components/angular-touch/angular-touch.js']
                                            })
                                }
                            }
                        })

                        .state('dashboard.form', {
                            templateUrl: 'views/form.html',
                            url: '/form'
                        })
                        .state('dashboard.blank', {
                            templateUrl: 'views/pages/blank.html',
                            url: '/blank'
                        })
                        .state('dashboard.chart', {
                            templateUrl: 'views/chart.html',
                            url: '/chart',
                            controller: 'chartController',
                            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        // you can lazy load files for an existing module
                                        return $ocLazyLoad.load('js/controllers/chartController.js');
                                    }]
                            }

                        })
                        .state('dashboard.table', {
                            templateUrl: 'views/table.html',
                            url: '/table'
                        })
                        .state('dashboard.panels-wells', {
                            templateUrl: 'views/ui-elements/panels-wells.html',
                            url: '/panels-wells'
                        })
                        .state('dashboard.buttons', {
                            templateUrl: 'views/ui-elements/buttons.html',
                            url: '/buttons'
                        })
                        .state('dashboard.notifications', {
                            templateUrl: 'views/ui-elements/notifications.html',
                            url: '/notifications'
                        })
                        .state('dashboard.typography', {
                            templateUrl: 'views/ui-elements/typography.html',
                            url: '/typography'
                        })
                        .state('dashboard.icons', {
                            templateUrl: 'views/ui-elements/icons.html',
                            url: '/icons'
                        })
                        .state('dashboard.grid', {
                            templateUrl: 'views/ui-elements/grid.html',
                            url: '/grid'
                        })


                        .state('login', {
                            templateUrl: 'views/pages/login.html',
                            url: '/login',
                            controller: 'loginController',
                            resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                                loadLoginController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        // you can lazy load files for an existing module
                                        return $ocLazyLoad.load('scripts/controllers/loginController.js');
                                    }]
                            }
                        })
                        .state('quintet.home', {
                            url: '/home',
                            controller: 'mainController',
                            templateUrl: 'views/dashboard/home.html',
                            resolve: {
                                loadMyFile: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'chart.js',
                                        files: [
                                            'scripts/controllers/mainController.js',
                                            'scripts/directives/dashboard/stats/stats.js',
                                            'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                            'bower_components/angular-chart.js/dist/angular-chart.css'
                                        ]
                                    }),
                                            $ocLazyLoad.load({
                                                name: 'sbAdminApp',
                                                files: ['scripts/controllers/chartContoller.js']
                                            })
                                }
                            }
                        })
                        .state('quintet.tasks', {
                            templateUrl: 'views/tasks/index.html',
                            url: '/tasks'
                        })

                        .state('quintet.search', {
                            templateUrl: 'views/dashboard/search.html',
                            url: '/search?query',
                            controller: 'headerController',
                            params: {
                                query: ''
                            }
                        })

                        .state('quintet.contact_search', {
                            templateUrl: 'views/contact/search.html',
                            url: '/contact/search',
                            controller: 'contactSearchController'
                        })
                        .state('quintet.contact_details', {
                            templateUrl: 'views/contact/details.html',
                            url: '/contact/details?id'
                        })
                        .state('quintet.favorite_contact', {
                            templateUrl: 'views/contact/favorite.html',
                            url: '/contact/favorite',
                            controller: 'contactSearchController',
                            params: {
                                mode: 'favorite'
                            }
                        })

                        .state('quintet.account_search', {
                            templateUrl: 'views/account/search.html',
                            url: '/account/search?mode',
                            controller: 'accountSearchController'
                        })
                        .state('quintet.account_details', {
                            templateUrl: 'views/account/details.html',
                            url: '/account/details?id'
                        })
                        .state('quintet.favorite_account', {
                            templateUrl: 'views/account/favorite.html',
                            url: '/account/favorite',
                            controller: 'accountSearchController',
                            params: {
                                mode: 'favorite'
                            }
                        })

                        .state('quintet.contact_lists', {
                            templateUrl: 'views/contact_list/index.html',
                            url: '/contact_list/index'
                        })
                        .state('quintet.contact_list_details', {
                            templateUrl: 'views/contact_list/details.html',
                            url: '/contact_list/details?id',
                            controller: 'contactListDetailsController',
                            resolve: {
                                loadMyFile: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'chart.js',
                                        files: [
                                            'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                            'bower_components/angular-chart.js/dist/angular-chart.css'
                                        ]
                                    }),
                                            $ocLazyLoad.load({
                                                name: 'sbAdminApp',
                                                files: ['scripts/controllers/contactListDetailsController.js']
                                            })
                                }
                            }
                        })
                        .state('quintet.contact_list_edit', {
                            templateUrl: 'views/contact_list/edit.html',
                            url: '/contact_list/edit?id',
                            // controller: 'contactListEditController',
                            resolve: {
                                loadMyFile: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'sbAdminApp',
                                        files: ['scripts/controllers/contactListEditController.js']
                                    });
                                }
                            }
                        })

                        .state('quintet.conference_calendar', {
                            templateUrl: 'views/conference/calendar.html',
                            url: '/conference/calendar?mode',
                            controller: 'conferenceController'
                        })
                        .state('quintet.conference_list', {
                            templateUrl: 'views/conference/list.html',
                            url: '/conference/list',
                            controller: 'conferenceController',
                            params: {
                                mode: 'roadshows'
                            }
                        })
                        .state('quintet.conference_details', {
                            templateUrl: 'views/conference/details.html',
                            url: '/conference/details?id'
                        })
                        .state('quintet.favorite_conference', {
                            templateUrl: 'views/conference/favorites.html',
                            url: '/conference/favorite',
                            controller: 'conferenceController',
                            params: {
                                mode: 'favorite'
                            }
                        })

                        /* .state('quintet.conference_watched', {
                         templateUrl: 'views/conference/favorites.html',
                         url: '/conference/watched'
                         }) */
                        .state('quintet.peer_group', {
                            templateUrl: 'views/peer_group/index.html',
                            url: '/peer_group'
                        })

                        .state('quintet.projects', {
                            templateUrl: 'views/project/index.html',
                            url: '/project/index'
                        })
                        .state('quintet.project_details', {
                            templateUrl: 'views/project/details.html',
                            url: '/project/details?id'
                        })

                        .state('quintet.meetings', {
                            templateUrl: 'views/meeting/index.html',
                            url: '/meetings/index?quarter'
                        })
                        .state('quintet.meeting_details', {
                            templateUrl: 'views/meeting/details.html',
                            url: '/meetings/details?id'
                        })

                        .state('quintet.feedbacks', {
                            templateUrl: 'views/feedback/index.html',
                            url: '/feedbacks/index?quarter'
                        })

                        .state('quintet.ir_workflows', {
                            templateUrl: 'views/ir/workflows.html',
                            url: '/ir/workflows'
                        })
                        .state('quintet.ir_recommendations', {
                            templateUrl: 'views/ir/recommendations.html',
                            url: '/ir/recommendations'
                        })
            }])
        .filter('encodeAddressForGmaps', function () {
            console.log("Getting encodeAddressForGmaps...");
            return function (data) {
                if (data) {
                    console.log("Now encoding " + data + "...");
                    data = data.split("\n").join(", ");
                    return encodeURIComponent(data);
                } else {
                    return data;
                }
            };
        })
        .filter('convertToDate', function () {
            return function (str) {
                return new Date(str);
            };
        })
        .run(function (cfgService, $rootScope, $state) {
            // Ohne ein Token darf nur die Login-Seite aufgerufen werden!
            $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                if (toState.name != "login") {
                    if (cfgService.getToken()) {
                        // Alles gut!
                    } else {
                        // Wir sollten uns erst einloggen...
                        e.preventDefault();
                        $state.go('login');
                    }
                } else {
                    // public-Seiten (hier: Seiten, die Login heißen) darf jeder immer aufrufen
                }
            });

            $rootScope.selected_date = new Date();
        });


