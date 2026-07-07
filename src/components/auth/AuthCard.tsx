/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutStyle } from '../../types/design.types';

interface AuthCardProps {
  children: React.ReactNode;
  layoutMode: LayoutStyle;
  isMobile?: boolean;
}

export default function AuthCard({ children, layoutMode, isMobile = false }: AuthCardProps) {
  // Compute classes based on layout mode and if we are simulating mobile viewport
  const isCenteredOrMobile = layoutMode === 'centered' || isMobile;
  const isGlassmorphic = layoutMode === 'glassmorphic' && !isMobile;

  const cardClasses = isCenteredOrMobile
    ? 'bg-white border-2 border-slate-900 p-5 sm:p-8 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
    : isGlassmorphic
    ? 'bg-white border-[3px] border-double border-slate-900 p-5 sm:p-8 rounded-none'
    : 'w-full max-w-md';

  return (
    <div 
      className={`w-full max-w-md transition-all ${cardClasses}`}
      dir="rtl"
    >
      {children}
    </div>
  );
}
