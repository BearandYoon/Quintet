/**
 * Created by bear on 12/23/16.
 */
'use strict';

/**
 * @ngdoc service
 * @name Quintet.ConferenceService
 * @description
 * # ConferenceService
 * Service in the sbAdminApp.
 */
angular.module('Quintet')
    .service('ConferenceService', function ($http, $state, mainService) {

        function loadMeetings(callback) {
            return $http.get(mainService.getControllerUrl() + "/meeting", {
                token: mainService.getToken(),
                start: $scope.meetings_start,
                end: $scope.meetings_end
            }).then(
                function successCallback(response) {
                    //console.log('ConferenceService-loadMeetings-response = ', response);
                    callback(response.data);
                },
                function errorCallback() {
                    callback(false);
                }
            );
        }

        function getConferenceList(start, end, url, callback) {
            url = url + '&start=' + start + '&end=' + end;
            return $http.get(url, '').then(
                function successCallback(response) {
                    //console.log('ConferenceService-getConferenceList-response = ', response);
                    callback(response.data);
                },
                function errorCallback() {
                    callback(false);
                }
            )
        }

        return ({
            loadMeetings: loadMeetings,
            getConferenceList: getConferenceList
        });
    });
