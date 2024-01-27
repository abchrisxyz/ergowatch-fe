<script lang="ts">
	import Chart from './Chart.svelte';
	import Settings from './Settings.svelte';
	import Series from './Series.svelte';

	export let data;
</script>

<div class="wrapper">
	<div class="series">
		<Series catalog={data.catalog} />
	</div>
	<div class="settings">
		<Settings />
	</div>
	<div class="charts">
		<Chart />
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content min-content 1fr;
		grid-template-areas: 'series' 'settings' 'charts';
		row-gap: var(--gap);
		column-gap: var(--gap);
	}
	.series {
		/* align-self: center; */
		grid-area: series;
		max-height: 75vh;
	}
	.settings {
		grid-area: settings;
	}
	.charts {
		grid-area: charts;
	}
	@media (min-width: 840px) {
		.wrapper {
			grid-template-columns: min-content 1fr;
			grid-template-rows: min-content 1fr;

			grid-template-areas: 'none settings' 'series charts';
		}

		.series {
			/* align-self: normal; */
			max-height: 588px;
		}
	}
</style>
