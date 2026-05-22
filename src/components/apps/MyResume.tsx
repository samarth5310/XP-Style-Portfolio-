'use client';
import React from 'react';
import { ZoomIn, Save, Mail } from 'lucide-react';
import { TEXT } from '@/constants';

const ToolbarButton = ({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick?: () => void }) => (
  <button className="flex flex-col items-center justify-center px-3 py-1 hover:bg-[#b6bdd2] active:bg-[#8592b5] border border-transparent hover:border-[#0a246a]/30 rounded-[2px] group" onClick={onClick}>
    <Icon size={20} className="text-gray-700 group-hover:text-black mb-0.5" />
    <span className="text-[10px] text-gray-600 group-hover:text-black leading-none">{label}</span>
  </button>
);

const MyResume = () => {
  return (
    <div className="flex flex-col h-full bg-[#525252] font-sans">
      <div className="h-[50px] bg-[#ece9d8] border-b border-[#aca899] flex items-center px-2 gap-1 shrink-0">
        <ToolbarButton icon={ZoomIn} label="Zoom" />
        <ToolbarButton icon={Save} label="Download" onClick={() => {
          const a = document.createElement('a');
          a.href = '/resume.pdf';
          a.download = 'Samarth_Kulkarni_Resume.pdf';
          a.click();
        }} />
        <div className="w-[1px] h-[30px] bg-[#aca899] mx-1" />
        <ToolbarButton icon={Mail} label="Contact" onClick={() => window.open(`mailto:${TEXT.email}`)} />
      </div>

      <div className="flex-1 overflow-hidden">
        <iframe
          src="/resume.pdf"
          className="w-full h-full border-none"
          title="Resume"
        />
      </div>
    </div>
  );
};

export default MyResume;
