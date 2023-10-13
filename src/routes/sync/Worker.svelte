<script lang="ts">
	export let name: string;
	export let height: number;
</script>

<div class="container">
	<div class="label">{name}</div>
	<div class="value">{height.toLocaleString()}</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
	}
	.label {
		width: 150px;
	}
</style>
