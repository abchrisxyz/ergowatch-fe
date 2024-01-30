<script lang="ts">
	export let template: string;

	$: style = `grid-template-columns: ${template}`;
</script>

<div class="table" {style}>
	<slot />
</div>

<style>
	.table {
		display: grid;
		/* grid-template-columns: max-content max-content; */
		overflow-x: auto;
		align-items: end;
	}
</style>
