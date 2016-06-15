var rxJs = require('rx/dist/rx.all.js');

module.exports = RoomController;

function RoomController($scope, $log, chatService, userResource) {
    'use strict';
    'ngInject';

    var vm = this;
    vm.send = send;
    vm.onChange = onChange;
    vm.messages = [];
	vm.messages = [];
	vm.users = [];

	activate();

	$scope.$on('chat-message', chatMessage);

	$scope.$on('$destroy', destroy);

	$scope.$on('chat-users', chatUsers);
	
	$scope.$on('chat-connected', chatConnected);

	$scope.$on('chat-disconnected', chatDisconnected); 

	$scope.$on('writing', writing);
	
	function activate() {
		chatService.connect();
	}

	rxJs.Observable.fromEventPattern(
        function add(h) {
            $scope.$on('writing', h);
        }
    ).throttle(100)
        .do(startTyping)
        .debounce(2000)
        .subscribe(stopTyping);

	function send() {
		chatService.send(vm.text);
		vm.text = '';
	}

	function writing(event, data) {

        $log.log('writing listen event', event, data);

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

	function chatUsers(event, data) {
		$log.debug('chat-users', data);
		
		vm.users = [];
		data.forEach(function(entry){
			if($scope.$parent.usr.profile._id != entry){
				userResource.get({id: entry}, function(user) {
					console.log(user);
	
					var env = {};
					if(user.displayName){
						env.name = user.displayName;
					}else{
						env.name = "Anonymous";
					}
					env.img = user.picture;
					env.userId = user._id;
	
					vm.users.push(env);
					$scope.$applyAsync();
				});
			}
		});
				
	}
	
	function chatConnected(event, data) {
		$log.debug('chat-connected', data);
		userResource.get({id: data.user}, function(user) {
			console.log(user);

			var env = {};
			env.date = data.date;
			if(user.displayName){
				env.name = user.displayName;
			}else{
				env.name = "Anonymous";
			}
			
			env.img = user.picture;
			env.userId = user._id;

			vm.users.push(env);
			$scope.$applyAsync();
		});
				
	}
	
	function chatDisconnected(event, data) {
		$log.debug('chat-disconnected', data);
		vm.users.forEach(function(entry){
			if(data.user == entry.userId){
				vm.users.splice(vm.users.indexOf(entry),1);
				$scope.$applyAsync();
			}
			
		});
				
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

	function destroy() {
		chatService.disconnect();
	}
}