<script>
	import AlbumCarousel from '$lib/components/layout/album-carousel.svelte';
	import PlaylistCarousel from '$lib/components/layout/playlist-carousel.svelte';
	import Track from '$lib/components/layout/track.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index';
	import TopArtistsCarousel from '$lib/components/layout/top-artists-carousel.svelte';
	import { calculateAverages } from '$lib/utils';
	import AudioAnalysis from '$lib/components/layout/audio-analysis.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	export let data;

	const userAlbums = createQuery({
		queryKey: ['userAlbums'],
		queryFn: () => Promise.resolve(data.userAlbums.items),
		initialData: data.userAlbums.items
	});

	const forYou = createQuery({
		queryKey: ['forYou'],
		queryFn: () => Promise.resolve(data.forYou.playlists.items),
		initialData: data.forYou.playlists.items
	});

	const onRepeat = createQuery({
		queryKey: ['onRepeat'],
		queryFn: () => Promise.resolve(data.onRepeat.items),
		initialData: data.onRepeat.items
	});

	const topArtists = createQuery({
		queryKey: ['topArtists'],
		queryFn: () => Promise.resolve(data.topArtists.items),
		initialData: data.topArtists.items
	});

	const audioAnalysis = createQuery({
		queryKey: ['audioAnalysis'],
		queryFn: () => Promise.resolve(calculateAverages(data.topAudioAnalysis.audio_features)),
		initialData: calculateAverages(data.topAudioAnalysis.audio_features)
	});

	console.log('userAlbums', $userAlbums.data);
	console.log('forYou', $forYou.data);
	console.log('onRepeat', $onRepeat.data);
	console.log('topArtists', $topArtists.data);
	console.log('audioAnalysis', $audioAnalysis.data);
</script>

<PlaylistCarousel playlistData={$forYou.data} playlistTitle="Based on your recent listening" />
<AlbumCarousel albumData={$userAlbums.data} albumTitle="Your albums" />

<div class="grid min-w-full grid-cols-3 gap-4 py-4">
	<div class="flex max-h-[28rem] w-full flex-col gap-4 overflow-hidden">
		<div class="text-2xl font-bold leading-snug">Your top tracks</div>
		<ScrollArea>
			<div class="flex h-full flex-col gap-4">
				{#each $onRepeat.data as track}
					<Track {track} />
				{/each}
			</div>
		</ScrollArea>
	</div>
	<div class="h-full w-full rounded-2xl [&>*]:h-full [&>*]:w-full">
		<TopArtistsCarousel artistsData={$topArtists.data} />
	</div>
	<div class="w-full">
		<div class="text-2xl font-bold leading-snug">Audio analysis</div>
		<ScrollArea>
			<AudioAnalysis audioAnalysis={$audioAnalysis.data} />
		</ScrollArea>
	</div>
</div>

<Button href="login">Login</Button>
