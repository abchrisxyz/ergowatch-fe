<script lang="ts">
	import { ChevronRightIcon, ChevronDownIcon } from 'svelte-feather-icons';
	import { type EntryDescriptionGroup } from '../api/series/catalog';
	import { setSeries, dataStore } from './store';

	export let group: EntryDescriptionGroup;

	$: seriesIds = $dataStore.seriesIds;

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
		{#each group.entries as entry}
			<button
				class:selected={entry.id === seriesIds[0]}
				on:click={() => setSeries(entry.id, 0, entry.scale)}
			>
				{entry.label}
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
	}
	.header > button.toggler {
		display: flex;
		align-items: center;
		border: none;
		background-color: inherit;
		margin-top: 1px;
		margin-bottom: -1px;
	}
	.header > button.toggler:hover {
		cursor: pointer;
	}
	.header > button.toggler .icon {
		color: var(--text-color-2);
		width: var(--icon-width);
		text-align: left;
	}
	.entries.collapsed {
		display: none;
	}
	.entries > button {
		background-color: inherit;
		color: inherit;
		border: none;
		display: block;
		padding: 0.5em 0em;
		/* padding-top: 1em; */
		margin-left: var(--icon-width);
		color: var(--text-color-2);
	}
	.entries > button.selected {
		color: var(--text-color-focus);
	}
	.entries > button:hover {
		color: var(--text-color-1);
	}
</style>
