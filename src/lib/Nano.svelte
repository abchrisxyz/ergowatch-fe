<script lang="ts">
	export let amount: number;
	export let decimals: number = 2;
</script>

<div>
	&Sigma; {(amount / 10 ** 9).toLocaleString(undefined, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	})}
</div>
