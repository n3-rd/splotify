<script lang="ts">
	import TopProfile from './top-profile.svelte';
	export let profile;
	import { Input } from '$lib/components/ui/input';
</script>

<div class="flex min-w-full items-center justify-between p-4">
	<div class="flex w-full items-center justify-start">
		<Input class="w-[80%] rounded-full px-4 py-4" placeholder="search" />
	</div>
	<TopProfile {profile} />
</div>
