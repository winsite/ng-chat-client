module.exports = appConfig;

function appConfig($urlRouterProvider, chatServiceProvider) {
    'use strict';
    'ngInject';

    $urlRouterProvider.otherwise('/room');

    chatServiceProvider.socketEndpoint = 'http://192.168.2.166:3000';
}
