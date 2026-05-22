'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, TEXT, XP_ICONS } from '@/constants';
import { ChevronRight } from 'lucide-react';

const RECENT_ITEMS = [
  { label: 'VS Code', icon: XP_ICONS.vscode },
  { label: 'Git', icon: XP_ICONS.git },
  { label: 'Figma', icon: XP_ICONS.figma },
  { label: 'Docker', icon: XP_ICONS.docker },
  { label: 'GitHub CoPilot', icon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' },
  { label: 'ChatGPT', icon: 'https://cdn.oaistatic.com/assets/favicon-o20kmmos.svg' },
  { label: 'Claude', icon: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=64' },
  { label: 'Cursor', icon: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=64' },
  { label: 'MongoDB Compass', icon: 'https://www.google.com/s2/favicons?domain=mongodb.com&sz=64' },
  { label: 'Postman', icon: 'https://www.google.com/s2/favicons?domain=postman.com&sz=64' },
  { label: 'Node.js', icon: 'https://nodejs.org/static/images/favicons/favicon.png' },
  { label: 'OBS Studio', icon: XP_ICONS.vscode },
];

interface StartMenuProps {
  onItemClick: (id: string) => void;
  onShutdownClick: () => void;
}

const StartMenuItem = ({ icon, label, subLabel, isBold, onClick }: { icon: string; label: string; subLabel?: string; isBold?: boolean; onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center px-2 py-1 cursor-default text-black hover:bg-[#316ac5] hover:text-white group transition-colors duration-75">
    <img src={icon} alt={label} className="w-8 h-8 mr-2 object-contain drop-shadow-sm" />
    <div className="flex flex-col justify-center">
      <span className={`${isBold ? 'font-bold' : 'font-normal'} text-sm leading-tight`}>{label}</span>
      {subLabel && <span className="text-[10px] text-gray-500 group-hover:text-blue-100 leading-tight">{subLabel}</span>}
    </div>
  </div>
);

const StartMenuRightItem = ({ icon, label, isBold, hasArrow, onClick, onMouseEnter, onMouseLeave }: { icon: string; label: string; isBold?: boolean; hasArrow?: boolean; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void }) => (
  <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="flex items-center px-2 py-[3px] cursor-default hover:bg-[#316ac5] hover:text-white group transition-colors duration-75 relative">
    <img src={icon} alt={label} className="w-6 h-6 mr-2 object-contain" />
    <span className={`text-sm ${isBold ? 'font-bold' : ''} text-[#00135c] group-hover:text-white`}>{label}</span>
    {hasArrow && <ChevronRight className="ml-auto text-[#00135c] group-hover:text-white w-4 h-4" />}
  </div>
);

const AllProgramsItem = ({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-xs text-black group">
    <img src={icon} alt={label} className="w-4 h-4 mr-2 object-contain" />
    <span>{label}</span>
  </div>
);

const StartMenu: React.FC<StartMenuProps> = ({ onItemClick, onShutdownClick }) => {
  const [showRecent, setShowRecent] = useState(false);
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-[30px] left-0 w-full sm:w-[380px] md:w-[420px] rounded-t-lg shadow-[4px_4px_8px_rgba(0,0,0,0.5)] overflow-visible flex flex-col font-sans select-none z-[60]"
      style={{ background: '#fff', border: '1px solid #316ac5', borderBottom: 'none' }}
    >
      {/* Header */}
      <div className="h-[60px] relative flex items-center px-2 rounded-t-[5px]" style={{ background: 'linear-gradient(to bottom, #1e52b7 0%, #2a6bd9 4%, #1647a7 100%)' }}>
        <div className="w-12 h-12 rounded-[4px] border-[2px] border-white/60 bg-white overflow-hidden shadow-sm">
          <img src={ASSETS.avatar} alt="User" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-bold text-lg ml-3 drop-shadow-md truncate">{TEXT.name}</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 border-t border-[#e58945]">
        {/* Left Column */}
        <div className="flex-1 bg-white flex flex-col py-2 pl-1 pr-1 min-h-[340px]">
          <StartMenuItem icon={XP_ICONS.projects} label="My Projects" subLabel="View my work" isBold onClick={() => onItemClick('projects')} />
          <StartMenuItem icon={XP_ICONS.contact} label="Contact Me" subLabel="Send me a message" isBold onClick={() => onItemClick('contact')} />
          <div className="my-1 mx-2 border-b border-gray-200" />
          <StartMenuItem icon={XP_ICONS.aboutMe} label="About Me" onClick={() => onItemClick('aboutme')} />
          <StartMenuItem icon="https://mitchivin.com/assets/gui/start-menu/music.webp" label="Music Player" onClick={() => onItemClick('music')} />
          <StartMenuItem icon="https://mitchivin.com/assets/gui/start-menu/paint.webp" label="Paint" onClick={() => onItemClick('paint')} />
          <StartMenuItem icon="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/supertuxkart-icon.png" label="Smash Karts" onClick={() => onItemClick('game')} />

          {/* All Programs */}
          <div className="mt-auto pt-2 pb-1 relative">
            <div
              className={`w-full flex items-center justify-center px-2 py-1 cursor-pointer group z-20 relative
                ${showAllPrograms ? 'bg-[#316ac5] text-white' : 'hover:bg-[#316ac5] hover:text-white text-gray-700'}
              `}
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              onMouseEnter={() => setShowAllPrograms(true)}
            >
              <span className={`font-bold text-xs ${showAllPrograms ? 'text-white' : 'group-hover:text-white'}`}>All Programs</span>
              <div className={`ml-2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] ${showAllPrograms ? 'border-l-white' : 'border-l-green-600 group-hover:border-l-white'}`} />
            </div>

            <AnimatePresence>
              {showAllPrograms && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.1 }}
                  className="absolute bottom-0 left-[100%] ml-[-5px] w-[200px] bg-white border border-[#316ac5] shadow-[4px_4px_8px_rgba(0,0,0,0.3)] py-1 z-50 flex flex-col"
                  onMouseLeave={() => setShowAllPrograms(false)}
                >
                  <div className="bg-[#ece9d8] px-2 py-1 font-bold text-xs text-gray-500 border-b border-gray-300 mb-1">Programs</div>
                  <AllProgramsItem icon="https://mitchivin.com/assets/gui/start-menu/paint.webp" label="Paint" onClick={() => onItemClick('paint')} />
                  <AllProgramsItem icon="https://mitchivin.com/assets/gui/start-menu/music.webp" label="Music Player" onClick={() => onItemClick('music')} />
                  <AllProgramsItem icon="https://mitchivin.com/assets/gui/start-menu/photos.webp" label="Image Viewer" onClick={() => onItemClick('imageviewer')} />
                  <AllProgramsItem icon="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/supertuxkart-icon.png" label="Smash Karts" onClick={() => onItemClick('game')} />
                  <AllProgramsItem icon={XP_ICONS.terminal} label="Command Prompt" onClick={() => onItemClick('terminal')} />
                  <AllProgramsItem icon={XP_ICONS.notepad} label="Notepad" onClick={() => onItemClick('terminal')} />
                  <AllProgramsItem icon={XP_ICONS.calc} label="Calculator" />
                  <AllProgramsItem icon={XP_ICONS.projects} label="Internet Explorer" onClick={() => onItemClick('projects')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[180px] bg-[#d3e5fa] border-l border-[#9cbce8] hidden sm:flex flex-col py-2 px-1 text-[#00135c]">
          <StartMenuRightItem icon={XP_ICONS.github} label="GitHub" isBold onClick={() => window.open(TEXT.github, '_blank')} />
          <StartMenuRightItem icon={XP_ICONS.linkedin} label="LinkedIn" isBold onClick={() => window.open(TEXT.linkedin, '_blank')} />
          <div className="my-1 mx-2 border-b border-[#aebcd8]" />

          {/* Recently Used */}
          <div className="relative" onMouseEnter={() => setShowRecent(true)} onMouseLeave={() => setShowRecent(false)}>
            <StartMenuRightItem icon={XP_ICONS.recent} label="Recently Used" hasArrow />
            <AnimatePresence>
              {showRecent && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-[-80px] left-[100%] ml-[2px] w-[210px] bg-white border border-[#316ac5] shadow-[4px_4px_8px_rgba(0,0,0,0.3)] py-1 z-50 flex flex-col max-h-[380px] overflow-y-auto"
                >
                  {RECENT_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex items-center px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-default text-[11px] text-black group">
                      <img src={item.icon} alt={item.label} className="w-4 h-4 mr-2 object-contain opacity-90" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="my-1 mx-2 border-b border-[#aebcd8]" />
          <StartMenuRightItem icon={XP_ICONS.terminal} label="Command Prompt" onClick={() => onItemClick('terminal')} />
          <StartMenuRightItem icon="https://mitchivin.com/assets/gui/start-menu/photos.webp" label="Image Viewer" onClick={() => onItemClick('imageviewer')} />
          <StartMenuRightItem icon="https://mitchivin.com/assets/gui/start-menu/paint.webp" label="Paint" onClick={() => onItemClick('paint')} />
          <StartMenuRightItem icon={XP_ICONS.resume} label="My Resume" onClick={() => onItemClick('resume')} />
        </div>
      </div>

      {/* Footer */}
      <div className="h-[40px] flex items-center justify-end px-3 gap-3 text-white text-sm" style={{ background: 'linear-gradient(to bottom, #4282d6 0%, #316ac5 100%)' }}>
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-80" onClick={onShutdownClick}>
          <img src={XP_ICONS.logoff} alt="Log Off" className="w-5 h-5 bg-[#e59637] rounded-[2px] p-[1px] border border-white/30" />
          <span className="drop-shadow-sm">Log Off</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 ml-2" onClick={onShutdownClick}>
          <img src={XP_ICONS.shutdown} alt="Shut Down" className="w-5 h-5 bg-[#cd381a] rounded-[2px] p-[1px] border border-white/30" />
          <span className="drop-shadow-sm">Shut Down</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StartMenu;
