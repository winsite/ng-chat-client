module.exports = function($auth) {
    'use strict';

    this.authenticate = function(provider) {
        $auth.authenticate(provider);
    };
};
