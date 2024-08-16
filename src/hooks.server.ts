// src/hooks.server.js
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	// Check if the route requires authentication
	if (event.url.pathname.startsWith('/protected')) {
		const accessToken = event.cookies.get('access_token');
		if (!accessToken) {
			throw redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	return response;
}
