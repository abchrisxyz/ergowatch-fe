<script lang="ts">
	import Widget from '../Widget.svelte';
	import Metric from '../Metric.svelte';
	import Services from './Services.svelte';
	import History from './History.svelte';
	import Dollar from '$lib/Dollar.svelte';
	import Nano from '$lib/Nano.svelte';

	import { deriveStateInfo } from './ageusd';

	export let data;

	const { sigusd, sigrsv, reserves } = deriveStateInfo(data.state);
</script>

<div class="wrapper">
	<h1>SigmaUSD</h1>
	<div class="dashboard">
		<div class="row">
			<Widget title="SigUSD">
				<div class="keyvals">
					<Metric label="Circulating" units="">{sigusd.circulating.toLocaleString()}</Metric>
					<Metric label="Price"><Nano amount={sigusd.price} decimals={2} /></Metric>
					<Metric label="Mintable">{sigusd.mintable.toLocaleString()}</Metric>
					<Metric label="Redeemable">{sigusd.redeemable.toLocaleString()}</Metric>
					<!-- <Metric label="Average ROI" units="%">{-1}</Metric> -->
				</div>
			</Widget>
			<Widget title="SigRSV">
				<div class="keyvals">
					<Metric label="Circulating">{sigrsv.circulating.toLocaleString()}</Metric>
					<Metric label="Price"><Nano amount={sigrsv.price} decimals={8} /></Metric>
					<Metric label="Mintable">{sigrsv.mintable.toLocaleString()}</Metric>
					<Metric label="Redeemable">{sigrsv.redeemable.toLocaleString()}</Metric>
					<!-- <Metric label="Average ROI" units="%">{-1}</Metric> -->
				</div>
			</Widget>
			<Widget title="Reserves">
				<div class="keyvals">
					<Metric label="Total"><Nano amount={reserves.total} decimals={0} /></Metric>
					<Metric label="Liabilities"><Nano amount={reserves.liabilities} decimals={0} /></Metric>
					<Metric label="Equity"><Nano amount={reserves.equity} decimals={0} /></Metric>
					<Metric label="Ratio (RR)" units="%">{reserves.rr.toFixed(0).toLocaleString()}</Metric>
					<Metric label="TVL"><Dollar amount={reserves.tvl} decimals={0} /></Metric>
				</div>
			</Widget>
		</div>
		<div class="row">
			<Widget title="Contract Interaction">
				<Services data={data.services} />
			</Widget>
		</div>
		<div class="row">
			<Widget title="History">
				<History />
			</Widget>
		</div>
	</div>
</div>

<style>
	.wrapper {
		background-color: var(--surface-color-2);
		min-height: 100%;
	}
	.dashboard {
		display: flex;
		flex-direction: column;
		row-gap: var(--gap);
	}
	.row {
		display: flex;
		flex-direction: column;
		column-gap: var(--gap);
		row-gap: var(--gap);
		flex-wrap: wrap;
	}
	.keyvals {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: var(--gap);
		row-gap: var(--gap);
	}
	@media (min-width: 550px) {
		.row {
			flex-direction: row;
		}
		.keyvals {
			display: grid;
			grid-template-columns: repeat(3, minmax(max-content, 1fr));
		}
	}
</style>
