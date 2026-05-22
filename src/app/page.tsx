'use client';
import React, { useState } from 'react';
import LoadingScreen from '@/components/screens/LoadingScreen';
import LoginScreen from '@/components/screens/LoginScreen';
import DesktopScreen from '@/components/screens/DesktopScreen';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCrtEnabled, setIsCrtEnabled] = useState(true);

  return (
    <div className="w-screen h-screen overflow-hidden font-sans text-base relative bg-black select-none">
      {/* CRT Overlay */}
      {isCrtEnabled && <div className="pointer-events-none fixed inset-0 z-[9999] crt-overlay" />}

      {/* Desktop */}
      {isLoggedIn && (
        <div className="absolute inset-0 z-0">
          <DesktopScreen
            onRestart={() => { setIsLoggedIn(false); setIsBooting(true); }}
            onLogOut={() => setIsLoggedIn(false)}
            isCrtEnabled={isCrtEnabled}
            toggleCrt={() => setIsCrtEnabled(!isCrtEnabled)}
          />
        </div>
      )}

      {/* Login Screen */}
      <AnimatePresence>
        {!isLoggedIn && (
          <motion.div
            key="login-layer"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, transition: { duration: 1, ease: 'easeInOut' } }}
          >
            <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Boot Screen */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            key="boot-layer"
            className="absolute inset-0 z-20"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <LoadingScreen onComplete={() => setIsBooting(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
