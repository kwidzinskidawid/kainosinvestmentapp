'use strict';

invApp
	.controller('MainCtrl', function() {
		$.getJSON('/api/rates', function (rates) {
			var col = [];
			var row = [];
			
			_.each(rates, function (rate) {
				col.push(rate.date);
				row.push(rate.value);
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
	                categories: col
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
	                data: row
	            }]
	        });
		});
	});