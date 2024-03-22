<script lang="ts">
	import Dashboard from '../Dashboard.svelte';
	import NumberWidget from '../NumberWidget.svelte';
	import NumberGroup from '../NumberGroup.svelte';
	import Nano from '$lib/Nano.svelte';
	import Widget from '../Widget.svelte';
	import ParameterChart from './ParameterChart.svelte';
	import TableWidget from '../TableWidget.svelte';
	import TableWidgetRow from '../TableWidgetRow.svelte';
	import TableWidgetHeader from '../TableWidgetHeader.svelte';
	import TableWidgetCell from '../TableWidgetCell.svelte';
	import type { Proposal } from './+page.server';

	const vote_descriptions: string[] = [];
	vote_descriptions[1] = 'storage fee';
	vote_descriptions[2] = 'minimum box value';
	vote_descriptions[3] = 'maximum box size';
	vote_descriptions[4] = 'maximum computational cost';
	vote_descriptions[5] = 'token access cost';
	vote_descriptions[6] = 'cost per input';
	vote_descriptions[7] = 'cost per data-input';
	vote_descriptions[8] = 'cost per output';

	function describe_vote(vote: number): string {
		const abs_vote = Math.abs(vote);
		if (!(abs_vote in vote_descriptions)) {
			return vote.toString();
		}
		const desc: string = vote_descriptions[abs_vote];
		const prefix = vote > 0 ? 'Increase' : 'Decrease';
		return `${prefix} ${desc} (${vote})`;
	}

	function expand_proposal(proposal: Proposal, current_epoch_height: number) {
		const total_votes = 1023;
		let proposals = [];
		if (proposal.height == current_epoch_height) {
			for (let i of [2, 1, 0]) {
				if (proposal.slots[i] != 0) {
					proposals.push({
						epoch: proposal.epoch,
						height: proposal.height,
						desc: describe_vote(proposal.slots[i]),
						miner: proposal.miner,
						status: 'open',
						tally_yes: proposal.tallies[i],
						tally_no: total_votes - proposal.tallies[i]
					});
				}
			}
		} else {
			for (let i of [2, 1, 0]) {
				if (proposal.slots[i] != 0) {
					const tally_yes = proposal.tallies[i];
					const tally_no = total_votes - tally_yes;
					proposals.push({
						epoch: proposal.epoch,
						height: proposal.height,
						desc: describe_vote(proposal.slots[i]),
						miner: proposal.miner,
						status: tally_yes > tally_no ? 'accepted' : 'rejected',
						tally_yes,
						tally_no
					});
				}
			}
		}
		return proposals;
	}

	export let data;
	$: param_series = data.parameters;
	// $: tx_stats = data.transaction_stats;
	$: current_epoch_height = param_series.heights.slice(-1)[0];
	$: current_epoch = current_epoch_height / 1024;
	$: blocks_left_in_epoch = 1023 - (data.height % 1024);
	$: ongoing_proposals =
		data.latest_proposals[0].epoch == current_epoch
			? data.latest_proposals[0].slots.filter((v) => v != 0).length
			: 0;
	$: latest_proposals = data.latest_proposals
		.map((p) => expand_proposal(p, current_epoch_height))
		.flat();
</script>

