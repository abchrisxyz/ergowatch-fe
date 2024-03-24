<script lang="ts">
	import Dashboard from '../Dashboard.svelte';
	import NumberWidget from '../NumberWidget.svelte';
	import NumberGroup from '../NumberGroup.svelte';
	import Widget from '../Widget.svelte';
	import Nano from '$lib/Nano.svelte';
	import TableWidget from '../TableWidget.svelte';
	import TableWidgetRow from '../TableWidgetRow.svelte';
	import TableWidgetHeader from '../TableWidgetHeader.svelte';
	import TableWidgetCell from '../TableWidgetCell.svelte';
	import HashRateChart from './HashRateChart.svelte';

	export let data;

	$: miner_dist = data.miner_distribution;

	const hash_rate = data.stats.hash_rate_24h / 1e12;
	const _blocks_mined = 704;
	$: block_time = 86400 / data.blocks;
	const difficulty = data.stats.difficulty;
	const _rewards = 21_716_000_000_000;
	const _fees_prc = (311.87 / _rewards) * 1_000_000_000 * 100;
</script>

<Dashboard title="Mining">
	<NumberGroup>
		<NumberWidget units="TH/s" desc="Hash rate">
			{hash_rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
		</NumberWidget>
		<NumberWidget units="PH" desc="Difficulty">
			{(difficulty / 1e15).toLocaleString(undefined, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			})}
		</NumberWidget>
		<NumberWidget units="/day" desc="Number of blocks">
			{data.blocks.toLocaleString()}
		</NumberWidget>
		<NumberWidget units="s" desc="Block time">
			{block_time.toFixed(0)}
		</NumberWidget>
	</NumberGroup>
	<!-- <Widget title="Revenue">Total vs fees revenue over last 24h</Widget> -->
	<Widget title="Hash Rate">
		<HashRateChart ts={data.hash_rate.ts} hps={data.hash_rate.hps} />
	</Widget>
	<Widget title="Miner distribution">
		<TableWidget template="max-content minmax(max-content, 1fr) minmax(max-content, 1fr)">
			<TableWidgetHeader>
				<TableWidgetCell right={true}>#</TableWidgetCell>
				<TableWidgetCell>Miner</TableWidgetCell>
				<TableWidgetCell right={true}>Percent</TableWidgetCell>
			</TableWidgetHeader>
			{#each miner_dist as m, i}
				<TableWidgetRow>
					<TableWidgetCell right={true}>
						{i + 1}
					</TableWidgetCell>
					<TableWidgetCell>
						<span class="address">
							{m.miner.startsWith('88dh')
								? m.miner.slice(0, 2) + '...' + m.miner.slice(-8)
								: m.miner}
						</span>
					</TableWidgetCell>
					<TableWidgetCell right={true}>
						{Number(m.prc).toFixed(2)}
					</TableWidgetCell>
				</TableWidgetRow>
			{/each}
		</TableWidget>
	</Widget>
	<Widget title="Normalized mining rewards">chart</Widget>
</Dashboard>
