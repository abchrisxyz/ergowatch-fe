<script lang="ts">
	import { browser } from '$app/environment';
	import UPlot from '$lib/UPlot.svelte';
	import uPlot from 'uplot';
	import { theme } from '../../../routes/theme';

	let window = '1d';

	const placeHolderData = {
		ts: [1616753733769],
		reserves: [1021000000],
		circ_rc: [1000],
		circ_sc: [0],
		oracle: [413079955]
	};

	let data = placeHolderData;
	let ready = false;

	$: liabs = data.circ_sc.map((c: number, i: number) => (c / 100 / 10 ** 9) * data.oracle[i]);
	$: equity = data.reserves.map((r: number, i: number) => r / 10 ** 9 - liabs[i]);
	$: rcPrice = data.circ_rc.map((c: number, i: number) => equity[i] / c);
	$: rr = equity.map((e: number, i: number) =>
		liabs[i] > 0 ? (e / liabs[i]) * 100 + 100 : (data.reserves[i] * 100) / data.oracle[i]
	);

	let legendRef: HTMLElement;

	async function load_history(window: string) {
		ready = false;
		let url = `/api/sigmausd/history/${window}`;
		fetch(url)
			.then(async (res) => {
				if (res.ok) {
					data = await res.json();
					ready = true;
				}
			})
			.catch((e) => console.log(e));
	}

	$: {
		// https://github.com/sveltejs/kit/issues/8536
		if (browser) {
			load_history(window);
		}
	}

	const strokeColor1 = () => ($theme.dark ? 'hsl(0, 0%, 78%)' : 'hsl(0, 0%, 18%)');
	const fillColor1 = () => ($theme.dark ? 'hsla(0, 0%, 78%, 0.5)' : 'hsla(0, 0%, 52%, 0.4)');

	const strokeColor2 = () => ($theme.dark ? 'hsl(161, 98%, 43%)' : 'hsl(161, 98%, 33%)');
	const fillColor2 = () => ($theme.dark ? 'hsla(161, 98%, 62%, 0.5)' : 'hsla(161, 98%, 52%, 0.4)');

	const strokeColor3 = () => ($theme.dark ? 'hsl(226, 98%, 72%)' : 'hsl(226, 98%, 52%)');
	const fillColor3 = () => ($theme.dark ? 'hsla(226, 98%, 72%, 0.5)' : 'hsla(226, 98%, 52%, 0.4)');

	// Formatters
	const formatErg = (v: number) =>
		v ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--';
	const formatErgM = (v: number) =>
		v
			? (v / 1_000_000).toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
			  }) + ' M'
			: '--';
	const formatPrc = (v: number) =>
		v ? v.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' %' : '--';
	const formatRC = (v: number) =>
		v ? (v / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' M' : '--';
	const formatSC = (v: number) =>
		v ? '$' + (v / 100).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '--';
	const formatOracle = (v: number) =>
		v ? '$' + ((-1 / v) * 10 ** 9).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--';

	let plotSync = uPlot.sync('history');
	const matchSyncKeys = (own: any, ext: any) => own == ext;

	// Common options
	const yAxisOptions = {
		labelSize: 16,
		labelGap: 5,
		size: 70,
		space: 10,
		grid: { show: true }
	};
	const xGrid = {
		values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => ''),
		size: 0
	};
	const commonOpts = {
		height: 60,
		legend: {
			show: true,
			mount: (self: uPlot, ref: HTMLElement) => legendRef?.appendChild(ref)
		},
		padding: [5, 0, 5, 0], // top, right, bottom, left
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
				// stroke: 'red'
			}
		}
	};

	// Dedicated options
	$: reserveOpts = {
		...commonOpts,
		axes: [
			xGrid,
			{
				...yAxisOptions,
				label: 'Reserves',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => formatErgM(v))
			}
		],
		series: [
			{},
			{
				label: 'Reserves',
				stroke: strokeColor1,
				fill: fillColor1,
				value: (u: uPlot, v: number) => formatErg(v)
			}
		]
	};

	const rrOpts = {
		...commonOpts,
		axes: [
			xGrid,
			{
				label: 'RR',
				...yAxisOptions,
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => formatPrc(v))
			}
		],
		series: [
			{},
			{
				label: 'RR',
				stroke: strokeColor1,
				fill: fillColor1,
				value: (u: uPlot, v: number) => formatPrc(v)
			}
		]
	};

	const rcCircOpts = {
		...commonOpts,
		axes: [
			xGrid,
			{
				...yAxisOptions,
				label: 'SigRSV',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => formatRC(v))
			}
		],
		series: [
			{},
			{
				label: 'Circ. SigRSV',
				stroke: strokeColor2,
				fill: fillColor2,
				value: (u: uPlot, v: number) => formatRC(v)
			}
		]
	};

	const equityOpts = {
		...commonOpts,
		axes: [
			xGrid,
			{
				...yAxisOptions,
				label: 'Equity',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => formatErgM(v))
			}
		],
		series: [
			{},
			{
				label: 'Equity',
				stroke: strokeColor2,
				fill: fillColor2,
				value: (u: uPlot, v: number) => formatErg(v)
			}
		]
	};

	const rcPriceOpts = {
		...commonOpts,
		axes: [
			xGrid,
			{
				...yAxisOptions,
				label: 'RSV/ERG',
				values: (self: uPlot, ticks: number[]) =>
					ticks.map((v: number) =>
						v ? v.toLocaleString(undefined, { maximumFractionDigits: 8 }) : '--'
					)
			}
		],
		series: [
			{},
			{
				label: 'SigRSV/ERG',
				stroke: strokeColor1,
				value: (u: uPlot, v: number) =>
					v ? v.toLocaleString(undefined, { maximumFractionDigits: 8 }) : '--'
			}
		]
	};

	const scCircOpts = {
		...commonOpts,
		axes: [
			xGrid,
			{
				...yAxisOptions,
				label: 'SigUSD',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => formatSC(v))
			}
		],
		series: [
			{},
			{
				label: 'Circ. SigUSD',
				stroke: strokeColor3,
				fill: fillColor3,
				value: (u: uPlot, v: number) => formatSC(v)
			}
		]
	};

	const liabsOpts = {
		...commonOpts,
		axes: [
			xGrid,
			{
				...yAxisOptions,
				label: 'Liabilities',
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => formatErgM(v))
			}
		],
		series: [
			{},
			{
				label: 'Liabilities',
				stroke: strokeColor3,
				fill: fillColor3,
				value: (u: uPlot, v: number) => formatErg(v)
			}
		]
	};

	const oracleOpts = {
		...commonOpts,
		height: 130,
		axes: [
			{
				// size: 70
				// labelGap: 0,
				ticks: { show: false }
			},
			{
				...yAxisOptions,
				label: 'ERG/USD',
				// space: 20,
				values: (self: uPlot, ticks: number[]) => ticks.map((v: number) => formatOracle(v))
			}
		],
		series: [
			{},
			{
				label: 'Oracle',
				stroke: strokeColor1,
				value: (u: uPlot, v: number) => formatOracle(v)
			}
		]
	};
