/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal } from 'lucide-react';

interface ErrorReferenceCodeProps {
  referenceCode: string;
  statusCode?: string;
  safeDetails?: string;
  debugFields?: Record<string, string>; // Unsafe details kept under "Developer Tools" toggle only
}

export default function ErrorReferenceCode({
  referenceCode,
  statusCode = '500',
  safeDetails,
  debugFields
}: ErrorReferenceCodeProps) {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className="space-y-4 text-right" dir="rtl">
      {/* 1. Safe Explanation Message for Production Users */}
      {safeDetails && (
        <p className="text-xs text-slate-500 leading-relaxed">
          {safeDetails}
        </p>
      )}

      {/* 2. Safe Reference Code Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-none text-right">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span className="text-xs font-bold text-slate-700">الرمز المرجعي الآمن للمشرفين:</span>
        </div>
        <span className="font-mono text-xs font-bold text-rose-600 tracking-wider bg-white border border-rose-100 px-2.5 py-1">
          {referenceCode}
        </span>
      </div>

      {/* 3. Restricted/Expandable Developer-Only Panel (Isolated Debug Sandbox) */}
      {debugFields && Object.keys(debugFields).length > 0 && (
        <div className="border border-slate-200">
          <button
            type="button"
            onClick={() => setShowDebug(!showDebug)}
            className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200/80 transition-colors text-right flex items-center justify-between text-[11px] font-bold text-slate-600 cursor-pointer select-none"
          >
            <div className="flex items-center gap-1.5 font-mono">
              <Terminal size={12} className="text-slate-500" />
              <span>لوحة المحاكاة والتطوير (مغلقة للمستخدمين)</span>
            </div>
            {showDebug ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showDebug && (
            <div 
              className="p-4 bg-slate-950 font-mono text-[10px] text-cyan-400 space-y-1 text-left select-text" 
              dir="ltr"
            >
              <div className="text-[9px] text-amber-400/80 border-b border-cyan-500/20 pb-1.5 mb-2 font-sans text-right" dir="rtl">
                ⚠️ هذه البيانات الفنية مخفية في الإنتاج الحقيقي وتظهر هنا لأغراض محاكاة صندوق التصميم فقط.
              </div>
              {Object.entries(debugFields).map(([key, val]) => (
                <div key={key}>
                  <span className="text-slate-400">{key}:</span> {val}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
