<script lang="ts">
	export let columnLabels: string[];
	export let rowLabels: number[] | string[];
	export let data: (number | string)[][];
</script>

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
					<td>{@html val}</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>

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
		background-color: var(--surface-color-3);
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
