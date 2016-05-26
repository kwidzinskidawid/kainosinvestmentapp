'use strict';

var invApp = angular.module('invApp', ['ui.router']);

invApp.config(['$stateProvider', '$urlRouterProvider', 
               function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state('home', {
	      url: '/',
	      templateUrl: '/views/main.html',
	      controller: 'MainCtrl'
	    })
	     .state('compare', {
	      url: '/compare',
	      templateUrl: '/views/compare.html',
	      controller: 'CompareCtrl'
	    });
  
	  $urlRouterProvider.otherwise('/');
}]);
