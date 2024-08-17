import type { PageServerLoad } from './$types';
import { makeCommasUrlFriendly, objectsToCommas } from '$lib/utils'; // Adjust the path based on your project structure

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const accessToken = cookies.get('access_token');
	let loggedIn = false;

	const userInfo = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => {
		if (res.ok) {
			loggedIn = true;
			return res.json();
		}
	});

	const onRepeat = await fetch('https://api.spotify.com/v1/me/top/tracks', {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((res) => res.json());

	const forYou = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((res) => res.json());

	const userAlbums = await fetch('https://api.spotify.com/v1/me/albums', {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((res) => res.json());

	const topArtists = await fetch('https://api.spotify.com/v1/me/top/artists', {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((res) => res.json());

	// Convert onRepeat IDs to a comma-separated string
	const onRepeatIds = makeCommasUrlFriendly(
		objectsToCommas(onRepeat.items.map((track: any) => track.id))
	);

	const topAudioAnalysis = await fetch(
		`https://api.spotify.com/v1/audio-features?ids=${onRepeatIds}`,
		{
			headers: { Authorization: `Bearer ${accessToken}` }
		}
	).then((res) => res.json());

	return {
		userInfo,
		forYou,
		onRepeat,
		onRepeatIds, // Include onRepeatIds in the returned data
		loggedIn,
		accessToken,
		userAlbums,
		topArtists,
		topAudioAnalysis
	};
};
