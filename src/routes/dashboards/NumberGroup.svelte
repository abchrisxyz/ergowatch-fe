<div>
	<slot />
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-gap: 1em;
	}
</style>
