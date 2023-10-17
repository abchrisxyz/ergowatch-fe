<script lang="ts">
	export let amount: number;
	export let decimals: number = 2;
</script>

<div>
	$ {amount.toLocaleString(undefined, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	})}
</div>
