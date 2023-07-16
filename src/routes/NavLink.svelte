<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
	export let onNavLinkClick: any;
</script>

<div class="link" class:active={$page.route.id?.startsWith(href)}>
	<a {href} on:click={onNavLinkClick}><slot /></a>
</div>

<style>
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
