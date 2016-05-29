module.exports = UserController;

function UserController($auth, $state) {
    'use strict';

    var usr = this;
    usr.logout = logout;

    activate();

    function activate() {
        var payload = $auth.getPayload() || {sub: 'jaaa'};
        usr.name = payload.sub;
    }

    function logout() {
        $auth.logout();
        $state.go('login');
    }
}