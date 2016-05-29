'use strict';

invApp
	.controller('CompareCtrl', function(NgTableParams, $scope, RateService, ChartService) {
		var dates = [];
		var values = [];
		var unitsBought = 0;
		
		$scope.fromDate = new Date();
		$scope.toDate = new Date();
		$scope.interest = 5;
		$scope.investment = 3000;
		$scope.loading = true;
		
		var initRates = RateService.query(function() {
			init(initRates);
			calculate(true);
		});
			
		$scope.changeDates = function(valid) {
			if (valid) {
				var fromDate = $scope.fromDate;
				var toDate = $scope.toDate;
				if (fromDate < toDate) {
				    RateService.getRatesInDateRange({from: fromDate, to: toDate}, function (data) {
				    	init(data);
						calculate(valid);
				    });
				} else {
					RateService.getRatesInDateRange({from: toDate, to: fromDate}, function (data) {
				    	init(data.reverse());
						calculate(valid);
				    });
				}
			}
		}
		
		$scope.changeInvestment = function(valid) {
			calculate(valid);
		}
		
		var init = function(data) {
			if (data.length == 0) {
				$scope.dbEmpty = true;
				return;
			}
			dates = [];
			values = [];
			
			_.each(data, function (rate) {
				rate.dateJS = new Date(rate.date);
				rate.date = rate.dateJS.toLocaleDateString().replace(/\./g,"/");
				dates.push(rate.date);
				values.push(rate.value);
			});
			
			if ($scope.minDate == undefined && $scope.maxDate == undefined) {
				$scope.fromDate = $scope.minDate = data[0].dateJS;
				$scope.toDate = $scope.maxDate = data[data.length - 1].dateJS;
			}
		};
		
		var calculate = function(valid) {
			if(valid && !$scope.dbEmpty) {
				var investment = parseFloat($scope.investment);
				var interest = parseFloat($scope.interest);
				unitsBought = investment / values[0];
				var fundValues = [];
				var bankValues = [];
				
				bankValues = _.map(values, function(el, ind) {
					var result = investment + (investment * ind * (interest / 100) / 365);
					return parseFloat(result.toFixed(2)); 
				});
				
				fundValues = _.map(values, function(el, ind) {
					var result = unitsBought * el;
					return parseFloat(result.toFixed(2));
				});
				ChartService.generate(dates, fundValues, bankValues);
				if ($scope.loading) {
					$scope.loading = false;
				}
			}
		}
	});