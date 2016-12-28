'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:conferenceDetailsController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('conferenceDetailsController', function (cfgService, $scope, $state, $http, $stateParams, ConferenceService) {
        console.log("$stateParams : ", $stateParams);
        $scope.id = $stateParams.id;

        $scope.conference = {};
        $scope.meetings = {};
        $scope.condays = [];

        $scope.loadMeetings = function () {
            console.log("loadMeetings called");
            $scope.condays.forEach(function (conday) {
                console.log("loadMeetings called for conday = ", conday.conday_id);
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: cfgService.getControllerUrl() + "/meeting",
                    params: {
                        token: cfgService.getToken(),
                        conday_id: conday.conday_id
                    }
                }).then(function (resp) {
                    console.log("RESPONSE: ", resp);
                    //console.log(resp.data);
                    $scope.meetings[conday.conday_id] = resp.data;
                }, function (resp) {
                    cfgService.httpErrorCallback(resp);
                });
            });
        };

        cfgService.showSpinner("Loading conference data...");

        $scope.getConferenceData = function() {
            ConferenceService.getConferenceData($stateParams.id, function(response) {
                if(response) {
                    console.log('conferenceDetailsController-getConferenceData-response = ', response);
                    $scope.conference = response.conference;
                    $scope.condays = response.condays;
                    $scope.loadMeetings();
                }
                cfgService.hideSpinner();
            })
        };

        $scope.favoriteConf = function() {
            $scope.conference.is_favorite = !$scope.conference.is_favorite;

            if($scope.conference.is_favorite) {
                ConferenceService.setConferenceFavorite($stateParams.id, function(response) {
                    if(!response) {
                        $scope.conference.is_favorite = !$scope.conference.is_favorite;
                    }
                })
            } else {
                ConferenceService.removeConferenceFavorite($stateParams.id, function(response) {
                    if(!response) {
                        $scope.conference.is_favorite = !$scope.conference.is_favorite;
                    }
                })
            }
        };

        $scope.getConferenceData();
    });