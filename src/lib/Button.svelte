<script lang="ts">
	export let content = "";
	export let icon = "";
</script>

<button class={content.length == 0 ? "icon-only" : ""}>
	{#if icon.length > 0}
		<i class={icon}></i>
	{/if}
	{content}
</button>

<style>
	button {
    	border: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		flex-grow: 1;
		padding: 5px 10px;

		background: rgba(68, 68, 68, 0.5);
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
	
		/* transition: .3s; */
		outline: 2px solid transparent;
		transition: outline-color 0.2s ease;
		transition: .15s;
	}

	button.icon-only {
		flex-grow: 0;
		padding: 5px;
	}
	
	button:active {
		background: #fff;
		color: #000;
		transition: .15s;
	}

	button:hover {
		outline-color: #fff;
	}

</style>
