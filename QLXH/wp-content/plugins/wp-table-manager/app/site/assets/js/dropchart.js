function wptm_drawChart() {
	var defaultConfig = {	"dataUsing": "row",
							"switchDataUsing": true,
							"useFirstRowAsGraph": true,
							"useFirstRowAsLabels": false,
							"width": 500, "height": 375,
							"scaleShowGridLines": false
						};

	function formatSymbols(resultCalc, decimal_count, thousand_symbols, decimal_symbols, symbol_position, value_unit) {
		decimal_count = parseInt(decimal_count);
		if (typeof resultCalc === 'undefined') {
			return;
		}
		var negative = resultCalc < 0 ? "-" : "",
			i = parseInt(resultCalc = Math.abs(+resultCalc || 0).toFixed(decimal_count), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;

		resultCalc = (j ? i.substr(0, j) + thousand_symbols : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand_symbols) + (decimal_count ? decimal_symbols + Math.abs(resultCalc - i).toFixed(decimal_count).slice(2) : "");

		resultCalc = Number(symbol_position) === 0
			? ((negative === "-") ? negative + value_unit : value_unit) + resultCalc
			: negative + resultCalc + ' ' + value_unit;

		return resultCalc;
	};

    jQuery(".chartContainer.wptm").each(function () {
		var id_chart = jQuery(this).data('id-chart');

        if (typeof DropCharts === "undefined") {
            var DropCharts = typeof window.DropCharts !== "undefined" ? window.DropCharts : [];
        }
        var DropCharts1 = DropCharts.filter(element => typeof element !== 'undefined' && element.id == id_chart);
        var DropChart = DropCharts1[DropCharts1.length - 1];//get last item when page in preview

        if (jQuery(this).find('canvas').length > 0 && typeof DropChart !== 'undefined') {
			if (!jQuery(this).hasClass('chartActive')
				&& (jQuery(".vc_editor").length < 1
					|| (jQuery(".vc_editor").length > 0  && typeof jQuery(this).parents('.vc_wptm_chart_shortcode').data('model-id') !== 'undefined')
				)//fix re_render in divi and elementor(add later)
			) {
				DropChart.config.tooltips = {
					enabled: true, mode: 'single', callbacks: {
						label: function (tooltipItems, data) {
							var label = '';
							if (data.useFirstRowAsLabels) {
								if (data.datasets.length > 1) {
									label = data.datasets[tooltipItems.datasetIndex].label || '';
								} else if (tooltipItems.label === '') {
									label = data.labels[tooltipItems.index] || '';
								}

								if (label) {
									label += ': ';
								}
							}

							console.log(data);
							if (typeof data.data_format[tooltipItems.datasetIndex][tooltipItems.index] !== 'undefined') {
								label += data.data_format[tooltipItems.datasetIndex][tooltipItems.index];
							} else {
								label += data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
							}
							return label;
						}
					}
				};

				var chartConfig = jQuery.extend({},defaultConfig, DropChart.config);


				//set labels for axes

				// var chartConfig = jQuery.extend({}, {
				// 	scales: {
				// 		yAxes: [{
				// 			scaleLabel: {
				// 				display: true,
				// 				labelString: 'probability'
				// 			}
				// 		}],
				// 		xAxes: [{
				// 			scaleLabel: {
				// 				display: true,
				// 				labelString: 'probability 2'
				// 			}
				// 		}]
				// 	}
				// }, defaultConfig, DropChart.config);
				DropChart.data.useFirstRowAsLabels = chartConfig.useFirstRowAsLabels;
				var ctx = jQuery(this).find('canvas').get(0).getContext("2d");
				switch (DropChart.type) {
					case 'PolarArea':
						DropChart.chart = new wptmChart(ctx, {
							type: 'polarArea',
							data: DropChart.data,
							options: chartConfig
						});
						break;
					case 'Pie':
						DropChart.chart = new wptmChart(ctx, {
							type: 'pie',
							data: DropChart.data,
							options: chartConfig
						});
						break;
					case 'Doughnut':
						DropChart.chart = new wptmChart(ctx, {
							type: 'doughnut',
							data: DropChart.data,
							options: chartConfig
						});
						break;
					case 'Bar':
						DropChart.chart = new wptmChart(ctx, {
							type: 'bar',
							data: DropChart.data,
							options: chartConfig
						});
						break;
					case 'Radar':
						DropChart.chart = new wptmChart(ctx, {
							type: 'radar',
							data: DropChart.data,
							options: chartConfig
						});
						break;
					case 'Line':
					default:
						DropChart.chart = new wptmChart(ctx, {
							type: 'line',
							data: DropChart.data,
							options: chartConfig
						});
						break;
				}
				jQuery(this).addClass('chartActive');
			}
		}
	});
}

jQuery(document).ready(function(){
	if (typeof DropCharts !== 'undefined') {
		wptm_drawChart();
	}
});

function wptm_render_chart (id_table) {
	// if (!jQuery('div#chartContainer' + id_table).hasClass('chartActive')) {
		wptm_drawChart();
	// }
};