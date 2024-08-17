<script lang="ts">
	import Carousel from 'svelte-carousel';
	export let albumData;
	export let albumTitle;
</script>

<div class="flex flex-col space-y-4">
	<div class="pl-8 text-2xl font-bold leading-snug">
		{albumTitle}
	</div>

	<div class="relative h-[250px] w-full overflow-hidden rounded-lg">
		<Carousel particlesToShow={5} particlesToScroll={1} arrows={true} autoplay>
			{#each albumData as album, index}
				<div
					class="relative mx-3 h-64 rounded-2xl bg-cover bg-center shadow-lg"
					style={`background-image: url(${album.album.images[0].url})`}
				>
					<div
						class="absolute inset-x-0 bottom-0 flex h-[40%] items-center rounded-b-2xl bg-gradient-to-b from-transparent to-black p-4"
					>
						<div class="flex items-center gap-4">
							<img src="/icons/play-fill.svg" alt="play" class="h-14 w-14" />
							<div class="flex flex-col">
								<div class="line-clamp-2 text-sm font-semibold text-white">
									{album.album.name}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</Carousel>
	</div>
</div>
