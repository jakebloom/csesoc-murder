var app = angular.module('murder', ['ui.router']);


app.controller('MainCtrl', [function(){}]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('home', {
				url: '/',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			});


		$urlRouterProvider.otherwise('/');
	}
]);