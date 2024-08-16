<script>
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
	console.log(data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button href="login">Login</Button>
