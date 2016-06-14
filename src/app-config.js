module.exports = appConfig;

function appConfig($urlRouterProvider, chatServiceProvider, userResourceProvider, $authProvider) {
    'use strict';
    'ngInject';

    $urlRouterProvider.otherwise('/room');

    chatServiceProvider.socketEndpoint = 'https://ng-chat-server.herokuapp.com';

    userResourceProvider.apiEndpoint = 'https://ng-chat-server.herokuapp.com/api';

    $authProvider.baseUrl = 'https://ng-chat-server.herokuapp.com/api';

    $authProvider.github({
        clientId: '1a6d774f4bb5a6d1c97a'
    });

    $authProvider.google({
        clientId: '1004489526825-32qv25037p5b6ffggb2tev7ieoru3top.apps.googleusercontent.com'
    });
}
