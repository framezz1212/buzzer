import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

// ตั้งค่า Pusher (ดึงจาก env)
const pusher = new Pusher({
  appId: "2113732",
  key: "25008b6838925e07284a",
  secret: "b8c1539532280e5c4837",
  cluster: "ap1",
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { playerId, action } = await request.json();

    // กรณีเป็นคนกด Buzzer
    if (action === 'buzz') {
      if (!playerId) {
        return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
      }

      await pusher.trigger('Buzzer888', 'player-buzzed', {
        playerId,
        action: 'buzz',
        timestamp: Date.now(),
      });

      return NextResponse.json({ success: true, playerId });
    }

    // กรณีเป็นปุ่ม Start (Reset เกม)
    if (action === 'start') {
      await pusher.trigger('Buzzer888', 'player-buzzed', {
        action: 'start',
        timestamp: Date.now(),
      });

      return NextResponse.json({ success: true, message: 'Game Reset' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Pusher error:', error);
    return NextResponse.json({ error: 'Failed to trigger event' }, { status: 500 });
  }
}