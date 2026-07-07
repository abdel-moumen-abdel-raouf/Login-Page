/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { ThemeColor, THEME_MAP } from '../../types/design.types';

interface AuthPasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  primaryColor?: ThemeColor;
  placeholder?: string;
  value?: any;
  onChange?: (e: any) => void;
  type?: string;
  required?: boolean;
}

export default function AuthPasswordField({ 
  label, 
  primaryColor = 'blue', 
  ...props 
}: AuthPasswordFieldProps) {
  const [show, setShow] = useState(false);
  const theme = THEME_MAP[primaryColor] || THEME_MAP.blue;

  return (
    <div className="space-y-1.5 text-right" dir="rtl">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute right-3.5 pointer-events-none">
          <Lock size={16} className="text-slate-400" />
        </div>
        <input
          {...props}
          type={show ? 'text' : 'password'}
          className={`w-full bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm py-3 pr-11 pl-12 rounded-none transition-all placeholder:text-slate-400 focus:outline-none ${theme.borderFocus} ${theme.ring}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute left-3 p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors rounded cursor-pointer"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
