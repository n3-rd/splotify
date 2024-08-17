<script lang="ts">
	import { onMount } from 'svelte';
	import Carousel from 'svelte-carousel';
	export let artistsData;

	onMount(() => {
		let carouselContent = document.querySelectorAll('.sc-carousel__content-container')[2];
		console.log(carouselContent);
		carouselContent.style.height = '100%';
	});
</script>

<Carousel autoplay autoplayDuration={2000} arrows={false} dots={false} class="text-7xl">
	{#each artistsData as artist, index}
		<div
			class="relative h-full w-full rounded-2xl bg-cover bg-center shadow-lg"
			style={`background-image: url(${artist.images[0].url})`}
		>
			<div
				class="absolute inset-x-0 bottom-0 flex h-full items-end rounded-b-2xl bg-gradient-to-b from-transparent to-black p-4"
			>
				<div class="flex flex-col gap-4">
					<div class="flex flex-col">
						<div class="line-clamp-2 font-semibold text-white">
							{artist.name}
						</div>
					</div>
					<p class="text-3xl font-bold text-white">#{index + 1} Top artist</p>
				</div>
			</div>
		</div>
	{/each}
</Carousel>

<style>
	.sc-carousel__content-container .svelte-uwo0yk {
		height: 100% !important;
		width: 100% !important;
	}
</style>
