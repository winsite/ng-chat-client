module.exports = UserController;

var profileController = require('./../../user/profile/profile-controller.js');
var profileTemplate = require('./../../user/profile/profile-page.html');

function UserController($auth, $state, $mdDialog, userResource) {
    'use strict';
    'ngInject';

    var usr = this;
    usr.logout = logout;
    usr.showProfile = showProfile;
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

    function showProfile(ev, userId) {
        $mdDialog.show({
            locals:{userId: userId},
            controller: profileController,
            controllerAs: 'vm',
            template: profileTemplate,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true
        })
    }

    function room() {
        $state.go('user.room');
    }
}