/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LoginConfig } from './types';
import ControlPanel from './components/ControlPanel';
import PreviewPane from './components/PreviewPane';
import CodeExporter from './dev-tools/code-exporter/CodeExporter';
import { 
  Sliders, 
  FileCode, 
  Layers, 
  ShieldCheck,
  Smartphone,
  Laptop
} from 'lucide-react';

const DEFAULT_CONFIG: LoginConfig = {
  brandName: 'أبيكس إي آر بي',
  brandTagline: 'بوابة موحدة وآمنة لإدارة الخدمات اللوجستية، الدفاتر المالية والتحليلات المؤسسية.',
  primaryColor: 'blue',
  layoutStyle: 'split',
  showForgotPassword: true,
  showSignUpLink: true,
  showRememberMe: true,
  requireMFA: false,
  companyDomainLogin: false,
  customLogoUrl: '',
  pageType: 'login',
  debugMode: false,
  devMode: false
};

// Referencing the generated image from our image generation step
const HERO_IMAGE_URL = '/src/assets/images/erp_login_hero_1783025443394.jpg';

export default function App() {
  const [config, setConfig] = useState<LoginConfig>(DEFAULT_CONFIG);
  const [sidebarTab, setSidebarTab] = useState<'configure' | 'code'>('configure');
  const [mockError, setMockError] = useState<string | null>(null);

  // Reset tab to configure if developer mode is disabled
  React.useEffect(() => {
    if (!config.devMode && sidebarTab === 'code') {
      setSidebarTab('configure');
    }
  }, [config.devMode, sidebarTab]);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setMockError(null);
  };

  const handleTriggerMockError = (type: string) => {
    let msg = '';
    switch (type) {
      case 'ip_ban':
        msg = 'تحذير أمني للمؤسسة: تم رفض الاتصال. تم رصد عنوان IP الخاص بك وإدراجه في قائمة الحظر التابعة لسياسات التحكم بالوصول (IP Blocked).';
        break;
      case 'user_banned':
        msg = 'فشل تسجيل الدخول: تم حظر حساب المستخدم الخاص بك نهائياً لمخالفة سياسات الاستخدام الخاصة بالشركة. يرجى مراجعة إدارة تكنولوجيا المعلومات أو الموارد البشرية.';
        break;
      case 'account_locked':
        msg = 'أمن الهوية: تم قفل هذا الحساب مؤقتاً بسبب رصد 5 محاولات دخول خاطئة متتالية. سيتم إلغاء القفل تلقائياً بعد 30 دقيقة أو عبر التواصل مع مسؤول الدعم الفني.';
        break;
      case 'wrong_credentials':
        msg = 'خطأ في المصادقة: اسم المستخدم أو كلمة المرور التي أدخلتها غير صحيحة. يرجى التحقق من صحة البيانات والمحاولة مجدداً.';
        break;
      case 'server_down':
        msg = 'فشل الاتصال: الخادم الرئيسي للشركة (Authentication Portal) غير متصل حالياً أو يخضع لأعمال الصيانة الدورية. يرجى المحاولة لاحقاً (Error 503).';
        break;
      default:
        msg = 'حدث خطأ غير معروف أثناء معالجة طلب الدخول.';
    }
    setMockError(msg);
  };

  const handleClearError = () => {
    setMockError(null);
  };

  return (
    <div id="erp-login-designer-root" className="w-full min-h-screen lg:w-screen lg:h-screen flex flex-col lg:flex-row lg:overflow-hidden bg-slate-950 font-sans antialiased">
      
      {/* LEFT SIDEBAR PANEL: Dual Tabs (Customize Control Panel vs. Code Exporter) */}
      <aside className="w-full lg:w-[420px] xl:w-[460px] h-[520px] lg:h-full shrink-0 flex flex-col bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 z-30">
        
        {/* Navigation/Sidebar Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-2 shrink-0 gap-1">
          <button
            onClick={() => setSidebarTab('configure')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              sidebarTab === 'configure'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Sliders size={15} />
            <span>Customize Settings</span>
          </button>
          {config.devMode && (
            <button
              onClick={() => setSidebarTab('code')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                sidebarTab === 'code'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <FileCode size={15} />
              <span>HTML & SCSS Code</span>
            </button>
          )}
        </div>

        {/* Dynamic Sidebar Content */}
        <div className="flex-1 overflow-hidden">
          {sidebarTab === 'configure' ? (
            <ControlPanel 
              config={config} 
              onChange={setConfig} 
              onReset={handleReset}
              onTriggerMockError={handleTriggerMockError}
            />
          ) : (
            <CodeExporter 
              config={config} 
              heroImageUrl={HERO_IMAGE_URL} 
            />
          )}
        </div>
      </aside>

      {/* RIGHT PREVIEW CANVAS: Dynamic Live Preview Simulator */}
      <main className="flex-1 h-[600px] sm:h-[750px] lg:h-full lg:overflow-hidden z-20">
        <PreviewPane 
          config={config} 
          heroImageUrl={HERO_IMAGE_URL} 
          mockError={mockError}
          onClearError={handleClearError}
          onChange={setConfig}
        />
      </main>

    </div>
  );
}

