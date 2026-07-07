/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, HelpCircle } from 'lucide-react';

interface ErrorSupportBlockProps {
  maintenanceWindow?: string;
  countdown?: number;
  isRetrying?: boolean;
  supportHint?: string;
}

export default function ErrorSupportBlock({
  maintenanceWindow,
  countdown,
  isRetrying = false,
  supportHint
}: ErrorSupportBlockProps) {
  return (
    <div className="space-y-3.5 border-t border-slate-100 pt-4 text-right" dir="rtl">
      {/* 1. Maintenance Windows */}
      {maintenanceWindow && (
        <div className="flex items-center gap-2 p-3 bg-blue-50/50 border border-blue-100 text-xs text-blue-800 rounded-none">
          <Clock size={14} className="text-blue-500 shrink-0" />
          <span>
            نافذة الصيانة المجدولة: <strong className="font-bold">{maintenanceWindow}</strong>
          </span>
        </div>
      )}

      {/* 2. Auto-Refresh Countdowns */}
      {countdown !== undefined && countdown > 0 && (
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>سيعيد النظام فحص الاتصال تلقائياً خلال:</span>
          <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-none">
            {isRetrying ? 'جاري الفحص...' : `${countdown} ثانية`}
          </span>
        </div>
      )}

      {/* 3. Common Support Advice */}
      {supportHint && (
        <div className="flex items-start gap-1.5 text-[11px] text-slate-400 font-medium leading-relaxed">
          <HelpCircle size={13} className="text-slate-300 shrink-0 mt-0.5" />
          <p>{supportHint}</p>
        </div>
      )}
    </div>
  );
}
