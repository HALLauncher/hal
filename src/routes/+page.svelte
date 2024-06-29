<script lang="ts">
	import Menu from "$lib/Menu.svelte";
	import Footer from "$lib/Footer.svelte";

	import { sync_with_paradox, update_mods, update_modpacks, get_launcher_info } from "$lib/wrapper";

	let status = "Loading...";
	let version = "Loading...";

	document.onkeyup = e => {
		if (e.key == "Z") {
			if (e.shiftKey && e.altKey && e.ctrlKey) {
				window.open("https://sanceilaks.github.io/#PKyn_Msy9Bc")
			}
		}	
	};

	let promise = window.__TAURI__
		? sync_with_paradox()
			.then(get_launcher_info)
			.then(({ version: ver }) => (version = ver))
			.then(() => (status = "Updating mods..."))
			.then(update_mods)
			.then(() => (status = "Updating modpacks..."))
			.then(update_modpacks)
			.then(() => (status = "Done!"))
		: new Promise<void>(res => res());
</script>

<Footer />

<main>
	{#await promise then}
		<img src="/images/hoi4.png" alt="hoi4" />
	{:catch}
		<img src="/images/Ого.svg" alt="ogo" />
	{/await}

	{#await promise}
		<span class="status">{status}</span>
	{:then}
		<span class="version">HEARTS OF IRON IV {version}</span>
		<Menu />
	{:catch error}
		<span class="status errored">Fatal error occurred</span>
		<span class="error">{error}</span>
	{/await}
</main>

<style>
	main {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		vertical-align: middle;
		align-items: center;
		gap: 8px;
	}

	.status {
		font-weight: 500;
		font-size: 24px;
		line-height: 28px;
	}
	.status.errored {
		color: #ff4141;
	}

	.error {
		/* details */
		font-weight: 400;
		font-size: 15px;
		line-height: 17px;
	}

	.version {
		font-style: normal;
		font-weight: 500;
		font-size: 10px;
		line-height: 10px;

		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
</style>
