/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AuthSecondaryActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AuthSecondaryAction({ text, ...props }: AuthSecondaryActionProps) {
  return (
    <button
      {...props}
      className="w-full py-3.5 border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 bg-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-none cursor-pointer"
      dir="rtl"
    >
      <span>{text}</span>
    </button>
  );
}
