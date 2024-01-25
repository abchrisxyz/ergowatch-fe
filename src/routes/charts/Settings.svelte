<script lang="ts">
	import Panel from '$lib/Panel.svelte';
	import { SettingsIcon, ChevronLeftIcon } from 'svelte-feather-icons';
	import type { EntryDescription } from '../api/series/catalog';
	import { setSeries, setTimeWindow, dataStore } from './store';

	export let catalog: EntryDescription[];

	$: seriesIds = $dataStore.seriesIds;

	let showSettings = true;
	const toggleSettings = () => (showSettings = !showSettings);
</script>

{#if showSettings}
	<div class="open">
		<Panel>
			<div class="wrapper">
				<div class="header">
					Settings
					<button on:click={toggleSettings} hidden={!showSettings}>
						<ChevronLeftIcon />
					</button>
				</div>
				<div class="settings">
					Time window
					<div class="time-windows">
						<button on:click={() => setTimeWindow('1m')}>1m</button>
						<button on:click={() => setTimeWindow('3m')}>3m</button>
						<button on:click={() => setTimeWindow('1y')}>1y</button>
						<button on:click={() => setTimeWindow('all')}>all</button>
					</div>
					<div class="series-container">
						<!-- <div>series 1 | series 2 | + add</div> -->
						<!-- <div>Axis left | right</div> -->
						<div class="catalog-entries">
							{#each catalog as entry}
								<button
									class="div"
									class:selected={entry.id === seriesIds[0]}
									on:click={() => setSeries(entry.id, 0)}
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
		<button on:click={toggleSettings} hidden={showSettings}>
			<SettingsIcon />
		</button>
	</div>
{/if}

<style>
	button {
		background-color: inherit;
		border: none;
		color: var(--text-color-2);
	}
	.closed {
		margin-top: 2em;
	}
	.open {
		/* explicit height to speed up uplot resizing TODO: make responsive*/
		/* width: max(30vw, 400px); */
		width: 400px;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		row-gap: var(--gap);
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.time-windows {
		display: flex;
		column-gap: 1em;
		padding: 1em;
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
</style>
