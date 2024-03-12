<script lang="ts">
	import Panel from '$lib/Panel.svelte';

	import { setTimeWindow, timeWindowStore } from './store';
</script>

<Panel padding={false}>
	<div class="settings">
		<!-- Time window -->
		<div class="time-windows">
			<button class:selected={$timeWindowStore === '1m'} on:click={() => setTimeWindow('1m')}
				>1m</button
			>
			<button class:selected={$timeWindowStore === '3m'} on:click={() => setTimeWindow('3m')}
				>3m</button
			>
			<button class:selected={$timeWindowStore === '1y'} on:click={() => setTimeWindow('1y')}
				>1y</button
			>
			<button class:selected={$timeWindowStore === 'all'} on:click={() => setTimeWindow('all')}
				>all</button
			>
		</div>
	</div>
</Panel>

<style>
	button {
		background-color: inherit;
		border: none;
		color: var(--text-color-2);
	}
	.time-windows {
		display: flex;
		flex-direction: row;
		column-gap: 1em;
		justify-content: center;
	}
	.time-windows button.selected {
		color: var(--text-color-focus);
	}
	.time-windows button:hover {
		color: var(--text-color-1);
	}
	/* @media (min-width: 840px) {
		.settings {
			margin-top: -0.5em;
			margin-bottom: -0.5em;
		}
	} */
</style>
