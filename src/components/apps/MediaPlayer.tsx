'use client';
import React, { useState, useRef, useEffect } from 'react';
import { SkipBack, SkipForward, Play, Pause, Shuffle, Volume2 } from 'lucide-react';

const TRACKS = [
  { title: 'Bombe Helutaithe - Raajakumara', id: 'gy5_T2ACerk', dur: 274 },
  { title: 'Jai Ho - A.R. Rahman', id: 'xwwAVRyNmgQ', dur: 339 },
  { title: 'Rangitaranga - Title Track', id: 'oepLylgqSKU', dur: 248 },
  { title: 'Dheera Dheera - KGF', id: 'IuS4LL_ALrU', dur: 285 },
];

const MediaPlayer = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [volume, setVolume] = useState(70);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const track = TRACKS[currentIdx];

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  const postMsg = (data: object) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', ...data }), '*');
  };

  const togglePlay = () => {
    if (isPlaying) postMsg({ func: 'pauseVideo' });
    else postMsg({ func: 'playVideo' });
    setIsPlaying(!isPlaying);
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    postMsg({ func: 'seekTo', args: [pct * track.dur, true] });
    setProgress(pct * 100);
  };

  const changeVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vol = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    setVolume(vol);
    postMsg({ func: 'setVolume', args: [vol] });
  };

  const next = () => { setCurrentIdx((i) => (i + 1) % TRACKS.length); setProgress(0); setIsPlaying(true); };
  const prev = () => { setCurrentIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length); setProgress(0); setIsPlaying(true); };
  const shuffle = () => { setCurrentIdx(Math.floor(Math.random() * TRACKS.length)); setProgress(0); setIsPlaying(true); };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { next(); return 0; }
          const newP = p + (100 / track.dur);
          setCurrentTime(formatTime((newP / 100) * track.dur));
          setDuration(formatTime(track.dur));
          return newP;
        });
      }, 1000);
    } else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, track.dur]);

  // Reset progress on track change
  useEffect(() => { setProgress(0); setCurrentTime('0:00'); }, [currentIdx]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#0a1a3a] to-[#000] overflow-hidden">
      {/* Video - cropped to hide YouTube UI */}
      <div className="flex-1 relative overflow-hidden bg-black">
        <div className="absolute -inset-[50px] z-0">
          <iframe
            ref={iframeRef}
            key={track.id}
            src={`https://www.youtube.com/embed/${track.id}?autoplay=1&enablejsapi=1&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&playsinline=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            className="w-[calc(100%+100px)] h-[calc(100%+100px)] border-none"
            title={track.title}
            allow="autoplay; encrypted-media"
          />
        </div>
        {/* Click overlay for play/pause */}
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />
      </div>

      {/* Timeline */}
      <div className="h-[28px] bg-gradient-to-b from-[#1a3a6a] to-[#0d1f3f] flex items-center px-3 gap-2 border-t border-[#3a6ab5] shrink-0">
        <span className="text-[10px] text-blue-200 font-mono w-[36px]">{currentTime}</span>
        <div className="flex-1 h-[6px] bg-[#0a1530] rounded-full border border-[#2a4a7a] relative cursor-pointer" onClick={seekTo}>
          <div className="h-full bg-gradient-to-r from-[#4a9eff] to-[#1a5cbf] rounded-full" style={{ width: `${progress}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#7ac0ff] rounded-full border border-[#4a9eff] shadow-md" style={{ left: `calc(${progress}% - 5px)` }} />
        </div>
        <span className="text-[10px] text-blue-200 font-mono w-[36px] text-right">{duration}</span>
      </div>

      {/* Controls */}
      <div className="h-[44px] bg-gradient-to-b from-[#2a5298] to-[#1a1a2e] flex items-center justify-center gap-3 px-4 border-t border-[#4a7ad7] shrink-0">
        <button onClick={prev} className="text-white/80 hover:text-white"><SkipBack size={16} fill="white" /></button>
        <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-gradient-to-b from-[#4a9eff] to-[#1a5cbf] border-2 border-[#7ac0ff] flex items-center justify-center hover:brightness-110 shadow-lg">
          {isPlaying ? <Pause size={16} fill="white" className="text-white" /> : <Play size={16} fill="white" className="text-white ml-0.5" />}
        </button>
        <button onClick={next} className="text-white/80 hover:text-white"><SkipForward size={16} fill="white" /></button>
        <button onClick={shuffle} className="text-white/60 hover:text-white ml-2"><Shuffle size={14} /></button>
        <Volume2 size={14} className="text-white/60 ml-3" />
        <div className="w-[60px] h-[5px] bg-[#0a1530] rounded-full border border-[#2a4a7a] cursor-pointer" onClick={changeVolume}>
          <div className="h-full bg-gradient-to-r from-[#4a9eff] to-[#1a5cbf] rounded-full" style={{ width: `${volume}%` }} />
        </div>
        <div className="ml-auto text-[10px] text-blue-200 truncate max-w-[150px]">♫ {track.title}</div>
      </div>
    </div>
  );
};

export default MediaPlayer;
