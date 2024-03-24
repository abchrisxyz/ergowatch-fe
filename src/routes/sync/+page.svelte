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

<div class="container">
	<h2>Sync heights</h2>
	<div class="description">
		<p>
			Shows the last synced height of each ErgoWatch worker. When operating normally, all workers
			will be at the same height: the latest block.
		</p>
	</div>
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
		/* width: max-content; */
		/* border: 1px solid var(--border); */
		/* border-radius: 5px; */
		/* padding: var(--margin); */
		margin: auto;
		max-width: 600px;
	}
	p {
		padding-bottom: 0.25em;
	}
	.description {
		margin-bottom: 2em;
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
