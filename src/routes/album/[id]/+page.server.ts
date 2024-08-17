import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
	const accessToken = cookies.get('access_token');
	let loggedIn = false;

	const albumInfo = await fetch(`https://api.spotify.com/v1/albums/${params.id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => {
		if (res.ok) {
			loggedIn = true;
			return res.json();
		}
	});

	const artistInfo = await fetch(`https://api.spotify.com/v1/artists/${albumInfo.artists[0].id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => {
		if (res.ok) {
			loggedIn = true;
			return res.json();
		}
	});

	return {
		albumInfo,
		artistInfo
	};
};
