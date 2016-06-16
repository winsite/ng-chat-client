var io = require('socket.io-client');
var rxJs = require('rx/dist/rx.all.js');

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

			socket.on('writing', function(data) {
				$rootScope.$broadcast('writing', data);
			});

			socket.on('users', function(data){
				$rootScope.$broadcast('chat-users', data);
			});

			socket.on('connected', function(data){
				$rootScope.$broadcast('chat-connected', data);
			});
			
			socket.on('disconnected', function(data){
				$rootScope.$broadcast('chat-disconnected', data);
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

		function writingSend() {
			if (socket) {
				socket.emit('writing');
			}
		}

		function getWritingObservable() {
			return rxJs.Observable.fromEvent(socket, "writing");
		}

		function ChatService() {
			this.connect = connect;
			this.send = send;
			this.disconnect = disconnect;
			this.writingSend = writingSend;
			this.getWritingObservable = getWritingObservable;
		}

		return new ChatService();
	}
}