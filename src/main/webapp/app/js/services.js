'use strict';

invApp
	.factory('RateService', function($resource) {
		 return $resource('/api/rates/', {}, {
			 getRatesInDateRange: {
				 url: '/api/rates/range',
				 isArray: true,
				 method: 'POST'
			 }
		 });
	});

invApp
	.factory('ChartService', function() {
		var service = {};
		
		service.generate = function(cols, rows, rows2) {
			var options = {
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
		        };
			if(rows2 != undefined) {
				options.series.push({
		                type: 'line',
		                name: 'Money in bank deposit',
		                color: '#52C469',
		                data: rows2
		            });
				options.legend.enabled = true;
				options.series[0].name = "Money in investment fund";
				options.title.text = "Comparison of Investment fund and bank deposit's profit over time";
				options.yAxis.title.text = "Budget (PLN)";
			}
			$('#chart').highcharts(options);
		
		};
		return service;
	});