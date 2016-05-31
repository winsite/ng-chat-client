var io = require('socket.io-client');

module.exports = ChatServiceProvider;

function ChatServiceProvider() {
	'use strict';
	'ngInject';

	var provider = this;

	provider.socketEndpoint = 'http://localhost:3000/';

	provider.$get = ChatServiceFactory;

	function ChatServiceFactory($auth, $rootScope) {
		'ngInject';

		var socket;

		function connect() {
			var token = $auth.getToken();
			var options = {
				query: 'token=' + token,
				forceNew: true,
				reconnection: true,
				reconnectionDelay: 1000,
				reconnectionDelayMax : 5000,
				reconnectionAttempts: Infinity
			};
			socket =  io.connect(provider.socketEndpoint, options);
			socket.on('message', function(data) {
				$rootScope.$broadcast('chat-message', data);
			});
		}

		function send(text) {
			if (socket) {
				socket.emit('message', {text: text});
			}
		}

		function disconnect() {
			if (socket) {
				socket.disconnect();
				socket = null;
			}
		}

		function ChatService() {
			this.connect = connect;
			this.send = send;
			this.disconnect = disconnect;
		}

		return new ChatService();
	}
}