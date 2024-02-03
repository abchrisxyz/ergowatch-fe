<script lang="ts">
	import Dashboard from '../Dashboard.svelte';
	import Widget from '../Widget.svelte';
	import NumberWidget from '../NumberWidget.svelte';
	import NumberGroup from '../NumberGroup.svelte';
	import Nano from '$lib/Nano.svelte';
	import EmissionChart from './EmissionChart.svelte';
	import { emissionAt } from './emission';

	export let data;

	const current_height = data.heights.at(-1) ?? 0;
	const current_timestamp = data.timestamps.at(-1) ?? 0;
	const total_supply = 97739925;
	// [originalCS, currentRate, reserved, modifiedCS, reserveInRate, newRate]
	const at_current_height = emissionAt(current_height);
	const circulating = at_current_height[3];
	const block_reward = at_current_height[5];
	const emitted = (circulating / total_supply) * 100;

	const fixed_rate_period = 525600;
	const epoch_length = 64800;
	// const epoch = Math.trunc((current_height - fixed_rate_period) / epoch_length) + 1;
	const blocks_remaining = epoch_length - ((current_height - fixed_rate_period) % epoch_length);
	const next_reduction = (blocks_remaining * 120) / 86400;

	const range = (start: number, end: number, step = 1) => {
		let output = [];
		if (typeof end === 'undefined') {
			end = start;
			start = 0;
		}
		for (let i = start; i < end; i += step) {
			output.push(i);
		}
		return output;
	};

	function generate_future_series(current_height: number, current_timestamp: number) {
		const weekly_blocks = 720 * 7;
		const block_time_ms = 120000;

		const first_future_h = Math.ceil(current_height / weekly_blocks) * weekly_blocks;
		// const end_height = 7000000 - 348000;
		const end_height = 7000000 - 300000;

		const first_future_t = current_timestamp + (first_future_h - current_height) * block_time_ms;
		const end_timestamp = first_future_t + (end_height - first_future_h) * block_time_ms;

		const heights = range(first_future_h, end_height, weekly_blocks);
		const timestamps = range(first_future_t, end_timestamp, weekly_blocks * block_time_ms);

		return [heights, timestamps];
	}

	const [future_heights, future_timestamps] = generate_future_series(
		current_height,
		current_timestamp
	);

	const timestamps = [...data.timestamps, ...future_timestamps];
	const heights = [...data.heights, ...future_heights];
	const series = [
		timestamps,
		heights.map((h) => emissionAt(h)[3]),
		heights.map((h) => emissionAt(h)[5])
	];
</script>

<Dashboard title="Emission">
	<NumberGroup>
		<NumberWidget units="" desc="Circulating supply">
			&Sigma; {circulating.toLocaleString()}
		</NumberWidget>
		<NumberWidget units="%" desc="Supply in circulation">
			{emitted.toLocaleString(undefined, { maximumFractionDigits: 2 })}
		</NumberWidget>
		<NumberWidget units="" desc="Current block reward">
			&Sigma; {block_reward}
		</NumberWidget>
		<NumberWidget units="days" desc="Next reward reduction">
			~{next_reduction.toLocaleString(undefined, { maximumFractionDigits: 1 })}
		</NumberWidget>
	</NumberGroup>
	<Widget title="Emission Chart">
		<EmissionChart {series} {current_timestamp} />
	</Widget>
</Dashboard>
