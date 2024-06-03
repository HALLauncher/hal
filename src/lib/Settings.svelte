<script lang="ts">
	import Modal from "./Modal.svelte";
	import Checkbox from "./Checkbox.svelte";
	import Textarea from "./Textarea.svelte";
  	import Button from "./Button.svelte";
  	import { get_mods, type ModDescriptor } from "./wrapper";
  	import ModItem from "./ModItem.svelte";
  import { emit, listen } from "@tauri-apps/api/event";

	enum SettingsPage {
		Modpack,
		Mods,
		GameSettings,
	}

	export let args = "";
	export let checkArgs = "";

	let page = SettingsPage.GameSettings;
	let mods: ModDescriptor[] | null = null;
	let filter = "";

	get_mods().then(x => x && x.forEach(y => {
		!mods && (mods = []);
		mods.push(y);
	}));



	// const test = async () => {
	// 	await emit("need-wokrshop-item", 3255417215);


	// };

	let debug = checkArgs.includes("-debug");
	$: {
		checkArgs = checkArgs.replace(/-debug/g, "");
		if (debug) checkArgs += " -debug";
	}
</script>

<Modal on:close>
	<div class="header">
		<div class="pages">
			<Button content="Modpack" on:click={() => (page = SettingsPage.Modpack)} />
			<Button content="Mods" on:click={() => (page = SettingsPage.Mods)} />
			<Button content="Game settings" on:click={() => (page = SettingsPage.GameSettings)} />
		</div>
	</div>
	<div class="content">
		{#if page === SettingsPage.GameSettings}
			<Checkbox label="Scratch balls" checked />
			<Checkbox label="Eat rocks" checked />
			<Checkbox label="Nill kiggers" />
			<Checkbox label="Debug" bind:checked={debug} />
			<Textarea label="Launch arguments" bind:text={args} bind:additional={checkArgs} />
		{:else if page === SettingsPage.Mods}
			{#if mods}
				<div class="filter"><Textarea bind:text={filter} /></div>
				{#each mods.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) as mod}
					<ModItem {mod} />
				{/each}
			{:else}
				<p>Loading...</p>
			{/if}
		{:else if page === SettingsPage.Modpack}
			<p>Modpacks</p>
		{/if}
	</div>
</Modal>

<style>
	.content {
		display: flex;
		flex-direction: column;
		height: 95%;
		gap: 15px;
		overflow: scroll;
    	overflow-x: hidden;
	}

	.content::-webkit-scrollbar {
		display: none;
	}

	.filter {
		height: 25px;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 15px;
	}

	.pages {
		display: flex;
		gap: 15px;
	}
</style>
