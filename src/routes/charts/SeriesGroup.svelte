<script lang="ts">
	import { ChevronRightIcon, ChevronDownIcon } from 'svelte-feather-icons';
	import { type DatasetGroup } from '../api/series/catalog';
	import { setSeries, dataStore } from './store';

	export let group: DatasetGroup;

	$: seriesIds = $dataStore.datasets.map((ds) => ds.id);

	let collapsed = true;
</script>

<div class="container">
	<div class="header">
		<button class="toggler" on:click={() => (collapsed = !collapsed)}>
			<div class="icon">
				{#if collapsed}
					<ChevronRightIcon size="18" />
				{:else}
					<ChevronDownIcon size="18" />
				{/if}
			</div>
			{group.name}
		</button>
	</div>
	<div class="entries" class:collapsed>
		{#each group.datasets as ds}
			<button class:selected={ds.id === seriesIds[0]} on:click={() => setSeries(ds, 0)}>
				{ds.name}
			</button>
		{/each}
	</div>
</div>

<style>
	.container {
		--icon-width: 1.5em;
	}
	.header {
		padding: 0;
		margin: 0;
	}

	.header > button.toggler {
		display: flex;
		align-items: center;
		border: none;
		background-color: inherit;
	}
	.header > button.toggler:hover {
		cursor: pointer;
	}
	.header > button.toggler .icon {
		color: var(--text-color-2);
		width: var(--icon-width);
		text-align: left;
		line-height: 0.5em;
	}
	.entries.collapsed {
		display: none;
	}
	.entries > button {
		background-color: inherit;
		color: inherit;
		border: none;
		display: block;
		padding-top: 0.75em;
		padding-bottom: 0.75em;
		margin-left: var(--icon-width);
		padding-left: 1em;
		color: var(--text-color-2);
	}
	.entries > button:first-child {
		margin-top: 0.75em;
	}
	.entries > button:last-child {
		padding-bottom: 0;
	}
	.entries > button.selected,
	.entries > button.selected:hover {
		color: var(--text-color-focus);
	}
	.entries > button:hover {
		color: var(--text-color-1);
	}
</style>
