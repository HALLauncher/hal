<script lang="ts">
	import Modal from "./Modal.svelte";
	import Checkbox from "./Checkbox.svelte";
	import Textarea from "./Textarea.svelte";
  	import Button from "./Button.svelte";
  	import { create_modpack, get_modpack, get_modpacks, get_mods, start_game, type ModDescriptor, type ModPack } from "./wrapper";
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

	let modPromise: ModDescriptor[] | Promise<ModDescriptor[]> = window.__TAURI__ ? get_mods() : Array(10).fill({ name: "Placeholder", remote_file_id: "dQw4w9WgXcQ" } as ModDescriptor)
	let modPackPromise: ModPack[] | Promise<ModPack[]> = window.__TAURI__ ? get_modpacks().then(async x => {
		const promises = x.map(x => get_modpack(x));
		return Promise.all(promises);
	}) : Array(10).fill({ name: "Placeholder", mods: ["dQw4w9WgXcQ"] } as ModPack);

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
				<p></p>
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
					{#each mods.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) as mod, i}
						<ModItem {mod} />
					{/each}
					<Button content="Add all mods to modpack" on:click={() => {
						create_modpack("test", mods.map(x => x.uuid)).then((uuid) => {
							console.log(uuid);
						});

					}} />
				{/await}
			{:else if page === SettingsPage.Modpack}
				{#await modPackPromise}
					<p>Loading...</p>
				{:then modpacks}
					<Textarea bind:text={filter} />
					{#each modpacks.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) as modpack, i}
						<!-- <p on:click={() => {
							start_game([], modpack.uuid).catch(e => console.error(e));
						}}>{modpack.name}</p> -->
						<button on:click={() => start_game(["-debug"], modpack.uuid)}>Start game</button>
					{/each}
				{/await}
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
