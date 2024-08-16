// src/routes/callback/+page.server.js
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

export async function load({ url, cookies, fetch }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const codeVerifier = cookies.get('code_verifier');
	const redirectUri = PUBLIC_REDIRECT_URI;

	if (code && codeVerifier) {
		const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: redirectUri,
				client_id: PUBLIC_CLIENT_ID,
				code_verifier: codeVerifier
			})
		});

		const tokenData = await tokenResponse.json();

		if (tokenResponse.ok) {
			// Store the tokens in secure HTTP-only cookies
			cookies.set('access_token', tokenData.access_token, {
				path: '/',
				httpOnly: true,
				secure: !dev,
				sameSite: 'lax',
				maxAge: tokenData.expires_in
			});

			cookies.set('refresh_token', tokenData.refresh_token, {
				path: '/',
				httpOnly: true,
				secure: !dev,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 30 // 30 days
			});

			// Clear the code_verifier cookie
			cookies.delete('code_verifier', { path: '/' });

			// Redirect to the home page or a dashboard
			throw redirect(302, '/');
		} else {
			console.error('Error getting tokens:', tokenData);
			// Handle error (e.g., redirect to an error page)
			throw redirect(302, '/error');
		}
	} else {
		console.error('Missing code or code_verifier');
		// Handle error
		throw redirect(302, '/error');
	}
}
