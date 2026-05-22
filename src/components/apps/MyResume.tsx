'use client';
import React, { useRef, useState, useEffect } from 'react';
import { ZoomIn, Save, Mail, MapPin, Globe } from 'lucide-react';
import { TEXT, ASSETS } from '@/constants';

const ToolbarButton = ({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick?: () => void }) => (
  <button className="flex flex-col items-center justify-center px-3 py-1 hover:bg-[#b6bdd2] active:bg-[#8592b5] border border-transparent hover:border-[#0a246a]/30 rounded-[2px] group" onClick={onClick}>
    <Icon size={20} className="text-gray-700 group-hover:text-black mb-0.5" />
    <span className="text-[10px] text-gray-600 group-hover:text-black leading-none">{label}</span>
  </button>
);

const ResumeSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="font-serif text-xl italic text-black border-b border-black/20 pb-1 mb-3">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const MyResume = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const computeScale = () => {
    if (!viewportRef.current || !paperRef.current) return 1;
    const { clientWidth, clientHeight } = viewportRef.current;
    const pw = paperRef.current.offsetWidth || 794;
    const ph = paperRef.current.offsetHeight || 1123;
    return Math.min(1.5, Math.max(0.2, Math.min((clientWidth - 40) / pw, (clientHeight - 40) / ph)));
  };

  useEffect(() => {
    const update = () => setScale(computeScale());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#525252] font-sans select-text">
      <div className="h-[50px] bg-[#ece9d8] border-b border-[#aca899] flex items-center px-2 gap-1 shrink-0">
        <ToolbarButton icon={ZoomIn} label="Zoom" />
        <ToolbarButton icon={Save} label="Save" onClick={() => window.open('/resume.pdf')} />
        <div className="w-[1px] h-[30px] bg-[#aca899] mx-1" />
        <ToolbarButton icon={Mail} label="Contact" onClick={() => window.open(`mailto:${TEXT.email}`)} />
      </div>

      <div ref={viewportRef} className="flex-1 overflow-hidden relative bg-[#525252] flex items-center justify-center">
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 0.1s ease-out' }}>
          <div ref={paperRef} className="w-[210mm] min-h-[297mm] bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-full md:w-[240px] bg-[#1a1a1a] text-gray-300 p-6 flex flex-col shrink-0">
              <div className="w-[120px] h-[120px] rounded-[4px] border-4 border-[#333] overflow-hidden mx-auto mb-6 shadow-lg">
                <img src={ASSETS.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="mb-8">
                <h3 className="text-[#4ade80] font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-700 pb-1">About Me</h3>
                <div className="space-y-3 text-[11px]">
                  <div className="flex items-center gap-2"><MapPin size={12} className="text-gray-500" /><span>{TEXT.location}</span></div>
                  <div className="flex items-center gap-2"><Mail size={12} className="text-gray-500" /><span className="truncate">{TEXT.email}</span></div>
                  <div className="flex items-center gap-2"><Globe size={12} className="text-gray-500" /><span>github.com/samarth5310</span></div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-[#4ade80] font-bold uppercase tracking-wider text-xs mb-4 border-b border-gray-700 pb-1">Tech Stack</h3>
                <div className="space-y-1 text-[11px] text-gray-400">
                  {['React / Next.js', 'TypeScript / JavaScript', 'Node.js / Express', 'Tailwind CSS', 'MongoDB / PostgreSQL', 'Git & GitHub', 'Python', 'Vercel / Netlify'].map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 p-8 md:p-10 text-gray-800">
              <div className="text-center mb-10">
                <h1 className="text-5xl font-black uppercase tracking-tight mb-2">
                  {TEXT.name.split(' ')[0]} <span className="font-light">{TEXT.name.split(' ')[1]}</span>
                </h1>
                <h2 className="font-serif italic text-2xl text-gray-500">{TEXT.role}</h2>
              </div>

              <ResumeSection title="Experience">
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-sm">Full Stack Developer</h4>
                    <span className="text-xs text-gray-600 font-mono">2023 – Present</span>
                  </div>
                  <div className="text-xs text-gray-700 font-semibold mb-2">Freelance / Personal Projects</div>
                  <ul className="list-disc list-outside ml-4 text-[11px] text-gray-600 space-y-1">
                    <li>Built Dishlyst food comparison app with React & TypeScript</li>
                    <li>Developed Techathon certificate generator & live dashboard</li>
                    <li>Created Visiona admission form builder for educational institutions</li>
                    <li>Deployed applications on Vercel, Netlify, and Render</li>
                  </ul>
                </div>
              </ResumeSection>

              <ResumeSection title="Skills">
                <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                  {['React / Next.js', 'TypeScript', 'Node.js / Express', 'Tailwind CSS', 'MongoDB / PostgreSQL', 'REST APIs', 'Git & GitHub', 'Python'].map((s) => (
                    <div key={s} className="flex items-center gap-2"><span className="w-1 h-1 bg-black rounded-full" />{s}</div>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Education">
                <div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Bachelor of Computer Applications (BCA)</span>
                    <span className="font-normal text-xs">2022 – 2025</span>
                  </div>
                  <div className="text-xs text-gray-600">Rani Channamma University, Bagalkot</div>
                </div>
              </ResumeSection>

              <ResumeSection title="Projects">
                <div className="grid grid-cols-1 gap-2 text-[11px]">
                  <div><strong>Dishlyst</strong> – Food comparison app (TypeScript, React, Next.js)</div>
                  <div><strong>Techathon Certificates</strong> – Auto certificate generator (JavaScript, Node.js)</div>
                  <div><strong>Techathon Dashboard</strong> – Real-time event dashboard (TypeScript, React)</div>
                  <div><strong>Visiona Edu</strong> – Admission form builder (TypeScript, React)</div>
                </div>
              </ResumeSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResume;
