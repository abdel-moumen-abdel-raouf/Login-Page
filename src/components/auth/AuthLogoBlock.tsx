/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeColor, THEME_MAP } from '../../types/design.types';

interface AuthLogoBlockProps {
  brandName: string;
  primaryColor: ThemeColor;
  logoType?: string;
}

export default function AuthLogoBlock({ brandName, primaryColor, logoType = 'cube' }: AuthLogoBlockProps) {
  const theme = THEME_MAP[primaryColor] || THEME_MAP.blue;

  return (
    <div className="flex items-center gap-3 mb-6 select-none" dir="rtl">
      {/* 4-square geometric logo grid */}
      <div className="grid grid-cols-2 gap-[3px] w-8 h-8 shrink-0">
        <div className={`w-[14px] h-[14px] ${theme.primary}`}></div>
        <div className="w-[14px] h-[14px] bg-slate-300"></div>
        <div className="w-[14px] h-[14px] bg-slate-900"></div>
        <div className={`w-[14px] h-[14px] ${theme.primary}`}></div>
      </div>
      <span className="font-extrabold text-sm text-slate-900 tracking-[0.15em] uppercase leading-none">
        {brandName}
      </span>
    </div>
  );
}
