<script>
	export let padding = true;
</script>

<div class="panel">
	<div class="contents" class:padding>
		<slot />
	</div>
</div>

<style>
	.panel {
		display: flex;
		flex-direction: column;
		background-color: var(--surface-color-1);
		border: 1px solid var(--border);
		border-radius: 5px;
		flex-grow: 1;
		padding: 1em;
		max-width: 100%;
		height: 100%;
	}
	.contents {
		max-width: 100%;
		height: 100%;
	}
	@media (min-width: 550px) {
		.panel {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}
		.contents.padding {
			padding: 1em;
		}
	}
</style>
