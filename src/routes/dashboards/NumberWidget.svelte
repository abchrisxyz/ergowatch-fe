<script lang="ts">
	export let units: string;
	export let desc: string;
</script>

<div class="wrapper">
	<div class="display">
		<div class="value"><slot /></div>
		<div class="units">{units}</div>
	</div>
	<div class="desc">{desc}</div>
</div>

<style>
	.wrapper {
		background-color: var(--surface-color-1);
		border: 1px solid var(--border);
		border-radius: 5px;
		padding: 2em;
		max-width: 600px;
		flex-grow: 1;
	}
	.display {
		display: flex;
		align-items: baseline;
		column-gap: 0.1em;
		justify-content: center;
	}
	.value {
		font-size: 2em;
	}
	.units {
		font-size: 1em;
	}
	.desc {
		margin-top: 1em;
		color: var(--text-color-2);
		text-align: center;
	}
</style>
