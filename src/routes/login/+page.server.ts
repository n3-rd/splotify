// src/routes/login/+page.server.js
import { redirect } from '@sveltejs/kit';
import { generateRandomString, generateCodeChallenge, getAuthUrl } from '$lib/utils/oauth';
import { dev } from '$app/environment';
import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

export async function load({ cookies }) {
	const clientId = PUBLIC_CLIENT_ID;
	const redirectUri = PUBLIC_REDIRECT_URI;

	const state = generateRandomString(16);
	const codeVerifier = generateRandomString(128);
	const codeChallenge = await generateCodeChallenge(codeVerifier);

	// Save code_verifier in a secure, HTTP-only cookie
	cookies.set('code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		maxAge: 60 * 10 // 10 minutes
	});

	// Redirect to Spotify's authorization URL
	throw redirect(302, getAuthUrl(clientId, redirectUri, codeChallenge, state));
}
