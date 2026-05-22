'use client';
import React, { useState } from 'react';
import { Search, LayoutGrid, Globe, Code2, ExternalLink, ArrowLeft } from 'lucide-react';
import { PROJECTS, ASSETS } from '@/constants';

const ProjectCard = ({ project, onClick }: { project: typeof PROJECTS[0]; onClick?: () => void }) => (
  <div onClick={onClick} className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all cursor-pointer group">
    <div className={`h-[140px] w-full ${project.color} relative overflow-hidden flex items-center justify-center`}>
      <span className="text-white text-3xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">{project.title[0]}</span>
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm border border-white/10">
        {project.tech[0]}
      </div>
    </div>
    <div className="p-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
        <img src={ASSETS.avatar} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-white text-sm font-bold">{project.title}</span>
        <span className="text-gray-500 text-xs">{project.category}</span>
      </div>
      <div className="flex gap-1">
        <a href={project.github} target="_blank" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-white/10 rounded">
          <Code2 size={14} className="text-gray-400" />
        </a>
        {project.live && (
          <a href={project.live} target="_blank" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-white/10 rounded">
            <ExternalLink size={14} className="text-gray-400" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const MyProjects = () => {
  const [viewingUrl, setViewingUrl] = useState<string | null>(null);
  const [viewingTitle, setViewingTitle] = useState('');

  if (viewingUrl) {
    return (
      <div className="flex flex-col h-full w-full bg-black">
        <div className="h-[40px] bg-[#1a1a1a] border-b border-gray-800 flex items-center px-3 gap-3 shrink-0">
          <button onClick={() => setViewingUrl(null)} className="flex items-center gap-1 text-gray-300 hover:text-white text-xs">
            <ArrowLeft size={14} /> Back to Projects
          </button>
          <span className="text-gray-500 text-xs">|</span>
          <span className="text-white text-xs truncate flex-1">{viewingTitle}</span>
          <a href={viewingUrl} target="_blank" className="text-gray-400 hover:text-white">
            <ExternalLink size={14} />
          </a>
        </div>
        <iframe src={viewingUrl} className="flex-1 w-full border-none bg-white" title={viewingTitle} />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-black text-white font-sans">
      {/* Sidebar */}
      <div className="w-[180px] bg-[#0f0f0f] flex flex-col border-r border-gray-800 pt-6 shrink-0">
        <div className="flex items-center gap-3 px-4 py-3 text-white bg-white/10 border-l-2 border-red-500">
          <LayoutGrid size={18} /><span className="text-sm font-medium">All</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer">
          <Globe size={18} /><span className="text-sm font-medium">Web</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col bg-black overflow-hidden">
        <div className="h-[60px] border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
          <span className="text-xl font-bold tracking-tight">My Projects</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input type="text" placeholder="Search" className="bg-[#1a1a1a] border border-gray-700 rounded-full pl-10 pr-4 py-1.5 text-sm text-gray-300 focus:outline-none w-[200px]" />
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
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
