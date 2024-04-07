<script lang="ts">
    import Modal from "./Modal.svelte";
    import Checkbox from "./Checkbox.svelte";
</script>

<Modal on:close>
	<div class="content">
        <span>123</span>
        <Checkbox text="123"/>
	</div>
</Modal>

<style>
    .content {
        display: flex;
        flex-direction: column;
    }
</style>