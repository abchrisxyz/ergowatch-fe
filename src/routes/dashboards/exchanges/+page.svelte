<script lang="ts">
	import Dashboard from '../Dashboard.svelte';
	import Widget from '../Widget.svelte';
	import NumberGroup from '../NumberGroup.svelte';
	import NumberWidget from '../NumberWidget.svelte';
	import Nano from '$lib/Nano.svelte';
	import TableWidget from '../TableWidget.svelte';
	import TableWidgetRow from '../TableWidgetRow.svelte';
	import TableWidgetHeader from '../TableWidgetHeader.svelte';
	import TableWidgetCell from '../TableWidgetCell.svelte';
	import CexSupplyChart from './CexSupplyChart.svelte';

	export let data;

	$: supply_on_main_addresses =
		data === undefined ? 0 : data.main.reduce((agg, record) => agg + Number(record.nano), 0);
	$: supply_on_deposit_addresses =
		data === undefined ? 0 : data.deposits.reduce((agg, record) => agg + Number(record.nano), 0.0);
	$: supply_on_exchanges = supply_on_main_addresses + supply_on_deposit_addresses;

	$: unspent_deposit_addresses =
		data === undefined
			? 0
			: data.deposits.reduce((agg, record) => agg + record.unspent_addresses, 0);

	$: deposit_lookup = Object.assign({}, ...data.deposits.map((r) => ({ [r.name]: r })));
</script>

<Dashboard title="Exchanges">
	<NumberGroup>
		<NumberWidget units="" desc="Supply on exchanges">
			<Nano amount={supply_on_exchanges} decimals={0} />
		</NumberWidget>
		<NumberWidget units="" desc="Supply on deposit addresses">
			<Nano amount={supply_on_deposit_addresses} decimals={0} />
		</NumberWidget>

		<NumberWidget units="" desc="Unspent deposit addresses">
			{unspent_deposit_addresses.toLocaleString()}
		</NumberWidget>
	</NumberGroup>

	<Widget title="Supply on exchanges (30 days)">
		<CexSupplyChart
			ts={data.supply.timestamps}
			main={data.supply.main}
			deposits={data.supply.deposits}
		/>
	</Widget>

	<Widget title="Tracked exchanges">
		<TableWidget template="repeat(6, minmax(max-content, 1fr))">
			<TableWidgetHeader>
				<TableWidgetCell>Name</TableWidgetCell>
				<TableWidgetCell right={true}>Main addresses</TableWidgetCell>
				<TableWidgetCell right={true}>Main supply</TableWidgetCell>
				<TableWidgetCell right={true}>Deposit supply</TableWidgetCell>
				<TableWidgetCell right={true}>Total deposit addresses</TableWidgetCell>
				<TableWidgetCell right={true}>Unspent deposit addresses</TableWidgetCell>
			</TableWidgetHeader>
			{#each data.main as rec}
				<TableWidgetRow>
					<TableWidgetCell>{rec.name}</TableWidgetCell>
					<TableWidgetCell right={true}>{rec.addresses.toLocaleString()}</TableWidgetCell>
					<TableWidgetCell right={true}><Nano amount={rec.nano} /></TableWidgetCell>
					<TableWidgetCell right={true}
						><Nano amount={deposit_lookup[rec.name].nano} /></TableWidgetCell
					>
					<TableWidgetCell right={true}
						>{deposit_lookup[rec.name].addresses.toLocaleString()}</TableWidgetCell
					>
					<TableWidgetCell right={true}
						>{deposit_lookup[rec.name].unspent_addresses.toLocaleString()}</TableWidgetCell
					>
				</TableWidgetRow>
			{/each}
		</TableWidget>
	</Widget>
</Dashboard>
