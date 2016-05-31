module.exports = UserController;

function UserController($auth, $state, userResource) {
    'use strict';
    'ngInject';

    var usr = this;
    usr.logout = logout;
    usr.profile = profile;
    usr.room = room;

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

    function profile() {
        $state.go('user.profile');
    }

    function room() {
        $state.go('user.room');
    }
}