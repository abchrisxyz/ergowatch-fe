<script lang="ts">
	export let label: string;
	export let value: number;
	export let units: string;
</script>

<div class="metric">
	<div class="label">
		{label}
	</div>
	<div>
		<span class="value">{value.toLocaleString()}</span> <span class="units">{units}</span>
	</div>
</div>

<style>
	.metric {
		display: flex;
		flex-direction: column;
	}
	.label {
		padding-bottom: 0.5em;
		font-size: small;
		color: var(--text-color-2);
	}
	.value {
		/* font-size: 1.2em; */
	}
</style>
