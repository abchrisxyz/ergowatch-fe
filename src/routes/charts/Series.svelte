<script lang="ts">
	import Panel from '$lib/Panel.svelte';
	import { SettingsIcon, ListIcon, ChevronLeftIcon } from 'svelte-feather-icons';
	import type { EntryDescription } from '../api/series/catalog';
	import { setSeries, setTimeWindow, dataStore } from './store';

	export let catalog: EntryDescription[];

	$: seriesIds = $dataStore.seriesIds;

	let showPicker = true;
	const togglePicker = () => (showPicker = !showPicker);
	let selectedTimeWindow = '1y';
</script>

{#if showPicker}
	<div class="open">
		<Panel>
			<div class="wrapper">
				<div class="header">
					Series
					<button on:click={togglePicker} hidden={!showPicker}>
						<ChevronLeftIcon />
					</button>
				</div>
				<div class="picker">
					<div class="series-container">
						<div class="catalog-entries">
							{#each catalog as entry}
								<button
									class="div"
									class:selected={entry.id === seriesIds[0]}
									on:click={() => setSeries(entry.id, 0, entry.scale)}
								>
									{entry.desc}
								</button>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</Panel>
	</div>
{:else}
	<div class="closed">
		<button on:click={togglePicker} hidden={showPicker}>
			<ListIcon />
		</button>
	</div>
{/if}

<style>
	button {
		background-color: inherit;
		border: none;
		color: var(--text-color-2);
	}
	.open {
		height: 100%;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		row-gap: var(--gap);
		height: 100%;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.picker {
		overflow-y: auto;
	}
	.catalog-entries > button {
		background-color: inherit;
		color: inherit;
		border: none;
		display: block;
		padding: 0.2em 0em;
		color: var(--text-color-2);
	}
	.catalog-entries > button.selected {
		color: var(--text-color-1);
	}
	.catalog-entries > button:hover {
		color: var(--text-color-focus);
	}
	@media (min-width: 840px) {
		.open {
			width: 400px;
		}
		.closed {
			margin-top: 2em;
		}
	}
</style>
