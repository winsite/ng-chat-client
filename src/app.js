var angular = require('angular');
var ngMaterial = require('angular-material');

require('!file?name=[name].[ext]!../index.html');
require('angular-material/angular-material.css');
require('../style/index.less');

var userModule = require('./modules/user/user-module.js');
var chatModule = require('./modules/chat/chat-module.js');
var appConfig = require('./app-config.js');

module.exports = angular
    .module('app', [ngMaterial, userModule, chatModule])
    .config(appConfig)
    .name;