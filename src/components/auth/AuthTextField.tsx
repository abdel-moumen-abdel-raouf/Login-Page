/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Building2, ShieldCheck, User } from 'lucide-react';
import { ThemeColor, THEME_MAP } from '../../types/design.types';

interface AuthTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  iconName?: 'mail' | 'domain' | 'mfa' | 'user';
  primaryColor?: ThemeColor;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: any) => void;
  required?: boolean;
  maxLength?: number;
}

export default function AuthTextField({ 
  label, 
  iconName, 
  primaryColor = 'blue', 
  ...props 
}: AuthTextFieldProps) {
  const theme = THEME_MAP[primaryColor] || THEME_MAP.blue;

  const renderIcon = () => {
    switch (iconName) {
      case 'mail':
        return <Mail size={16} className="text-slate-400" />;
      case 'domain':
        return <Building2 size={16} className="text-slate-400" />;
      case 'mfa':
        return <ShieldCheck size={16} className="text-slate-400" />;
      case 'user':
        return <User size={16} className="text-slate-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-1.5 text-right" dir="rtl">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>
      <div className="relative flex items-center">
        {iconName && (
          <div className="absolute right-3.5 pointer-events-none">
            {renderIcon()}
          </div>
        )}
        <input
          {...props}
          className={`w-full bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm py-3 ${
            iconName ? 'pr-11 pl-4' : 'px-4'
          } rounded-none transition-all placeholder:text-slate-400 focus:outline-none ${theme.borderFocus} ${theme.ring}`}
        />
      </div>
    </div>
  );
}
