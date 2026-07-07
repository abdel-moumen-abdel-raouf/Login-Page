/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeColor, LayoutStyle } from './design.types';

export interface SecurityBadge {
  label: string;
  id: string;
}

export interface AuthPageConfig {
  brandName: string;
  logo: string; // Type of logo (e.g. 'cube' | 'globe' | string url)
  title: string;
  subtitle: string;
  description: string;
  layoutMode: LayoutStyle;
  primaryColor: ThemeColor;
  heroTitle: string;
  heroSubtitle: string;
  securityBadges: SecurityBadge[];
  primaryActionText: string;
  secondaryActionText?: string;
  supportText: string;
  showRememberDevice: boolean;
  showForgotPassword: boolean;
  showDomainLogin: boolean;
  showMfa: boolean;
  showLanguageSwitch: boolean;
  statusMessage?: string | null;
  statusTone?: 'success' | 'error' | 'warning' | 'info';
  
  // Extra fields for pages like reset password or sign-up if needed
  customLabel1?: string;
  customLabel2?: string;
}

export interface AuthPageCallbacks {
  onLogin?: (data: any) => void;
  onForgotPassword?: (email: string) => void;
  onResetPassword?: (data: any) => void;
  onVerifyMfa?: (token: string) => void;
  onSubmitMfa?: (token: string) => void;
  onSecondaryAction?: () => void;
  onLanguageSwitch?: (lang: string) => void;
}
