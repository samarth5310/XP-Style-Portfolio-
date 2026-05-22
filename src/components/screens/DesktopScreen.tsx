'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ASSETS, XP_ICONS } from '@/constants';
import Taskbar from '@/components/os/Taskbar';
import DesktopIcon from '@/components/os/DesktopIcon';
import StartMenu from '@/components/os/StartMenu';
import Window from '@/components/os/Window';
import ShutdownModal from '@/components/screens/ShutdownModal';
import { XPWindow } from '@/types';
import { Info, X } from 'lucide-react';
import MyProjects from '@/components/apps/MyProjects';
import AboutMe from '@/components/apps/AboutMe';
import MyResume from '@/components/apps/MyResume';
import ContactMe from '@/components/apps/ContactMe';
import Terminal from '@/components/apps/Terminal';
import IframeWithLoader from '@/components/IframeLoader';

interface DesktopScreenProps {
  onRestart: () => void;
  onLogOut: () => void;
  isCrtEnabled: boolean;
  toggleCrt: () => void;
}

const DesktopScreen: React.FC<DesktopScreenProps> = ({ onRestart, onLogOut, isCrtEnabled, toggleCrt }) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [windows, setWindows] = useState<XPWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [wallpaper, setWallpaper] = useState(ASSETS.wallpaper);

  const WALLPAPERS = [
    { name: 'Bliss', url: ASSETS.wallpaper },
    { name: 'Dark', url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80' },
    { name: 'Space', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80' },
    { name: 'Mountains', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80' },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setShowWelcome(true), 1500);
    const t2 = setTimeout(() => setShowWelcome(false), 9500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const openWindow = (id: string, title: string, icon: string, type: XPWindow['type'], content: React.ReactNode, hideToolbar = false, customProps: Partial<XPWindow> = {}) => {
    const existing = windows.find((w) => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w)));
        setNextZIndex((p) => p + 1);
      } else focusWindow(id);
    } else {
      setWindows((prev) => [...prev, { id, title, icon, type, isOpen: true, isMinimized: false, zIndex: nextZIndex, content, ...customProps }]);
      setNextZIndex((p) => p + 1);
    }
    setIsStartOpen(false);
  };

  const handleOpenWebLink = (url: string, title: string) => {
    openWindow(`web-${title.toLowerCase().replace(/\s+/g, '-')}`, title, XP_ICONS.projects, 'browser',
      <iframe src={url} className="w-full h-full border-none" title={title} />
    );
  };

  const closeWindow = (id: string) => setWindows((prev) => prev.filter((w) => w.id !== id));
  const minimizeWindow = (id: string) => setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  const focusWindow = (id: string) => { setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w))); setNextZIndex((p) => p + 1); };

  const handleStartMenuItemClick = (id: string) => {
    switch (id) {
      case 'projects': openWindow('projects', 'My Projects', XP_ICONS.projects, 'browser', <MyProjects />); break;
      case 'aboutme': openWindow('aboutme', 'About Me', XP_ICONS.aboutMe, 'explorer', <AboutMe />); break;
      case 'resume': openWindow('resume', 'My Resume', XP_ICONS.resume, 'system', <MyResume />, true, { initialWidth: 880, initialHeight: 700 }); break;
      case 'contact': openWindow('contact', 'Contact Me', XP_ICONS.contact, 'system', <ContactMe />, true); break;
      case 'terminal': openWindow('terminal', 'Command Prompt', XP_ICONS.terminal, 'system', <Terminal />, true, { initialWidth: 650, initialHeight: 420 }); break;
      case 'paint':
        openWindow('paint', 'Paint', 'https://mitchivin.com/assets/gui/start-menu/paint.webp', 'browser',
          <IframeWithLoader src="https://jspaint.app" title="Paint" />, true
        ); break;
      case 'music':
        openWindow('music', 'Music Player', 'https://mitchivin.com/assets/gui/start-menu/music.webp', 'browser',
          <IframeWithLoader src="https://aidn.jp/mikutap/" title="Music Player" allow="autoplay" />, true, { initialWidth: 700, initialHeight: 500 }
        ); break;
      case 'imageviewer':
        openWindow('imageviewer', 'Image Viewer', 'https://mitchivin.com/assets/gui/start-menu/photos.webp', 'browser',
          <IframeWithLoader src="https://unsplash.com/explore" title="Image Viewer" />, true
        ); break;
      case 'game':
        openWindow('game', 'Smash Karts', 'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/supertuxkart-icon.png', 'browser',
          <IframeWithLoader src="https://smashkarts.io/" title="Smash Karts" allow="autoplay; fullscreen; gyroscope; accelerometer; gamepad" allowFullScreen />, true
        ); break;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className={`w-full h-full transition-all duration-500 ${showShutdownModal ? 'grayscale pointer-events-none' : ''}`} onClick={() => { isStartOpen && setIsStartOpen(false); setContextMenu(null); }} onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}>
        {/* Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />

        {/* Right-click Context Menu */}
        {contextMenu && (
          <div
            className="fixed border border-gray-400 shadow-[2px_2px_6px_rgba(0,0,0,0.3)] py-1 z-[200] w-[160px] text-xs font-sans select-none"
            style={{ left: contextMenu.x, top: contextMenu.y, background: '#fff', backgroundImage: 'linear-gradient(90deg, rgba(200,220,255,0.3) 1px, transparent 1px), linear-gradient(rgba(200,220,255,0.3) 1px, transparent 1px)', backgroundSize: '6px 6px' }}
          >
            <div className="px-4 py-[3px] hover:bg-[#316ac5] hover:text-white cursor-pointer" onClick={() => setContextMenu(null)}>Arrange Icons By ▸</div>
            <div className="border-t border-gray-200 my-[2px]" />
            <div className="px-4 py-[3px] hover:bg-[#316ac5] hover:text-white cursor-pointer font-bold" onClick={() => { window.location.reload(); setContextMenu(null); }}>Refresh</div>
            <div className="border-t border-gray-200 my-[2px]" />
            <div className="px-4 py-[3px] hover:bg-[#316ac5] hover:text-white cursor-pointer" onClick={() => setContextMenu(null)}>Paste</div>
            <div className="px-4 py-[3px] hover:bg-[#316ac5] hover:text-white cursor-pointer" onClick={() => setContextMenu(null)}>Paste Shortcut</div>
            <div className="border-t border-gray-200 my-[2px]" />
            <div className="px-4 py-[3px] hover:bg-[#316ac5] hover:text-white cursor-pointer" onClick={() => setContextMenu(null)}>New ▸</div>
            <div className="border-t border-gray-200 my-[2px]" />
            <div className="px-4 py-[3px] hover:bg-[#316ac5] hover:text-white cursor-pointer" onClick={() => { setContextMenu(null); setShowProperties(true); }}>Properties</div>
          </div>
        )}

        {/* Desktop Icons */}
        <div className="relative z-10 w-full h-full p-4 flex flex-row sm:flex-col items-start content-start flex-wrap gap-2 sm:gap-4" onContextMenu={(e) => e.preventDefault()}>
          <DesktopIcon label="About Me" icon={<img src={XP_ICONS.aboutMe} alt="" className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" />} onClick={() => handleStartMenuItemClick('aboutme')} />
          <DesktopIcon label="My Resume" icon={<img src={XP_ICONS.resume} alt="" className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" />} onClick={() => handleStartMenuItemClick('resume')} />
          <DesktopIcon label="My Projects" icon={<img src={XP_ICONS.projects} alt="" className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" />} onClick={() => handleStartMenuItemClick('projects')} />
          <DesktopIcon label="Contact Me" icon={<img src={XP_ICONS.contact} alt="" className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" />} onClick={() => handleStartMenuItemClick('contact')} />
          <DesktopIcon label="Terminal" icon={<img src={XP_ICONS.terminal} alt="" className="w-12 h-12 object-contain drop-shadow-md pointer-events-none" />} onClick={() => handleStartMenuItemClick('terminal')} />
        </div>

        {/* Windows */}
        <div className="absolute inset-0 bottom-[30px] z-20 pointer-events-none">
          <AnimatePresence>
            {windows.map((win) => (
              <Window
                key={win.id}
                title={win.title}
                icon={win.icon}
                zIndex={win.zIndex}
                isFocused={win.zIndex === nextZIndex - 1}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                address={win.title}
                hideToolbar={win.type === 'system'}
                initialWidth={win.initialWidth || 800}
                initialHeight={win.initialHeight || 600}
                isMinimized={win.isMinimized}
              >
                {win.content}
              </Window>
            ))}
          </AnimatePresence>
        </div>

        {/* Welcome Balloon */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-[40px] right-4 z-[500] max-w-xs bg-[#ffffe1] border border-black rounded-[6px] shadow-[2px_2px_5px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-[#3888e9] to-[#2262b8] px-2 py-1">
                <span className="font-bold text-white text-xs">Welcome</span>
                <button onClick={() => setShowWelcome(false)} className="text-white/80 hover:bg-white/20 rounded p-0.5"><X size={12} /></button>
              </div>
              <div className="p-3 flex gap-3">
                <Info size={28} className="text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-gray-800">
                  <p className="font-bold mb-1">Welcome to Samarth&apos;s XP!</p>
                  <p>Click around to explore. Open apps from the desktop icons or Start menu.</p>
                </div>
              </div>
              <div className="absolute -bottom-[6px] right-8 w-3 h-3 bg-[#ffffe1] border-r border-b border-black rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Menu */}
        <AnimatePresence>
          {isStartOpen && <StartMenu onItemClick={handleStartMenuItemClick} onShutdownClick={() => { setIsStartOpen(false); setShowShutdownModal(true); }} />}
        </AnimatePresence>

        {/* Taskbar */}
        <Taskbar
          onToggleStart={() => setIsStartOpen(!isStartOpen)}
          isStartOpen={isStartOpen}
          openWindows={windows}
          onWindowClick={(id) => {
            const win = windows.find((w) => w.id === id);
            if (win?.isMinimized) { focusWindow(id); setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))); }
            else if (win?.zIndex === nextZIndex - 1) minimizeWindow(id);
            else focusWindow(id);
          }}
          onCloseWindow={closeWindow}
          isCrtEnabled={isCrtEnabled}
          onToggleCrt={toggleCrt}
        />
      </div>

      <AnimatePresence>
        {showShutdownModal && <ShutdownModal onRestart={onRestart} onLogOff={onLogOut} onCancel={() => setShowShutdownModal(false)} />}
      </AnimatePresence>

      {/* Properties Modal */}
      {showProperties && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowProperties(false)} />
          <div className="relative w-[400px] bg-[#ece9d8] border border-gray-500 shadow-[3px_3px_8px_rgba(0,0,0,0.4)] font-sans select-none z-10">
            <div className="h-[28px] bg-gradient-to-b from-[#0058ee] via-[#3593ff] to-[#288eff] flex items-center justify-between px-2 rounded-t-[3px]">
              <span className="text-white text-xs font-bold">Display Properties</span>
              <button onClick={() => setShowProperties(false)} className="w-[18px] h-[18px] bg-[#e81123] rounded-[2px] flex items-center justify-center border border-white/40 hover:bg-[#f4606c] text-white text-[10px]">✕</button>
            </div>
            <div className="p-4">
              <div className="bg-[#316ac5] rounded p-3 mb-3 flex items-center justify-center h-[120px]">
                <div className="w-[160px] h-[100px] bg-cover bg-center border-2 border-gray-600 rounded-sm" style={{ backgroundImage: `url(${wallpaper})` }} />
              </div>
              <p className="text-xs text-gray-700 mb-2 font-bold">Background:</p>
              <div className="border border-gray-400 bg-white max-h-[120px] overflow-y-auto">
                {WALLPAPERS.map((wp) => (
                  <div
                    key={wp.name}
                    onClick={() => setWallpaper(wp.url)}
                    className={`px-3 py-1 text-xs cursor-pointer ${wallpaper === wp.url ? 'bg-[#316ac5] text-white' : 'hover:bg-blue-100'}`}
                  >
                    {wp.name}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowProperties(false)} className="px-4 py-1 bg-[#ece9d8] border border-gray-400 text-xs hover:bg-gray-200 rounded-[2px]">OK</button>
                <button onClick={() => setShowProperties(false)} className="px-4 py-1 bg-[#ece9d8] border border-gray-400 text-xs hover:bg-gray-200 rounded-[2px]">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopScreen;
