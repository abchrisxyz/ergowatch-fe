<script>
	import './styles.css';
	import { MoonIcon, SunIcon, MenuIcon } from 'svelte-feather-icons';
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
			<NavLink href="/dashboards" name="Dashboards" {onNavLinkClick} />
			<NavLink href="/charts" name="Charts" {onNavLinkClick} />
			<NavLink href="/lists" name="Lists" {onNavLinkClick} />
			<NavLink href="/tools" name="Tools" {onNavLinkClick} />
		</div>
		<div class="nav-group">
			<NavLink href="/sync" name="Sync" {onNavLinkClick} />
			<NavLink href="/api" name="API" {onNavLinkClick} />
			<NavLink href="/about" name="About" {onNavLinkClick} />
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
		<div>Node</div>
		<div>Tips</div>
	</footer>
</div>

<style>
	.layout {
		display: grid;
		min-height: 100vh;
		grid-template-columns: 100vw;
		grid-template-rows: max-content minmax(calc(100% - 64px), max-content) max-content;
		grid-template-areas:
			'header'
			'main'
			'footer';
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
		padding: 1em;
		display: flex;
		justify-content: space-between;
	}
	.logo {
		display: flex;
		align-items: center;
		column-gap: 0.3em;
		margin-right: 1em;
		font-weight: 700;
	}
	nav {
		grid-area: nav;
		display: none;
	}
	header,
	nav {
		font-size: 16px;
	}
	header a {
		text-decoration: none;
		color: inherit;
	}
	main {
		grid-area: main;
		/* background-color: var(--surface-color-2); */
	}
	footer {
		grid-area: footer;
		border-top: 1px solid var(--border);
		padding: 1em;
		/* background-color: var(--surface-color-1); */
		display: flex;
		column-gap: 1em;
		justify-content: center;
	}
	header button,
	nav button {
		color: var(--text-color);
		background-color: var(--surface-color-2);
		border: none;
		cursor: pointer;
		padding: 0;
	}
	.theme-switch {
		margin: 1em;
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
			align-items: center;
			margin: 0 1em;
		}
		.theme-switch {
			margin: 1em;
		}
	}
</style>
