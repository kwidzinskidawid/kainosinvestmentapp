'use strict';

invApp
	.controller('MainCtrl', function(NgTableParams, $scope) {

		
		$.getJSON('/api/rates', function (rates) {
			var cols = [];
			var rows = [];
			
			var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
			_.each(rates, function (rate) {
				cols.push(rate.date);
				rows.push(rate.value);
				
				var arrayDate = rate.date.match(pattern);
				rate.dateType = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
			});
			
			$scope.tableParams = new NgTableParams({
			      page: 1, // show first page
			      count: 10 // count per page
			    }, {
			      filterDelay: 0,
			      data: rates
			    });
			
			$('#chart').highcharts({
	            chart: {
	                zoomType: 'x'
	            },
	            title: {
	                text: "Investment fund's unit value over time"
	            },
	            subtitle: {
	                text: document.ontouchstart === undefined ?
	                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
	            },
	            xAxis: {
	                categories: cols
	            },
	            yAxis: {
	                title: {
	                    text: 'Unit value (PLN)'
	                }
	            },
	            legend: {
	                enabled: false
	            },
	            plotOptions: {
	                area: {
	                    fillColor: {
	                        linearGradient: {
	                            x1: 0,
	                            y1: 0,
	                            x2: 0,
	                            y2: 1
	                        },
	                        stops: [
	                            [0, Highcharts.getOptions().colors[0]],
	                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                        ]
	                    },
	                    marker: {
	                        radius: 2
	                    },
	                    lineWidth: 1,
	                    states: {
	                        hover: {
	                            lineWidth: 1
	                        }
	                    },
	                    threshold: null
	                }
	            },

	            series: [{
	                type: 'area',
	                name: 'Unit Value',
	                data: rows
	            }]
	        });
		});
	});