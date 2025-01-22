import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch(
			'https://api.colecaccamise.com/twitch/converixgaming'
		);

		if (!response.ok) {
			throw new Error('Failed to fetch stream data');
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		// return error response
		return NextResponse.json(
			{ error: 'failed to fetch stream data' },
			{ status: 500 }
		);
	}
}
