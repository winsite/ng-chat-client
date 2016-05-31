module.exports = appConfig;

function appConfig($urlRouterProvider, chatServiceProvider, userResourceProvider, $authProvider) {
    'use strict';
    'ngInject';

    $urlRouterProvider.otherwise('/room');

    chatServiceProvider.socketEndpoint = 'http://192.168.43.199:3000';

    userResourceProvider.apiEndpoint = 'http://192.168.43.199:8008/api';

    $authProvider.baseUrl = 'http://192.168.43.199:8008/api';

    $authProvider.github({
        clientId: '1a6d774f4bb5a6d1c97a'
    });

    $authProvider.google({
        clientId: '1004489526825-32qv25037p5b6ffggb2tev7ieoru3top.apps.googleusercontent.com'
    });
}