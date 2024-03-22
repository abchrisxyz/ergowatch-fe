<script lang="ts">
	import Nano from '$lib/Nano.svelte';
	import { formatMilliseconds } from '$lib/utils.js';
	export let data;
</script>

<div class="wrapper">
	<h1>Rich List</h1>
	<div>
		<table>
			<tr>
				<th>#</th>
				<th>Address</th>
				<th>Balance</th>
				<th>Mean Supply Origin</th>
			</tr>
			{#each data.balances as bal, i}
				<tr class="mono">
					<td>{i + 1}</td>
					<td>{bal.address.slice(0, 8)}</td>
					<td><Nano amount={bal.balance} /></td>
					<td>{formatMilliseconds(bal.mean_age_timestamp)}</td>
				</tr>
			{/each}
		</table>
	</div>
</div>

<style>
	.wrapper {
		background-color: var(--surface-color-2);
		min-height: 100%;
	}
	table {
		/* min-width: 100%; */
		white-space: nowrap;
		border-collapse: collapse;
	}
	tr:not(:first-child):not(:last-child) {
		border-bottom: 1px solid var(--border);
	}
	th {
		background-color: var(--surface-color-3);
	}
	th,
	td {
		padding: 0.75em 1em;
		/* padding-right: 1em; */
		text-align: end;
	}
	th:first-child,
	td:first-child {
		text-align: start;
	}
	.mono {
		font-family: monospace;
		font-size: 0.95em;
		font-weight: lighter;
	}
</style>
