module.exports = UserController;

function UserController($auth, $state, $resource) {
    'use strict';
    'ngInject';

    var usr = this;
    usr.logout = logout;

    activate();

    function activate() {
        var payload = $auth.getPayload();
        var userResource = $resource('http://localhost:8008/api/users/:id');
        userResource.get({id: payload.sub}, function(user) {
            usr.user = user;
        });
    }

    function logout() {
        $auth.logout();
        $state.go('login');
    }
}