'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white select-none relative overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Original XP Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_XP_-_Logo_%28Edited%29.svg/1200px-Windows_XP_-_Logo_%28Edited%29.svg.png"
          alt="Windows XP Logo"
          className="w-40 h-40 sm:w-52 sm:h-52 object-contain mb-6 drop-shadow-[0_0_30px_rgba(100,150,255,0.3)]"
        />

        {/* Name with XP superscript */}
        <div className="text-center mb-2">
          <h1 className="font-bold text-4xl sm:text-6xl tracking-tight">
            {TEXT.name}
            <sup className="text-2xl sm:text-3xl ml-1 text-[#e75a25] top-[-0.8em]">xp</sup>
          </h1>
          <p className="text-lg sm:text-xl italic font-light text-gray-300 mt-1">
            {TEXT.role}
          </p>
        </div>

        {/* XP Boot Progress Bar */}
        <div className="mt-12 w-[280px] sm:w-[320px] h-[20px] border-[2px] border-[#b2b2b2] rounded-[4px] p-[3px] relative overflow-hidden bg-black">
          <motion.div
            className="absolute top-[3px] bottom-[3px] flex gap-[2px]"
            initial={{ x: -100 }}
            animate={{ x: 350 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-[18px] h-full rounded-[2px]"
                style={{
                  background: 'linear-gradient(to bottom, #5d94fb 0%, #1e4db7 100%)',
                  boxShadow: 'inset 0px 1px 2px rgba(255,255,255,0.4), 0 0 2px rgba(0,0,0,0.5)',
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-xs sm:text-sm text-gray-500 italic">
        {TEXT.brand} &reg;
      </div>
    </div>
  );
};

export default LoadingScreen;
