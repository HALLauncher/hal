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
	let mods: ModDescriptor[] = [];
	let filter = "";

	let modPromise = window.__TAURI__ ? get_mods() : Array(10).fill({ name: "Placeholder", remote_file_id: "dQw4w9WgXcQ" } as ModDescriptor)



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
	<div class="container">
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
				{#await modPromise}
					<p>Loading...</p>
				{:then mods}
					<Textarea bind:text={filter} />
					{#each mods.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) as mod}
						<ModItem {mod} />
					{/each}
				{/await}
			{:else if page === SettingsPage.Modpack}
				<p>Modpacks</p>
			{/if}
		</div>
	</div>
</Modal>

<style>
	.container {
		height: 100%;

		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.pages {
		display: flex;
		gap: 15px;
	}

	.content {
		display: flex;
		flex-direction: column;
		
		gap: 15px;

		overflow: scroll;
    	overflow-x: hidden;
	}

	.content::-webkit-scrollbar {
		display: none;
	}
</style>
