<script lang="ts">
	import UPlot from '$lib/UPlot.svelte';
	import { theme } from '../../../routes/theme';

	export let xs: number[];
	export let values: number[];

	const strokeColor1 = () => ($theme.dark ? 'hsl(0, 0%, 78%)' : 'hsl(0, 0%, 18%)');
	const fillColor1 = () => ($theme.dark ? 'hsla(0, 0%, 78%, 0.5)' : 'hsla(0, 0%, 52%, 0.4)');

	const opts = {
		width: 300,
		height: 40,
		pxAlign: false,
		cursor: {
			show: false
		},
		select: {
			show: false
		},
		legend: {
			show: false
		},
		scales: {
			x: {
				time: false
			}
		},
		axes: [
			{
				show: false
			},
			{
				show: false
			}
		],
		series: [
			{},
			{
				stroke: strokeColor1,
				fill: fillColor1
			}
		]
	};
</script>

<UPlot {opts} data={[xs, values]} />
