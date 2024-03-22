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
		color: var(--text-color-1);
		cursor: pointer;
	}
	.link.active {
		color: var(--text-color-focus);
	}
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
