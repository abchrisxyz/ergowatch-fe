<script lang="ts">
	import Worker from './Worker.svelte';
	import { PUBLIC_EW_API_ROOT } from '$env/static/public';

	import type { Data } from './types.ts';

	let data: Data | undefined;

	let url = PUBLIC_EW_API_ROOT + '/sync/status';
	fetch(url)
		.then((res) => res.json())
		.then((res) => (data = res));
</script>

<h2>Sync heights</h2>
<div class="container">
	{#if data}
		<div class="workers">
			{#each data.workers as worker}
				<div class="row">
					<Worker name={worker.name} height={worker.height} />
				</div>
			{/each}
		</div>
	{:else}
		Loading...
	{/if}
</div>

<style>
	.container {
		/* margin: auto; */
		width: max-content;
		border: 1px solid var(--border);
		border-radius: 5px;
		padding: var(--margin);
	}
	.workers {
		display: flex;
		flex-direction: column;
		row-gap: var(--gap);
	}
	.row:not(:last-child) {
		padding-bottom: var(--gap);
		border-bottom: 1px solid var(--border);
	}
</style>
