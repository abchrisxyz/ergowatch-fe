<script lang="ts">
	import UPlot from '$lib/UPlot.svelte';
	import uPlot from 'uplot';
	import { theme } from '../../theme';
	import { onMount } from 'svelte';

	export let series: number[][];
	export let current_timestamp: number;

	let ctx: CanvasRenderingContext2D | null = null;

	onMount(() => {
		let can = document.createElement('canvas');
		ctx = can.getContext('2d');
	});

	$: strokeGradient = (u: uPlot) => {
		// let color = 'hsla(0, 0%, 52%, 0.4)';
		let color = $theme.dark ? 'hsla(0, 0%, 78%, 0.5)' : 'hsla(0, 0%, 52%, 0.4)';
		const transparent = 'hsla(0, 0%, 52%, 0.0)';
		if (ctx === null) {
			return transparent;
		}
		let scale = u.scales['x'];
		if (current_timestamp < scale.min) {
			return transparent;
		}
		if (current_timestamp > scale.max) {
			return color;
		}
		let [y0, y1] = [0, 0];
		let x0 = u.valToPos(scale.min, 'x', true);
		let x1 = u.valToPos(scale.max, 'x', true);
		let grd = ctx.createLinearGradient(x0, y0, x1, y1);
		// grd.addColorStop(0.0, 'red');
		const prc = (current_timestamp - scale.min) / (scale.max - scale.min);
		grd.addColorStop(prc, color);
		grd.addColorStop(prc, transparent);
		// grd.addColorStop(1, transparent);

		return grd;
	};

	const strokeColor1 = () => ($theme.dark ? 'hsl(0, 0%, 78%)' : 'hsl(0, 0%, 18%)');

	let plotSync = uPlot.sync('history');
	const matchSyncKeys = (own: any, ext: any) => own == ext;

	const yAxisOptions = {
		labelSize: 16,
		labelGap: 5,
		size: 50,
		// space: 10,
		grid: { show: true }
	};
	const seriesOptions = {
		stroke: strokeColor1,
		fill: (u: any, seriesIdx: number) => strokeGradient(u)
	};
	const commonOpts = {
		height: 250,
		padding: [0, 13, 0, 0], // top, right, bottom, left
		scales: {
			x: {
				time: true
			}
		},
		legend: {
			show: true,
			mount: (self: uPlot, ref: HTMLElement) => legendRef?.appendChild(ref)
		},
		cursor: {
			lock: true,
			focus: {
				prox: 16
			},
			sync: {
				key: plotSync.key,
				setSeries: true,
				match: [matchSyncKeys, matchSyncKeys]
			},
			points: {
				fill: (u: UPlot, i: number) => u.series[i].stroke()
			}
		}
	};

	const opts1 = {
		...commonOpts,
		axes: [
			{},
			{
				...yAxisOptions,
				label: 'Curculating Supply',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => `${v / 1000_000} M`)
			}
		],
		series: [
			{},
			{
				...seriesOptions,
				label: 'Circulating'
			}
		]
	};

	const opts2 = {
		...commonOpts,
		axes: [
			{},
			{
				...yAxisOptions,
				label: 'Emission Rate'
			}
		],
		series: [
			{},
			{
				...seriesOptions,
				value: (u, v) => (v == null ? null : v.toFixed(0) + ' ERG/block'),
				label: 'Emission'
			}
		]
	};

	$: data1 = ctx === null ? [[], []] : [series[0], series[1]];
	$: data2 = ctx === null ? [[], []] : [series[0], series[2]];

	let legendRef: HTMLElement;
</script>

<div class="container">
	<UPlot opts={opts1} data={data1} enabled={true} />
	<UPlot opts={opts2} data={data2} enabled={true} />
	<div class="legend-container">
		<div bind:this={legendRef} />
	</div>
</div>

<style>
	/* Hide time label of all but first legend */
	:global(.u-legend:not(:first-child) tbody > .u-series:first-child) {
		display: none;
	}
	:global(.u-legend) {
		margin: 0;
	}
	/* Show legends next to each other if possible */
	.legend-container > * {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	/* Disable series toggling through legend clicks */
	.legend-container {
		pointer-events: none;
	}
</style>
