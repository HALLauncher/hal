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

	$: gradient = `radial-gradient(circle at ${x}px ${y}px, ${x && y ? "rgba(255, 255, 255, 0.2)" : "var(--btn-color)"}, var(--btn-color))`;
</script>

<button
	class={content.length == 0 ? "icon-only" : ""}
	on:click
	on:mousemove={mouseMove}
	on:mouseleave={() => (x = y = 0)}
	style:background={gradient}
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

		flex-grow: 1;
		padding: 5px 10px;

		/* background: var(--first-color); */
		backdrop-filter: blur(2px);
		border-radius: 5px;

		color: #fff;
		
		font-family: 'Ubuntu', sans-serif;
		font-weight: 400;
		font-size: 22px;
		line-height: 25px;
		
		height: 35px;
		min-width: 35px;

		gap: 10px;
	
		border: 2px solid transparent;
		transition: .15s;
	}

	button.icon-only {
		flex-grow: 0;
		padding: 5px;
	}

	button:active {
		transform: scale(0.98);
	}
</style>
