<template>
	<div>
		<h2 class="font-semibold text-center mt-5 mb-8">Clemta Inc.</h2>
		<apexchart type="area" :options="chartOptions" :series="series"></apexchart>
	</div>
</template>

<script>
export default {
	data: () => ({
		series: [
			{
				name: "series1",
				data: [95, 92, 94, 100, 95, 99],
			},
		],
		chartOptions: {
			chart: {
				width: "100%",
				height: "100px",
				type: "area",
				toolbar: {
					show: true,
					offsetX: 0,
					offsetY: 0,
					tools: {
						download: true,
						selection: false,
						zoom: false,
						zoomin: false,
						zoomout: false,
						pan: false,
						reset: false,
						customIcons: [],
					},
				},
			},
			colors: ["#70BAC9"],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "straight",
			},
			xaxis: {
				type: "month",
				categories: ["Jan", "Mar", "May", "Jun", "Sep", "Dec"],
			},
			tooltip: {
				x: {
					format: "MM",
				},
			},
		},
	}),
};
</script>
