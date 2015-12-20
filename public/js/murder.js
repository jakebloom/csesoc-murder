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

	o.kill = function(code, callback){
		return $http.post('/users/kill', code, {
				headers: {Authorization: 'Bearer ' + auth.getToken()}
			}).then(function(res){
				callback(true, res.data);
				return res.data;
			}, function(res){
				callback(false, res.data);
				return res.data;
			});
	};

	o.getAlive = function(){
		return $http.get('/users/alive').then(function(res){
			return res.data;
		});
	};

	return o;
}]);

app.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken = function(token){
		$window.localStorage['murder-token'] = token;
	};

	auth.getToken = function(){
		return $window.localStorage['murder-token'];
	};

	auth.isLoggedIn = function(){
		var token = auth.getToken();

		if (!token){return false;}

		var payload = JSON.parse($window.atob(token.split('.')[1]));
		return payload.exp > Date.now() / 1000;
	};

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
	};

	auth.register = function(user){
		return $http.post('/users/register', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.isAdmin = function(){
		if (!auth.isLoggedIn()){return false;}

		var token = auth.getToken();
		var payload = JSON.parse($window.atob(token.split('.')[1]));

		return payload.admin;
	};

	return auth;
}]);

app.factory('admin', ['$http', 'auth',
	function($http, auth){
		var admin = {}

		admin.assign = function(callback){
			return $http.get('/admin/assign', {
					headers: {Authorization: 'Bearer ' + auth.getToken()}
				}).then(function(res){
					callback(true, res.data);
					return res.data;
				}, function(res){
					callback(false, res.data);
					return res.data;
				});
		};

		admin.start = function(callback){
			return $http.get('/admin/start', {
					headers: {Authorization: 'Bearer ' + auth.getToken()}
				}).then(function(res){
					callback(true, res.data);
					return res.data;
				}, function(res){
					callback(false, res.data);
					return res.data;
				});
		};


		return admin;
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
		
		$scope.code = {};
		$scope.user = current_user;
		
		$scope.kill = function(){
			userService.kill($scope.code, function(status, data){
				$scope.message = data.message;
				if (status){
					$scope.error = false;
					$scope.success = true;
				} else {
					$scope.success = false;
					$scope.error = true;
				}
			});
		};
	}]
);

app.controller('NavCtrl', ['$scope', 'auth',
	function($scope, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logout = auth.logout;
		$scope.isAdmin = auth.isAdmin;
	}]
);

app.controller('HomeCtrl', ['$scope', 'alive_users', 
	function($scope, alive_users){
		$scope.alive_users = alive_users;
	}]
);

app.controller('AdminCtrl', ['$scope', 'admin',
	function($scope, admin){
		$scope.assign = function(){
			admin.assign(function(status, data){
				$scope.message = data.message;
				if (status){
					$scope.error = false;
					$scope.success = true;
				} else {
					$scope.success = false;
					$scope.error = true;
				}
			})
		};

		$scope.start = function(){
			admin.start(function(status, data){
				$scope.message = data.message;
				if (status){
					$scope.error = false;
					$scope.success = true;
				} else {
					$scope.success = false;
					$scope.error = true;
				}
			})
		};
	}]
);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('home', {
				url: '/',
				templateUrl: '/home.html',
				controller: 'HomeCtrl',
				resolve: {
					alive_users: ['userService', function(userService){
						return userService.getAlive();
					}]
				}
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
			})

			.state('admin', {
				url: '/admin',
				templateUrl: '/admin.html',
				controller: 'AdminCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if (!auth.isAdmin()){
						$state.go('home');
					}
				}]
			});


		$urlRouterProvider.otherwise('/');
	}
]);