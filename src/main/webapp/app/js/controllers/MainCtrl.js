'use strict';

invApp
	.controller('MainCtrl', function(NgTableParams, $scope, RateService, ChartService) {
		var dates = [];
		var values = [];
		

		var rates = RateService.query(function() {

			var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
			_.each(rates, function (rate) {
				dates.push(rate.date);
				values.push(rate.value);
				
				var arrayDate = rate.date.match(pattern);
				rate.dateJS = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
			});
			
			$scope.tableParams = new NgTableParams({
			      page: 1, // show first page
			      count: 10 // count per page
			    }, {
			      filterDelay: 0,
			      data: rates
			    });
			
			ChartService.generate(dates, values);
			$scope.fromDate = $scope.minDate = rates[0].dateJS;
			$scope.toDate = $scope.maxDate = rates[rates.length - 1].dateJS;
		});
		


		
		$scope.change = function() {
			console.log($scope.fromDate);
			console.log($scope.toDate);
		}
	});