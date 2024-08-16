// src/routes/logout/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('refresh_token', { path: '/' });
	throw redirect(302, '/');
}
