var loginTemplate = require('./login/login-page.html');
var userTemplate = require('./user/user-page.html');
var profileTemplate = require('./profile/profile-page.html');

module.exports = userConfig;

function userConfig($stateProvider) {
    'use strict';
    'ngInject';

    $stateProvider
        .state('login', {
            url: '/login',
            template: loginTemplate,
            controller: 'loginController as vm'
        })
        .state('user', {
            abstract: true,
            template: userTemplate,
            controller: 'userController as usr',
            resolve: {
                isAuthenticated: function($q, $auth, $timeout, $state) {
                    if (!$auth.isAuthenticated()) {
                        $timeout(function() {
                            $state.go('login');
                        });
                        return $q.reject(new Error('Authorization error'));
                    }
                    return true;
                }
            }
        })
        .state('user.profile', {
            url: '/profile/:id',
            template: profileTemplate,
            controller: 'profileController as vm'
        });
}
