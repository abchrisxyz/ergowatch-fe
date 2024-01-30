<script>
	import Dashboard from '../Dashboard.svelte';
	import NumberWidget from '../NumberWidget.svelte';
	import NumberGroup from '../NumberGroup.svelte';
	import Nano from '$lib/Nano.svelte';
	import Widget from '../Widget.svelte';
	import ParameterChart from './ParameterChart.svelte';

	const _storage_fee = 1_250_000;
	const _min_box_value = 360;
	const _max_block_size = 1271009;
	const _max_comp_cost = 8001091;
	const _token_access_cost = 100;
	const _tx_input_cost = 2407;
	const _tx_data_input_cost = 100;
	const _tx_output_cost = 184;
	const _block_version = 3;
</script>

<!-- storage_fee not null,       -- 1. Storage fee nanoErg/byte
	min_box_value not null,      -- 2. Minimum box value in nanoErg
	max_block_size not null,     -- 3. Maximum block size
	max_cost not null,           -- 4. Maximum computational cost of a block
	token_access_cost not null,  -- 5. Token access cost
	tx_input_cost not null,      -- 6. Cost per tx input
	tx_data_input_cost not null, -- 7. Cost per tx data-input
	tx_output_cost not null,     -- 8. Cost per tx output
	block_version not null       -- 123. Block version -->

<Dashboard title="Network">
	<NumberGroup>
		<NumberWidget units="" desc="Onging vote">None</NumberWidget>

		<NumberWidget units="" desc="Protocol version">
			{_block_version}
		</NumberWidget>
	</NumberGroup>

	<Widget title="Parameters">
		<div class="history-container">
			<!-- Header -->
			<div class="header">
				<div>Parameter</div>
				<div class="right">Current Value</div>
				<div>History</div>
			</div>
			<div class="row">
				<div>Storage fee</div>
				<div class="right"><Nano amount={_storage_fee} decimals={5} /></div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Minimum box value</div>
				<div class="right">n&Sigma; {_min_box_value.toLocaleString()}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Maximum block size</div>
				<div class="right">{_max_block_size.toLocaleString()}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Maximum computational cost</div>
				<div class="right">{_max_comp_cost.toLocaleString()}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Token access cost</div>
				<div class="right">n&Sigma; {_token_access_cost.toLocaleString()}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Cost per tx input</div>
				<div class="right">n&Sigma; {_tx_input_cost.toLocaleString()}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Cost per tx data-input</div>
				<div class="right">n&Sigma; {_tx_data_input_cost.toLocaleString()}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Cost per tx output</div>
				<div class="right">n&Sigma; {_tx_output_cost.toLocaleString()}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
			<div class="row">
				<div>Block version</div>
				<div class="right">{_block_version}</div>
				<div class="chart">
					<ParameterChart />
				</div>
			</div>
		</div>
	</Widget>
</Dashboard>

<style>
	.history-container {
		display: grid;
		grid-template-columns: max-content max-content minmax(100px, 1fr);
		overflow-x: auto;
		align-items: end;
	}
	.history-container .header {
		display: contents;
	}
	.history-container .right {
		text-align: right;
	}
	.history-container .header div {
		background-color: var(--surface-color-3);
	}
	.history-container .header div {
		padding: 1em 1em;
	}
	.history-container .row {
		display: contents;
	}
	.history-container .row div {
		padding: 0.5em 1em;
	}
	.history-container .chart {
		/* border: solid 1px red; */
	}
</style>
