<script>
	import {
		IconArrowsShuffle,
		IconHeart,
		IconLibrary,
		IconPlayerPlayFilled,
		IconPlayerSkipBackFilled,
		IconPlayerSkipForwardFilled,
		IconRepeat,
		IconVolume
	} from '@tabler/icons-svelte';
	import { Slider } from '$lib/components/ui/slider';
	import { convertMilliseconds } from '$lib/utils/timer';

	export let data;

	$: playerMeta = data?.item ?? {};
	$: progress = data?.progress_ms ?? 0;

	console.log('player data', data);
</script>

<div
	class="miniplayer fixed inset-x-0 bottom-0 flex h-24 items-center justify-between border-t border-gray-200 bg-background px-9 py-5 shadow-lg"
>
	<!-- Player Meta -->
	<div class="player__meta flex items-center gap-4">
		<img
			class="meta__cover h-16 w-16 rounded-md object-cover"
			src={playerMeta.album?.images[2]?.url}
			alt="album cover"
		/>
		<div class="meta__info flex flex-col">
			<p class="info__title text-sm font-semibold">{playerMeta.name ?? 'No track'}</p>
			<p class="info__artist text-xs text-gray-500">
				{playerMeta.artists?.map((artist) => artist.name).join(', ') ?? 'Unknown artist'}
			</p>
		</div>
		<IconHeart class="h-6 w-6 cursor-pointer text-gray-500 hover:text-red-500" />
	</div>

	<!-- Player Controls -->
	<div class="player__controls flex flex-col items-center gap-3">
		<div class="controls__actions flex items-center gap-6">
			<IconArrowsShuffle
				class="h-5 w-5 cursor-pointer"
				color={playerMeta.shuffle_state ? '#1DB954' : '#B3B3B3'}
			/>
			<IconPlayerSkipBackFilled class="h-5 w-5 cursor-pointer" />
			<div
				class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-foreground"
			>
				<IconPlayerPlayFilled class="h-5 w-5 text-background" />
			</div>
			<IconPlayerSkipForwardFilled class="h-5 w-5 cursor-pointer" />
			<IconRepeat
				class="h-5 w-5 cursor-pointer"
				color={playerMeta.repeat_state === 'on' ? '#1DB954' : '#B3B3B3'}
			/>
		</div>

		<!-- Progress Bar -->
		<div class="progress flex items-center gap-3">
			<div class="time-used text-xs text-gray-500">{convertMilliseconds(progress)}</div>
			<Slider
				value={[progress]}
				max={playerMeta.duration_ms ?? 100}
				step={1}
				class="h-1 w-64 rounded-full bg-gray-300"
			/>
			<div class="time-remaining text-xs text-gray-500">
				{convertMilliseconds(playerMeta.duration_ms ?? 0)}
			</div>
		</div>
	</div>

	<!-- Volume and Options -->
	<div class="player__options flex items-center gap-6">
		<div class="volume flex items-center gap-2">
			<IconVolume class="h-5 w-5 text-gray-500" />
			<Slider value={[33]} max={100} step={1} class="h-1 w-24 rounded-full bg-gray-300" />
		</div>
		<IconLibrary class="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-900" />
	</div>
</div>

<style>
	.miniplayer {
		backdrop-filter: blur(10px);
	}
	.meta__cover {
		transition: transform 0.2s;
	}
	.meta__cover:hover {
		transform: scale(1.05);
	}
	.player__controls .controls__actions div:hover {
		background-color: #1db954;
	}
</style>
