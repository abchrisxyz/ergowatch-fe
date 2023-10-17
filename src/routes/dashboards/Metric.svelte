<script lang="ts">
	export let label: string;
	export let units: string = '';
</script>

<div class="metric">
	<div class="label">
		{label}
	</div>
	<div class="value-wrapper">
		<div class="value"><slot /></div>
		<div class="units">{units}</div>
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
	.value-wrapper {
		display: flex;
		column-gap: 0.1em;
	}
	.value {
		/* font-size: 1.2em; */
	}
</style>
