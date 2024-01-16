<script lang="ts">
	import WidgetTable from '../WidgetTable.svelte';
	import type { Service } from './+page.server';
	import { formatMilliseconds } from '$lib/utils';

	export let data: Service[];

	const knownServiceAddresses: { [key: number | string]: string } = {
		1452481: '<a href="https://sigmausd.io/">sigmausd.io</a>',
		5664641: '<a href="https://tokenjay.app/">tokenjay.app</a>',
		null: 'Direct (no service)'
	};

	function formatNano(nano: number): string {
		let erg = nano / 10 ** 9;
		return (
			'&Sigma; ' +
			Number(erg >= 1 ? erg.toFixed(0) : erg >= 0.01 ? erg.toFixed(2) : erg).toLocaleString()
		);
	}

	// Services
	const columnLabels = ['Service', 'Volume', 'Fees', 'Transactions', 'First tx', 'Last tx'];
	const rows = data.map((s) => [
		knownServiceAddresses[s.address_id] ?? 'Unknown',
		formatNano(s.volume),
		formatNano(s.fees),
		Number(s.tx_count).toLocaleString(),
		formatMilliseconds(Number(s.first_tx)),
		formatMilliseconds(Number(s.last_tx))
	]);
</script>

<WidgetTable {columnLabels} data={rows} allowHTML={true} />
