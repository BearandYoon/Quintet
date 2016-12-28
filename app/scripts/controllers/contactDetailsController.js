'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactDetailsController
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('contactDetailsController', function (cfgService, $scope, $state, $http, $stateParams, $uibModal, ContactService) {
        console.log("stateParams: " + $stateParams);

        $scope.id = $stateParams.id;
        $scope.contact = {};
        $scope.meetings = [];
        $scope.contact_lists = [];

        /**
         * Loads all contact lists
         * @returns {undefined}
         */
        $scope.loadContactLists = function () {
            var promise = $http({
                method: "GET",
                cache: false,
                url: cfgService.getControllerUrl() + "/contact_list/by_contact",
                params: {
                    token: cfgService.getToken(),
                    contact_id: $stateParams.id
                }
            }).then(function (resp) {
                $scope.contact_lists = resp.data;
            }, function (resp) {
                cfgService.httpErrorCallback(resp);
            });
        };

        /**
         * Changes the subscription of a the loaded contact
         * @param {type} operation
         * @param {type} contact_list_id
         * @returns {undefined}
         */
        $scope.changeSubscription = function (operation, contact_list_id) {
            var promise = $http({
                method: "POST",
                cache: false,
                url: cfgService.getControllerUrl() + "/contact_list/change",
                data: {
                    contact_id: $stateParams.id,
                    contact_list_id: contact_list_id,
                    token: cfgService.getToken(),
                    operation: operation
                }
            }).then(function (resp) {
                if (resp.data.indexOf("ERROR") == -1) {
                    alert(resp.data.replace("OK ", ""));
                    $scope.loadContactLists();
                } else {
                    alert(resp.data.replace("ERROR ", ""));
                }
            }, function (resp) {
                cfgService.httpErrorCallback(resp);
            });
        };

        cfgService.showSpinner("Loading Contact...");
        var promise_data = $http({
            method: "GET",
            cache: false,
            url: cfgService.getControllerUrl() + "/contact/index",
            params: {
                id: $stateParams.id,
                token: cfgService.getToken()
            }
        }).then(function (resp) {
            $scope.contact = resp.data;
        }, function (resp) {
            cfgService.httpErrorCallback(resp);
        }).finally(function() {
            cfgService.hideSpinner();
        });

        var promise = $http({
            method: "GET",
            cache: false,
            url: cfgService.getControllerUrl() + "/meeting",
            params: {
                token: cfgService.getToken(),
                contact_id: $stateParams.id
            }
        }).then(function (resp) {
            $scope.meetings = resp.data;
        }, function (resp) {
            cfgService.httpErrorCallback(resp);
        });

        $scope.loadContactLists();

        $scope.openEmailModal = function(isIntroduction, name) {
            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'views/email/sendEmail-modal.html',
                controller: 'sendEmailController',
                controllerAs: '$ctrl',
                size: 'medium-st',
                keyboard  : false,
                resolve: {
                    param: function () {
                        return {
                            'isAccount': false,
                            'id' : $scope.id,
                            'introduction': isIntroduction,
                            'sel_contact_name' : name
                        };
                    }
                }
            });
        };

        $scope.favoriteContact = function() {
            $scope.contact.is_favorite = !$scope.contact.is_favorite;

            if($scope.contact.is_favorite) {
                ContactService.setFavorite($stateParams.id, function(response) {
                    if(!response) {
                        $scope.contact.is_favorite = !$scope.contact.is_favorite;
                    }
                })
            } else {
                ContactService.removeFavorite($stateParams.id, function(response) {
                    if(!response) {
                        $scope.contact.is_favorite = !$scope.contact.is_favorite;
                    }
                })
            }
        };
    });