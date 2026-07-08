/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from './types/design.types';
export * from './types/auth.types';
export * from './types/error.types';

// Backward compatibility for existing designer controls
export type ThemeColor = 'blue' | 'teal' | 'indigo' | 'emerald' | 'amber' | 'slate';
export type LayoutStyle = 'split' | 'centered' | 'glassmorphic';

export interface LoginConfig {
  brandName: string;
  brandTagline: string;
  primaryColor: ThemeColor;
  layoutStyle: LayoutStyle;
  showForgotPassword: boolean;
  showSignUpLink: boolean;
  showRememberMe: boolean;
  requireMFA: boolean;
  companyDomainLogin: boolean;
  customLogoUrl: string;
  pageType?: 'login' | 'error403' | 'error404' | 'error500' | 'error503' | string;
  debugMode?: boolean;
}

export type CodeTab = 'html' | 'scss' | 'both';
