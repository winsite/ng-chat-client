module.exports = LoginController;

function LoginController($auth, $state) {
    'use strict';
    'ngInject';

    this.authenticate = function(provider) {
        $auth
            .authenticate(provider)
            .then(function() {
                $state.go('user.room');
            });
    };
}