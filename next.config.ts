import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	redirects: async () => {
		return [
			{
				source: '/discord',
				destination: 'https://discord.gg/Dbt2wnWSPg',
				permanent: true
			},
			{
				source: '/twitch',
				destination: 'https://twitch.tv/converixgaming',
				permanent: true
			},
			{
				source: '/twitter',
				destination: 'https://x.com/converixgaming',
				permanent: true
			},
			{
				source: '/x',
				destination: 'https://x.com/converixgaming',
				permanent: true
			},
			{
				source: '/instagram',
				destination: 'https://www.instagram.com/converixgaming',
				permanent: true
			},
			{
				source: '/youtube',
				destination: 'https://www.youtube.com/@converixgaming',
				permanent: true
			}
		];
	}
};

export default nextConfig;
