import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Twitch, Twitter, Instagram, Youtube } from 'lucide-react';

export default async function Home() {
	async function getLiveData() {
		const liveData = await fetch('http://localhost:3000/api/live', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const liveDataJson = (await liveData.json()) as {
			isLive: boolean;
			streamInfo: {
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
				tags: string[];
			} | null;
		};

		return liveDataJson;
	}

	const liveData = await getLiveData();
	console.log('live data:', liveData);

	const isLive = liveData.isLive;
	const streamInfo = liveData.streamInfo;
	const streamTitle = streamInfo?.title;
	// const streamThumbnail = streamInfo?.thumbnail_url;
	const streamStartedAt = streamInfo?.started_at;
	// const streamViewerCount = streamInfo?.viewer_count;
	// const streamLanguage = streamInfo?.language;
	const streamGame = streamInfo?.game_name;
	// const streamTags = streamInfo?.tags;

	return (
		<div className='min-h-screen bg-black text-white'>
			{/* Header */}
			<header className='container mx-auto px-4 py-6 flex justify-between items-center'>
				<Link
					href='/'
					className='text-2xl font-bold'
				>
					ConveriX
				</Link>
				<nav>
					<ul className='flex space-x-4'>
						<li>
							<Link
								href='#about'
								className='hover:text-gray-300'
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href='#schedule'
								className='hover:text-gray-300'
							>
								Schedule
							</Link>
						</li>
					</ul>
				</nav>
			</header>

			{/* Hero Section */}
			<section className='container mx-auto px-4 py-20 text-center'>
				<h1 className='text-5xl font-bold mb-6'>ConveriX Gaming</h1>
				<p className='text-xl mb-8'>Your go-to channel for sports and gaming</p>

				<div className='flex flex-col items-center gap-1 '>
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
					{streamStartedAt
						? (() => {
								const start = new Date(streamStartedAt);
								const now = new Date();
								const diff = Math.floor(
									(now.getTime() - start.getTime()) / 1000 / 60
								);
								return (
									<span className='text-xs text-gray-500'>
										Been live for {diff} minutes
									</span>
								);
						  })()
						: ''}
				</div>

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
			</section>

			{/* About Section */}
			<section
				id='about'
				className='bg-white text-black py-20'
			>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-6'>About ConveriX</h2>
					<p className='text-lg'>
						ConveriX Gaming is a twitch streamer and Buffalo Bills fanatic. He
						streams College Football, Madden, and other games from time to time.
						#RiseAndGrind
					</p>
				</div>
			</section>

			{/* Schedule Section */}
			<section
				id='schedule'
				className='py-20'
			>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-6'>Streaming Schedule</h2>
					<p className='mb-6'>
						Up to date stream times can be found in the{' '}
						<Link href='https://converix.tv/discord'>Discord channel</Link>
					</p>
					<div className='flex flex-col gap-4'>
						<div className='bg-white text-black p-4 rounded w-full'>
							<h3 className='font-bold'>Monday-Saturday</h3>
							<p>Times TBD</p>
							<p>CUT, MUT, and other games</p>
						</div>
						<div className='bg-white text-black p-4 rounded w-full'>
							<h3 className='font-bold'>Sunday and Monday</h3>
							<p>OFF</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-white text-black py-10'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-center space-x-6 mb-6'>
						<Link
							href='https://twitch.tv/converixgaming'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Twitch size={24} />
						</Link>
						<Link
							href='https://x.com/converixgaming'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Twitter size={24} />
						</Link>
						<Link
							href='https://www.instagram.com/converixgaming/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Instagram size={24} />
						</Link>
						<Link
							href='https://www.youtube.com/@converixgaming'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Youtube size={24} />
						</Link>
					</div>
					<p className='text-center'>
						© {new Date().getFullYear()} ConveriX Gaming. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
