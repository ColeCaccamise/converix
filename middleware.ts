import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirects = {
	'/discord': 'https://discord.gg/Dbt2wnWSPg',
	'/twitch': 'https://twitch.tv/converixgaming',
	'/twitter': 'https://x.com/converixgaming',
	'/x': 'https://x.com/converixgaming',
	'/instagram': 'https://www.instagram.com/converixgaming',
	'/youtube': 'https://www.youtube.com/@converixgaming'
};

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	if (path in redirects) {
		return NextResponse.redirect(redirects[path as keyof typeof redirects]);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
