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
	.layout {
		/* margin: 1rem; */
	}
	.nav-container {
		/* width: max-content; */
		/* padding: 1em; */
	}
	@media (min-width: 840px) {
		.layout {
			margin: 1rem;
			display: grid;
			grid-template-columns: max-content 1fr;
		}
	}
</style>
