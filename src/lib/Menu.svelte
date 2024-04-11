<script lang="ts">
	import Button from "./Button.svelte";
	import Settings from "./Settings.svelte";

	import { start_game } from "./wrapper";

	let show_settings = false;

	let args = "-gay -boobs=100";
	let checkArgs = "-debug";

	$: options = [...args.split(" "), ...checkArgs.split(" ")].map(x => x.trim()).filter(Boolean);
</script>

<div class="menu">
	<div class="flex">
		<Button content="Launch" on:click={() => start_game(options)}/>
		<Button icon="hal-settings" on:click={() => (show_settings = true)} />
	</div>
	<Button content="Dropdown placeholder" icon="hal-ok" />
</div>

{#if show_settings}
	<Settings
		on:close={() => (show_settings = false)}
		bind:args
		bind:checkArgs
		/>
{/if}

<style>
	.menu {
		display: flex;
		flex-direction: column;
		gap: 10px;

		padding: 10px;
	}
	.flex {
		display: flex;
		gap: 10px;
	}
</style>
