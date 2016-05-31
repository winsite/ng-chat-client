var roomTemplate = require('./room/room-page.html');

module.exports = chatConfig;

function chatConfig($stateProvider) {
    'use strict';
    'ngInject';

    $stateProvider.state('user.room', {
        url: '/room',
        template: roomTemplate,
        controller: 'roomController as vm'
    });
};
