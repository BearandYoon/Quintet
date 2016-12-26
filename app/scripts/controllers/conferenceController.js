'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:conferenceController
 * @description
 * Controller of the Quintet
 */
angular.module('Quintet')
    .controller('conferenceController', function ($state, $stateParams, $http, $scope, $rootScope, mainService, ConferenceService, uiCalendarConfig) {
        // Event Source für Roadshows
        $scope.eventSource_roadshows = {
            url: mainService.getControllerUrl() + "/conference/index?filter=roadshow&token=" + mainService.getToken(),
            color: '#f7cc63',
            textColor: '#000000'
        };

        // Event Source für Conferences
        $scope.eventSource_conferences_scientific = {
            url: mainService.getControllerUrl() + "/conference/index?filter=conference&subfilter=scientific&token=" + mainService.getToken(),
            color: '#FFbd50',
            textColor: '#000000'
        };
        $scope.eventSource_conferences_investor = {
            url: mainService.getControllerUrl() + "/conference/index?filter=conference&subfilter=investor&token=" + mainService.getToken(),
            color: '#52FF50',
            textColor: '#000000'
        };
        $scope.eventSource_conferences_other = {
            url: mainService.getControllerUrl() + "/conference/index?filter=conference&subfilter=other&token=" + mainService.getToken(),
            color: '#52bdFF',
            textColor: '#000000'
        };

        $scope.meetings = [];
        $scope.meetings_start = '';
        $scope.meetings_end = '';
        $scope.headline = "Conference Calendar";
        $scope.selected_Cal = $rootScope.selected_date;

        switch ($stateParams.mode) {
            case "roadshows":
                $scope.headline = "Roadshow Calendar";
                $scope.eventSources = [$scope.eventSource_roadshows];
                //console.log('eventSources_roadshows = ', $scope.eventSources);
                getConferenceList();
                break;
            case "conferences":
                $scope.headline = "Conference Calendar";
                $scope.eventSources = [
                    $scope.eventSource_conferences_scientific,
                    $scope.eventSource_conferences_investor,
                    $scope.eventSource_conferences_other
                ];
                //console.log('eventSources_conferences = ', $scope.eventSources);
                break;
            default:
                $scope.headline = "Error";
                $scope.eventSources = [];
                alert("Mode " + $stateParams.mode + " is not supported!");
        }

        function getConferenceList() {
            var start_date = new Date();
            var pastYear = start_date.getFullYear() - 1;
            start_date.setFullYear(pastYear);
            start_date = start_date.toISOString().split('T')[0];
            var today = new Date().toISOString().split('T')[0];

            var end_date = new Date();
            var nextYear = end_date.getFullYear() + 1;
            end_date.setFullYear(nextYear);
            end_date = end_date.toISOString().split('T')[0];

            //get next conferences list
            ConferenceService.getConferenceList(today, end_date, $scope.eventSource_roadshows.url, function(response) {
                if(response) {
                    $scope.nextConferences = response;
                }
            });

            //get past conferences list
            ConferenceService.getConferenceList(start_date, today, $scope.eventSource_roadshows.url, function(response) {
                if(response) {
                    $scope.pastConferences = response;
                }
            });
        }

        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
            $rootScope.selected_date = date._start._d;
            //console.log('alertOnEventClick-Date = ', date);
            $state.go("quintet.conference_details", {id: date.ID});
            // Weiterleitung zu Conference Details
        };

        $scope.loadMeetings = function () {
            ConferenceService.loadMeetings(function(response) {
                if(response) {
                    $scope.meetings = response;
                }
            })
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 650,
                // editable: false,
                header: {
                    left: 'month basicWeek', // basicDay agendaWeek agendaDay
                    center: 'title',
                    right: 'today prev,next'
                },
                defaultDate: $scope.selected_Cal,
                selectable: true,
                eventLimit: true, // allow "more" link when too many events
                eventClick: $scope.alertOnEventClick,
                select: function (start, end, jsEvent, view, resource) {
                    //console.log('select', start.format(), end.format(), resource ? resource.id : '(no resource)');

                    $scope.meetings_start = start.format();
                    $scope.meetings_end = end.format();

                    $scope.loadMeetings();
                }
            }
        };
        //console.log("conferenceController is running now... Done.");
    });
