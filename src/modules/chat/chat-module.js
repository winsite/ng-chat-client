var angular = require('angular');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router');
var satellizer = require('satellizer');

var chatConfig = require('./chat-config.js');
var chatService = require('./chat-service.js');
var roomController = require('./room/room-controller.js');

module.exports = angular
    .module('app.chat', [ngMaterial, uiRouter, satellizer])
    .provider('chatService', chatService)
    .controller('roomController', roomController)
    .config(chatConfig)
    .name;