// app/api/twitch/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface TwitchAuthResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
}

interface TwitchStream {
	id: string;
	user_id: string;
	user_login: string;
	user_name: string;
	game_id: string;
	game_name: string;
	type: string;
	title: string;
	viewer_count: number;
	started_at: string;
	language: string;
	thumbnail_url: string;
	tag_ids: string[];
}

interface StreamResponse {
	data: TwitchStream[];
}

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
	console.log('checking stream status');
	console.log('request url:', request.url);
	const headersList = headers();
	const host = headersList.get('host') || '';
	console.log('host:', host);

	const username = 'converixgaming';

	if (!username) {
		return NextResponse.json(
			{ error: 'Username is required' },
			{ status: 400 }
		);
	}

	const clientId = process.env.TWITCH_CLIENT_ID;
	const clientSecret = process.env.TWITCH_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		return NextResponse.json(
			{ error: 'Missing Twitch credentials' },
			{ status: 500 }
		);
	}

	try {
		// get oauth token
		const authResponse = await fetch('https://id.twitch.tv/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: clientId,
				client_secret: clientSecret,
				grant_type: 'client_credentials'
			})
		});

		if (!authResponse.ok) {
			throw new Error('Failed to get Twitch auth token');
		}

		const authData = (await authResponse.json()) as TwitchAuthResponse;

		// check if streamer is live
		const streamResponse = await fetch(
			`https://api.twitch.tv/helix/streams?user_login=${username}`,
			{
				headers: {
					Authorization: `Bearer ${authData.access_token}`,
					'Client-Id': clientId
				}
			}
		);

		if (!streamResponse.ok) {
			throw new Error('Failed to fetch stream data');
		}

		const streamData = (await streamResponse.json()) as StreamResponse;
		const isLive = streamData.data.length > 0;

		// return stream status and basic info if live
		return NextResponse.json({
			isLive,
			streamInfo: isLive ? streamData.data[0] : null
		});
	} catch (error) {
		console.error('error checking twitch stream status:', error);
		return NextResponse.json(
			{ error: 'Failed to check stream status' },
			{ status: 500 }
		);
	}
}
