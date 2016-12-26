'use strict';
/**
 * @ngdoc function
 * @name Quintet.controller:contactSearchController
 * @description
 * # MainCtrl
 * Controller of the Quintet
 */
angular.module('Quintet')
    .controller('contactSearchController', function (mainService, $scope, $http, ContactService) {
        $scope.contacts = [];
        $scope.contact_lists = [];
        $scope.selected_contact_ids = [];
        $scope.loading = false;
        $scope.hasDisplayedSpinner = false;

        // Letzte query laden, anzeigewert dafür festlegen
        $scope.query = (mainService.cache.contactSearchController_last_query) ? mainService.cache.contactSearchController_last_query : "";

        $scope.runQuery = function () {
            console.log("Update is running for query = ", $scope.query);

            var query = $scope.query.trim();
            mainService.cache.contactSearchController_last_query = query;

            // Wenn Query leer, dann nach Favoriten etc. suchen
            if (query === "") {
                query = "FAVORITES_AND_MEETING_CONTACTS";
            }

            $scope.loading = true;

            ContactService.searchContact(query, function(response) {
                if(response) {
                    $scope.contacts = response;
                }

                if ($scope.hasDisplayedSpinner) {
                    mainService.hideSpinner();
                    $scope.hasDisplayedSpinner = false;
                }
                $scope.loading = false;
            });
        };

        $scope.toggleContact = function (id) {
            var element_found = false;

            // Element entfernen
            var filtered_contact_ids = $scope.selected_contact_ids.filter(function (item) {
                if (item == id) {
                    element_found = true;
                    return false;
                } else {
                    return true;
                }
            });

            // Element hinzufügen oder gefilterte Liste verwenden.
            if (element_found) {
                console.log("Was not found. Will add!");
                $scope.selected_contact_ids = filtered_contact_ids;
            } else {
                $scope.selected_contact_ids.push(id);
            }
        };

        /**
         * Add the selected contacts to a target list
         * @param {type} list_id
         * @param {type} list_name
         * @returns {undefined}
         */
        $scope.addToContactList = function (contact_list_id, list_name) {
            var result = confirm("Are you sure to add " + $scope.selected_contact_ids.length + " contacts to " + list_name + "?");
            if (result) {
                // Now add the contacts to the list.
                mainService.showSpinner("Adding contacts to list...");

                ContactService.addToContactList(query, function(response) {
                    if(response) {
                        if (response.data.indexOf("ERROR") == -1) {
                            alert(response.data.replace("OK ", ""));
                            // $scope.loadContactLists();

                            // Reset
                            $scope.selected_contact_ids = [];
                        } else {
                            alert(response.data.replace("ERROR ", ""));
                        }
                    }
                });
            }
        };

        /**
         * Select all Contacts
         * @returns {undefined}
         */
        $scope.selectAllContacts = function() {
            $.each($scope.contacts, function(index, contact) {
                if($scope.selected_contact_ids.indexOf(contact.ID) < 0) {
                    $scope.selected_contact_ids.push(contact.ID);
                }
            });
        };

        // Load contact lists
        function getContactList() {
            ContactService.getContactList(function(response) {
                if(response) {
                    $scope.contact_lists = response.data;
                }
            });
        }

        getContactList();
        mainService.showSpinner("Loading Accounts...");
        $scope.hasDisplayedSpinner = true;
        $scope.runQuery();
    });
