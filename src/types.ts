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
  pageType?: 'login' | 'error403' | 'error404' | 'error500' | 'error503';
}

export type CodeTab = 'html' | 'scss' | 'both';
