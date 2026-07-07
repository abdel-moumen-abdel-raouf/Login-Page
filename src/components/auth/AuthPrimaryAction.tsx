/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Loader2 } from 'lucide-react';
import { ThemeColor, THEME_MAP } from '../../types/design.types';

interface AuthPrimaryActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  primaryColor?: ThemeColor;
  disabled?: boolean;
}

export default function AuthPrimaryAction({ 
  text, 
  loading = false, 
  primaryColor = 'blue', 
  disabled,
  ...props 
}: AuthPrimaryActionProps) {
  const theme = THEME_MAP[primaryColor] || THEME_MAP.blue;

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`w-full py-4 px-6 text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${theme.primary} ${theme.hover} ${theme.ring} focus:outline-none focus:ring-offset-2`}
      dir="rtl"
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>جاري المعالجة الآمنة...</span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
