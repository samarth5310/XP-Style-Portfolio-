'use client';
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import { X, Minus, Square, Copy, ArrowLeft, ArrowRight, Search, ChevronDown } from 'lucide-react';
import { XP_ICONS } from '@/constants';

import { useIsMobile } from '@/hooks/useIsMobile';
import { playSound } from '@/hooks/useSound';

interface WindowProps {
  title: string;
  icon: string;
  onClose: () => void;
  onMinimize: () => void;
  isFocused: boolean;
  onFocus: () => void;
  zIndex: number;
  children: React.ReactNode;
  address?: string;
  hideToolbar?: boolean;
  initialWidth?: string | number;
  initialHeight?: string | number;
  isMinimized?: boolean;
}

const Window: React.FC<WindowProps> = ({
  title, icon, onClose, onMinimize, isFocused, onFocus, zIndex, children,
  address = "C:\\", hideToolbar = false,
  initialWidth = 800, initialHeight = 600, isMinimized = false,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const isMobile = useIsMobile();
  const effectiveMaximized = isMobile || isMaximized;
  const [pos, setPos] = useState({ x: 80 + Math.random() * 100, y: 40 + Math.random() * 60 });
  const [size, setSize] = useState({ width: typeof initialWidth === 'string' ? parseInt(initialWidth) || 800 : initialWidth, height: typeof initialHeight === 'string' ? parseInt(initialHeight) || 600 : initialHeight });
  const [preMaxState, setPreMaxState] = useState({ pos: { x: 0, y: 0 }, size: { width: 800, height: 600 } });

  if (isMinimized) return null;

  const toggleMaximize = () => {
    if (!effectiveMaximized) {
      setPreMaxState({ pos, size });
      setIsMaximized(true);
    } else {
      setPos(preMaxState.pos);
      setSize(preMaxState.size);
      setIsMaximized(false);
    }
  };

  const windowContent = (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full h-full flex flex-col shadow-[2px_2px_10px_rgba(0,0,0,0.5)] rounded-t-[4px] overflow-hidden"
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`h-[30px] flex items-center justify-between px-2 select-none shrink-0 rounded-t-[3px] window-drag-handle
          ${isFocused ? 'bg-gradient-to-b from-[#0058ee] via-[#3593ff] to-[#288eff]' : 'bg-gradient-to-b from-[#7697c7] via-[#8ba7d1] to-[#7697c7]'}
        `}
      >
        <div className="flex items-center gap-2 text-white font-bold pointer-events-none">
          <img src={icon} alt="" className="w-4 h-4 drop-shadow-md" />
          <span className="text-xs tracking-wide drop-shadow-md truncate max-w-[200px]">{title}</span>
        </div>
        <div className="flex items-center gap-[2px]">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-[21px] h-[21px] bg-[#288eff] rounded-[3px] flex items-center justify-center border border-white/40 hover:bg-[#4a9eff] active:bg-[#196ebf]">
            <Minus color="white" size={12} strokeWidth={4} className="mt-2" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleMaximize(); }} className="w-[21px] h-[21px] bg-[#288eff] rounded-[3px] flex items-center justify-center border border-white/40 hover:bg-[#4a9eff] active:bg-[#196ebf]">
            {effectiveMaximized ? <Copy color="white" size={10} strokeWidth={3} /> : <Square color="white" size={10} strokeWidth={3} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); playSound('close'); onClose(); }} className="w-[21px] h-[21px] bg-[#e81123] rounded-[3px] flex items-center justify-center border border-white/40 hover:bg-[#f4606c] active:bg-[#bf0e1d]">
            <X color="white" size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="h-[24px] bg-[#ece9d8] flex items-center px-1 text-xs border-b border-gray-300 select-none shrink-0">
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
        <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      {!hideToolbar && (
        <div className="bg-[#ece9d8] px-2 py-1 border-b border-gray-400 flex flex-col gap-1 shrink-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-black/5">
              <div className="bg-[#3e9c42] rounded-full p-1 border border-white/30"><ArrowLeft size={14} color="white" /></div>
              <span className="text-xs">Back</span>
              <ChevronDown size={10} />
            </button>
            <button className="p-1 hover:bg-black/5 rounded-full"><div className="bg-[#3e9c42] rounded-full p-1 border border-white/30"><ArrowRight size={14} color="white" /></div></button>
            <div className="w-[1px] h-6 bg-gray-400 mx-1" />
            <button className="p-1 hover:bg-black/5 rounded"><img src={XP_ICONS.recent} className="w-6 h-6" alt="folders" /></button>
            <button className="p-1 hover:bg-black/5 rounded"><div className="bg-white border border-gray-400 p-0.5 rounded"><Search size={16} className="text-gray-600" /></div></button>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <span className="text-xs text-gray-500">Address</span>
            <div className="flex-1 bg-white border border-[#7f9db9] h-[22px] flex items-center px-1 shadow-inner">
              <img src={icon} className="w-3 h-3 mr-2 opacity-70" alt="" />
              <span className="text-xs flex-1 truncate">{address}</span>
              <ChevronDown size={12} className="text-gray-500" />
            </div>
            <button className="flex items-center gap-1 px-2 bg-[#ece9d8] border border-gray-400 hover:border-black text-xs h-[22px] rounded-[2px]">
              <span className="text-green-600 font-bold">Go</span>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto relative flex flex-col min-h-0">{children}</div>
    </motion.div>
  );

  if (effectiveMaximized) {
    return (
      <div style={{ position: 'fixed', inset: 0, bottom: 30, zIndex, display: 'flex', flexDirection: 'column' }} className="pointer-events-auto">
        {windowContent}
      </div>
    );
  }

  return (
    <Rnd
      position={pos}
      size={size}
      minWidth={320}
      minHeight={240}
      dragHandleClassName="window-drag-handle"
      style={{ zIndex, pointerEvents: 'auto' }}
      onDragStop={(_e, d) => {
        if (d.y <= 0) {
          setPreMaxState({ pos: { x: d.x, y: d.y }, size });
          setIsMaximized(true);
        } else {
          setPos({ x: d.x, y: d.y });
        }
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        setPos(position);
      }}
      onMouseDown={onFocus}
      bounds="parent"
    >
      {windowContent}
    </Rnd>
  );
};

export default Window;
