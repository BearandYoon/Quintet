/**
 * Created by bear on 12/23/16.
 */
'use strict';

/**
 * @ngdoc service
 * @name Quintet.AccountService
 * @description
 * # AccountService
 * Service in the sbAdminApp.
 */
angular.module('Quintet')
    .service('AccountService', function ($http, $state, mainService, $q) {
        var canceler = $q.defer();

        function getAccountList(mode, query, callback) {
            // cancel old queries...
            canceler.resolve();
            canceler = $q.defer();

            return $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/account/index",
                timeout: canceler.promise,
                params: {
                    query: query,
                    mode: mode,
                    token: mainService.getToken()
                }
            }).then(
                function successCallback(response) {
                    //console.log('AccountService-getAccountList-response = ', response);
                    callback(response.data);
                },
                function errorCallback(response) {
                    //console.log('AccountService-getAccountList-response = ', response);
                    callback(false);
                }
            )
        }

        return ({
            getAccountList: getAccountList
        });
    });
