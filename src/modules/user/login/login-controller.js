module.exports = function($auth, $state) {
    'use strict';

    this.authenticate = function(provider) {
        $auth
            .authenticate(provider)
            .then(function() {
                $state.go('user.room');
            });
    };
};
