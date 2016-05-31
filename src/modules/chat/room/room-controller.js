module.exports = RoomController;

function RoomController($scope, $log, chatService) {
	'use strict';
	'ngInject';

	var vm = this;
	vm.send = send;

	activate();

	$scope.$on('chat-message', chatMessage);

	$scope.$on('$destroy', destroy);

	function activate() {
		chatService.connect();
	}

	function send() {
		chatService.send(vm.text);
		vm.text = '';
	}

	function chatMessage(event, data) {
		$log.debug('chat-message', data);
	}

	function destroy() {
		chatService.disconnect();
	}
}