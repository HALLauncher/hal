<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from "$app/navigation";

	if ($page.status === 404)
		goto('/');
</script>