'use client';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ASSETS, XP_ICONS } from '@/constants';
import Taskbar from '@/components/os/Taskbar';
import DesktopIcon from '@/components/os/DesktopIcon';
import StartMenu from '@/components/os/StartMenu';
import Window from '@/components/os/Window';
import ShutdownModal from '@/components/screens/ShutdownModal';
import { XPWindow } from '@/types';
import MyProjects from '@/components/apps/MyProjects';
import AboutMe from '@/components/apps/AboutMe';
import MyResume from '@/components/apps/MyResume';
import ContactMe from '@/components/apps/ContactMe';
import Terminal from '@/components/apps/Terminal';

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
      case 'projects': openWindow('projects', 'My Projects', XP_ICONS.projects, 'browser', <MyProjects onOpenProject={handleOpenWebLink} />); break;
      case 'aboutme': openWindow('aboutme', 'About Me', XP_ICONS.aboutMe, 'explorer', <AboutMe />); break;
      case 'resume': openWindow('resume', 'My Resume', XP_ICONS.resume, 'system', <MyResume />, true, { initialWidth: 880, initialHeight: 700 }); break;
      case 'contact': openWindow('contact', 'Contact Me', XP_ICONS.contact, 'system', <ContactMe />, true); break;
      case 'terminal': openWindow('terminal', 'Command Prompt', XP_ICONS.terminal, 'system', <Terminal />, true, { initialWidth: 650, initialHeight: 420 }); break;
      case 'paint':
        openWindow('paint', 'Paint', 'https://mitchivin.com/assets/gui/start-menu/paint.webp', 'browser',
          <iframe src="https://jspaint.app" className="w-full h-full border-none" title="Paint" />, true
        ); break;
      case 'music':
        openWindow('music', 'Music Player', 'https://mitchivin.com/assets/gui/start-menu/music.webp', 'browser',
          <iframe src="https://aidn.jp/mikutap/" className="w-full h-full border-none" title="Music Player" allow="autoplay" />, true, { initialWidth: 700, initialHeight: 500 }
        ); break;
      case 'imageviewer':
        openWindow('imageviewer', 'Image Viewer', 'https://mitchivin.com/assets/gui/start-menu/photos.webp', 'browser',
          <iframe src="https://unsplash.com/explore" className="w-full h-full border-none" title="Image Viewer" />, true
        ); break;
      case 'game':
        openWindow('game', 'Smash Karts', 'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/supertuxkart-icon.png', 'browser',
          <iframe src="https://smashkarts.io/" className="w-full h-full border-none" title="Smash Karts" allow="autoplay; fullscreen; gyroscope; accelerometer; gamepad" allowFullScreen />, true
        ); break;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className={`w-full h-full transition-all duration-500 ${showShutdownModal ? 'grayscale pointer-events-none' : ''}`} onClick={() => { isStartOpen && setIsStartOpen(false); setContextMenu(null); }} onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}>
        {/* Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${ASSETS.wallpaper})` }}
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
            <div className="px-4 py-[3px] hover:bg-[#316ac5] hover:text-white cursor-pointer" onClick={() => setContextMenu(null)}>Properties</div>
          </div>
        )}

        {/* Desktop Icons */}
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-start content-start flex-wrap gap-4" onContextMenu={(e) => e.preventDefault()}>
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
    </div>
  );
};

export default DesktopScreen;
