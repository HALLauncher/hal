<script lang="ts">
	import "./static/icons/css/hal.css";
	import "./static/Ubuntu.css"
	import "./static/UbuntuMono.css"

	import hoi_logo from "/images/hoi4.png";
	import ogo from "/images/Ого.svg";

	import Menu from "./lib/Menu.svelte";
	import Footer from "./lib/Footer.svelte";
	import { start_game, sync_with_paradox, update_mods } from "./wrapper";

	let status = "Loading...";
	let version = "14.8.8";
	let hash = "1488";

	let promise = sync_with_paradox()
		.then(() => (status = "Updating mods..."))
		.then(update_mods)
		.then(() => (status = "Done!"));
	
	// let promise = new Promise<void>(res => res());
</script>

<main>
	{#await promise then}
		<img src={hoi_logo} alt="hoi4" />
	{:catch}
		<img src={ogo} alt="ogo" />
	{/await}

	{#await promise}
		<span class="status">{status}</span>
	{:then}
		<span class="version">HEARTS OF IRON IV VERSION {version} ({hash})</span>
		<Menu />
	{:catch error}
		<span class="status errored">Fatal error occurred</span>
		<span class="error">{error}</span>
	{/await}
</main>

<Footer />

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

		text-align: center;
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
