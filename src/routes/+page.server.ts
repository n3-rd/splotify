import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const accessToken = cookies.get('access_token');
	const userInfo = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => res.json());

	return {
		userInfo
	};
};
