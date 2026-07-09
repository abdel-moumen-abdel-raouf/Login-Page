/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LoginConfig, ThemeColor } from '../types';

// Import our 13 modular high-fidelity separate pages
import LoginPage from '../pages/LoginPage';
import AccountLockedPage from '../pages/AccountLockedPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import MfaChallengePage from '../pages/MfaChallengePage';
import PasswordExpiredPage from '../pages/PasswordExpiredPage';
import SessionExpiredPage from '../pages/SessionExpiredPage';
import Error403Page from '../pages/Error403Page';
import Error404Page from '../pages/Error404Page';
import Error500Page from '../pages/Error500Page';
import Error503Page from '../pages/Error503Page';
import BackendOfflinePage from '../pages/BackendOfflinePage';
import NetworkOfflinePage from '../pages/NetworkOfflinePage';

// Import safe design tokens and sample page configurations
import { getAuthPageConfig } from '../config/auth-page.config';
import { getErrorPageConfig } from '../config/error-page.config';
import { LayoutStyle } from '../types/design.types';
import { AuthLoginAttempt, AuthMfaVerifyAttempt, AuthResetPasswordAttempt } from '../types/auth.types';

// Icons for the viewport simulator
import { Laptop, Smartphone, LayoutGrid, RotateCcw } from 'lucide-react';

interface PreviewPaneProps {
  config: LoginConfig;
  heroImageUrl: string;
  mockError: string | null;
  onClearError: () => void;
  onChange: (newConfig: LoginConfig) => void;
}

// All 13 isolated pages we support rendering
const PAGE_TEMPLATES = [
  { id: 'login', name: '1. بوابة تسجيل الدخول الرئيسية (Login Portal)', category: 'auth' },
  { id: 'account_locked', name: '2. حساب مؤمن/مقفل (Account Locked)', category: 'auth' },
  { id: 'forgot_password', name: '3. نسيت كلمة المرور (Forgot Password)', category: 'auth' },
  { id: 'reset_password', name: '4. إعادة تعيين كلمة المرور (Reset Password)', category: 'auth' },
  { id: 'mfa', name: '5. مصادقة ثنائية إضافية (MFA Challenge)', category: 'auth' },
  { id: 'password_expired', name: '6. كلمة المرور منتهية الصلاحية (Password Expired)', category: 'auth' },
  { id: 'session_expired', name: '7. انتهت صلاحية الجلسة (Session Expired)', category: 'auth' },
  { id: 'error403', name: '8. خطأ 403: غير مسموح بالدخول (Forbidden Access)', category: 'error' },
  { id: 'error404', name: '9. خطأ 404: الصفحة غير موجودة (Endpoint Not Found)', category: 'error' },
  { id: 'error500', name: '10. خطأ 500: خلل داخلي بالنظام (Server Error)', category: 'error' },
  { id: 'error503', name: '11. خطأ 503: الخدمة غير متوفرة (Service Maintenance)', category: 'error' },
  { id: 'backend_offline', name: '12. خادم الخدمات غير متصل (Backend Offline)', category: 'error' },
  { id: 'network_offline', name: '13. شبكة الإنترنت منقطعة (Network Offline)', category: 'error' }
];

