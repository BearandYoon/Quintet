'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:timeline
 * @description
 * # timeline
 */
angular.module('Quintet')
	.directive('timeline',function() {
    return {
        templateUrl:'scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true
    }
  });
