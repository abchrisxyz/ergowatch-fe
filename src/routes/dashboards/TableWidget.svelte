<script lang="ts">
	import Widget from './Widget.svelte';

	let data;
</script>

<Widget title="Services">
	<div class="table">
		<div class="row header">
			<div />
			<div>Transactions</div>
			<div>Volume [ERG]</div>
			<div>Fees [ERG]</div>
		</div>
		<div class="row">
			<div><a href="https://sigmausd.io/">sigmausd.io</a></div>
			<div>27635</div>
			<div>9276492</div>
			<div>922</div>
		</div>
		<div class="row">
			<div><a href="https://tokenjay.app/">tokejay.app</a></div>
			<div>3145</div>
			<div>76924</div>
			<div>142</div>
		</div>
		<div class="row">
			<div>Direct</div>
			<div>535</div>
			<div>1276924</div>
			<div>NA</div>
		</div>
	</div>
</Widget>

<style>
	.header {
		/* font-weight: 700; */
		/* font-size: smaller; */
		padding-bottom: 0.2em;
		/* background-color: var(--surface-color-2); */
	}
	.row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 1em;
		text-align: end;
		padding: 0.25em 0em;
	}
	.row div:first-child {
		text-align: start;
	}
	a {
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}
</style>
