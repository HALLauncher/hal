<script lang="ts">
	import Button from "./Button.svelte";
	import Settings from "./Settings.svelte";

	let show_settings = false;
</script>

<div class="menu">
	<div class="flex">
		<Button content="Launch"/>
		<Button icon="hal-settings" on:click={() => (show_settings = true)} />
	</div>
	<Button content="Dropdown placeholder" icon="hal-ok" />
</div>

{#if show_settings}
	<Settings on:close={() => (show_settings = false)}/>
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
