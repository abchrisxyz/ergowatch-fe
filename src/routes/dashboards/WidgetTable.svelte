<script lang="ts">
	export let columnLabels: string[];
	export let data: (number | string)[][];
	export let allowHTML = false;
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
				{#if allowHTML}
					{#each row as val}
						<td>{@html val}</td>
					{/each}
				{:else}
					{#each row as val}
						<td>{val}</td>
					{/each}
				{/if}
			</tr>
		{/each}
	</table>
</div>

<style>
	.wrapper {
		overflow-x: auto;
		padding-bottom: 1em;
	}
	table {
		min-width: 100%;
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
