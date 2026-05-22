'use client';
import React, { useEffect, useState } from 'react';
import { StartLogo } from '@/components/XPIcons';
import { XPWindow } from '@/types';
import { Monitor, Minimize, Tv } from 'lucide-react';
import { playSound } from '@/hooks/useSound';

interface TaskbarProps {
  onToggleStart: () => void;
  isStartOpen: boolean;
  openWindows: XPWindow[];
  onWindowClick: (id: string) => void;
  onCloseWindow: (id: string) => void;
  isCrtEnabled: boolean;
  onToggleCrt: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onToggleStart, isStartOpen, openWindows, onWindowClick, onCloseWindow, isCrtEnabled, onToggleCrt }) => {
  const [time, setTime] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[30px] z-[100] select-none flex items-center justify-between shadow-[0_-2px_4px_rgba(0,0,0,0.4)]"
      style={{ background: 'linear-gradient(to bottom, #245edb 0%, #3f8cf3 9%, #245edb 18%, #245edb 92%, #1941a5 100%)', borderTop: '1px solid rgba(255,255,255,0.3)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Start Button */}
      <div className="h-full pl-0.5 py-0.5 shrink-0">
        <button
          onClick={() => { playSound('click'); onToggleStart(); }}
          className="h-full px-3 sm:pr-6 sm:pl-2 rounded-[0px_12px_12px_0px] flex items-center gap-2 text-white font-bold italic shadow-lg transition-all hover:brightness-110 group"
          style={{
            background: isStartOpen
              ? 'linear-gradient(to bottom, #2b692e 0%, #4caf50 100%)'
              : 'linear-gradient(to bottom, #388e3c 0%, #66bb6a 8%, #388e3c 100%)',
            boxShadow: isStartOpen
              ? 'inset 1px 1px 3px rgba(0,0,0,0.6)'
              : 'inset 0px 1px 0px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.6)',
            textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
          }}
        >
          <div className="bg-white rounded-full p-[2px] shadow-inner"><StartLogo /></div>
          <span className="text-base sm:text-lg tracking-tight">start</span>
        </button>
      </div>

      {/* Window List */}
      <div className="flex-1 px-2 flex items-center gap-1 overflow-hidden h-full py-0.5">
        {openWindows.map((win) => (
          <div
            key={win.id}
            className={`w-[180px] h-full rounded-[2px] px-2 flex items-center gap-2 cursor-pointer relative
              ${!win.isMinimized
                ? 'bg-[#1e50ad] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.4)] border border-[#103475]'
                : 'bg-[#3c81f3] hover:bg-[#5392f5] shadow-[1px_1px_2px_rgba(0,0,0,0.5)] border border-[#103475]'}
            `}
            onClick={() => onWindowClick(win.id)}
          >
            <img src={win.icon} alt="" className="w-4 h-4" />
            <span className="text-white text-xs truncate drop-shadow-md flex-1">{win.title}</span>
            <button
              className="ml-auto w-4 h-4 rounded-[2px] bg-[#e81123] flex items-center justify-center hover:bg-[#f4606c]"
              onClick={(e) => { e.stopPropagation(); onCloseWindow(win.id); }}
            >
              <span className="text-white text-[10px] leading-none">×</span>
            </button>
          </div>
        ))}
      </div>

      {/* System Tray */}
      <div
        className="h-full border-l border-[#123d88] flex items-center px-3 gap-3 text-white text-xs shrink-0"
        style={{ background: 'linear-gradient(to bottom, #1290e8 0%, #0b70ce 10%, #0b70ce 100%)' }}
      >
        <button onClick={onToggleCrt} className={`w-5 h-5 flex items-center justify-center rounded-[2px] hover:bg-[#1941a5]/50 ${isCrtEnabled ? 'bg-[#1941a5]/30' : ''}`} title="Toggle CRT Effect">
          <Tv size={14} className={isCrtEnabled ? 'text-[#4ade80]' : 'text-gray-300'} />
        </button>
        <button onClick={handleFullScreen} className="w-5 h-5 flex items-center justify-center rounded-[2px] hover:bg-[#1941a5]/50" title="Toggle Fullscreen">
          {isFullscreen ? <Minimize size={14} className="text-white" /> : <Monitor size={14} className="text-white" />}
        </button>
        <span className="drop-shadow-md whitespace-nowrap cursor-default" title={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;
