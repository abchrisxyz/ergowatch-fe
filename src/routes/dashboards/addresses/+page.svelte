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

	export let data;
</script>

<Dashboard title="Addresses">
	<NumberGroup>
		<NumberWidget units="" desc="P2PK addresses">
			{data.p2pks.toLocaleString()}
		</NumberWidget>
		<NumberWidget units="" desc="Contract addresses">
			{data.contracts.toLocaleString()}
		</NumberWidget>
		<NumberWidget units="" desc="Reward addresses">
			{data.miners.toLocaleString()}
		</NumberWidget>
	</NumberGroup>
</Dashboard>
