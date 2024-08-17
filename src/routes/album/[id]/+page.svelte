<script lang="ts">
	import Track from '$lib/components/layout/track.svelte';
	import { getDominantColorFromURL } from '$lib/utils/colors';

	export let data;
	const album = data.albumInfo;
	const albumCover = album.images[1].url;
	const tracks = album.tracks.items;
	const tracksCount = album.total_tracks;
	const artist = data.artistInfo;
	console.log('artist', artist);

	console.log('playlist page data', data);

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
			console.log('Dominant Color:', albumColor);
		}
	})();
</script>

<main>
	{#if albumColor}
		<div class="min-h-screen w-full">
			<div
				class="flex h-[40%] w-full flex-col gap-8 p-8 md:flex-row md:items-end md:pl-12"
				style={`background-color: ${albumColor}80`}
			>
				<img
					class="h-64 w-64 rounded-lg object-cover object-center shadow-lg md:h-72 md:w-72"
					src={albumCover}
					alt={album.name}
				/>
				<div class="flex flex-col gap-2 md:gap-3">
					<p class="text-sm uppercase tracking-wide md:text-lg">{album.album_type}</p>
					<h1 class="text-4xl font-bold tracking-tight md:text-7xl">{album.name}</h1>
					<div class="flex items-center gap-2">
						<div class="flex items-center gap-2">
							<img src={artist.images[1].url} alt={artist.name} class="h-7 w-7 rounded-full" />
							<span class="text-sm md:text-lg">{artist.name}</span>
						</div>
						<div class="h-2 w-2 rounded-full bg-foreground"></div>
						<p class="text-sm md:text-lg">{tracksCount} tracks</p>
					</div>
				</div>
			</div>

			<div class="rounded-t-xl px-4 py-6 md:px-8 lg:px-12">
				{#each tracks as track}
					<Track {track} />
					<!-- {console.log(track)} -->
				{/each}
			</div>
		</div>
	{:else}
		<!-- Placeholder while the color is loading -->
		<div class="min-h-screen w-full bg-gray-200"></div>
	{/if}
</main>
