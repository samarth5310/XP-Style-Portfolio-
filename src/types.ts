import React from 'react';

export interface DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface XPWindow {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  content: React.ReactNode;
  type: 'explorer' | 'browser' | 'system';
  initialWidth?: string | number;
  initialHeight?: string | number;
}
