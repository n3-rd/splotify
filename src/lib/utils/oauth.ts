// src/lib/utils/oauth.js
export function generateRandomString(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export async function generateCodeChallenge(codeVerifier) {
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode(...new Uint8Array(digest)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}

export function getAuthUrl(clientId, redirectUri, codeChallenge, state) {
	const scope =
		'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify';
	return (
		`https://accounts.spotify.com/authorize?` +
		`client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&scope=${encodeURIComponent(scope)}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`
	);
}
