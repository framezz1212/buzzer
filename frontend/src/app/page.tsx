'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Pusher from 'pusher-js';
import Buzzer from '@/components/Buzzer';

interface BuzzerState {
  enabled: boolean;
  winner: string | null;
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [buzzers, setBuzzers] = useState<{ [key: string]: BuzzerState }>({
    buzzer1: { enabled: false, winner: null },
    buzzer2: { enabled: false, winner: null },
  });
  const [winner, setWinner] = useState<string | null>(null);
  const pusherRef = useRef<Pusher | null>(null);

  // ฟังก์ชันจัดการเมื่อมีคนกด Buzzer
  const handleBuzz = useCallback((winnerId: string) => {
    setWinner(winnerId);
    setBuzzers({
      buzzer1: { enabled: false, winner: winnerId },
      buzzer2: { enabled: false, winner: winnerId },
    });
  }, []);

  // ฟังก์ชันจัดการเมื่อเกม Reset
  const handleGameReset = useCallback(() => {
    setWinner(null);
    setBuzzers({
      buzzer1: { enabled: true, winner: null },
      buzzer2: { enabled: true, winner: null },
    });
  }, []);

  useEffect(() => {
    // ใช้ Key ของคุณโดยตรง (หรือใช้ process.env ตามเดิมก็ได้ครับ)
    const pusher = new Pusher("25008b6838925e07284a", {
      cluster: "ap1",
    });

    pusherRef.current = pusher;

    // เปลี่ยนเป็น Channel: Buzzer888 ตามที่แจ้งไว้
    const channel = pusher.subscribe('Buzzer888');

    // ผูก Event ตามโครงสร้างข้อมูลใหม่จาก API
    channel.bind('player-buzzed', (data: { playerId: string; action: string }) => {
      if (data.action === 'start') {
        console.log('Game reset triggered');
        handleGameReset();
      } else if (data.action === 'buzz') {
        console.log('Winner:', data.playerId);
        handleBuzz(data.playerId);
      }
    });

    pusher.connection.bind('connected', () => setIsConnected(true));
    pusher.connection.bind('disconnected', () => setIsConnected(false));

    return () => {
      pusher.unsubscribe('Buzzer888');
      pusher.disconnect();
    };
  }, [handleBuzz, handleGameReset]);

  // ฟังก์ชันเรียก API สำหรับปุ่ม Start
  const startGame = async () => {
    try {
      await fetch('/api/buzz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' }), // ส่ง action start ไปที่ API ใหม่
      });
    } catch (error) {
      console.error('Failed to reset game:', error);
    }
  };

  // ฟังก์ชันเรียก API สำหรับการกด Buzzer
  const handleBuzzerClick = async (buzzerId: string) => {
    if (winner || !buzzers[buzzerId as keyof typeof buzzers].enabled) return;

    try {
      await fetch('/api/buzz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: buzzerId, action: 'buzz' }),
      });
    } catch (error) {
      console.error('Failed to buzz:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-8 px-4 bg-[#0f172a]">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8 p-4 bg-[#1e293b] rounded-lg border border-gray-700">
          <h1 className="text-2xl font-bold text-white">Buzzer888 System</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} shadow-[0_0_8px_rgba(34,197,94,0.6)]`} />
              <span className="text-sm text-gray-400">{isConnected ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={startGame}
            className="px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-xl rounded-xl shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-1 active:shadow-none transition-all border-b-2 border-green-400"
          >
            START GAME / RESET
          </button>
        </div>

        <div className="flex justify-center gap-12 sm:gap-24">
          <Buzzer
            id="buzzer1"
            color="red"
            label="BUZZER 1"
            isEnabled={buzzers.buzzer1.enabled && !winner}
            isWinner={winner === 'buzzer1'}
            onBuzz={() => handleBuzzerClick('buzzer1')}
          />
          <Buzzer
            id="buzzer2"
            color="blue"
            label="BUZZER 2"
            isEnabled={buzzers.buzzer2.enabled && !winner}
            isWinner={winner === 'buzzer2'}
            onBuzz={() => handleBuzzerClick('buzzer2')}
          />
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm space-y-2">
          <p className={winner ? "text-yellow-400 font-bold text-lg animate-pulse" : ""}>
            {winner ? `WINNER: ${winner.toUpperCase()}` : "Ready to Play!"}
          </p>
          <p>Channel: Buzzer888</p>
        </div>
      </div>
    </main>
  );
}