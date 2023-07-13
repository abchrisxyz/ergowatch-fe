<script>
	import './styles.css';
	import { page } from '$app/stores';
	import { MoonIcon, SunIcon, MenuIcon } from 'svelte-feather-icons';

	let burger = false;

	function toggleMenu() {
		burger = !burger;
		window.document.body.classList.toggle('burger-menu');
	}

	function toggleTheme() {
		window.document.body.classList.toggle('alter-theme');
	}
</script>

<div class="layout">
	<header>
		<div><a href="/">ErgoWatch</a></div>
		<button id="nav-burger" on:click={toggleMenu}>
			<MenuIcon />
		</button>
	</header>
	<nav>
		<div class="nav-group">
			<div class="nav-link" class:active={$page.route.id?.startsWith('/dashboards')}>
				<a href="dashboards" on:click={() => burger && toggleMenu()}>Dashboards</a>
			</div>
			<div class="nav-link" class:active={$page.route.id?.startsWith('/charts')}>
				<a href="charts" on:click={() => burger && toggleMenu()}>Charts</a>
			</div>
			<div class="nav-link" class:active={$page.route.id?.startsWith('/lists')}>
				<a href="lists" on:click={() => burger && toggleMenu()}>Lists</a>
			</div>
			<div class="nav-link" class:active={$page.route.id?.startsWith('/tools')}>
				<a href="tools" on:click={() => burger && toggleMenu()}>Tools</a>
			</div>
		</div>
		<div class="nav-group">
			<div class="nav-link" class:active={$page.route.id?.startsWith('/sync')}>
				<a href="sync" on:click={() => burger && toggleMenu()}>Sync</a>
			</div>
			<div class="nav-link" class:active={$page.route.id?.startsWith('/api')}>
				<a href="api" on:click={() => burger && toggleMenu()}>API</a>
			</div>
			<div class="nav-link" class:active={$page.route.id?.startsWith('/about')}>
				<a href="about" on:click={() => burger && toggleMenu()}>About</a>
			</div>
			<div class="nav-link theme-switch">
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
		height: 100vh;
		grid-template-columns: 100vw;
		grid-template-rows: max-content minmax(calc(100vh - 3em), max-content) max-content;
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
	nav {
		grid-area: nav;
		display: none;
	}
	.nav-link:hover {
		color: orange;
		cursor: pointer;
	}
	header a,
	nav a {
		text-decoration: none;
		color: inherit;
	}
	main {
		grid-area: main;
	}
	footer {
		grid-area: footer;
		border-top: 1px solid gainsboro;
		padding: 1em;
	}
	header button,
	nav button {
		color: var(--text-color);
		background-color: var(--surface-color-1);
		border: none;
		cursor: pointer;
		padding: 0;
	}
	.nav-link {
		margin: 1em;
	}
	.nav-link.active {
		color: orange;
	}
	footer {
		display: flex;
		column-gap: 1em;
		justify-content: center;
	}

	@media (min-width: 770px) {
		.layout {
			grid-template-columns: 200px 1fr;
			grid-template-rows: max-content minmax(calc(100vh - 3em), max-content) max-content;
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
			margin: 0 1em;
		}
		.theme-switch {
			margin-top: calc(1em - 4px);
		}
	}
</style>
