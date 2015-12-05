var app = angular.module('murder', ['ui.router']);

app.factory('users', ['$http', function(){
	var o = {
		users: []
	};

	o.getAll = function() {
		return $http.get('/users').success(function(data){
			angular.copy(data, o.users);
		});
	};

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


		$urlRouterProvider.otherwise('/');
	}
]);