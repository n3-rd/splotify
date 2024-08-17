<script lang="ts">
	import Track from '$lib/components/layout/track.svelte';
	import { getDominantColorFromURL } from '$lib/utils/colors';
	import { onMount } from 'svelte';

	export let data;
	console.log('alsata', data);
	const playlist = data.playlistInfo;
	const coverImage = data.playlistCover[0]?.url;
	const tracks = playlist.tracks.items;
	const tracksCount = playlist.tracks.total;

	console.log('Playlist data:', data);

	let dominantColor = '';

	async function calculateDominantColor() {
		if (coverImage) {
			try {
				dominantColor = await getDominantColorFromURL(coverImage);
				console.log('Dominant Color:', dominantColor);
			} catch (error) {
				console.error('Error calculating dominant color:', error);
				dominantColor = '#000000'; // Fallback color
			}
		}
	}

	onMount(calculateDominantColor);
</script>

<main class="min-h-screen w-full bg-black text-white">
	{#if dominantColor}
		<div class="relative">
			<div
				class="absolute inset-0 z-0"
				style="background: linear-gradient(180deg, {dominantColor} 0%, rgba(0,0,0,0.8) 100%);"
			></div>
			<div class="relative z-10 px-6 py-8">
				<div class="mb-8 flex items-end gap-6">
					{#if coverImage}
						<img class="h-64 w-64 object-cover shadow-lg" src={coverImage} alt={playlist.name} />
					{/if}
					<div class="flex flex-col gap-2">
						<p class="text-sm uppercase tracking-wider">Playlist</p>
						<h1 class="text-5xl font-bold tracking-tight">{playlist.name}</h1>
						<p class="text-sm opacity-80">{tracksCount} tracks</p>
					</div>
				</div>
				<div class="space-y-2">
					{#each tracks as track}
						<Track track={track.track} />
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="flex h-screen items-center justify-center">
			<div class="animate-pulse text-xl">Loading playlist...</div>
		</div>
	{/if}
</main>
