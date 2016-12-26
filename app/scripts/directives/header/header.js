'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:header
 * @description
 * # header
 */
angular.module('Quintet')
	.directive('header',function(){
		return {
        templateUrl:'scripts/directives/header/header.html',
        restrict: 'E',
        replace: true
    	}
	});


