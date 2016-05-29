var angular = require('angular');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router');

var chatConfig = require('./chat-config.js');

module.exports = angular
    .module('app.chat', [ngMaterial, uiRouter])
    .config(chatConfig)
    .name;