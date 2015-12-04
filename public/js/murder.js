var app = angular.module('murder', ['ui.router']);

app.factory('users', ['$http', function(){
	var o = {
		users: []
	};
	return o;
}]);

app.controller('MainCtrl', [function(){}]);

app.controller('RegisterCtrl', [function(){}]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('home', {
				url: '/',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			})

			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				controller: 'RegisterCtrl'
			});


		$urlRouterProvider.otherwise('/');
	}
]);