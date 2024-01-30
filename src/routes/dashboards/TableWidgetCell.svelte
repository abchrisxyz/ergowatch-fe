<script lang="ts">
	export let right = false;
</script>

<div class="cell" class:right>
	<slot />
</div>

<style>
	div {
		padding: 1em 1em;
	}
	.right {
		text-align: right;
	}
</style>
