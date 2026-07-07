/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle } from 'lucide-react';

interface AuthSupportPanelProps {
  supportText: string;
  onContactSupport?: () => void;
}

export default function AuthSupportPanel({ supportText, onContactSupport }: AuthSupportPanelProps) {
  return (
    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-right" dir="rtl">
      <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[280px]">
        {supportText}
      </p>
      {onContactSupport && (
        <button
          onClick={onContactSupport}
          type="button"
          className="text-[10px] font-extrabold text-slate-500 hover:text-slate-950 uppercase tracking-wider flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <HelpCircle size={13} />
          <span>مساعدة</span>
        </button>
      )}
    </div>
  );
}
