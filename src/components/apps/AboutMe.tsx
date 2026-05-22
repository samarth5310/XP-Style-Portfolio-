'use client';
import React, { useState } from 'react';
import { ASSETS, XP_ICONS, TEXT } from '@/constants';
import { ChevronUp } from 'lucide-react';

const SidebarSection = ({ title, children, isOpen = true }: { title: string; children: React.ReactNode; isOpen?: boolean }) => {
  const [expanded, setExpanded] = useState(isOpen);
  return (
    <div className="mb-3 w-full">
      <div className="relative h-[25px] rounded-t-[3px] overflow-hidden cursor-pointer select-none group" onClick={() => setExpanded(!expanded)}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#215dc6] to-[#90b6ea] z-0 group-hover:brightness-110" />
        <div className="relative z-10 flex items-center justify-between px-3 h-full">
          <span className="font-bold text-white text-[11px] drop-shadow-sm">{title}</span>
          <div className="w-[18px] h-[18px] bg-white/20 rounded-full flex items-center justify-center border border-white/40">
            <ChevronUp size={14} className={`text-white stroke-[3] transition-transform duration-200 ${expanded ? '' : 'rotate-180'}`} />
          </div>
        </div>
      </div>
      <div className={`bg-[#d6dff7] border-l border-r border-b border-white p-3 text-[11px] flex flex-col gap-1.5 ${!expanded ? 'hidden' : 'block'}`}>
        {children}
      </div>
    </div>
  );
};

const AboutMe = () => {
  const skills = ['React / Next.js', 'TypeScript / JavaScript', 'Python / Java', 'Node.js / Flask / FastAPI', 'Tailwind CSS', 'PostgreSQL / MongoDB', 'Supabase / Firebase', 'Git / GitHub Actions', 'Linux / GCP', 'Data Structures & Algorithms'];
  const tools = [
    { name: 'VS Code', icon: XP_ICONS.vscode },
    { name: 'Git', icon: XP_ICONS.git },
    { name: 'Figma', icon: XP_ICONS.figma },
    { name: 'Docker', icon: XP_ICONS.docker },
  ];

  return (
    <div className="flex h-full w-full bg-[#f6f6f6] overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-[200px] bg-gradient-to-b from-[#748ec2] to-[#627dbe] p-3 overflow-y-auto shrink-0">
        <SidebarSection title="Social Links">
          <div className="flex items-center gap-2 cursor-pointer hover:underline p-1" onClick={() => window.open(TEXT.github, '_blank')}>
            <img src={XP_ICONS.github} className="w-4 h-4 object-contain" alt="" />
            <span className="text-[#003399]">GitHub</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:underline p-1" onClick={() => window.open(TEXT.linkedin, '_blank')}>
            <img src={XP_ICONS.linkedin} className="w-4 h-4 object-contain" alt="" />
            <span className="text-[#003399]">LinkedIn</span>
          </div>
        </SidebarSection>

        <SidebarSection title="Skills">
          {skills.map((s) => (
            <div key={s} className="flex items-start gap-2 text-[#003399] pl-1">
              <div className="w-1 h-1 bg-[#003399] rounded-full mt-1.5 shrink-0" />
              <span className="leading-tight">{s}</span>
            </div>
          ))}
        </SidebarSection>

        <SidebarSection title="Tools">
          {tools.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-[#003399] pl-1">
              <img src={item.icon} className="w-4 h-4 object-contain" alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </SidebarSection>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="bg-gradient-to-r from-[#628ad7] to-[#f6f6f6] p-6 flex items-center justify-between mb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">About Me</h1>
          <img src={XP_ICONS.aboutMe} className="w-12 h-12 drop-shadow-md opacity-80" alt="" />
        </div>

        <div className="px-8 pb-12 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
            <div className="shrink-0">
              <img src={ASSETS.avatar} alt="Samarth" className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200" />
            </div>
            <div className="text-sm leading-relaxed text-gray-800 pt-2">
              <p className="mb-4">
                I&apos;m <strong>{TEXT.name}</strong>, a B.E. Computer Science student at Biluru Gurubasava Mahaswamiji Institute of Technology, Mudhol (2023-2027). Based in {TEXT.location}.
              </p>
              <p className="mb-4">
                I&apos;m focused on cybersecurity, cloud technologies, and full-stack web development. I build secure, scalable applications using React, TypeScript, Node.js, and cloud platforms like Supabase and Firebase.
              </p>
              <p>
                Certified in AWS Solutions Architecture, Cybersecurity Foundations, and Network Security. Currently seeking internships to gain industry experience.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <p>📧 {TEXT.email}</p>
              <p>📱 {TEXT.phone}</p>
              <p>📍 {TEXT.location}</p>
              <p>🔗 <a href={TEXT.github} target="_blank" className="text-blue-600 hover:underline">github.com/samarth5310</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
