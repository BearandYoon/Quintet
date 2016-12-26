'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:conferenceDetailsController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
    .controller('conferenceDetailsController', function (mainService, $scope, $state, $http, $stateParams) {
        console.log("$stateParams : ", $stateParams);
        $scope.id = $stateParams.id;

        $scope.conference = {};
        $scope.meetings = {};
        $scope.condays = [];

        $scope.loadMeetings = function () {
            console.log("loadMeetings called");
            $scope.condays.forEach(function (conday) {
                console.log("loadMeetings called for conday=" + conday.conday_id);
                var promise = $http({
                    method: "GET",
                    cache: false,
                    url: mainService.getControllerUrl() + "/meeting",
                    params: {
                        token: mainService.getToken(),
                        conday_id: conday.conday_id,
                    }
                }).then(function (resp) {
                    console.log("RESPONSE: " + resp);
                    console.log(resp.data);
                    $scope.meetings[conday.conday_id] = resp.data;
                }, function (resp) {
                    mainService.httpErrorCallback(resp);
                });
            });
        };

        console.log("conferenceDetailsController is running now...");

        mainService.showSpinner("Loading conference data...");

        $http({
            method: "GET",
            cache: false,
            url: mainService.getControllerUrl() + "/conference/index",
            params: {
                id: $stateParams.id,
                token: mainService.getToken()
            }
        }).then(function (resp) {
            console.log("RESPONSE:");
            console.log(resp.data);
            // $scope.contact_list = resp.data.ContactList;
            $scope.conference = resp.data.conference;
            $scope.condays = resp.data.condays;

            $scope.loadMeetings();

            console.log("Data loaded!");
            console.log($scope.conference);
        }, function (resp) {
            mainService.httpErrorCallback(resp);
        }).finally(function() {
            mainService.hideSpinner();
        }) ;

        console.log("conferenceDetailsController is running now... Done.");
    });
