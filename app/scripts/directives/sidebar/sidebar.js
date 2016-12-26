'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:sidebar
 * @description
 * # sidebar
 */

angular.module('Quintet')
    .directive('sidebar', ['mainService', '$location', function (mainService) {
        return {
            templateUrl: 'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller: function ($scope) {
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;
                $scope.user_info = mainService.getUserInfo();

                $scope.check = function (x) {
                    if (x == $scope.collapseVar) {
                        $scope.collapseVar = 0;
                    } else {
                        $scope.collapseVar = x;
                    }
                };

                $scope.multiCheck = function (y) {
                    if (y == $scope.multiCollapseVar) {
                        $scope.multiCollapseVar = 0;
                    } else {
                        $scope.multiCollapseVar = y;
                    }
                };
            }
        }
    }]);
