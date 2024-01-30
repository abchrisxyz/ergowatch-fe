<script lang="ts">
	export let title: string;
</script>

<div class="wrapper">
	<h1>{title}</h1>
	<div class="dashboard">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		background-color: var(--surface-color-2);
		min-height: 100%;
	}
	.dashboard {
		display: flex;
		flex-direction: column;
		row-gap: var(--gap);
	}
</style>
