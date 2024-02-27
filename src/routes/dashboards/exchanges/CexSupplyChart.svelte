<script lang="ts">
	import UPlot from '$lib/UPlot.svelte';
	import uPlot from 'uplot';
	import { theme } from '../../theme';
	import { onMount } from 'svelte';

	export let ts: number[];
	export let main: number[];
	export let deposits: number[];
	$: total = main.map((m, i) => m + deposits[i]);

	let ctx: CanvasRenderingContext2D | null = null;

	onMount(() => {
		let can = document.createElement('canvas');
		ctx = can.getContext('2d');
	});

	const format_nano = (v: number) =>
		v ? (v / 1e9).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '--';
	const format_nano_m = (v: number) =>
		v
			? (v / 1e9 / 1e6).toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
			  }) + ' M'
			: '--';

	const strokeColor1 = () => ($theme.dark ? 'hsl(0, 0%, 78%)' : 'hsl(0, 0%, 18%)');
	const fillColor1 = () => ($theme.dark ? 'hsla(0, 0%, 78%, 0.5)' : 'hsla(0, 0%, 52%, 0.4)');

	let plotSync = uPlot.sync('exchanges');
	const matchSyncKeys = (own: any, ext: any) => own == ext;

	const yAxisOptions = {
		labelSize: 16,
		labelGap: 5,
		size: 70,
		// space: 10,
		grid: { show: true }
	};
	const seriesOptions = {
		stroke: strokeColor1,
		fill: fillColor1
	};
	const commonOpts = {
		height: 250,
		padding: [0, 0, 0, 0], // top, left, bottom, right
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
				label: 'Total',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => format_nano_m(v))
			}
		],
		series: [
			{},
			{
				...seriesOptions,
				label: 'Total',
				value: (u: uPlot, v: number) => format_nano(v)
			}
		]
	};

	const opts2 = {
		...commonOpts,
		axes: [
			{},
			{
				...yAxisOptions,
				label: 'Deposits',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => format_nano(v))
			}
		],
		series: [
			{},
			{
				...seriesOptions,
				value: (u: UPlot, v: number) => format_nano(v),
				label: 'Deposits'
			}
		]
	};

	$: data1 = ctx === null ? [[], []] : [ts, total];
	$: data2 = ctx === null ? [[], []] : [ts, deposits];

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
