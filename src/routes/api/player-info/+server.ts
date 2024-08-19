import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, cookies }) => {
	const accessToken = cookies.get('access_token');
	const playerInfo = await fetch('https://api.spotify.com/v1/me/player', {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((res) => res.json());

	return new Response(JSON.stringify(playerInfo), {
		headers: { 'Content-Type': 'application/json' }
	});
};
