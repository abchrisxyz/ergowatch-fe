<script lang="ts">
	import Chart from './Chart.svelte';
	import Settings from './Settings.svelte';

	export let data;
</script>

<h1>Charts</h1>
<div class="wrapper">
	<div class="settings">
		<Settings catalog={data.catalog} />
	</div>
	<div class="charts">
		<Chart />
	</div>
</div>

<style>
	h1 {
		color: var(--text-color-2);
	}
	.wrapper {
		display: flex;

		column-gap: var(--gap);
	}
	.charts {
		flex-grow: 1;
	}
</style>
