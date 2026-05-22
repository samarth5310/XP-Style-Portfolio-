'use client';
import React, { useState } from 'react';
import { SkipBack, SkipForward, Shuffle } from 'lucide-react';

const TRACKS = [
  { title: 'Bombe Helutaithe - Raajakumara', id: 'QZ3sPJKOm0s' },
  { title: 'Belageddu - Kirik Party', id: 'udMdSbQPZGA' },
  { title: 'Karabuu - Pogaru', id: 'sBLsMzKE4bQ' },
  { title: 'Nee Sigoovaregu - Kavaludaari', id: '5G_s0Eb4MZo' },
  { title: 'Jai Ho - Slumdog Millionaire', id: 'xwwAVRyNmgQ' },
];

const MediaPlayer = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const track = TRACKS[currentIdx];

  const next = () => setCurrentIdx((i) => (i + 1) % TRACKS.length);
  const prev = () => setCurrentIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  const shuffle = () => setCurrentIdx(Math.floor(Math.random() * TRACKS.length));

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#0a1a3a] to-[#000]">
      {/* Video Area */}
      <div className="flex-1 relative">
        <iframe
          src={`https://www.youtube.com/embed/${track.id}?autoplay=1&rel=0`}
          className="w-full h-full border-none"
          title={track.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Controls Bar */}
      <div className="h-[50px] bg-gradient-to-b from-[#2a5298] to-[#1a1a2e] flex items-center justify-center gap-4 px-4 border-t border-[#4a7ad7] shrink-0">
        <button onClick={prev} className="text-white/80 hover:text-white"><SkipBack size={20} fill="white" /></button>
        <button onClick={next} className="w-10 h-10 rounded-full bg-gradient-to-b from-[#4a9eff] to-[#1a5cbf] border-2 border-[#7ac0ff] flex items-center justify-center hover:brightness-110 shadow-lg">
          <SkipForward size={18} fill="white" className="text-white ml-0.5" />
        </button>
        <button onClick={shuffle} className="text-white/80 hover:text-white"><Shuffle size={18} /></button>
        <div className="ml-4 text-white text-xs truncate max-w-[200px]">♫ {track.title}</div>
      </div>
    </div>
  );
};

export default MediaPlayer;
