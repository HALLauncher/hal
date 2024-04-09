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
	on:keydown={(e) => e.key === "Escape" && dispatch("close")}
	bind:this={div}
	>
	<span>Press ESC to close this modal</span>
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
		font-size: 12pt;
		color: #E0E0E0;
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