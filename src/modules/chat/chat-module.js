var angular = require('angular');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router');
var satellizer = require('satellizer');
var i18n = require('angular-i18n/cs-cz.js');

var chatConfig = require('./chat-config.js');
var chatService = require('./chat-service.js');
var userResource = require('../user/user-resource.js');
var roomController = require('./room/room-controller.js');

module.exports = angular
    .module('app.chat', [ngMaterial, uiRouter, satellizer, i18n])
    .provider('chatService', chatService)
    .provider('userResource', userResource)
    .controller('roomController', roomController)
    .config(chatConfig)
    .name;