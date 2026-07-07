/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeColor, THEME_MAP } from '../../types/design.types';

interface AuthHeroPanelProps {
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: ThemeColor;
}

export default function AuthHeroPanel({ heroTitle, heroSubtitle, primaryColor }: AuthHeroPanelProps) {
  const theme = THEME_MAP[primaryColor] || THEME_MAP.blue;

  return (
    <div 
      className="w-[50%] lg:w-[55%] relative flex flex-col justify-end p-12 overflow-hidden bg-slate-950 select-none shrink-0"
      dir="rtl"
    >
      {/* Abstract structural grid lines overlay for depth */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03] z-10">
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
      </div>

      <div className="relative z-20 text-white w-full text-right">
        {/* Giant overlapping abstract geometric design (reusable and styled safely) */}
        <div className="relative w-48 h-48 mb-12 mr-auto ml-0">
          <div className="absolute top-6 right-6 w-36 h-36 border-[6px] border-white/5 z-10"></div>
          <div className={`absolute top-0 right-0 w-36 h-36 border-[6px] ${theme.border} z-20`}></div>
          <div className="absolute -top-4 left-4 flex flex-col gap-1 z-30">
            <div className={`w-16 h-[2px] ${theme.primary}`}></div>
            <div className={`w-10 h-[2px] ${theme.primary}/50`}></div>
          </div>
        </div>

        <h2 className="text-2xl font-black tracking-tight mb-3 leading-tight">
          {heroTitle}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-10 max-w-sm mr-auto ml-0">
          {heroSubtitle}
        </p>

        {/* Scoped footer indicator with human-friendly label */}
        <div className="flex justify-between border-t border-white/5 pt-4 font-mono text-[9px] text-slate-600 uppercase tracking-widest">
          <span>نظام مشفر بالكامل</span>
          <span>بوابة المصادقة المركزية</span>
        </div>
      </div>
    </div>
  );
}
