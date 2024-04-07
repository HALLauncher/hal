<script lang="ts">
	import Button from "./Button.svelte";
</script>

<div class="menu">
	<div class="flex">
		<Button content="Launch"/>
		<Button icon="hal-settings" />
	</div>
	<Button content="Dropdown placeholder" icon="hal-ok" />
</div>

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
