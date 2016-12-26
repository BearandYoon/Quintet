'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:headerNotification
 * @description
 * # hearderNotification
 */
angular.module('Quintet')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true
    	}
	});


