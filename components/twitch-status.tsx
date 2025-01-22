'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Twitch } from 'lucide-react';
import Link from 'next/link';

interface TwitchAuthResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
}

interface TwitchStream {
	title: string;
	game_name: string;
	started_at: string;
}

interface StreamResponse {
	data: TwitchStream[];
}

interface StreamData {
	isLive: boolean;
	streamInfo: {
		title: string;
		game_name: string;
		started_at: string;
	} | null;
}

export default function TwitchStatus() {
	const [streamData, setStreamData] = useState<StreamData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStreamStatus = async () => {
			try {
				// get oauth token
				const authResponse = await fetch('https://id.twitch.tv/oauth2/token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: new URLSearchParams({
						client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
						client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET!,
						grant_type: 'client_credentials'
					})
				});

				if (!authResponse.ok) {
					throw new Error('Failed to get Twitch auth token');
				}

				const authData = (await authResponse.json()) as TwitchAuthResponse;

				// check if streamer is live
				const streamResponse = await fetch(
					'https://api.twitch.tv/helix/streams?user_login=converixgaming',
					{
						headers: {
							Authorization: `Bearer ${authData.access_token}`,
							'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!
						}
					}
				);

				if (!streamResponse.ok) {
					throw new Error('Failed to fetch stream data');
				}

				const streamData = (await streamResponse.json()) as StreamResponse;
				const isLive = streamData.data.length > 0;

				setStreamData({
					isLive,
					streamInfo: isLive ? streamData.data[0] : null
				});
			} catch (error) {
				console.error('error checking twitch stream status:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchStreamStatus();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (!streamData) return null;

	const { isLive, streamInfo } = streamData;
	const streamTitle = streamInfo?.title;
	const streamGame = streamInfo?.game_name;
	const streamStartedAt = streamInfo?.started_at;

	return (
		<div className='flex flex-col items-center gap-1'>
			<Button asChild>
				{isLive ? (
					<Link
						href='https://twitch.tv/converixgaming'
						target='_blank'
					>
						<Twitch className='mr-2' />
						Watch Live on Twitch
					</Link>
				) : (
					<Link
						href='https://twitch.tv/converixgaming'
						target='_blank'
					>
						<Twitch className='mr-2' />
						Follow on Twitch
					</Link>
				)}
			</Button>
			{streamStartedAt && (
				<span className='text-xs text-gray-500'>
					Been live for{' '}
					{Math.floor(
						(new Date().getTime() - new Date(streamStartedAt).getTime()) /
							1000 /
							60
					)}{' '}
					minutes
				</span>
			)}

			{isLive && (
				<div className='flex flex-col items-center p-4 rounded-lg gap-2'>
					<p className='text-sm'>
						Live
						<span className='text-red-500 underline bold'>
							{' '}
							NOW
						</span> playing <b>{streamGame}</b>!
					</p>
					<p className='text-sm'>{streamTitle}</p>
				</div>
			)}
		</div>
	);
}
