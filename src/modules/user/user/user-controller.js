module.exports = UserController;

function UserController($auth, $state, userResource) {
    'use strict';
    'ngInject';

    var usr = this;
    usr.logout = logout;

    activate();

    function activate() {
        var payload = $auth.getPayload();
        userResource.get({id: payload.sub}, function(user) {
            usr.user = user;
        });
    }

    function logout() {
        $auth.logout();
        $state.go('login');
    }
}