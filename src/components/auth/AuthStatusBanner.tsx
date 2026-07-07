/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import { DESIGN_TOKENS } from '../../types/design.types';

interface AuthStatusBannerProps {
  message: string;
  tone?: 'success' | 'error' | 'warning' | 'info';
}

export default function AuthStatusBanner({ message, tone = 'error' }: AuthStatusBannerProps) {
  const token = DESIGN_TOKENS.statusColors[tone];

  const renderIcon = () => {
    switch (tone) {
      case 'success':
        return <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />;
      case 'error':
        return <AlertOctagon size={18} className="text-rose-600 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />;
      case 'info':
      default:
        return <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />;
    }
  };

  return (
    <div 
      className={`mb-5 p-4 rounded-none border flex items-start gap-3 animate-fade-in text-slate-800 text-right ${token.bg} ${token.border}`}
      dir="rtl"
    >
      {renderIcon()}
      <div className="flex-1">
        <p className="text-xs font-semibold leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
