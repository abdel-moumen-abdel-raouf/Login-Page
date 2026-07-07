/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ErrorCardProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

export default function ErrorCard({ children, isMobile = false }: ErrorCardProps) {
  return (
    <div 
      className={`w-full max-w-4xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-none grid items-center animate-fade-in text-right ${
        isMobile 
          ? 'grid-cols-1 p-5 gap-6' 
          : 'grid-cols-1 md:grid-cols-2 p-6 sm:p-8 md:p-12 gap-6 sm:gap-10 md:gap-16'
      }`}
      dir="rtl"
    >
      {children}
    </div>
  );
}
