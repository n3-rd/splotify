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
</script>

<div
	class="miniplayer fixed inset-x-0 bottom-0 flex h-24 min-w-full items-center justify-between border-t border-black-100 bg-background px-9 py-5"
>
	<div class="player__meta flex h-full w-[20%] items-center justify-center gap-7">
		<img
			class="meta__cover h-20 w-20 rounded-md"
			src="https://i.scdn.co/image/ab67616d00001e02193c2fafdce8f116b5ca0a78"
			alt="album cover"
		/>
		<div class="meta__info flex flex-col gap-1">
			<p class="info__title text-lg font-medium">Song Title</p>
			<p class="info__artist text-gray-100">Artist Name</p>
		</div>

		<div class="meta-like">
			<IconHeart class="h-7 w-7 " />
		</div>
	</div>
	<div class="player__controls mx-auto flex w-[70%] items-center justify-around gap-14">
		<div class="controls__actions flex w-full items-center justify-center gap-10">
			<div class="buttons flex items-center justify-center gap-6 p-2">
				<IconPlayerSkipBackFilled class="h-6 w-7" />
				<div class="flex h-14 w-14 items-center justify-center rounded-full bg-foreground">
					<IconPlayerPlayFilled class="h-6 w-7 text-background" />
				</div>
				<IconPlayerSkipForwardFilled class="h-6 w-7" />
			</div>
			<div class="progress flex items-center justify-center gap-4">
				<div class="time-used">1:50</div>
				<Slider
					value={[33]}
					max={100}
					step={1}
					class="h-2 min-w-64 rounded-[20px] bg-black-100 accent-green"
				/>
				<div class="time-remaining">3:03</div>
			</div>
			<div class="volume flex items-center justify-center gap-2">
				<IconVolume class="h-6 w-6" />
				<Slider
					value={[33]}
					max={100}
					step={1}
					class="h-2 w-32 rounded-[20px] bg-black-100 accent-green"
				/>
			</div>
		</div>
	</div>
	<div class="player__options mx-auto flex w-[10%] items-center justify-center gap-10">
		<IconRepeat class="h-6 w-6" />
		<IconArrowsShuffle class="h-6 w-6" />
		<IconLibrary class="h-6 w-6" />
	</div>
</div>
