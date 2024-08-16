// src/lib/utils/auth.js
import { dev } from '$app/environment';
import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

export async function refreshToken(cookies) {
	const refreshToken = cookies.get('refresh_token');

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: PUBLIC_CLIENT_ID
		})
	});

	const tokenData = await response.json();

	if (response.ok) {
		cookies.set('access_token', tokenData.access_token, {
			path: '/',
			httpOnly: true,
			secure: !dev,
			sameSite: 'lax',
			maxAge: tokenData.expires_in
		});

		if (tokenData.refresh_token) {
			cookies.set('refresh_token', tokenData.refresh_token, {
				path: '/',
				httpOnly: true,
				secure: !dev,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 30 // 30 days
			});
		}
	} else {
		console.error('Error refreshing token:', tokenData);
		// Handle error (e.g., redirect to login)
	}
}
