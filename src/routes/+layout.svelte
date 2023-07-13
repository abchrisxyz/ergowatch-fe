<script>
	import './styles.css';
	import { MoonIcon } from 'svelte-feather-icons';
</script>

<div class="layout">
	<header>
		<div>ErgoWatch</div>
		<button id="nav-burger" on:click={() => console.log('burger click')}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					fillrule="evenodd"
					d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
				/>
			</svg>
		</button>
	</header>
	<nav>
		<div class="nav-group">
			<div class="nav-link">Dashboards</div>
			<div class="nav-link">Charts</div>
			<div class="nav-link">Lists</div>
			<div class="nav-link">Tools</div>
		</div>
		<div class="nav-group">
			<div class="nav-link">Sync</div>
			<div class="nav-link">API</div>
			<div class="nav-link">About</div>
			<div class="nav-link" style="margin-top: -3px;">
				<MoonIcon />
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
	#nav-burger {
		background-color: inherit;
		border: none;
	}
	.nav-link:hover {
		color: orange;
		cursor: pointer;
	}
	main {
		grid-area: main;
	}
	footer {
		grid-area: footer;
		border-top: 1px solid gainsboro;
		padding: 1em;
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
		.nav-link {
			padding: 1em;
		}
		footer {
			display: flex;
			column-gap: 1em;
			justify-content: center;
		}
	}
</style>
