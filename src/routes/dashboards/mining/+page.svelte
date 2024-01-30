<script lang="ts">
	import Dashboard from '../Dashboard.svelte';
	import NumberWidget from '../NumberWidget.svelte';
	import NumberGroup from '../NumberGroup.svelte';
	import Widget from '../Widget.svelte';

	const _hashRate = 13.16;
	const _blocks_mined = 704;
	const _block_time = 124;
	const _difficulty = 1155337370684620;
</script>

<Dashboard title="Mining">
	<NumberGroup>
		<NumberWidget units="TH/s" desc="Hash rate">
			{_hashRate.toLocaleString()}
		</NumberWidget>
		<NumberWidget units="PH" desc="Difficulty">
			{(_difficulty / 1000 / 1000 / 1000 / 1000 / 1000).toLocaleString(undefined, {
				maximumFractionDigits: 2
			})}
		</NumberWidget>
		<NumberWidget units="" desc="Number of blocks">
			{_blocks_mined.toLocaleString()}
		</NumberWidget>
		<NumberWidget units="s" desc="Block time">
			{_block_time.toLocaleString()}
		</NumberWidget>
	</NumberGroup>
	<Widget title="Miner distribution">Table with horizontal bars</Widget>
	<Widget title="Normalized mining rewards">chart</Widget>
</Dashboard>
