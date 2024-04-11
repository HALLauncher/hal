<script lang="ts">
	import Modal from "./Modal.svelte";
	import Checkbox from "./Checkbox.svelte";
	import Textarea from "./Textarea.svelte";

	export let args = "";
	export let checkArgs = "";

	let debug = checkArgs.includes("-debug");
	$: {
		checkArgs = checkArgs.replace(/-debug/g, "");
		if (debug) checkArgs += " -debug";
	}
</script>

<Modal on:close>
	<div class="content">
		<Checkbox label="Scratch balls" checked />
		<Checkbox label="Eat rocks" checked />
		<Checkbox label="Nill kiggers" />
		<Checkbox label="Debug" bind:checked={debug} />
		<Textarea label="Launch arguments" bind:text={args} bind:additional={checkArgs} />
	</div>
</Modal>

<style>
	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 15px;
	}
</style>
