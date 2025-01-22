import Link from 'next/link';
import { Twitch, Twitter, Instagram, Youtube } from 'lucide-react';
import TwitchStatus from '@/components/twitch-status';

export default async function Home() {
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

				<TwitchStatus />
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
