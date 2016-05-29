var uiRouter = require('angular-ui-router');
var roomTemplate = require('./room/room-page.html');

module.exports = function($stateProvider) {
    'use strict';

    $stateProvider.state('user.room', {
        url: '/room',
        template: roomTemplate,
        controller: function() {
            console.log('room controller');
        }
    });
};
