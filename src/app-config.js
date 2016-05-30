module.exports = appConfig;

function appConfig($urlRouterProvider) {
    'use strict';
    'ngInject';

    $urlRouterProvider.otherwise('/room');
}
