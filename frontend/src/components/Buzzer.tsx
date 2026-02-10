'use client';

import React from 'react';

interface BuzzerProps {
  id: string;
  color: 'red' | 'blue';
  label: string;
  isEnabled: boolean;
  isWinner: boolean;
  onBuzz: () => void;
}

export default function Buzzer({ id, color, label, isEnabled, isWinner, onBuzz }: BuzzerProps) {
  const baseColor = color === 'red' ? 'bg-buzzer-red hover:bg-buzzer-red-hover' : 'bg-buzzer-blue hover:bg-buzzer-blue-hover';
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`status-light w-16 h-16 rounded-full ${
          isWinner 
            ? 'bg-status-winner shadow-status-glow winner' 
            : 'bg-status-idle'
        }`}
      />
      <button
        id={id}
        onClick={onBuzz}
        disabled={!isEnabled}
        className={`buzzer-button w-40 h-40 rounded-full ${baseColor} text-white font-bold text-2xl shadow-buzzer border-4 border-dark-border active:shadow-buzzer-active disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-buzzer`}
      >
        {label}
      </button>
    </div>
  );
}
