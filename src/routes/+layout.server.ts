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
	return {
		userInfo,
		loggedIn
	};
};
