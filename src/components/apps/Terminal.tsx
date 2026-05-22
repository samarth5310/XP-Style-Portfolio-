'use client';
import React, { useState, useRef, useEffect } from 'react';
import { TEXT } from '@/constants';
import { playSound } from '@/hooks/useSound';

const commands: Record<string, string> = {
  help: 'Available commands: help, about, skills, projects, contact, education, certs, clear, date, whoami',
  about: `${TEXT.name} - ${TEXT.role} from ${TEXT.location}.\nB.Tech CS student focused on cybersecurity, cloud technologies, and full-stack web development.`,
  skills: 'Languages: Python, Java, SQL, JavaScript, TypeScript, HTML/CSS\nFrameworks: React, Node.js, Flask, FastAPI, Tailwind CSS\nDatabases: PostgreSQL, MongoDB, Supabase, Firebase\nTools: Git, GitHub Actions, Linux, Google Cloud Platform, VS Code',
  projects: '1. DishLyst - Food Comparison App (React, TypeScript, Supabase, PostgreSQL)\n2. Education Admin System - 200+ student records (React, MongoDB, Supabase)\n3. Techathon Certificate Generator - 500+ bulk certs (React, Firebase, PDF)\n4. Techathon Live Dashboard (TypeScript, React)',
  contact: `Email: ${TEXT.email}\nPhone: ${TEXT.phone}\nGitHub: ${TEXT.github}\nLinkedIn: ${TEXT.linkedin}`,
  education: 'B.E. Computer Science Engineering\nBiluru Gurubasava Mahaswamiji Institute of Technology, Mudhol\n2023 - 2027 | CGPA: 7.50',
  certs: 'AWS APAC - Solutions Architecture Job Simulation\nFoundations of Cybersecurity\nConnect and Protect: Networks and Network Security\nPlay It Safe: Manage Security Risks\nWhat is Data Science?\nAlgorithmic Thinking (Part 1)',
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
      if (!commands[cmd]) playSound('error');
      setHistory((h) => [...h, { cmd: input, output }]);
    }
    setInput('');
  };

  return (
    <div className="h-full bg-black text-[#c0c0c0] font-mono text-xs flex flex-col">
      <pre className="flex-1 overflow-auto p-2 whitespace-pre-wrap m-0 pb-0">
        {history.map((entry, i) => (
          <span key={i}>
            {entry.cmd && <><span className="text-gray-400">C:\Users\{TEXT.name.split(' ')[0]}&gt;</span>{entry.cmd}{'\n'}</>}
            {entry.output}{'\n'}
          </span>
        ))}
        <span ref={endRef} />
      </pre>
      <form onSubmit={handleSubmit} className="flex items-center gap-1 px-2 py-1 bg-black shrink-0">
        <span className="text-gray-400 shrink-0">C:\Users\{TEXT.name.split(' ')[0]}&gt;</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent outline-none text-[#c0c0c0] border-none font-mono text-xs" autoFocus />
      </form>
    </div>
  );
};

export default Terminal;
