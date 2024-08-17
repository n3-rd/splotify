<script lang="ts">
	import { convertMilliseconds } from '$lib/utils/timer';
	import { IconHeartFilled } from '@tabler/icons-svelte';
	import Explicit from '@tabler/icons-svelte/icons/explicit';
	import { MoreVertical } from 'lucide-svelte';
	export let track;
</script>

{#if track}
	<div class="track flex min-w-full cursor-pointer justify-between rounded-xl p-2 hover:bg-accent">
		<div class="track__song flex w-[70%] gap-5">
			{#if track.album}
				<img src={track.album.images[2].url} class="song__album-art h-14 w-14 rounded-xl" alt="" />
			{/if}
			<div class="song__meta flex flex-col">
				<div class="meta__name line-clamp-1 text-lg font-bold">{track.name}</div>
				<div
					class="meta__artist line-clamp-1 flex items-center gap-1 text-base font-medium opacity-70"
				>
					{#if track.explicit}
						<Explicit size={16} />
					{/if}
					{#if track.artists.length > 1}
						{#each track.artists as artist, index}
							<span>{artist.name}{index !== track.artists.length - 1 ? ', ' : ''}</span>
						{/each}
					{:else}
						{track.artists[0].name}
					{/if}
				</div>
			</div>
		</div>
		<div class="track__info flex w-[30%] items-center justify-end gap-5">
			<div class="info__time text-base font-medium opacity-70">
				{convertMilliseconds(track.duration_ms)}
			</div>
			<div class="info__options flex items-center gap-5">
				<!-- <IconHeartFilled size={24} stroke={1} /> -->
				<MoreVertical size={24} />
			</div>
		</div>
	</div>
{/if}
