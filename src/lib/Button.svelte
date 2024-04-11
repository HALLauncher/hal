<script lang="ts">
	export let content = "";
	export let icon = "";

	let x = 0,
		y = 0;

	function mouseMove(e: MouseEvent) {
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		x = e.clientX - rect.left;
		y = e.clientY - rect.top;
	}
</script>

<button
	class:icon-only={content.length === 0}
	style:--x={x + "px"}
	style:--y={y + "px"}
	on:mousemove={mouseMove}
	on:click
	>
	{#if icon.length > 0}
		<i class={icon}></i>
	{/if}
	{content}
</button>

<style>
	button {
		--btn-color: rgba(68, 68, 68, 0.5);

		border: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 10px;

		flex-grow: 1;
		padding: 5px 10px;
		position: relative;

		background: var(--btn-color);
		background-image: none;
		backdrop-filter: blur(2px);
		border-radius: 5px;

		color: #fff;

		font-family: "Uwuntu", sans-serif;
		font-weight: 400;
		font-size: 22px;
		line-height: 25px;

		height: 35px;
		min-width: 35px;

		transition: .2s;
	}

	button.icon-only {
		flex-grow: 0;
		padding: 5px;
	}

	button::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: radial-gradient(
			circle at var(--x) var(--y),
			rgba(255, 255, 255, 0.2),
			var(--btn-color)
		);
		border-radius: inherit;
		transition: opacity .2s;
		opacity: 0;
		z-index: -1;
	}

	button:hover::before {
		opacity: 1;
	}

	button:active {
		transform: scale(0.98);
	}
</style>
