<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
	export let name: string;
	export let onNavLinkClick: any;
</script>

<div class="link" class:active={$page.route.id?.startsWith(href)}>
	<a {href} on:click={onNavLinkClick}>{name}</a>
</div>

<style>
	.link {
		margin: 1em;
	}
	.link:hover {
		color: orange;
		cursor: pointer;
	}
	.link.active {
		color: orange;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
