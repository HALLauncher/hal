<script lang="ts">
	import paradox from "../static/images/paradox.svg";
	import lemi from "../static/images/lemi.svg";
</script>

<footer>
	<img src={paradox} alt="paradox" />
	<img src={lemi} alt="lemi" />
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;

		padding: 15px;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
</style>
