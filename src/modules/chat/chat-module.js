var angular = require('angular');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router');
var satellizer = require('satellizer');
var i18n = require('angular-i18n/cs-cz.js');

var chatConfig = require('./chat-config.js');
var chatService = require('./chat-service.js');
var userResource = require('../user/user-resource.js');
var roomController = require('./room/room-controller.js');
var autoscrollDirective = require('./app-autoscroll.js');

module.exports = angular
    .module('app.chat', [ngMaterial, uiRouter, satellizer, i18n])
    .provider('chatService', chatService)
    .provider('userResource', userResource)
    .controller('roomController', roomController)
    .config(chatConfig)
    .filter('removeProfanity', function() {
        return function(input) {
            var filteredWords = ['lorem', 'set', 'prdel', 'hovno', 'ahoj', 'test'];
            var check = [];
            check = input.split(' ');
            for (var i = 0; i < check.length; i++) {
                for (var x = 0; x < filteredWords.length; x++){
                    if (check[i].indexOf(filteredWords[x]) > -1) {
                        input = input.replace(check[i],function(){
                            var out = '';
                            var profanity = [];
                            profanity = check[i].split("");
                            for (var y = 0; y < profanity.length; y++) {
                                if ((profanity[y].charCodeAt(0) > 64 && profanity[y].charCodeAt(0) < 91) ||
                                    (profanity[y].charCodeAt(0) > 96 && profanity[y].charCodeAt(0) < 123) ) {
                                    out = out + '*'
                                } else {
                                    out = out + profanity[y]
                                }
                            };
                            return out;
                        })
                    }
                };
            }
            return input;
        };
    })
    .directive('appAutoscroll', autoscrollDirective)
    .name;