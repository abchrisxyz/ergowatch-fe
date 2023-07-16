<script>
	import Widget from '../Widget.svelte';
	import Metric from '../Metric.svelte';
	import TableWidget from '../TableWidget.svelte';
</script>

<div class="wrapper">
	<h1>SigmaUSD</h1>
	<div class="dashboard">
		<div class="row">
			<Widget title="SigUSD">
				<div class="keyvals">
					<Metric label="Circulating" value={515020.12} units="" />
					<Metric label="Price" value={0.79} units="ERG" />
					<Metric label="Mintable" value={0} units="" />
					<Metric label="Redeemable" value={515020.12} units="" />
					<Metric label="Average ROI" value={14.1} units="%" />
				</div>
			</Widget>
			<Widget title="SigRSV">
				<div class="keyvals">
					<Metric label="Circulating" value={515020.12} units="" />
					<Metric label="Price" value={0.79} units="ERG" />
					<Metric label="Mintable" value={0} units="" />
					<Metric label="Redeemable" value={515020.12} units="" />
					<Metric label="Average ROI" value={14.1} units="%" />
				</div>
			</Widget>
			<Widget title="Reserves">
				<div class="keyvals">
					<Metric label="Total" value={1475298.96} units="ERG" />
					<Metric label="Liabilities" value={414034.97} units="ERG" />
					<Metric label="Equity" value={1061263.98} units="ERG" />
					<Metric label="Ratio (RR)" value={356} units="%" />
					<Metric label="TVL" value={1835132} units="$" />
				</div>
			</Widget>
		</div>
		<div class="row">
			<TableWidget />
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
