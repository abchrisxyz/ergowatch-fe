<script lang="ts">
	import { ChevronDownIcon, ChevronUpIcon } from 'svelte-feather-icons';
	import NavLink from '../NavLink.svelte';

	export let showDescriptions: boolean;
	export let collapsible = false;
	$: collapsed = collapsible;

	function onNavLinkClick() {
		collapsed = true;
	}
</script>

<div class="container" class:collapsible class:collapsed>
	<div class="banner">
		<h1>Dashboards</h1>
		<button id="switch" on:click={() => (collapsed = !collapsed)}>
			{#if collapsed}
				<ChevronDownIcon />
			{:else}
				<ChevronUpIcon />
			{/if}
		</button>
	</div>
	<nav class:show-descriptions={showDescriptions}>
		<div class="category">Layer 1</div>
		<NavLink href="/dashboards/emission" {onNavLinkClick}>
			<div class="dashboard-link">
				<div>Emission</div>
				<div class="description">ERG emission</div>
			</div>
		</NavLink>
		<NavLink href="/dashboards/network" {onNavLinkClick}>
			<div class="dashboard-link">
				<div>Network</div>
				<div class="description">Network parameters and voting</div>
			</div>
		</NavLink>
		<NavLink href="/dashboards/mining" {onNavLinkClick}>
			<div class="dashboard-link">
				<div>Mining</div>
				<div class="description">Mining stats</div>
			</div>
		</NavLink>

		<div class="category">Metrics</div>
		<NavLink href="/dashboards/addresses" {onNavLinkClick}>
			<div class="dashboard-link">
				<div>Addresses</div>
				<div class="description">Address counts etc.</div>
			</div>
		</NavLink>
		<NavLink href="/dashboards/exchanges" {onNavLinkClick}>
			<div class="dashboard-link">
				<div>Exchanges</div>
				<div class="description">Supply on tracked exchanges</div>
			</div>
		</NavLink>

		<div class="category">Contracts</div>
		<NavLink href="/dashboards/sigmausd" {onNavLinkClick}>
			<div class="dashboard-link">
				<div>SigmaUSD</div>
				<div class="description">SigmaUSD contract state, usage and history</div>
			</div>
		</NavLink>
	</nav>
</div>

<style>
	.container {
		overflow-y: hidden;
	}
	nav {
		display: flex;
		flex-direction: column;
		row-gap: 0.75em;
		margin-bottom: 2em;
	}
	.collapsed nav {
		display: none;
	}
	.banner {
		display: flex;
		column-gap: 1em;
		align-items: baseline;
	}
	h1 {
		color: var(--text-color-2);
	}
	#switch {
		padding: 0;
		margin: 0;
		border: none;
		background-color: inherit;
		color: var(--text-color);
		cursor: pointer;
		display: none;
	}
	.collapsible #switch {
		display: block;
	}
	.category {
		/* padding-bottom: 0.5em; */
		/* font-weight: 550; */
		text-transform: uppercase;
	}
	.category:not(:first-child) {
		padding-top: 1em;
	}
	.dashboard-link {
		display: grid;
		grid-template-columns: 90px 1fr;
		column-gap: 1em;
	}
	.description {
		display: none;
	}
	.show-descriptions .description {
		display: block;
	}

	@media (min-width: 840px) {
		.collapsed nav {
			display: flex;
		}
		.collapsible #switch {
			display: none;
		}
		nav {
			margin-bottom: 0;
		}
	}
</style>
