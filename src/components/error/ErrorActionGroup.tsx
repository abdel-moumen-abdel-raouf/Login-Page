/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeColor, THEME_MAP } from '../../types/design.types';

interface ErrorActionGroupProps {
  primaryColor: ThemeColor;
  primaryActionText: string;
  secondaryActionText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  isMobile?: boolean;
}

export default function ErrorActionGroup({
  primaryColor,
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction,
  isMobile = false
}: ErrorActionGroupProps) {
  const theme = THEME_MAP[primaryColor] || THEME_MAP.blue;
  const layoutClass = isMobile ? 'flex-col' : 'flex-col sm:flex-row';

  return (
    <div className={`flex gap-3 pt-2 ${layoutClass}`} dir="rtl">
      {onPrimaryAction && (
        <button
          onClick={onPrimaryAction}
          type="button"
          className={`flex-1 py-3.5 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${theme.primary} ${theme.hover}`}
        >
          {primaryActionText}
        </button>
      )}

      {secondaryActionText && onSecondaryAction && (
        <button
          onClick={onSecondaryAction}
          type="button"
          className="flex-1 py-3.5 bg-white border border-slate-300 hover:border-slate-850 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
        >
          {secondaryActionText}
        </button>
      )}
    </div>
  );
}