export default function PreviewPane({ config, heroImageUrl, mockError, onClearError, onChange }: PreviewPaneProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  
  // Track which page of the 13 is actively being previewed
  const [activePageId, setActivePageId] = useState<string>('login');

  // Synchronize designer selectors (from left panel) to active page template here
  useEffect(() => {
    if (config.pageType) {
      if (config.pageType === 'login') {
        setActivePageId('login');
      } else if (config.pageType === 'error403') {
        setActivePageId('error403');
      } else if (config.pageType === 'error404') {
        setActivePageId('error404');
      } else if (config.pageType === 'error500') {
        setActivePageId('error500');
      } else if (config.pageType === 'error503') {
        setActivePageId('error503');
      }
    }
  }, [config.pageType]);

  // Synchronize mock errors to active page templates/messages
  useEffect(() => {
    if (mockError) {
      if (mockError.includes('locked')) {
        setActivePageId('account_locked');
      } else if (mockError.includes('Blocked') || mockError.includes('حظر')) {
        setActivePageId('error403');
      } else if (mockError.includes('503') || mockError.includes('الصيانة')) {
        setActivePageId('error503');
      }
    }
  }, [mockError]);

  const handlePageChange = (pageId: string) => {
    setActivePageId(pageId);
    onClearError();
    
    // Sync the page selector state to the designer config as well for consistency
    let syncedPageType = 'login';
    if (pageId.startsWith('error')) {
      syncedPageType = pageId;
    }
    onChange({ ...config, pageType: syncedPageType });
  };

  // Convert legacy ControlPanel config into new structured configurations in real-time
  const getMergedAuthPageConfig = () => {
    const baseConfig = getAuthPageConfig(activePageId);
    return {
      ...baseConfig,
      brandName: config.brandName || baseConfig.brandName,
      subtitle: config.brandTagline || baseConfig.subtitle,
      primaryColor: config.primaryColor as ThemeColor,
      layoutMode: config.layoutStyle as LayoutStyle,
      showForgotPassword: config.showForgotPassword,
      showMfa: config.requireMFA,
      showDomainLogin: config.companyDomainLogin,
      showRememberDevice: config.showRememberMe,
      showSignUpLink: config.showSignUpLink,
      statusMessage: mockError || undefined,
      statusTone: mockError ? ('error' as const) : undefined
    };
  };

  const getMergedErrorPageConfig = () => {
    // Map backend_offline / network_offline properly to their config templates
    const templateId = activePageId === 'backend_offline' ? 'backendOffline' 
                     : activePageId === 'network_offline' ? 'networkOffline' 
                     : activePageId;
    const baseConfig = getErrorPageConfig(templateId);
    return {
      ...baseConfig,
      brandName: config.brandName || baseConfig.brandName,
      primaryColor: config.primaryColor as ThemeColor,
      debugMode: config.debugMode,
      technicalPayload: {
        ...baseConfig.technicalPayload,
        BRAND: config.brandName,
        ENVIRONMENT: 'DESIGN_SYSTEM_SANDBOX',
        PORT: '3000'
      }
    };
  };

  // Safe action callbacks that bypass browser alert() dialogs, outputting inline state instead
  const authCallbacks = {
    onLogin: (data: AuthLoginAttempt) => {
      // No sensitive logging - authentication handled securely in sandbox
    },
    onForgotPassword: (email: string) => {
      setActivePageId('forgot_password');
    },
    onVerifyMfa: (data: AuthMfaVerifyAttempt) => {
      // No sensitive logging - code verified securely in sandbox
    },
    onResetPassword: (data: AuthResetPasswordAttempt) => {
      setActivePageId('login');
    },
    onSecondaryAction: () => {
      setActivePageId('login');
    }
  };

  const errorCallbacks = {
    onBackToLogin: () => {
      setActivePageId('login');
      onChange({ ...config, pageType: 'login' });
    }
  };

  // Dynamically render the target isolated page code
  const renderSelectedPage = () => {
    const isMobile = viewport === 'mobile';
    const authConfig = getMergedAuthPageConfig();
    const errConfig = getMergedErrorPageConfig();

    switch (activePageId) {
      case 'login':
        return <LoginPage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
      case 'account_locked':
        return <AccountLockedPage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
      case 'forgot_password':
        return <ForgotPasswordPage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
      case 'reset_password':
        return <ResetPasswordPage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
      case 'mfa':
        return <MfaChallengePage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
      case 'password_expired':
        return <PasswordExpiredPage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
      case 'session_expired':
        return <SessionExpiredPage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
      case 'error403':
        return <Error403Page config={errConfig} callbacks={errorCallbacks} isMobile={isMobile} />;
      case 'error404':
        return <Error404Page config={errConfig} callbacks={errorCallbacks} isMobile={isMobile} />;
      case 'error500':
        return <Error500Page config={errConfig} callbacks={errorCallbacks} isMobile={isMobile} />;
      case 'error503':
        return <Error503Page config={errConfig} callbacks={errorCallbacks} isMobile={isMobile} />;
      case 'backend_offline':
        return <BackendOfflinePage config={errConfig} callbacks={errorCallbacks} isMobile={isMobile} />;
      case 'network_offline':
        return <NetworkOfflinePage config={errConfig} callbacks={errorCallbacks} isMobile={isMobile} />;
      default:
        return <LoginPage config={authConfig} callbacks={authCallbacks} isMobile={isMobile} />;
    }
  };

  return (
    <div id="preview-pane-root" className="h-full flex flex-col bg-slate-950 p-4 md:p-6 lg:p-8">
      
      {/* 1. Header Toolbar (Viewport selectors and Isolated Page Dropdown) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-5 shrink-0 select-none">
        
        {/* Isolated Page Selector Box */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl flex-1">
          <LayoutGrid size={16} className="text-blue-400 shrink-0 ml-1" />
          <div className="flex-1">
            <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
              Isolated Page Navigator
            </span>
            <select
              value={activePageId}
              onChange={(e) => handlePageChange(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-slate-100 focus:outline-none w-full cursor-pointer pr-4"
              dir="rtl"
            >
              <optgroup label="بوابات المصادقة (Auth Flows)" className="bg-slate-900 text-slate-200">
                {PAGE_TEMPLATES.filter(p => p.category === 'auth').map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </optgroup>
              <optgroup label="صفحات الأخطاء (Error Pages)" className="bg-slate-900 text-slate-200">
                {PAGE_TEMPLATES.filter(p => p.category === 'error').map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Viewport simulation controllers */}
        <div className="flex items-center justify-end gap-3 self-end sm:self-auto">
          {mockError && (
            <button
              onClick={onClearError}
              className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-900/30 rounded-xl text-[10px] font-bold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Clear Simulator Banner</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewport === 'desktop' 
                  ? 'bg-slate-800 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Laptop size={13} />
              <span>Desktop</span>
            </button>
            <button 
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewport === 'mobile' 
                  ? 'bg-slate-800 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone size={13} />
              <span>Mobile</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. Main Sandbox Canvas Frame */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div 
          className={`h-full bg-slate-900 border-2 border-slate-800 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 relative shadow-2xl ${
            viewport === 'mobile' 
              ? 'w-[360px] max-h-[640px]' 
              : 'w-full'
          }`}
        >
          {/* Simulated Mobile Status bar if viewport mobile */}
          {viewport === 'mobile' && (
            <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5 text-slate-400 font-mono text-[9px] font-semibold select-none shrink-0">
              <span>9:41 AM</span>
              <div className="w-14 h-4 bg-slate-950 rounded-full flex items-center justify-center text-[7px] text-slate-500 font-sans tracking-widest border border-slate-800/40">APEX SECURE</div>
              <div className="flex items-center gap-1">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
          )}

          {/* Render target page under localized ERP scope to prevent style bleeding */}
          <div className="flex-1 overflow-hidden flex flex-col erp-auth-scope">
            {renderSelectedPage()}
          </div>

          {/* Simulated Mobile Home bar if viewport mobile */}
          {viewport === 'mobile' && (
            <div className="h-5 bg-slate-900 border-t border-slate-800 flex items-center justify-center select-none shrink-0">
              <div className="w-24 h-1.5 bg-slate-700 rounded-full"></div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
