<script lang="ts">
	import UPlot from '$lib/UPlot.svelte';
	import { theme } from '../../../routes/theme';

	export let ts: number[];
	export let hps: number[];

	const strokeColor1 = () => ($theme.dark ? 'hsl(0, 0%, 78%)' : 'hsl(0, 0%, 18%)');
	const fillColor1 = () => ($theme.dark ? 'hsla(0, 0%, 78%, 0.5)' : 'hsla(0, 0%, 52%, 0.4)');

	const opts = {
		width: 300,
		height: 300,
		// pxAlign: false,
		cursor: {
			lock: true,
			focus: {
				prox: 16
			}
		},
		scales: {
			x: {
				time: true
			}
		},
		axes: [
			{
				show: true
			},
			{
				label: 'PH/s'
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

<UPlot {opts} data={[ts, hps.map((h) => h * 1e-12)]} />
