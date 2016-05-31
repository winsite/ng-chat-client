module.exports = ProfileController;

function ProfileController($stateParams, userResource) {
    'use strict';
    'ngInject';

    var usr = this;

    activate();

    function activate() {
        userResource.get({id: $stateParams.id}, function(user) {
            usr = user;
        });
    }
}