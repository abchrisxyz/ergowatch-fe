<script lang="ts">
	import { version } from '$app/environment';
</script>

<div class="container">
	<h2>About</h2>
	<p>
		ErgoWatch is a data aggragation tool for the <a href="https://ergoplatform.org/">Ergo</a> blockchain.
	</p>
	<br />
	<p>
		The project started in 2021 to illustrate the workings of the <a
			href="https://docs.ergoplatform.com/uses/sigmausd/">SigmaUSD</a
		> algorithmic stable coin that had just launched. From there, it evolved to track other aspects of
		Ergo.
	</p>
	<br />
	<p>App revision: {version.substring(0, 7)}</p>
</div>

<style>
	.container {
		margin: auto;
		max-width: 600px;
	}
	a {
		color: var(--text-color);
	}
</style>
