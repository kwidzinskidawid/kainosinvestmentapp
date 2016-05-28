'use strict';

invApp
	.controller('MainCtrl', function(NgTableParams, $scope, RateService, ChartService) {
		var dates = [];
		var values = [];
		
		
		var initRates = RateService.query(function() {
			init(initRates);
		});
		
		
	
		$scope.change = function(valid) {
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
		
		var init = function(data) {
			dates = [];
			values = [];
			
			_.each(data, function (rate) {
				rate.dateJS = new Date(rate.date);
				rate.date = rate.dateJS.toLocaleDateString().replace(/\./g,"/");
				dates.push(rate.date);
				values.push(rate.value);
			});
			
			$scope.tableParams = new NgTableParams({
			      page: 1, 
			      count: 10 
			    }, {
			      filterDelay: 0,
			      data: data
			    });
			
			ChartService.generate(dates, values);
			if ($scope.fromDate == undefined && $scope.toDate == undefined) {
				$scope.fromDate = $scope.minDate = data[0].dateJS;
				$scope.toDate = $scope.maxDate = data[data.length - 1].dateJS;
			}
			
		};
	});