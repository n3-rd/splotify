<script lang="ts">
	import Track from '$lib/components/layout/track.svelte';
	import { getDominantColorFromURL } from '$lib/utils/colors';
	import { IconBrandSpotifyFilled } from '@tabler/icons-svelte';
	import { createQuery } from '@tanstack/svelte-query';

	export let data;

	const album = createQuery({
		queryKey: ['album'],
		queryFn: () => Promise.resolve(data.albumInfo),
		initialData: data.albumInfo
	});
	const artist = createQuery({
		queryKey: ['artist with query'],
		queryFn: () => Promise.resolve(data.artistInfo),
		initialData: data.artistInfo
	});

	const albumCover = data.albumInfo.images[1].url;
	const tracksCount = $album.data.total_tracks;

	let albumColor = ''; // Initialize with an empty string

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
		const color = await dominantColor(albumCover);
		if (color) {
			albumColor = color;
		}
	})();
</script>

<main>
	{#if $album.isLoading}
		<div class="flex min-h-screen w-full items-center justify-center">
			<IconBrandSpotifyFilled class="h-16 w-16 animate-spin" />
		</div>
	{:else if $album.isError}
		<p>Error: {$album.error.message}</p>
	{:else if $album.isSuccess}
		<div class="min-h-screen w-full">
			<div
				class="flex h-[40%] w-full flex-col gap-8 p-8 md:flex-row md:items-end md:pl-12"
				style={`background-color: ${albumColor}80`}
			>
				<img
					class="h-64 w-64 rounded-lg object-cover object-center shadow-lg md:h-72 md:w-72"
					src={albumCover}
					alt={$album.data.name}
				/>
				<div class="flex flex-col gap-2 md:gap-3">
					<p class="text-sm uppercase tracking-wide md:text-lg">{$album.data.album_type}</p>
					<h1 class="text-4xl font-bold tracking-tight md:text-7xl">{$album.data.name}</h1>
					<div class="flex items-center gap-2">
						<div class="flex items-center gap-2">
							<img
								src={$artist.data.images[1].url}
								alt={$artist.data.name}
								class="h-7 w-7 rounded-full"
							/>
							<span class="text-sm md:text-lg">{$artist.data.name}</span>
						</div>
						<div class="h-2 w-2 rounded-full bg-foreground"></div>
						<p class="text-sm md:text-lg">{tracksCount} tracks</p>
					</div>
				</div>
			</div>

			<div class="rounded-t-xl px-4 py-6 md:px-8 lg:px-12">
				{#each $album.data.tracks.items as track}
					<Track {track} />
					<!-- {console.log(track)} -->
				{/each}
			</div>
		</div>
	{/if}
</main>
