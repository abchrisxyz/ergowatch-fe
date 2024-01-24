<script lang="ts">
	import Panel from '$lib/Panel.svelte';
	import UPlot from '$lib/UPlot.svelte';
	import { dataStore, optsStore, readyStore } from './store';

	$: opts = $optsStore;
	$: ready = $readyStore;
	let data: number[][];
	dataStore.subscribe((ds) => {
		data = [ds.timestamps, ...ds.values];
	});
</script>

<Panel>
	<div class="chart-wrapper">
		<div class="chart">
			<UPlot {opts} {data} enabled={ready} />
		</div>
	</div>
</Panel>

<style>
	.chart-wrapper {
		display: grid;
		grid-template-columns: minmax(0, 1fr) max-content;
	}
</style>
