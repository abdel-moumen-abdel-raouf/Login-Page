/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AuthActionGroupProps {
  children: React.ReactNode;
  row?: boolean;
}

export default function AuthActionGroup({ children, row = false }: AuthActionGroupProps) {
  return (
    <div 
      className={`flex gap-4 ${
        row 
          ? 'flex-row items-center justify-between text-xs' 
          : 'flex-col space-y-3'
      }`}
      dir="rtl"
    >
      {children}
    </div>
  );
}
