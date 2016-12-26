/**
 * Created by bear on 12/21/16.
 */
'use strict';

/**
 * @ngdoc service
 * @name Quintet.MainService
 * @description
 * # MainService
 * Service in the Quintet.
 */
angular.module('Quintet')
    .service('mainService', function ($state, $http) {
        this.token = "NOT_LOADED";
        this.user_info = "NOT_LOADED";
        this.client = "NOT_LOADED";

        /**
         * Sets and stores the client key
         * @param {type} client
         * @returns {undefined}
         */
        this.setClient = function (client) {
            this.client = client;
            localStorageSetItem("client", client);
        };

        /**
         * Returns the selected client key
         * @returns {String}
         */
        this.getClient = function () {
            // console.log("getToken in configService");

            if (this.client == "NOT_LOADED") {
                this.client = localStorageGetItem("client");
                console.log("Loaded token: ", this.client);
            }

            if (!this.client || this.client == "NOT_LOADED") {
                this.client = "TROUT";
            }

            return this.client;
        };

        /**
         * Set the token to a defined value (if empty: clears all information == logout)
         * @param {type} token
         * @returns {undefined}
         */
        this.setToken = function (token) {
            if (token) {
                this.token = token;
                localStorageSetItem("token", token);
            } else {
                localStorageClear();
                this.token = "";
                this.client = "";
                this.user_info = {};
            }
        };

        /**
         * Get the token
         * @returns {String}
         */
        this.getToken = function () {
            // console.log("getToken in configService");

            if (this.token == "NOT_LOADED") {
                this.token = localStorageGetItem("token");
                console.log("Loaded token: " + this.token);
            }

            return this.token;
        };


        this.setUserInfo = function (user_info) {
            this.user_info = user_info;
            localStorageSetItem("user_info", angular.toJson(user_info));
        };

        this.getUserInfo = function () {
            // console.log("getToken in configService");

            if (this.user_info == "NOT_LOADED") {
                this.user_info = angular.fromJson(localStorageGetItem("user_info"));
                console.log("Loaded user_info: " + this.user_info);
            }

            return this.user_info;
        };

        /**
         * Returns the controller URL for the selected client
         * @returns {String} URL
         */
        this.getControllerUrl = function () {
            switch (this.getClient()) {
                case "TROUT":
                    return "https://plannersys.net/planner-v3/quintet_v10.php";
                case "NEWCO":
                    return "https://plannersys.net/newco/quintet_v10.php";
                case "DEMO":
                    return "https://demo:planner@plannersys.net/planner-demo/quintet_v20.php";
                case "DEV":
                    return "http://192.168.56.102/planner/quintet_v10.php";
                default:
                    alert("No controller URL defined for " + this.client);
                    return "";
            }
        };

        /**
         * Returns the version number of the app
         * @returns {String} Version number (string)
         */
        this.getAppVersion = function () {
            return "0.4.1 dev";
        };

        /** Handles a HTTP error (callback for second parameter of $http.then() ) */
        this.httpErrorCallback = function (resp) {
            if (resp.status <= 0 && resp.statusText == "") {
                console.log("Nothing interesting here, status is 0 and statusText is blank");
                console.log(JSON.stringify(resp));
                console.log(resp);
            } else {
                /* if (resp.config.timeout.$$state.value == "new query...") {
                 // alert("That is fine.");
                 } else { */
                alert("Sorry, an error occured: " + resp.status + " " + resp.statusText);
                console.log("Sorry, an error occured: " + resp.status + " " + resp.statusText)
                console.log(JSON.stringify(resp));
                console.log(resp);

                if (resp.status == 403) {
                    console.log("status is '403 Forbidden', forwarding to login screen...");
                    $state.go('login');
                }
            }
            // }
        };

        /**
         * Show the Cordova spinner
         * @param {string} Text
         */
        this.showSpinner = function (text) {
            if (window.cordova) {
                window.plugins.spinnerDialog.show(text);
            } else {
                console.log("SPINNER SHOW " + text);
            }
        };

        /**
         * Hide the Cordova spinner
         */
        this.hideSpinner = function () {
            if (window.cordova) {
                window.plugins.spinnerDialog.hide();
            } else {
                console.log("SPINNER HIDE");
            }
        };

        this.cache = {};

        this.sendEmail = function(email, callback) {
            var url = this.getControllerUrl() + "/email/send";
            return $http.post(url, {
                token: this.getToken(),
                recipients: email.recipients,
                subject: email.subject,
                body: email.body
            }).then(
                function successCallback(response) {
                    console.log('sendEmail-response = ', response);
                    callback(response);
                },
                function errorCallback(response) {
                    console.log('sendEmail-response-error = ', response);
                    callback(false);
                }
            )
        }
    });
