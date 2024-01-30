<div class="row">
	<slot />
</div>

<style>
	.row {
		display: flex;
		flex-direction: column;
		column-gap: var(--gap);
		row-gap: var(--gap);
		flex-wrap: wrap;
	}
	@media (min-width: 550px) {
		.row {
			flex-direction: row;
		}
	}
</style>
