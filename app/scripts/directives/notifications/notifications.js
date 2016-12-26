'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:notification
 * @description
 * # notification
 */
angular.module('Quintet')
	.directive('notifications',function(){
		return {
        templateUrl:'scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true
    	}
	});


