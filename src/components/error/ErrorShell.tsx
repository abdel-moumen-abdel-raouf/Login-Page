/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ErrorShellProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

export default function ErrorShell({ children, isMobile = false }: ErrorShellProps) {
  return (
    <div 
      className={`erp-auth-scope flex-1 overflow-y-auto flex items-center justify-center ${
        isMobile ? 'p-3' : 'p-4 md:p-12'
      } bg-slate-50`}
      dir="rtl"
    >
      {children}
    </div>
  );
}
