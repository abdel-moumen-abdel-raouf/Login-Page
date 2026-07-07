/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeColor, THEME_MAP } from '../../types/design.types';

interface ErrorIllustrationProps {
  type: '403' | '404' | '500' | '503' | 'offline' | 'network';
  primaryColor: ThemeColor;
  isMobile?: boolean;
}

export default function ErrorIllustration({ type, primaryColor, isMobile = false }: ErrorIllustrationProps) {
  const theme = THEME_MAP[primaryColor] || THEME_MAP.blue;
  const svgClass = isMobile 
    ? 'w-24 h-24' 
    : 'w-28 h-28 sm:w-48 sm:h-48 md:w-64 md:h-64';

  switch (type) {
    case '403':
      return (
        <svg className={svgClass} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad-403" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="shield-grad" x1="50" y1="30" x2="150" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24"/>
              <stop offset="50%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="#d97706"/>
            </linearGradient>
            <linearGradient id="lock-body-grad" x1="70" y1="85" x2="130" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b"/>
              <stop offset="100%" stopColor="#0f172a"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#grad-403)"/>
          <circle cx="100" cy="100" r="75" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" className="animate-spin-slow"/>
          <circle cx="100" cy="100" r="55" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="20 4" opacity="0.3"/>
          <path d="M100 25 L165 62 L165 138 L100 175 L35 138 L35 62 Z" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
          <path d="M75 100 V75 C75 61.2 86.2 50 100 50 C113.8 50 125 61.2 125 75 V100" stroke="url(#shield-grad)" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
          <path d="M85 100 V75 C85 66.7 91.7 60 100 60 C108.3 60 115 66.7 115 75 V100" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
          <rect x="60" y="92" width="80" height="65" rx="12" fill="url(#lock-body-grad)" stroke="#0f172a" strokeWidth="3.5" />
          <rect x="64" y="96" width="72" height="57" rx="9" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="100" cy="120" r="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
          <path d="M100 110 V124" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="100" cy="131" r="2.5" fill="#ef4444"/>
          <circle cx="60" cy="92" r="3" fill="#f59e0b"/>
          <circle cx="140" cy="92" r="3" fill="#f59e0b"/>
          <circle cx="60" cy="157" r="3" fill="#f59e0b" opacity="0.6"/>
          <circle cx="140" cy="157" r="3" fill="#f59e0b" opacity="0.6"/>
          <path d="M45 80 L35 90 M35 80 L45 90" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
          <path d="M165 80 L155 90 M155 80 L165 90" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
        </svg>
      );

    case '404':
      return (
        <svg className={`${svgClass} animate-float`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad-404" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="folder-grad" x1="45" y1="65" x2="135" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#818cf8"/>
              <stop offset="100%" stopColor="#4f46e5"/>
            </linearGradient>
            <linearGradient id="glass-lens-grad" x1="120" y1="100" x2="170" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#grad-404)"/>
          <g opacity="0.2">
            <path d="M20 120 L100 160 L180 120 L100 80 Z" stroke="#6366f1" strokeWidth="1" />
            <path d="M40 110 L100 140 L160 110 L100 80 Z" stroke="#6366f1" strokeWidth="1" />
            <path d="M60 100 L100 120 L140 100 L100 80 Z" stroke="#6366f1" strokeWidth="1" />
            <line x1="100" y1="80" x2="100" y2="160" stroke="#6366f1" strokeWidth="1" />
            <line x1="20" y1="120" x2="180" y2="120" stroke="#6366f1" strokeWidth="1" />
          </g>
          <circle cx="100" cy="100" r="65" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 12" opacity="0.3" className="animate-spin-slow"/>
          <circle cx="100" cy="100" r="45" stroke="#818cf8" strokeWidth="0.75" strokeDasharray="2 6" opacity="0.4"/>
          <g transform="translate(10, -5)">
            <path d="M55 135 L95 150 L135 135 L95 120 Z" fill="#0f172a" opacity="0.1" />
            <path d="M50 75 L90 55 L135 72 V125 L95 142 L50 122 Z" fill="url(#folder-grad)" stroke="#4338ca" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M62 58 L94 42 L127 55 V108 L94 124 L62 108 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="75" y1="68" x2="102" y2="56" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="75" y1="78" x2="114" y2="61" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="75" y1="88" x2="108" y2="74" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M50 88 L95 106 L135 88 V125 L95 142 L50 122 Z" fill="#4f46e5" stroke="#3730a3" strokeWidth="2" strokeLinejoin="round" opacity="0.95"/>
            <path d="M85 110 L95 105 L105 110 L105 122 L95 127 L85 122 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.2" />
            <text x="95" y="120" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
          </g>
          <g className="animate-pulse" style={{ transformOrigin: '140px 125px' }}>
            <line x1="148" y1="133" x2="175" y2="160" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <line x1="148" y1="133" x2="175" y2="160" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="128" cy="113" r="24" fill="url(#glass-lens-grad)" stroke="#1e293b" strokeWidth="3.5" />
            <circle cx="128" cy="113" r="22" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.6" />
            <path d="M114 105 A 16 16 0 0 1 138 97" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
          </g>
        </svg>
      );

    case '500':
      return (
        <svg className={svgClass} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad-500" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="server-body-grad" x1="40" y1="35" x2="160" y2="165" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b"/>
              <stop offset="100%" stopColor="#0f172a"/>
            </linearGradient>
            <linearGradient id="error-glow" x1="70" y1="80" x2="130" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e"/>
              <stop offset="100%" stopColor="#be123c"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#grad-500)"/>
          <circle cx="100" cy="100" r="78" stroke="#ef4444" strokeWidth="0.75" strokeDasharray="8 8" opacity="0.2" className="animate-spin-slow"/>
          <rect x="55" y="30" width="90" height="140" rx="8" fill="url(#server-body-grad)" stroke="#0f172a" strokeWidth="3.5" />
          <rect x="61" y="36" width="78" height="128" rx="5" fill="none" stroke="#475569" strokeWidth="1" opacity="0.6" />
          <g transform="translate(64, 42)">
            <rect x="0" y="0" width="72" height="24" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
            <circle cx="8" cy="12" r="2.5" fill="#10b981" />
            <circle cx="16" cy="12" r="1.5" fill="#10b981" opacity="0.6" />
          </g>
          <g transform="translate(64, 76)">
            <rect x="0" y="0" width="72" height="36" rx="4" fill="url(#error-glow)" stroke="#f43f5e" strokeWidth="2" className="animate-pulse" />
            <circle cx="8" cy="12" r="3" fill="#ffffff" className="animate-pulse" />
            <circle cx="8" cy="24" r="2.5" fill="#991b1b" />
            <line x1="22" y1="12" x2="62" y2="12" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" opacity="0.8"/>
            <line x1="22" y1="24" x2="62" y2="24" stroke="#7f1d1d" strokeWidth="2" />
          </g>
          <g transform="translate(64, 122)">
            <rect x="0" y="0" width="72" height="24" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
            <circle cx="8" cy="12" r="2.5" fill="#10b981" />
          </g>
          <path d="M22 135 L12 155 H28 L18 175" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" className="animate-pulse" />
          <path d="M178 35 L168 55 H184 L174 75" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" className="animate-pulse" />
        </svg>
      );

    case '503':
      return (
        <svg className={svgClass} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad-503" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="gear-blue" x1="45" y1="45" x2="115" y2="115" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60a5fa"/>
              <stop offset="100%" stopColor="#2563eb"/>
            </linearGradient>
            <linearGradient id="gear-gray" x1="100" y1="100" x2="150" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#cbd5e1"/>
              <stop offset="100%" stopColor="#64748b"/>
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#grad-503)"/>
          <circle cx="100" cy="100" r="74" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 4 2 4" opacity="0.2" className="animate-spin-slow"/>
          <g className="animate-spin-slow" style={{ transformOrigin: '85px 85px' }}>
            <circle cx="85" cy="85" r="30" fill="none" stroke="url(#gear-blue)" strokeWidth="8"/>
            <g stroke="url(#gear-blue)" strokeWidth="8" strokeLinecap="round">
              <line x1="85" y1="47" x2="85" y2="53" />
              <line x1="85" y1="117" x2="85" y2="123" />
              <line x1="47" y1="85" x2="53" y2="85" />
              <line x1="117" y1="85" x2="123" y2="85" />
            </g>
            <circle cx="85" cy="85" r="26" fill="url(#gear-blue)" />
            <circle cx="85" cy="85" r="14" fill="#ffffff" />
          </g>
          <g className="animate-spin-reverse" style={{ transformOrigin: '130px 130px' }}>
            <circle cx="130" cy="130" r="18" fill="none" stroke="url(#gear-gray)" strokeWidth="6"/>
            <circle cx="130" cy="130" r="15" fill="url(#gear-gray)"/>
            <circle cx="130" cy="130" r="6" fill="#ffffff"/>
          </g>
        </svg>
      );

    case 'offline':
      return (
        <svg className={svgClass} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad-off" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#64748b" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#grad-off)"/>
          <circle cx="100" cy="100" r="75" stroke="#64748b" strokeWidth="1" strokeDasharray="4 8" opacity="0.3"/>
          
          {/* Main offline graphic: disconnected server blocks and cut cable */}
          <g transform="translate(50, 60)">
            <rect x="15" y="0" width="70" height="30" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
            <rect x="15" y="40" width="70" height="30" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="2" opacity="0.8"/>
            <circle cx="30" cy="15" r="2" fill="#ef4444" className="animate-pulse" />
            <circle cx="30" cy="55" r="2" fill="#ef4444" />
            
            {/* Cut wire dangling */}
            <path d="M 50 70 C 50 90, 20 100, 20 120" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3"/>
            <path d="M 80 120 C 80 105, 55 95, 55 70" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="20" cy="120" r="2.5" fill="#f43f5e"/>
            <circle cx="80" cy="120" r="2.5" fill="#f43f5e"/>
          </g>
        </svg>
      );

    case 'network':
      return (
        <svg className={`${svgClass} animate-pulse`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad-net" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#grad-net)"/>
          
          {/* Signal bars with a dramatic red cross slash */}
          <g transform="translate(55, 60)" strokeLinecap="round">
            <path d="M 10 70 A 100 100 0 0 1 80 70" stroke="#e2e8f0" strokeWidth="4" fill="none" opacity="0.2"/>
            <path d="M 20 70 A 75 75 0 0 1 70 70" stroke="#e2e8f0" strokeWidth="5" fill="none" opacity="0.4"/>
            <path d="M 32 70 A 50 50 0 0 1 58 70" stroke="#e2e8f0" strokeWidth="6" fill="none" opacity="0.6"/>
            <circle cx="45" cy="70" r="6" fill="#cbd5e1" opacity="0.8"/>
            
            {/* Red Diagonal No-Network Slash */}
            <line x1="-10" y1="10" x2="100" y2="80" stroke="#f43f5e" strokeWidth="6" />
            <line x1="-10" y1="10" x2="100" y2="80" stroke="#ffffff" strokeWidth="2" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
