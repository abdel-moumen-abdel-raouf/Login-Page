/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutStyle, ThemeColor } from '../../types/design.types';
import AuthHeroPanel from './AuthHeroPanel';

interface AuthShellProps {
  layoutMode: LayoutStyle;
  primaryColor: ThemeColor;
  heroTitle: string;
  heroSubtitle: string;
  isMobile?: boolean;
  children: React.ReactNode;
}

export default function AuthShell({
  layoutMode,
  primaryColor,
  heroTitle,
  heroSubtitle,
  isMobile = false,
  children
}: AuthShellProps) {
  const isSplit = layoutMode === 'split' && !isMobile;
  const isGlass = layoutMode === 'glassmorphic';

  return (
    <div 
      className={`erp-auth-scope flex-1 overflow-y-auto bg-slate-50 text-slate-900 flex ${
        isSplit ? 'flex-row h-full' : 'flex-col items-center justify-center p-4 sm:p-6 bg-slate-100/50'
      } ${isGlass ? 'glassmorphic-screen-bg' : ''}`}
      dir="rtl"
    >
      {/* 1. Left Hero Sidebar panel if split on desktop */}
      {isSplit && (
        <AuthHeroPanel 
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          primaryColor={primaryColor}
        />
      )}

      {/* 2. Form/Content container */}
      <div className={`flex-1 flex flex-col items-center justify-center ${
        isSplit ? 'p-6 md:p-12 bg-white h-full' : 'w-full py-8'
      }`}>
        {children}
      </div>
    </div>
  );
}
