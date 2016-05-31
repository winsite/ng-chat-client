module.exports = ProfileController;

function ProfileController($auth, userResource) {
    'use strict';
    'ngInject';

    var usr = this;

    activate();

    function activate() {
        var payload = $auth.getPayload();
        userResource.get({id: payload.sub}, function(user) {
            usr.user = user;
            console.log(user);
        });
    }
}