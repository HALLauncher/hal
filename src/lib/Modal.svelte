<script lang="ts">
	import { afterUpdate, createEventDispatcher } from "svelte";
	import { fade } from "svelte/transition";

	const dispatch = createEventDispatcher();

	let div: HTMLDivElement | null = null;
	afterUpdate(() => div?.focus());
</script>

<div
	class="modal-background"
	transition:fade={{ duration: 100 }}

	role="button"
	tabindex="0"

	on:click|self={() => dispatch("close")}
	on:keydown={e => e.key === "Escape" && dispatch("close")}
	bind:this={div}
	>
	<span>Tap ESC to close this window</span>
	<div class="content">
		<slot/>
	</div>
</div>

<style>
	.modal-background {
		position: absolute;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		
		width: 100%;
		height: 100%;
	}

	/* Yep, that is button */
	.modal-background:focus {
		outline: none;
	}

	span {
		pointer-events: none;
		font-size: 12px;
		color: #e0e0e0e0;
		font-weight: 400;
		font-family: 'Uwuntu';
	}

	.content {
		background: #1f1f1fcc;
		backdrop-filter: blur(7.5px);
		border-radius: 5px;

		padding: 20px;
		
		width: calc(100% - 140px);
		height: calc(100% - 140px);
	}
</style>