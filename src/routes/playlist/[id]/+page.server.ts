import { getDominantColorFromURL } from '$lib/utils/colors';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
	const accessToken = cookies.get('access_token');
	let loggedIn = false;

	const playlistInfo = await fetch(`https://api.spotify.com/v1/playlists/${params.id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => {
		if (res.ok) {
			loggedIn = true;
			return res.json();
		}
	});
	const playlistCover = await fetch(
		`
    https://api.spotify.com/v1/playlists/${params.id}/images`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	).then((res) => {
		if (res.ok) {
			loggedIn = true;
			return res.json();
		}
	});

	return {
		playlistInfo,
		playlistCover
	};
};
