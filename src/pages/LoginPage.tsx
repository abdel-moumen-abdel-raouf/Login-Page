/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthPageConfig, AuthPageCallbacks } from '../types/auth.types';
import AuthShell from '../components/auth/AuthShell';
import AuthCard from '../components/auth/AuthCard';
import AuthLogoBlock from '../components/auth/AuthLogoBlock';
import AuthTextField from '../components/auth/AuthTextField';
import AuthPasswordField from '../components/auth/AuthPasswordField';
import AuthStatusBanner from '../components/auth/AuthStatusBanner';
import AuthActionGroup from '../components/auth/AuthActionGroup';
import AuthPrimaryAction from '../components/auth/AuthPrimaryAction';
import AuthSecondaryAction from '../components/auth/AuthSecondaryAction';
import AuthSecurityBadges from '../components/auth/AuthSecurityBadges';
import AuthSupportPanel from '../components/auth/AuthSupportPanel';

interface LoginPageProps {
  config: AuthPageConfig;
  callbacks?: AuthPageCallbacks;
  isMobile?: boolean;
}

export default function LoginPage({ config, callbacks, isMobile = false }: LoginPageProps) {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfa, setMfa] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localStatus, setLocalStatus] = useState<{ message: string; tone: 'success' | 'error' | 'warning' | 'info' } | null>(
    config.statusMessage ? { message: config.statusMessage, tone: config.statusTone || 'info' } : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalStatus(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // Dynamic validation of fields
      if (config.showDomainLogin && !domain) {
        setLocalStatus({
          message: 'خطأ: يرجى إدخال اسم النطاق الفرعي للمؤسسة قبل المتابعة.',
          tone: 'error'
        });
        return;
      }

      if (!email) {
        setLocalStatus({
          message: 'خطأ: يرجى إدخال البريد الإلكتروني المهني الخاص بك.',
          tone: 'error'
        });
        return;
      }

      if (!password) {
        setLocalStatus({
          message: 'خطأ: حقل كلمة المرور مطلوب للتحقق من الهوية.',
          tone: 'error'
        });
        return;
      }

      if (config.showMfa && (!mfa || mfa.length !== 6)) {
        setLocalStatus({
          message: 'خطأ أمني: رمز المصادقة الثنائية (MFA) غير صالح أو منتهي الصلاحية.',
          tone: 'error'
        });
        return;
      }

      // Successful simulated auth
      setLocalStatus({
        message: 'تمت مصادقة الهوية بنجاح! جاري تفويض وتشفير رموز الجلسة وتحميل النظام لـ ' + config.brandName,
        tone: 'success'
      });

      if (callbacks?.onLogin) {
        // Zero-leakage: do not emit raw password/MFA outside LoginPage
        callbacks.onLogin({ 
          domainProvided: Boolean(domain), 
          emailProvided: Boolean(email), 
          passwordProvided: Boolean(password), 
          mfaProvided: Boolean(mfa), 
          remember 
        });
      }
    }, 1200);
  };

  return (
    <AuthShell
      layoutMode={config.layoutMode}
      primaryColor={config.primaryColor}
      heroTitle={config.heroTitle}
      heroSubtitle={config.heroSubtitle}
      isMobile={isMobile}
    >
      <AuthCard layoutMode={config.layoutMode} isMobile={isMobile}>
        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          
          {/* Logo & Subtitles Header */}
          <div>
            <AuthLogoBlock brandName={config.brandName} primaryColor={config.primaryColor} />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {config.title}
            </h1>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Inline Status Banners */}
          {localStatus && (
            <AuthStatusBanner message={localStatus.message} tone={localStatus.tone} />
          )}

          {/* Form fields */}
          <div className="space-y-4">
            {config.showDomainLogin && (
              <AuthTextField
                label="نطاق المؤسسة الفرعي (.apex.corp)"
                iconName="domain"
                placeholder="company-subdomain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                primaryColor={config.primaryColor}
                required
              />
            )}

            <AuthTextField
              label="البريد الإلكتروني المهني"
              type="email"
              iconName="mail"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              primaryColor={config.primaryColor}
              required
            />

            <AuthPasswordField
              label="كلمة المرور"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              primaryColor={config.primaryColor}
              required
            />

            {config.showMfa && (
              <AuthTextField
                label="رمز الأمان المؤقت (MFA Token)"
                iconName="mfa"
                placeholder="000000"
                maxLength={6}
                value={mfa}
                onChange={(e) => setMfa(e.target.value)}
                primaryColor={config.primaryColor}
                required
              />
            )}
          </div>

          {/* Remember me & Forgot Password links */}
          <AuthActionGroup row>
            {config.showRememberDevice && (
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded-none border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>تذكر هذا الجهاز</span>
              </label>
            )}

            {config.showForgotPassword && (
              <button
                type="button"
                onClick={() => callbacks?.onForgotPassword?.(email)}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                نسيت كلمة المرور؟
              </button>
            )}
          </AuthActionGroup>

          {/* Form CTA Actions */}
          <AuthActionGroup>
            <AuthPrimaryAction 
              text={config.primaryActionText} 
              loading={loading} 
              primaryColor={config.primaryColor}
            />

            {config.secondaryActionText && (
              <AuthSecondaryAction 
                text={config.secondaryActionText}
                type="button"
                onClick={() => callbacks?.onSecondaryAction?.()}
              />
            )}
          </AuthActionGroup>

          {/* Compliance & Badges */}
          <AuthSecurityBadges badges={config.securityBadges} />

          {/* Helpdesk Support links */}
          <AuthSupportPanel 
            supportText={config.supportText}
            onContactSupport={() => setLocalStatus({
              message: 'يرجى تقديم هويتك للمكتب الفني التابع لقسم IT بالشركة لإعادة تعيين الصلاحيات يدوياً.',
              tone: 'info'
            })}
          />

        </form>
      </AuthCard>
    </AuthShell>
  );
}
