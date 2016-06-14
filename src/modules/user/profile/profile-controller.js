module.exports = ProfileController;

function ProfileController($stateParams, userResource) {
    'use strict';
    'ngInject';

    var vm = this;
    vm.user = null;

    activate();

    function activate() {
        userResource.get({id: $stateParams.id}, function(user) {
            vm.user = user;
        });
    }
}