<script lang="ts">
	export let label = "";
	export let text = "";
	export let additional = "";

	let input: HTMLSpanElement;

	function focusToEnd() {
		input.focus();
		
		const selection = document.getSelection();
		if (!selection) return;

		selection.removeAllRanges();

		const range = document.createRange();
		range.selectNodeContents(input);
		range.collapse(false);
		
		selection.addRange(range);
	}
</script>

<span class="label">{label}</span>
<div class="container"
	role="button"
	tabindex="0"
	on:click|self={focusToEnd}
	on:keydown={() => null}
	>
	<span
		class="input"
		role="textbox"
		contenteditable
		bind:this={input}
		bind:textContent={text}
		on:input={() => input.focus()}
	/>
	<span class="additional">{additional}</span>
</div>

<style>
	.label {
		font-weight: 400;
		font-size: 20px;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 5px;

		background: #3a3a3ae0;
		border-radius: 5px;
		padding: 5px 8px;
		font-size: 16px;
		font-family: "Uwuntu Mono", monospace;
	}

	span.input:focus, .container:focus {
		/* outline: 1px solid #ffffff6f; */
		outline: none;
	}
	span.input {
		color: #e0e0e0;
	}
	span.additional {
		color: #8f8f8f;
		pointer-events: none;
	}
</style>
