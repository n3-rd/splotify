<script lang="ts">
	import Track from '$lib/components/layout/track.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getDominantColorFromURL } from '$lib/utils/colors';
	import { IconBrandSpotifyFilled } from '@tabler/icons-svelte';

	export let data;

	const tracks = createQuery({
		queryKey: ['tracks'],
		queryFn: () => Promise.resolve(data.playlistInfo.tracks.items),
		initialData: data.playlistInfo.tracks.items
	});

	const playlist = createQuery({
		queryKey: ['playlist'],
		queryFn: () => Promise.resolve(data.playlistInfo),
		initialData: data.playlistInfo
	});

	// const playlist = data.playlistInfo;
	const playlistCover = data.playlistCover[0].url;
	// const tracks = playlist.tracks.items;
	const tracksCount = $playlist.data.tracks.total;

	let playlistColor = ''; // Initialize with an empty string

	async function dominantColor(imageURL) {
		try {
			const color = await getDominantColorFromURL(imageURL);
			return color;
		} catch (error) {
			console.error('Error:', error.message);
			return ''; // Return an empty string in case of error
		}
	}

	$: (async () => {
		const color = await dominantColor(playlistCover);
		if (color) {
			playlistColor = color;
			console.log('Dominant Color:', playlistColor);
		}
	})();
</script>

<main>
	{#if $playlist.isLoading}
		<div class="flex min-h-screen w-full items-center justify-center">
			<IconBrandSpotifyFilled class="h-16 w-16 animate-spin" />
		</div>
	{:else if $playlist.isError}
		<p>Error: {$playlist.error.message}</p>
	{:else if $playlist.isSuccess}
		<div
			class="min-h-screen w-full"
			style={`background: linear-gradient(180deg, ${playlistColor} 40%, ${playlistColor}20 70%,  100%)`}
		>
			<div class="flex h-[40%] w-full flex-col gap-8 p-8 md:flex-row md:items-end md:pl-12">
				<img
					class="h-64 w-64 rounded-lg object-cover object-center shadow-lg md:h-72 md:w-72"
					src={playlistCover}
					alt={$playlist.data.name}
				/>
				<div class="flex flex-col gap-2 md:gap-3">
					<p class="text-sm uppercase tracking-wide md:text-lg">Playlist</p>
					<h1 class="text-4xl font-bold tracking-tight md:text-7xl">{$playlist.data.name}</h1>
					<p class="text-sm md:text-lg">{tracksCount} tracks</p>
				</div>
			</div>

			<div class="rounded-t-xl bg-white/80 px-4 py-6 dark:bg-black/80 md:px-8 lg:px-12">
				{#each $tracks.data as track}
					<Track track={track.track} />
				{/each}
			</div>
		</div>
	{/if}
</main>
