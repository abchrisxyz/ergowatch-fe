<script lang="ts">
	export let title: string;
</script>

<div class="widget">
	<div class="title">{title}</div>
	<div class="contents">
		<slot />
	</div>
</div>

<style>
	.widget {
		display: flex;
		flex-direction: column;
		background-color: var(--surface-color-1);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		/* border-radius: 5px; */
		flex-grow: 1;
		padding: 1em;
	}
	.title {
		/* background-color: var(--surface-color-2); */
		font-weight: bold;
		/* border-bottom: 1px solid var(--border); */
	}
	.contents {
		padding-top: 1em;
	}
	@media (min-width: 550px) {
		.widget {
			display: flex;
			flex-direction: column;
			background-color: var(--surface-color-1);
			border: 1px solid var(--border);
			border-radius: 5px;
			flex-grow: 1;
		}
		.title {
			padding: 1em;
			padding-bottom: 0;
		}
		.contents {
			padding: 1em;
		}
	}
</style>
