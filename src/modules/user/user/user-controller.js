module.exports = UserController;

function UserController($auth, $state, $http) {
    'use strict';

    var usr = this;
    usr.logout = logout;

    activate();

    function activate() {
        var payload = $auth.getPayload();
        usr.name = payload.sub;
        $http.get('http://192.168.2.166:8008/api/users/' + payload.sub).then(function(res) {
            usr.user = res.data;
            console.log(usr.user);
        });
    }

    function logout() {
        $auth.logout();
        $state.go('login');
    }
}