import { Button } from '@/components/ui/button';
import { Twitch } from 'lucide-react';
import Link from 'next/link';

export default async function TwitchStatus() {
	const response = await fetch(
		`https://api.colecaccamise.com/twitch/converixgaming`,
		{ cache: 'no-store' } // disable caching to get fresh data
	);
	const streamData = await response.json();
	// log data for debugging
	console.log('stream data:', streamData);
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