<Dashboard title="Network">
	<NumberGroup>
		<NumberWidget units="" desc="Current epoch">{current_epoch.toLocaleString()}</NumberWidget>
		<NumberWidget units="" desc="Ongoing proposals">{ongoing_proposals}</NumberWidget>

		<NumberWidget units="" desc="Blocks left in epoch">
			{blocks_left_in_epoch.toLocaleString()}
		</NumberWidget>
	</NumberGroup>

	<Widget title="Latest proposals">
		<!-- <TableWidget template="repeat(2, min-content) repeat(5, minmax(max-content, 1fr)"> -->
		<TableWidget
			template="minmax(max-content, 1fr) minmax(max-content, 1fr) repeat(5, minmax(max-content, 2fr)"
		>
			<TableWidgetHeader>
				<TableWidgetCell>Epoch</TableWidgetCell>
				<TableWidgetCell>Height</TableWidgetCell>
				<TableWidgetCell>Miner / Pool</TableWidgetCell>
				<TableWidgetCell>Description</TableWidgetCell>
				<TableWidgetCell>Status</TableWidgetCell>
				<TableWidgetCell right={true}>Yes</TableWidgetCell>
				<TableWidgetCell right={true}>No</TableWidgetCell>
			</TableWidgetHeader>
			{#each latest_proposals as p}
				<TableWidgetRow>
					<TableWidgetCell>{p.epoch.toLocaleString()}</TableWidgetCell>
					<TableWidgetCell>{p.height.toLocaleString()}</TableWidgetCell>
					<TableWidgetCell>
						<span class="address">
							{p.miner.startsWith('88dh')
								? p.miner.slice(0, 2) + '...' + p.miner.slice(-8)
								: p.miner}
						</span>
					</TableWidgetCell>
					<TableWidgetCell>{p.desc}</TableWidgetCell>
					<TableWidgetCell>{p.status}</TableWidgetCell>
					<TableWidgetCell right={true}>{p.tally_yes}</TableWidgetCell>
					<TableWidgetCell right={true}>{p.tally_no}</TableWidgetCell>
				</TableWidgetRow>
			{/each}
		</TableWidget>
	</Widget>

	<Widget title="Network parameters">
		<div class="history-container">
			<!-- Header -->
			<div class="header">
				<div>Parameter</div>
				<div class="right">Current Value</div>
				<div class="right">Lowest</div>
				<div class="right">Highest</div>
				<div>History</div>
			</div>
			<div class="row">
				<div>Storage fee</div>
				<div class="right">
					<Nano amount={param_series.storage_fees.slice(-1)[0]} decimals={5} />
				</div>
				<div class="right">
					<Nano amount={Math.min(...param_series.storage_fees)} decimals={5} />
				</div>
				<div class="right">
					<Nano amount={Math.max(...param_series.storage_fees)} decimals={5} />
				</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.storage_fees} />
				</div>
			</div>
			<div class="row">
				<div>Minimum box value</div>
				<div class="right">
					n&Sigma; {param_series.min_box_values.slice(-1)[0].toLocaleString()}
				</div>
				<div class="right">{Math.min(...param_series.min_box_values).toLocaleString()}</div>
				<div class="right">{Math.max(...param_series.min_box_values).toLocaleString()}</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.min_box_values} />
				</div>
			</div>
			<div class="row">
				<div>Maximum block size</div>
				<div class="right">{param_series.max_block_sizes.slice(-1)[0].toLocaleString()}</div>
				<div class="right">{Math.min(...param_series.max_block_sizes).toLocaleString()}</div>
				<div class="right">{Math.max(...param_series.max_block_sizes).toLocaleString()}</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.max_block_sizes} />
				</div>
			</div>
			<div class="row">
				<div>Maximum computational cost</div>
				<div class="right">{param_series.max_costs.slice(-1)[0].toLocaleString()}</div>
				<div class="right">{Math.min(...param_series.max_costs).toLocaleString()}</div>
				<div class="right">{Math.max(...param_series.max_costs).toLocaleString()}</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.max_costs} />
				</div>
			</div>
			<div class="row">
				<div>Token access cost</div>
				<div class="right">
					n&Sigma; {param_series.token_access_costs.slice(-1)[0].toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.min(...param_series.token_access_costs).toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.max(...param_series.token_access_costs).toLocaleString()}
				</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.token_access_costs} />
				</div>
			</div>
			<div class="row">
				<div>Cost per tx input</div>
				<div class="right">
					n&Sigma; {param_series.tx_input_costs.slice(-1)[0].toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.min(...param_series.tx_input_costs).toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.max(...param_series.tx_input_costs).toLocaleString()}
				</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.tx_input_costs} />
				</div>
			</div>
			<div class="row">
				<div>Cost per tx data-input</div>
				<div class="right">
					n&Sigma; {param_series.tx_data_input_costs.slice(-1)[0].toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.min(...param_series.tx_data_input_costs).toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.max(...param_series.tx_data_input_costs).toLocaleString()}
				</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.tx_data_input_costs} />
				</div>
			</div>
			<div class="row">
				<div>Cost per tx output</div>
				<div class="right">
					n&Sigma; {param_series.tx_output_costs.slice(-1)[0].toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.min(...param_series.tx_output_costs).toLocaleString()}
				</div>
				<div class="right">
					n&Sigma; {Math.max(...param_series.tx_output_costs).toLocaleString()}
				</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.tx_output_costs} />
				</div>
			</div>
			<div class="row">
				<div>Block version</div>
				<div class="right">{param_series.block_versions.slice(-1)[0]}</div>
				<div class="right">{Math.min(...param_series.block_versions)}</div>
				<div class="right">{Math.max(...param_series.block_versions)}</div>
				<div class="chart">
					<ParameterChart xs={param_series.heights} values={param_series.block_versions} />
				</div>
			</div>
		</div>
	</Widget>

	<Widget title="Recent miner configs (last 100 blocks)">
		<TableWidget
			template="minmax(max-content, 1fr) minmax(max-content, 1fr) minmax(max-content, 1fr)"
		>
			<TableWidgetHeader>
				<TableWidgetCell>Miner / Pool</TableWidgetCell>
				<TableWidgetCell>Vote config</TableWidgetCell>
				<TableWidgetCell right={true}>Counts</TableWidgetCell>
			</TableWidgetHeader>
			{#each data.miner_configs as c}
				<TableWidgetRow>
					<TableWidgetCell>
						<span class="address">
							{c.miner.startsWith('88dh')
								? c.miner.slice(0, 2) + '...' + c.miner.slice(-8)
								: c.miner}
						</span>
					</TableWidgetCell>
					<TableWidgetCell>{c.votes}</TableWidgetCell>
					<TableWidgetCell right={true}>{c.count}</TableWidgetCell>
				</TableWidgetRow>
			{/each}
		</TableWidget>
	</Widget>
</Dashboard>

<style>
	.history-container {
		display: grid;
		grid-template-columns: max-content max-content max-content max-content minmax(200px, 1fr);
		overflow-x: auto;
		align-items: end;
	}
	.history-container .header {
		display: contents;
	}
	.history-container .right {
		text-align: right;
	}
	.history-container .header div {
		background-color: var(--surface-color-3);
	}
	.history-container .header div {
		padding: 1em 1em;
	}
	.history-container .row {
		display: contents;
	}
	.history-container .row div {
		padding: 0.5em 1em;
	}
	.address {
		font-family: monospace;
		font-size: 0.95em;
		font-weight: lighter;
	}
</style>
