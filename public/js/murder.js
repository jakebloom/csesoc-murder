var app = angular.module('murder', ['ui.router']);

app.factory('userService', ['$http', 'auth', function($http, auth){
	var o = {};

	o.getMe = function(){
		return $http.get('/users/me', {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).then(function(res){
			return res.data;
		});
	};

	o.kill = function(){
		console.log("KILLING");
		return true;
	}

	return o;
}]);

app.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken = function(token){
		$window.localStorage['murder-token'] = token;
	}

	auth.getToken = function(){
		return $window.localStorage['murder-token'];
	}

	auth.isLoggedIn = function(){
		var token = auth.getToken();

		if (!token){return false;}

		var payload = JSON.parse($window.atob(token.split('.')[1]));
		return payload.exp > Date.now() / 1000;
	}

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.login = function(user){
		return $http.post('/users/login', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logout = function(){
		$window.localStorage.removeItem('murder-token');
	}

	auth.register = function(user){
		return $http.post('/users/register', user).success(function(data){
			auth.saveToken(data.token);
		});
	}

	return auth;
}]);

app.controller('AuthCtrl', [
	'$scope', '$state', 'auth',
	function($scope, $state, auth){
		$scope.user = {};

		$scope.register = function(){
			auth.register($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};

		$scope.login = function(){
			auth.login($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};

	}]
);

app.controller('UserCtrl', ['$scope', 'current_user', 'userService',
	function($scope, current_user, userService){
		$scope.user = current_user;
		$scope.kill = userService.kill;
	}]
);

app.controller('NavCtrl', ['$scope', 'auth',
	function($scope, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logout = auth.logout;
	}]
);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('home', {
				url: '/',
				templateUrl: '/home.html'
			})

			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
						$state.go('home');
					}
				}]
			})

			.state('login', {
				url: '/login',
				templateUrl: '/login.html',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
						$state.go('home');
					}
				}]
			})

			.state('me', {
				url: '/me',
				templateUrl: '/me.html',
				controller: 'UserCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(!auth.isLoggedIn()){
						$state.go('home');
					}
				}],
				resolve: {
					current_user: ['userService', function(userService){
						return userService.getMe();
					}]
				}
			});


		$urlRouterProvider.otherwise('/');
	}
]);