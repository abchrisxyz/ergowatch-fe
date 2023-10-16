<script lang="ts">
	import Widget from '../Widget.svelte';
	import Metric from '../Metric.svelte';
	import Services from './Services.svelte';

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
					<Metric label="Circulating" value={sigusd.circulating} units="" />
					<Metric label="Price" value={sigusd.price / 10 ** 9} units="ERG" />
					<Metric label="Mintable" value={sigusd.mintable} units="" />
					<Metric label="Redeemable" value={sigusd.redeemable} units="" />
					<!-- <Metric label="Average ROI" value={-1} units="%" /> -->
				</div>
			</Widget>
			<Widget title="SigRSV">
				<div class="keyvals">
					<Metric label="Circulating" value={sigrsv.circulating} units="" />
					<Metric label="Price" value={sigrsv.price / 10 ** 9} units="" />
					<Metric label="Mintable" value={sigrsv.mintable} units="" />
					<Metric label="Redeemable" value={sigrsv.redeemable} units="" />
					<!-- <Metric label="Average ROI" value={-1} units="%" /> -->
				</div>
			</Widget>
			<Widget title="Reserves">
				<div class="keyvals">
					<Metric label="Total" value={reserves.total / 10 ** 9} units="ERG" />
					<Metric label="Liabilities" value={reserves.liabilities / 10 ** 9} units="ERG" />
					<Metric label="Equity" value={reserves.equity / 10 ** 9} units="ERG" />
					<Metric label="Ratio (RR)" value={reserves.rr} units="%" />
					<Metric label="TVL" value={reserves.tvl} units="$" />
				</div>
			</Widget>
		</div>
		<div class="row">
			<Widget title="Contract Interaction">
				<Services data={data.services} />
			</Widget>
		</div>
		<div class="row">
			<Widget title="History" />
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
