<script lang="ts">
	import WidgetTable from '../WidgetTable.svelte';
	import type { Service } from './+page.server';
	import { formatMilliseconds } from '$lib/utils';

	export let data: Service[];

	const knownServiceAddresses: { [key: number | string]: string } = {
		145248: '<a href="https://sigmausd.io/">sigmausd.io</a>',
		566464: '<a href="https://tokenjay.app/">tokejay.app</a>',
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
	const rowLabels = data.map((s) => knownServiceAddresses[s.address_id] ?? 'Unknown');
	const rows = data.map((s) => [
		formatNano(s.volume),
		formatNano(s.fees),
		Number(s.tx_count).toLocaleString(),
		formatMilliseconds(Number(s.first_tx)),
		formatMilliseconds(Number(s.last_tx))
	]);
</script>

<WidgetTable {columnLabels} {rowLabels} data={rows} />
