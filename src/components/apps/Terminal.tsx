'use client';
import React, { useState, useRef, useEffect } from 'react';
import { TEXT } from '@/constants';

const commands: Record<string, string> = {
  help: 'Available commands: help, about, skills, projects, contact, education, clear, date, whoami',
  about: `${TEXT.name} - ${TEXT.role} from ${TEXT.location}.\nPassionate about building modern web applications with React, Next.js & TypeScript.`,
  skills: 'Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, Python\nDatabase: MongoDB, PostgreSQL\nTools: Git, GitHub, VS Code, Vercel',
  projects: '1. Dishlyst - Food Comparison App (TypeScript/React)\n2. Techathon Certificate Generator (JavaScript/Node.js)\n3. Techathon Live Dashboard (TypeScript/React)\n4. Visiona Admission Form Builder (TypeScript/React)',
  contact: `Email: ${TEXT.email}\nPhone: ${TEXT.phone}\nGitHub: ${TEXT.github}\nLinkedIn: ${TEXT.linkedin}`,
  education: 'BCA - Rani Channamma University, Bagalkot (2022-2025)',
  date: new Date().toString(),
  whoami: `C:\\Users\\${TEXT.name.split(' ')[0]}`,
};

const Terminal = () => {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: '', output: 'Microsoft(R) Windows XP [Version 5.1.2600]\n(C) Copyright 1985-2001 Microsoft Corp.\n\nType "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (cmd === 'clear') { setHistory([]); }
    else {
      const output = commands[cmd] || `'${input}' is not recognized as an internal or external command.`;
      setHistory((h) => [...h, { cmd: input, output }]);
    }
    setInput('');
  };

  return (
    <div className="h-full bg-black text-[#c0c0c0] font-mono text-xs flex flex-col">
      <pre className="flex-1 overflow-auto p-2 whitespace-pre-wrap m-0">
        {history.map((entry, i) => (
          <span key={i}>
            {entry.cmd && <><span className="text-gray-400">C:\Users\{TEXT.name.split(' ')[0]}&gt;</span>{entry.cmd}{'\n'}</>}
            {entry.output}{'\n\n'}
          </span>
        ))}
        <span ref={endRef} />
      </pre>
      <form onSubmit={handleSubmit} className="flex items-center gap-1 px-2 pb-2 bg-black">
        <span className="text-gray-400 shrink-0">C:\Users\{TEXT.name.split(' ')[0]}&gt;</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent outline-none text-[#c0c0c0] border-none font-mono text-xs" autoFocus />
      </form>
    </div>
  );
};

export default Terminal;
