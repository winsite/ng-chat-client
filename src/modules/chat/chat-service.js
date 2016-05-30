var io = require('socket.io-client');

module.exports = ChatService;

function ChatService($interval, $auth) {
	'use strict';
	'ngInject';

	var token = $auth.getToken();

	var socket =  io.connect('http://localhost:3000/', {
		query: 'token=' + token,
		forceNew: true,
		reconnection: true,
		reconnectionDelay: 1000,
		reconnectionDelayMax : 5000,
		reconnectionAttempts: Infinity
	});

	socket.on('connect', function() {
		console.log('connected');
		$interval(function(){
			socket.emit('date', {'date': new Date()});
		}, 10000);
	});

	socket.on('connect_failed', function(){
		console.log('Connection Failed');
	});

	socket.on('reconnect_failed', function(){
		console.log('Reconnection Failed');
	});

	socket.on('event', function(data){
		console.log('event', data);
	});

	socket.on('message', function(data){
		console.log('message', data.message);
	});

	socket.on('disconnect', function(data){
		console.log('disconnected');
	});
};