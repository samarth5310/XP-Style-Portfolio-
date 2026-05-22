'use client';
import React from 'react';
import { Search, LayoutGrid, Globe, Code2, ExternalLink } from 'lucide-react';
import { PROJECTS, ASSETS } from '@/constants';

interface MyProjectsProps {
  onOpenProject?: (url: string, title: string) => void;
}

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
        {project.github && (
          <a href={project.github} target="_blank" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-white/10 rounded">
            <Code2 size={14} className="text-gray-400" />
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-white/10 rounded">
            <ExternalLink size={14} className="text-gray-400" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const MyProjects: React.FC<MyProjectsProps> = ({ onOpenProject }) => (
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
        {/* Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="bg-gradient-to-br from-[#1a1a1a] to-[#000] rounded-xl p-8 border border-gray-800 flex flex-col justify-center cursor-pointer hover:border-gray-600 transition-colors"
            onClick={() => onOpenProject?.(PROJECTS[3].live!, PROJECTS[3].title)}
          >
            <h2 className="text-2xl font-bold mb-2">{PROJECTS[3].title}</h2>
            <p className="text-gray-300 text-sm mb-4">{PROJECTS[3].description}</p>
            <button className="bg-[#00c853] text-white font-bold py-2 px-6 rounded w-max hover:bg-[#00e676] text-sm">
              View Project &gt;
            </button>
          </div>
          <div
            className="bg-gradient-to-br from-[#1e4fb8] to-[#0b0b0b] rounded-xl p-8 border border-gray-800 flex flex-col justify-center cursor-pointer hover:border-gray-600 transition-colors"
            onClick={() => onOpenProject?.(PROJECTS[1].live!, PROJECTS[1].title)}
          >
            <h2 className="text-2xl font-bold mb-2">{PROJECTS[1].title}</h2>
            <p className="text-gray-300 text-sm mb-4">{PROJECTS[1].description}</p>
            <button className="bg-[#e75a25] text-white font-bold py-2 px-6 rounded w-max hover:bg-[#ff7043] text-sm">
              View Live &gt;
            </button>
          </div>
        </div>

        {/* Grid */}
        <h3 className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-4">All Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => p.live && onOpenProject?.(p.live, p.title)} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MyProjects;
