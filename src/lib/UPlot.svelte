<script lang="ts">
	import { onMount } from 'svelte';
	import uPlot from 'uplot';
	import 'uplot/dist/uPlot.min.css';
	import { theme } from '../routes/theme';

	export let opts: any;
	export let data: any;
	export let enabled = true;

	let ref: HTMLElement;
	let uplotHandle: uPlot;

	let width = 0;

	const defaultOpts = {
		ms: 1,
		height: 300
	};

	const gridColor = () => ($theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)');
	const defaultAxisOptions = {
		stroke: () => $theme.textColor2,
		grid: { stroke: gridColor }
	};

	const defaultSeriesOpts = {
		points: {
			fill: () => $theme.surfaceColor1
		}
	};

	// Injects defaults into user provided options
	function mergeOpts(userOpts: any) {
		let combined = { ...defaultOpts, ...userOpts };
		// Apply default grid options
		for (let ax of combined.axes) {
			ax.grid = { ...defaultAxisOptions.grid, ...ax.grid };
			ax.stroke = defaultAxisOptions.stroke;
		}
		// Apply default series point options
		for (let s of combined.series.slice(1)) {
			s.points = { ...defaultSeriesOpts.points, ...s.points };
		}
		return combined;
	}

	// Trigger redraws on theme changes
	$: if ($theme) redraw();
	function redraw() {
		// This won't update legend styles: https://github.com/leeoniya/uPlot/issues/863
		// For now, need to edit legend in dom if needed
		uplotHandle?.redraw();
	}

	// Trigger updates on data change
	function refresh(data: any) {
		if (ref === undefined) return;
		uplotHandle.setData(data, true);
	}
	$: refresh(data);

	// Handle specific opts changes
	function handle_opts_changes(opts: any) {
		if (ref === undefined) return;
		// Update y-axis labels
		uplotHandle.axes[1].label = opts.axes[1].label;
	}
	$: handle_opts_changes(opts);

	function resize() {
		if (uplotHandle.width === width) return;
		const size = { width: width, height: uplotHandle.height };
		requestAnimationFrame(() => uplotHandle.setSize(size));
	}

	onMount(() => {
		let wait = false;
		const resizeObserver = new ResizeObserver((entries) => {
			if (entries.length === 0 || entries[0].target !== ref) {
				return;
			}
			const newWidth = entries[0].contentRect.width;
			if (newWidth !== width) {
				width = newWidth;
				if (!wait) {
					wait = true;
					setTimeout(() => {
						wait = false;
						resize();
					}, 100);
				}
			}
		});
		uplotHandle = new uPlot(mergeOpts(opts), data, ref);
		resizeObserver.observe(ref);
		return () => resizeObserver.unobserve(ref);
	});
</script>

<div bind:this={ref} class:disabled={!enabled} class="ew-uplot" />

<style>
	div.disabled {
		pointer-events: none;
		opacity: 0.4;
	}
</style>
