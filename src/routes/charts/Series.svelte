<script lang="ts">
	import Panel from '$lib/Panel.svelte';
	import { SettingsIcon, ListIcon, ChevronLeftIcon } from 'svelte-feather-icons';
	import type { EntryDescriptionGroup } from '../api/series/catalog';
	import SeriesGroup from './SeriesGroup.svelte';

	export let catalog: EntryDescriptionGroup[];

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
					<div class="groups-container">
						{#each catalog as group}
							<SeriesGroup {group} />
						{/each}
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
	.groups-container {
		display: flex;
		flex-direction: column;
		row-gap: 1.5em;
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
