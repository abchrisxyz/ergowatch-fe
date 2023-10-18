<script>
	import { page } from '$app/stores';
	import DashboardsNav from './DashboardsNav.svelte';

	$: mainPage = $page.route.id === '/dashboards';
</script>

<div class="layout">
	<div class="nav-container">
		<DashboardsNav showDescriptions={mainPage} collapsible={!mainPage} />
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
