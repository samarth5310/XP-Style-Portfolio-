'use client';
import React, { useState } from 'react';

export default function IframeWithLoader({ src, title, allow, allowFullScreen, className = '' }: { src: string; title: string; allow?: string; allowFullScreen?: boolean; className?: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <div className="w-[200px] h-[18px] border-[2px] border-[#b2b2b2] rounded-[4px] p-[2px] overflow-hidden bg-white">
            <div className="h-full bg-[#3593ff] rounded-[2px] animate-[loading_1.5s_ease-in-out_infinite]" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Loading {title}...</p>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        allow={allow}
        allowFullScreen={allowFullScreen}
        className="w-full h-full border-none"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
