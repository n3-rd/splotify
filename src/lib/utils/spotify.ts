// src/lib/utils/spotify.js
import { dev } from '$app/environment';

export async function getUserProfile(cookies) {
	const accessToken = cookies.get('access_token');
	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return response.json();
}
