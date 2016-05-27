'use strict';

var invApp = angular.module('invApp', ['ui.router', 'ngTable', 'ngResource', 'mgcrea.ngStrap']);

invApp
	.config(['$stateProvider', '$urlRouterProvider', 
               function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state('home', {
	      url: '/',
	      templateUrl: '/app/views/main.html',
	      controller: 'MainCtrl'
	    })
	     .state('compare', {
	      url: '/compare',
	      templateUrl: '/app/views/compare.html',
	      controller: 'CompareCtrl'
	    });
  
	  $urlRouterProvider.otherwise('/');
}]);

invApp
	.config(function($datepickerProvider) {
	  angular.extend($datepickerProvider.defaults, {
	    dateFormat: 'dd/MM/yyyy',
	    startWeek: 1,
	    autoclose: true
	  });
	})
