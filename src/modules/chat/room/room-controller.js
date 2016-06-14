var rxJs = require('rx/dist/rx.all.js');

module.exports = RoomController;

function RoomController($scope, $log, chatService, userResource) {
    'use strict';
    'ngInject';

    var vm = this;
    vm.send = send;
    vm.onChange = onChange;
    vm.messages = [];

    activate();

    $scope.$on('chat-message', chatMessage);

    $scope.$on('$destroy', destroy);

    $scope.$on('writing', writing);

    rxJs.Observable.fromEventPattern(
        function add(h) {
            $scope.$on('writing', h);
        }
    ).throttle(100)
        .do(startTyping)
        .debounce(2000)
        .subscribe(stopTyping);

    function writing(event, data) {

        $log.log('writing listen event', event, data);

    }

    function activate() {
        chatService.connect();

    }

    function send() {
        chatService.send(vm.text);
        vm.text = '';
    }

    function onChange() {
        $log.log('onChange ' + vm.text);
        chatService.writingSend('userID');
    }

    function chatMessage(event, data) {
        $log.debug('chat-message', data);

        userResource.get({id: data.user}, function (user) {
            console.log(user);

            var env = {};
            env.date = data.date;
            env.text = data.text;
            env.name = user.displayName;
            env.img = user.picture;
            env.userId = user._id;

            vm.messages.push(env);

            $scope.$applyAsync();
        });
    }


    function destroy() {
        chatService.disconnect();
    }

    function startTyping(data) {
        $log.log('startTyping ', data);
    }

    function stopTyping() {
        $log.log('stopTyping');
    }

}
