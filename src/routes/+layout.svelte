<script>
	import './styles.css';
	import './theme.css';
	import { MoonIcon, SunIcon, MenuIcon } from 'svelte-feather-icons';
	import { Github, TwitterX } from 'svelte-bootstrap-icons';
	import NavLink from './NavLink.svelte';
	import ErgoWatchLogo from '$lib/ErgoWatchLogo.svelte';

	let burgerMenuIsOpen = false;

	// Open/Close the mobile menu
	function toggleMenu() {
		burgerMenuIsOpen = !burgerMenuIsOpen;
		window.document.body.classList.toggle('burger-menu');
	}

	// When clicking a nav menu item in mobile mode, close the menu.
	function closeMobileMenu() {
		if (burgerMenuIsOpen) toggleMenu();
	}
	const onNavLinkClick = closeMobileMenu;

	// Change the color theme
	function toggleTheme() {
		window.document.body.classList.toggle('alter-theme');
	}
</script>

<div class="layout">
	<header>
		<a href="/" on:click={closeMobileMenu} class="logo">
			<ErgoWatchLogo size="32" />
			ErgoWatch
		</a>
		<button id="nav-burger" on:click={toggleMenu}>
			<MenuIcon />
		</button>
	</header>
	<nav>
		<div class="nav-group">
			<NavLink href="/dashboards" {onNavLinkClick}>Dashboards</NavLink>
			<NavLink href="/charts" {onNavLinkClick}>Charts</NavLink>
			<NavLink href="/lists" {onNavLinkClick}>Lists</NavLink>
			<!-- <NavLink href="/tools" {onNavLinkClick}>Tools</NavLink> -->
		</div>
		<div class="nav-group">
			<NavLink href="/sync" {onNavLinkClick}>Sync</NavLink>
			<NavLink href="/about" {onNavLinkClick}>About</NavLink>
			<div class="theme-switch">
				<button type="button" on:click={toggleTheme}>
					<div class="hide-if-light">
						<SunIcon />
					</div>
					<div class="hide-if-dark">
						<MoonIcon />
					</div>
				</button>
			</div>
		</div>
	</nav>
	<main>
		<slot />
	</main>
	<footer>
		<div class="group">
			<div>&copy; 2021-2024 ergo.watch</div>
		</div>
		<div class="group">
			<a href="https://api.ergo.watch/docs">API</a>
			<a href="https://node.ergo.watch">Node</a>
			<a href="https://github.com/abchrisxyz/ergowatch"><Github width={18} height={18} /></a>
			<a href="https://twitter.com/ErgoWatch"><TwitterX width={18} height={18} /></a>
		</div>
	</footer>
</div>

<style>
	.layout {
		display: grid;
		min-height: 100vh;
		grid-template-columns: 100vw;
		grid-template-rows: max-content 1fr 0;
		grid-template-areas:
			'header'
			'main'
			'footer';
		min-height: 100vh;
	}
	:global(.burger-menu) .layout {
		grid-template-rows: max-content 1fr;
		grid-template-areas:
			'header'
			'nav';
	}
	:global(.burger-menu) nav {
		display: block;
	}
	:global(.burger-menu) main,
	:global(.burger-menu) footer {
		display: none;
	}
	header {
		grid-area: header;
		padding: var(--margin);
		display: flex;
		justify-content: space-between;
	}
	.logo {
		display: flex;
		align-items: center;
		column-gap: 0.3em;
		/* margin-right: calc(var(--margin) * 2); */
		font-weight: 700;
	}
	nav {
		grid-area: nav;
		display: none;
		margin: var(--margin);
	}
	header,
	nav {
		font-size: 16px;
	}
	header a {
		text-decoration: none;
		color: inherit;
	}
	.nav-group {
		display: flex;
		flex-direction: column;
		row-gap: var(--margin);
		margin-bottom: var(--margin);
	}
	main {
		grid-area: main;
		margin: var(--margin);
	}
	footer {
		grid-area: footer;
		border-top: 1px solid var(--border);
		padding: var(--margin);
		display: flex;
		column-gap: var(--margin);
		justify-content: space-between;
		align-items: center;
		height: min-content; /* compensate the 0 in grid-template-rows */
	}
	footer .group {
		display: flex;
		column-gap: 1em;
	}
	footer a {
		text-decoration: none;
		color: var(--text-color);
	}
	header button,
	nav button {
		color: var(--text-color);
		background-color: var(--surface-color-2);
		border: none;
		cursor: pointer;
		padding: 0;
	}

	@media (min-width: 840px) {
		.layout {
			grid-template-columns: max-content 1fr;
			grid-template-areas:
				'header nav'
				'main main'
				'footer footer';
		}
		#nav-burger {
			display: none;
		}
		nav {
			display: flex;
			justify-content: space-between;
		}
		.nav-group {
			display: flex;
			flex-direction: row;
			column-gap: 1.5em;
			align-items: center;
			margin: 0;
		}
		footer .group {
			column-gap: 2em;
		}
	}
</style>
