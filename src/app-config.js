var uiRouter = require('angular-ui-router');

module.exports = function($urlRouterProvider) {
    'use strict';

    $urlRouterProvider.otherwise('/room');
};
