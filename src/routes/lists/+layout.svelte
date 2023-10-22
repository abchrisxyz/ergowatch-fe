<script>
	import { page } from '$app/stores';
	import ListsNav from './ListsNav.svelte';

	$: mainPage = $page.route.id === '/lists';
</script>

<div class="layout">
	<div class="nav-container">
		<ListsNav showDescriptions={mainPage} collapsible={!mainPage} />
	</div>
	<div>
		<slot />
	</div>
</div>

<style>
	@media (min-width: 840px) {
		.layout {
			display: grid;
			grid-template-columns: max-content minmax(0, 1fr);
			column-gap: var(--margin);
		}
	}
</style>
