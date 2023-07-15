<script lang="ts">
	import Widget from './Widget.svelte';

	let columnLabels = ['Name', 'Transactions', 'Volume [ERG]', 'Fees [ERG]'];
	let rowLabels = [
		'<a href="https://sigmausd.io/">sigmausd.io</a>',
		'<a href="https://tokenjay.app/">tokejay.app</a>',
		'Direct'
	];
	let data = [
		[27635, 9276492, 922],
		[3125, 76924, 142],
		[535, 1276924, 'NA']
	];
</script>

<Widget title="Services">
	<div class="wrapper">
		<table class="table-widget">
			<tr>
				{#each columnLabels as label}
					<th>{label}</th>
				{/each}
			</tr>
			{#each data as row, i}
				<tr>
					<td>{@html rowLabels[i]}</td>
					{#each row as val}
						<td>{val}</td>
					{/each}
				</tr>
			{/each}
		</table>
	</div>
</Widget>

<style>
	.wrapper {
		overflow-x: scroll;
		padding-bottom: 1em;
	}
	table {
		width: 100%;
		white-space: nowrap;
		border-collapse: collapse;
	}
	tr:not(:first-child):not(:last-child) {
		border-bottom: 1px solid var(--border);
	}
	th {
		background-color: var(--surface-color-2);
	}
	th,
	td {
		padding: 1em 1em;
		/* padding-right: 1em; */
		text-align: end;
	}
	th:first-child,
	td:first-child {
		text-align: start;
	}
	:global(.table-widget a) {
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}
</style>
