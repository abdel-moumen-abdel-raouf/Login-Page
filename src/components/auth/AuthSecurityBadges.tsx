/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import { SecurityBadge } from '../../types/auth.types';

interface AuthSecurityBadgesProps {
  badges: SecurityBadge[];
}

export default function AuthSecurityBadges({ badges }: AuthSecurityBadgesProps) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 justify-end" dir="rtl">
      {badges.map((badge) => (
        <div key={badge.id} className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold tracking-wider uppercase bg-slate-50 border border-slate-200 px-2 py-1 rounded-none select-none">
          {badge.id === 'shield' || badge.id === 'mfa' ? (
            <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
          ) : (
            <LockKeyhole size={12} className="text-slate-400 shrink-0" />
          )}
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
