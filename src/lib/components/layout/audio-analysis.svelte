<script lang="ts">
	import { convertMilliseconds } from '$lib/utils/timer';

	export let audioAnalysis;
</script>

<div class="flex flex-col gap-4 pt-2 text-3xl">
	<!-- Dancablility -->
	<span>
		<span class="font-semibold">Danceability:</span>
		<span class="text-2xl font-semibold text-green">
			{Math.round((audioAnalysis.danceability / 1) * 100)}%
		</span>
	</span>
	<!-- Energy -->
	<span>
		<span class="font-semibold">Energy:</span>
		<span class="text-2xl font-semibold text-green">
			{Math.round((audioAnalysis.energy / 1) * 100)}%
		</span>
	</span>
	<!-- Duration -->
	<span>
		<span class="font-semibold">Duration:</span>
		<span class="text-2xl font-semibold text-green">
			{convertMilliseconds(audioAnalysis.duration_ms)}
		</span>
	</span>
	<!-- Key -->
	<span>
		<span class="font-semibold">Key:</span>
		<span class="text-2xl font-semibold text-green">
			{audioAnalysis.key}
		</span>
	</span>
	<!-- Loudness -->
	<span>
		<span class="font-semibold">Loudness:</span>
		<span class="text-2xl font-semibold text-green">
			{Math.round(audioAnalysis.loudness)}db
		</span>
	</span>
	<!-- Acousticness -->
	<span>
		<span class="font-semibold">Acousticness:</span>
		<span class="text-2xl font-semibold text-green">
			{Math.round((audioAnalysis.acousticness / 1) * 100)}%
		</span>
	</span>
	<!-- Instrumentalness -->
	<span>
		<span class="font-semibold">Instrumentalness:</span>
		<span class="text-2xl font-semibold text-green">
			{Math.round((audioAnalysis.instrumentalness / 1) * 100)}%
		</span>
	</span>
	<!-- Speechiness -->
	<span>
		<span class="font-semibold">Speechiness:</span>
		<span class="text-2xl font-semibold text-green">
			{Math.round((audioAnalysis.speechiness / 1) * 100)}%
		</span>
	</span>
</div>
