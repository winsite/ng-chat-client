var uiRouter = require('angular-ui-router');

var loginTemplate = require('./login/login-page.html');
var userTemplate = require('./user/user-page.html');

module.exports = function($stateProvider, $authProvider) {
    'use strict';

    $stateProvider
        .state('login', {
            url: '/login',
            template: loginTemplate,
            controller: 'loginController as vm'
        })
        .state('user', {
            abstract: true,
            template: userTemplate,
            controller: 'userController as usr'
        });

    $authProvider.facebook({
        clientId: 'Facebook App ID'
    });

    $authProvider.google({
        clientId: 'Google Client ID'
    });
};
