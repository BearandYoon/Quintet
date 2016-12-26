/**
 * Created by bear on 12/23/16.
 */
'use strict';

/**
 * @ngdoc service
 * @name Quintet.ContactService
 * @description
 * # ContactService
 * Service in the Quintet.
 */
angular.module('Quintet')
    .service('ContactService', function ($http, $state, mainService, $q) {
        var canceler = $q.defer();

        function searchContact(query, callback) {
            canceler.resolve();
            canceler = $q.defer();

            return $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/contact/index",
                timeout: canceler.promise,
                params: {
                    query: query,
                    token: mainService.getToken()
                }
            }).then(
                function successCallback(response) {
                    //console.log('ContactService-searchContact-response = ', response);
                    callback(response.data);
                },
                function errorCallback(response) {
                    //console.log('ContactService-searchContact-response-error = ', response);
                    callback(false);
                }
            )
        }

        function addToContactList(contact_id, contact_list_id, callback) {
            var url = mainService.getControllerUrl() + "/contact_list/change";
            return $http.post(url, {
                contact_id: contact_id,
                contact_list_id: contact_list_id,
                token: mainService.getToken(),
                operation: 'add'
            }).then(
                function successCallback(response) {
                    callback(response);
                },
                function errorCallback(response) {
                    callback(false);
                }
            )
        }

        function getContactList(callback) {
            return $http({
                method: "GET",
                cache: false,
                url: mainService.getControllerUrl() + "/contact_list",
                params: {
                    token: mainService.getToken()
                }
            }).then(
                function successCallback(response) {
                    callback(response);
                },
                function errorCallback(response) {
                    callback(false);
                }
            )
        }

        return ({
            searchContact: searchContact,
            addToContactList: addToContactList,
            getContactList: getContactList
        });
    });
