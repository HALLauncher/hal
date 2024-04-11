<script lang="ts">
	export let label = "";
	export let checked = false;
</script>

<label class="container">
	<input type="checkbox" bind:checked={checked} on:change />
	<span class="checkmark"/>
	{#if label}
		<span class="label">{label}</span>
	{/if}
</label>

<style>
	.label {
		font-weight: 400;
		font-size: 20px;
	}

	.container {
		display: flex;
		justify-content: left;
		align-items: center;
		cursor: pointer;
		user-select: none;
	}

	.container input {
		display: none;
	}

	.checkmark {
		height: 30px;
		width: 30px;
		background: #4e4e4e;
		border-radius: 5px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0px 7px 0px 0px;
		
		transition: .2s;

		font-family: 'hal-icons';
		--check-char: "\F803";
	}

	.container:hover input ~ .checkmark {
		background: #3A3A3A;
	}

	.container:active input ~ .checkmark {
		transform: scale(0.95);
	}

	.container input:checked ~ .checkmark:after {
		content: var(--check-char);
		color: #D9D9D9;
	}

	.checkmark:after {
		content: var(--check-char);
	}

	.container .checkmark:after {
		content: "";
	}
</style>
