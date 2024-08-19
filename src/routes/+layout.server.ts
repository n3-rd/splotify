import type { PageServerLoad } from './$types';

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

	// Initial player info fetch
	const playerInfo = await fetch('https://api.spotify.com/v1/me/player', {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((res) => res.json());

	return {
		userInfo,
		loggedIn,
		playerInfo,
		// Add a new endpoint for client-side refreshing
		playerInfoEndpoint: '/api/player-info'
	};
};
