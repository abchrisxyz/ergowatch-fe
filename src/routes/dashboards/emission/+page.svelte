<script>
	import Dashboard from '../Dashboard.svelte';
	import Widget from '../Widget.svelte';
	import NumberWidget from '../NumberWidget.svelte';
	import NumberGroup from '../NumberGroup.svelte';

	import Nano from '$lib/Nano.svelte';

	const _emitted = 73.4;
	const _next_reduction = 17.2;
	const _block_reward = 36_000_000_000;
	const _circulating = 69_837_734_000_000_000;
</script>

<Dashboard title="Emission">
	<NumberGroup>
		<NumberWidget units="%" desc="Supply in circulation">
			{_emitted}
		</NumberWidget>
		<NumberWidget units="" desc="Current block reward">
			<Nano amount={_block_reward} decimals={0} />
		</NumberWidget>
		<NumberWidget units="days" desc="Next reward reduction">
			{_next_reduction}
		</NumberWidget>
		<NumberWidget units="" desc="Circulating supply">
			<Nano amount={_circulating} decimals={0} />
		</NumberWidget>
	</NumberGroup>
	<Widget title="Emission Chart">A table showing emission schedule</Widget>
	<Widget title="Emission Schedule">A table showing emission schedule</Widget>
</Dashboard>

<style>
</style>
