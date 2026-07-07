/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeColor = 'blue' | 'teal' | 'indigo' | 'emerald' | 'amber' | 'slate';

export type LayoutStyle = 'split' | 'centered' | 'glassmorphic';

export interface ThemeConfig {
  primary: string;
  hover: string;
  text: string;
  bgLight: string;
  ring: string;
  borderFocus: string;
  border: string;
}

export const THEME_MAP: Record<ThemeColor, ThemeConfig> = {
  blue: {
    primary: 'bg-blue-600',
    hover: 'hover:bg-blue-700',
    text: 'text-blue-600',
    bgLight: 'bg-blue-50/50',
    ring: 'focus:ring-blue-500/20',
    borderFocus: 'focus:border-blue-500',
    border: 'border-blue-600'
  },
  teal: {
    primary: 'bg-teal-600',
    hover: 'hover:bg-teal-700',
    text: 'text-teal-600',
    bgLight: 'bg-teal-50/50',
    ring: 'focus:ring-teal-500/20',
    borderFocus: 'focus:border-teal-500',
    border: 'border-teal-600'
  },
  indigo: {
    primary: 'bg-indigo-600',
    hover: 'hover:bg-indigo-700',
    text: 'text-indigo-600',
    bgLight: 'bg-indigo-50/50',
    ring: 'focus:ring-indigo-500/20',
    borderFocus: 'focus:border-indigo-500',
    border: 'border-indigo-600'
  },
  emerald: {
    primary: 'bg-emerald-600',
    hover: 'hover:bg-emerald-700',
    text: 'text-emerald-600',
    bgLight: 'bg-emerald-50/50',
    ring: 'focus:ring-emerald-500/20',
    borderFocus: 'focus:border-emerald-500',
    border: 'border-emerald-600'
  },
  amber: {
    primary: 'bg-amber-600',
    hover: 'hover:bg-amber-700',
    text: 'text-amber-600',
    bgLight: 'bg-amber-50/50',
    ring: 'focus:ring-amber-500/20',
    borderFocus: 'focus:border-amber-500',
    border: 'border-amber-600'
  },
  slate: {
    primary: 'bg-slate-700',
    hover: 'hover:bg-slate-800',
    text: 'text-slate-700',
    bgLight: 'bg-slate-100',
    ring: 'focus:ring-slate-500/20',
    borderFocus: 'focus:border-slate-500',
    border: 'border-slate-700'
  }
};

// Design tokens centralizing colors, radii, shadows, borders, etc. for scoping
export const DESIGN_TOKENS = {
  scopeClass: 'erp-auth-scope',
  shadows: {
    flat: 'shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]',
    doubleBorder: 'border-[3px] border-double border-slate-900',
    standard: 'border-2 border-slate-900',
  },
  radii: {
    none: 'rounded-none',
    md: 'rounded-lg',
  },
  text: {
    heading: 'font-sans font-extrabold tracking-tight',
    body: 'text-slate-500 text-sm leading-relaxed',
    mono: 'font-mono text-xs',
  },
  statusColors: {
    success: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200'
    },
    error: {
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-200'
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200'
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200'
    }
  }
};
