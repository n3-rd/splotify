<script>
	import AlbumCarousel from '$lib/components/layout/album-carousel.svelte';
	import PlaylistCarousel from '$lib/components/layout/playlist-carousel.svelte';
	import Track from '$lib/components/layout/track.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { IconHeartFilled } from '@tabler/icons-svelte';
	import { convertMilliseconds } from '$lib/utils/timer';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index';
	import TopArtistsCarousel from '$lib/components/layout/top-artists-carousel.svelte';
	import { calculateAverages, objectsToCommas } from '$lib/utils';
	import AudioAnalysis from '$lib/components/layout/audio-analysis.svelte';
	export let data;
	let forYou = data.forYou.playlists.items;
	let userAlbums = data.userAlbums.items;
	let onRepeat = data.onRepeat.items;
	let topArtists = data.topArtists.items;
	let onRepeatIds = data.onRepeatIds;
	let audioAnalysis = calculateAverages(data.topAudioAnalysis.audio_features);
	console.log('audioAnalysis', audioAnalysis);
	console.log(onRepeatIds);
	console.log(data);
</script>

<PlaylistCarousel playlistData={forYou} playlistTitle={data.forYou.message} />
<AlbumCarousel albumData={userAlbums} albumTitle="Your albums" />

<div class="grid min-w-full grid-cols-3 gap-4 py-4">
	<div class="flex max-h-[28rem] w-full flex-col gap-4 overflow-hidden">
		<div class="text-2xl font-bold leading-snug">Your top tracks</div>
		<ScrollArea>
			<div class="flex h-full flex-col gap-4">
				{#each onRepeat as track}
					<Track {track} />
				{/each}
			</div>
		</ScrollArea>
	</div>
	<div class="h-full w-full rounded-2xl [&>*]:h-full [&>*]:w-full">
		<TopArtistsCarousel artistsData={topArtists} />
	</div>
	<div class="w-full">
		<div class="text-2xl font-bold leading-snug">Audio analysis</div>
		<ScrollArea>
			<AudioAnalysis {audioAnalysis} />
		</ScrollArea>
	</div>
</div>

<Button href="login">Login</Button>
