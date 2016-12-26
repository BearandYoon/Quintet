'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:sidebarSearch
 * @description
 * # sidebarSearch
 */

angular.module('Quintet')
        .directive('sidebarSearch', function () {
            return {
                templateUrl: 'scripts/directives/sidebar/sidebar-search/sidebar-search.html',
                restrict: 'E',
                replace: true,
                scope: {
                },
                controller: function ($scope) {
                    $scope.selectedMenu = 'home';
                }
            }
        });