</script>

<div>
	<div class="button-bar">
		<button on:click={() => (window = '1d')}>1d</button>
		<button on:click={() => (window = '5d')}>5d</button>
		<button on:click={() => (window = '30d')}>30d</button>
		<button on:click={() => (window = '90d')}>90d</button>
	</div>
	<div class="plot-container">
		<UPlot
			enabled={ready}
			data={[data.ts, data.reserves.map((v) => v / 10 ** 9)]}
			opts={reserveOpts}
		/>
		<UPlot enabled={ready} data={[data.ts, rr]} opts={rrOpts} />
		<UPlot enabled={ready} data={[data.ts, data.circ_rc]} opts={rcCircOpts} />
		<UPlot enabled={ready} data={[data.ts, equity]} opts={equityOpts} />
		<UPlot enabled={ready} data={[data.ts, rcPrice]} opts={rcPriceOpts} />
		<UPlot enabled={ready} data={[data.ts, data.circ_sc]} opts={scCircOpts} />
		<UPlot enabled={ready} data={[data.ts, liabs]} opts={liabsOpts} />
		<UPlot enabled={ready} data={[data.ts, data.oracle.map((v) => -v)]} opts={oracleOpts} />
	</div>
	<div class="legend-container">
		<div bind:this={legendRef} />
	</div>
</div>

<style>
	.button-bar {
		display: flex;
		column-gap: 5px;
		/* margin-bottom: 2em; */
		/* margin-top: -2em; */
		margin-bottom: 1.5em;
		margin-top: -1.5em;
		justify-content: center;
	}
	button {
		width: 30px;
		/* height: 30px; */
		cursor: pointer;
		border: 1px solid var(--border);
		border-radius: 3px;
		padding: 0.1em;
		background-color: var(--surface-color-3);
	}

	/* Hide time label of all but first legend */
	:global(.u-legend:not(:first-child) tbody > .u-series:first-child) {
		display: none;
	}
	/* Show legends next to each other if possible */
	.legend-container > * {
		display: flex;
		flex-wrap: wrap;
	}
	/* Disable series toggling through legend clicks */
	.legend-container {
		pointer-events: none;
	}
</style>
