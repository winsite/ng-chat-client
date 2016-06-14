module.exports = RoomController;

var profileController = require('./../../user/profile/profile-controller.js');
var profileTemplate = require('./../../user/profile/profile-page.html');

function RoomController($scope, $log, $mdDialog, chatService, userResource) {
	'use strict';
	'ngInject';

	var vm = this;
	vm.send = send;
	vm.showProfile = showProfile
	vm.messages = [];

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

		userResource.get({id: data.user}, function(user) {
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

	function destroy() {
		chatService.disconnect();
	}
}