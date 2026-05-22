'use client';
import React, { useState } from 'react';
import { Search, LayoutGrid, Globe, Code2, ExternalLink, ArrowLeft, Home, ArrowRight, Star, Sun, Moon } from 'lucide-react';
import { PROJECTS, ASSETS, TEXT } from '@/constants';

const ProjectCard = ({ project, dark, onClick }: { project: typeof PROJECTS[0]; dark: boolean; onClick?: () => void }) => (
  <div onClick={onClick} className={`rounded-lg overflow-hidden border transition-all cursor-pointer group ${dark ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-blue-400 shadow-sm'}`}>
    <div className={`h-[130px] w-full ${project.color} relative overflow-hidden flex items-center justify-center`}>
      <span className="text-white text-3xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">{project.title[0]}</span>
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">{project.tech[0]}</div>
    </div>
    <div className={`p-3 flex items-center gap-3 ${dark ? '' : 'bg-gray-50'}`}>
      <div className="w-7 h-7 rounded-full bg-gray-700 overflow-hidden border border-gray-600 shrink-0">
        <img src={ASSETS.avatar} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className={`text-sm font-bold truncate ${dark ? 'text-white' : 'text-gray-900'}`}>{project.title}</span>
        <span className={`text-xs truncate ${dark ? 'text-gray-500' : 'text-gray-600'}`}>{project.category}</span>
      </div>
      <div className="flex gap-1 shrink-0">
        <a href={project.github} target="_blank" onClick={(e) => e.stopPropagation()} className={`p-1 rounded hover:bg-white/10 ${dark ? 'text-gray-400' : 'text-gray-600'}`}><Code2 size={14} /></a>
        {project.live && <a href={project.live} target="_blank" onClick={(e) => e.stopPropagation()} className={`p-1 rounded hover:bg-white/10 ${dark ? 'text-gray-400' : 'text-gray-600'}`}><ExternalLink size={14} /></a>}
      </div>
    </div>
  </div>
);

const MyProjects = () => {
  const [viewingUrl, setViewingUrl] = useState<string | null>(null);
  const [viewingTitle, setViewingTitle] = useState('');
  const [dark, setDark] = useState(true);

  if (viewingUrl) {
    return (
      <div className="flex flex-col h-full w-full bg-black">
        <div className="h-[40px] bg-[#1a1a1a] border-b border-gray-800 flex items-center px-3 gap-3 shrink-0">
          <button onClick={() => setViewingUrl(null)} className="flex items-center gap-1 text-gray-300 hover:text-white text-xs"><ArrowLeft size={14} /> Back</button>
          <span className="text-gray-500 text-xs">|</span>
          <span className="text-white text-xs truncate flex-1">{viewingTitle}</span>
          <a href={viewingUrl} target="_blank" className="text-gray-400 hover:text-white"><ExternalLink size={14} /></a>
        </div>
        <iframe src={viewingUrl} className="flex-1 w-full border-none bg-white" title={viewingTitle} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full w-full font-sans ${dark ? 'bg-[#0a0a0a] text-white' : 'bg-[#f5f5f5] text-gray-900'}`}>
      {/* Toolbar */}
      <div className={`h-[40px] flex items-center px-2 gap-1 shrink-0 border-b ${dark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
        <button className={`p-1.5 rounded hover:bg-gray-200/20 ${dark ? 'text-gray-400' : 'text-gray-600'}`}><Home size={16} /></button>
        <button className={`p-1.5 rounded hover:bg-gray-200/20 ${dark ? 'text-gray-400' : 'text-gray-600'}`}><ArrowLeft size={16} /></button>
        <button className={`p-1.5 rounded hover:bg-gray-200/20 ${dark ? 'text-gray-400' : 'text-gray-600'}`}><ArrowRight size={16} /></button>
        <button className={`p-1.5 rounded hover:bg-gray-200/20 ${dark ? 'text-gray-400' : 'text-gray-600'}`}><Star size={16} /></button>
        <button onClick={() => setDark(!dark)} className={`p-1.5 rounded hover:bg-gray-200/20 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <span className={`text-xs ml-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Light/Dark</span>
      </div>

      {/* Address Bar */}
      <div className={`h-[30px] flex items-center px-3 gap-2 shrink-0 border-b ${dark ? 'bg-[#111] border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
        <Globe size={12} className={dark ? 'text-gray-500' : 'text-gray-400'} />
        <span className={`text-xs ${dark ? 'text-gray-300' : 'text-gray-700'}`}>https://projects.samarthkulkarni.com</span>
        <div className="ml-auto flex items-center gap-3">
          <a href={TEXT.linkedin} target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-4 h-4 rounded-sm" alt="LinkedIn" /></a>
          <a href="https://instagram.com" target="_blank"><img src="https://www.google.com/s2/favicons?domain=instagram.com&sz=64" className="w-4 h-4" alt="Instagram" /></a>
          <a href={TEXT.github} target="_blank"><img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" className="w-4 h-4 rounded-full" alt="GitHub" /></a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">My Projects</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input type="text" placeholder="Search" className={`rounded-full pl-9 pr-4 py-1.5 text-xs focus:outline-none w-[180px] border ${dark ? 'bg-[#1a1a1a] border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-800'}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {PROJECTS.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                dark={dark}
                onClick={() => {
                  if (p.live) { setViewingUrl(p.live); setViewingTitle(p.title); }
                  else { setViewingUrl(p.github); setViewingTitle(p.title); }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
