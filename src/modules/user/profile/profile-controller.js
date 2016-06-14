module.exports = ProfileController;

function ProfileController($mdDialog, userResource, userId) {
    'use strict';
    'ngInject';

    var vm = this;
    vm.user = null;
    vm.cancel = cancel;

    activate();

    function activate() {
        userResource.get({id: userId}, function(user) {
            vm.user = user;
        });
    }

    function cancel() {
        $mdDialog.cancel();
    }
}