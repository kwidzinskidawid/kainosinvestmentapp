'use strict';

invApp
	.controller('CompareCtrl', function(NgTableParams, $scope, RateService, ChartService) {
		var dates = [];
		var values = [];
		var unitsBought = 0;
		
		$scope.interest = 5;
		$scope.investment = 3000;
		
		var initRates = RateService.query(function() {
			init(initRates);
			calculate(true);
		});
			
		$scope.changeDates = function(valid) {
			var fromDate = $scope.fromDate;
			var toDate = $scope.toDate;
			if(valid && fromDate != null && toDate != null) {
				if (fromDate < toDate) {
				    RateService.getRatesInDateRange({from: fromDate, to: toDate}, function (data) {
				    	init(data);
				    });
				} else {
					RateService.getRatesInDateRange({from: toDate, to: fromDate}, function (data) {
				    	init(data.reverse());
				    });
				}
			}
		}
		
		$scope.changeInvestment = function(valid) {
			calculate(valid);
		}
		
		var init = function(data) {
			dates = [];
			values = [];
			
			_.each(data, function (rate) {
				rate.dateJS = new Date(rate.date);
				rate.date = rate.dateJS.toLocaleDateString().replace(/\./g,"/");
				dates.push(rate.date);
				values.push(rate.value);
			});
			
			if ($scope.fromDate == undefined && $scope.toDate == undefined) {
				$scope.fromDate = $scope.minDate = data[0].dateJS;
				$scope.toDate = $scope.maxDate = data[data.length - 1].dateJS;
			}
		};
		
		var calculate = function(valid) {
			if(valid) {
				var investment = parseInt($scope.investment);
				var interest = parseInt($scope.interest);
				unitsBought = investment / values[0];
				var fundValues = [];
				var bankValues = [];
				
				bankValues = _.map(values, function(el, ind) {
					return investment + (investment * ind * (interest / 100) / 365); 
				});
				
				fundValues = _.map(values, function(el, ind) {
					return unitsBought * el;
				});
				ChartService.generate(dates, fundValues, bankValues);
			}
		}
	});