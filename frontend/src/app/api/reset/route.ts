import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

export async function POST(request: NextRequest) {
  try {
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    });

    await pusher.trigger('buzzer-channel', 'game-reset', {
      timestamp: Date.now(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pusher error:', error);
    return NextResponse.json({ error: 'Failed to trigger reset event' }, { status: 500 });
  }
}
