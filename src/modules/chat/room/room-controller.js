

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

	function activate() {
		chatService.connect();
	}

	chatService.getWritingObservable()
		.throttle(100)
        .do(startTyping)
        .debounce(2000)
        .subscribe(stopTyping);

	function send() {
		chatService.send(vm.text);
		vm.text = '';
	}

	function chatMessage(event, data) {
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
		vm.users = [];
		data.forEach(function(entry){
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
		});
	}
	
	function chatConnected(event, data) {
		userResource.get({id: data.user}, function(user) {

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
		vm.users.forEach(function(entry){
			if(data.user == entry.userId){
				vm.users.splice(vm.users.indexOf(entry),1);
				$scope.$applyAsync();
			}
		});
	}

	function onChange() {
        chatService.writingSend();
    }

    function chatMessage(event, data) {
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
	    vm.users.forEach(function(entry){
		    if(data.user == entry.userId){
			    entry.typing = true;
			    $scope.$applyAsync();
		    }
	    });
    }

    function stopTyping(data) {
	    vm.users.forEach(function(entry){
		    if(data.user == entry.userId){
			    entry.typing = false;
			    $scope.$applyAsync();
		    }
	    });
    }

	function destroy() {
		chatService.disconnect();
	}
}