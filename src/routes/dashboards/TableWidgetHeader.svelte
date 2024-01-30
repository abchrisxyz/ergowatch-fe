<script lang="ts">
</script>

<div class="row">
	<slot />
</div>

<style>
	.row {
		display: contents;
	}
	.row :global(div) {
		background-color: var(--surface-color-3);
		/* background-color: indianred; */
		padding: 1em 1em;
	}
</style>
