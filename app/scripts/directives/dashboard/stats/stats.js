'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:stats
 * @description
 * # stats
 */
angular.module('Quintet')
        .directive('stats', function () {
            return {
                templateUrl: 'scripts/directives/dashboard/stats/stats.html',
                restrict: 'E',
                replace: true,
                scope: {
                    'model': '=',
                    'comments': '@',
                    'number': '@',
                    'name': '@',
                    'colour': '@',
                    'details': '@',
                    'type': '@',
                    'goto': '@'
                }

            }
        });
