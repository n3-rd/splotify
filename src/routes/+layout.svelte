<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import LayoutContent from '$lib/components/layout/layout-content.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	export let data;
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<LayoutContent {data}>
		<slot />
	</LayoutContent>
</QueryClientProvider>
