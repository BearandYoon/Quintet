'use strict';

/**
 * @ngdoc directive
 * @name Quintet.directive:chat
 * @description
 * # chat
 */
angular.module('Quintet')
        .directive('chat', function () {
            return {
                templateUrl: 'scripts/directives/chat/chat.html',
                restrict: 'E',
                replace: true
            }
        });


