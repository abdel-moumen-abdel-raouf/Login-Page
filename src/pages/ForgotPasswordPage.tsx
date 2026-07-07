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
import AuthStatusBanner from '../components/auth/AuthStatusBanner';
import AuthPrimaryAction from '../components/auth/AuthPrimaryAction';
import AuthSecondaryAction from '../components/auth/AuthSecondaryAction';
import AuthSecurityBadges from '../components/auth/AuthSecurityBadges';
import AuthSupportPanel from '../components/auth/AuthSupportPanel';

interface ForgotPasswordPageProps {
  config: AuthPageConfig;
  callbacks?: AuthPageCallbacks;
  isMobile?: boolean;
}

export default function ForgotPasswordPage({ config, callbacks, isMobile = false }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: 'success' | 'error' | 'warning' | 'info' } | null>(
    config.statusMessage ? { message: config.statusMessage, tone: config.statusTone || 'info' } : null
  );

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus({ message: 'خطأ: يرجى إدخال البريد الإلكتروني للمتابعة.', tone: 'error' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        message: 'تم إرسال رابط آمن ومشفّر لإعادة تعيين كلمة المرور إلى البريد الإلكتروني المدخل بنجاح.',
        tone: 'success'
      });
      if (callbacks?.onForgotPassword) {
        callbacks.onForgotPassword(email);
      }
    }, 1500);
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
        <form onSubmit={handleResetRequest} className="space-y-6 text-right">
          <div>
            <AuthLogoBlock brandName={config.brandName} primaryColor={config.primaryColor} />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {config.title}
            </h1>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {config.description}
            </p>
          </div>

          {status && (
            <AuthStatusBanner message={status.message} tone={status.tone} />
          )}

          <div className="space-y-4">
            <AuthTextField
              label="البريد الإلكتروني المسجل"
              type="email"
              iconName="mail"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              primaryColor={config.primaryColor}
              required
            />
          </div>

          <div className="space-y-3">
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
          </div>

          <AuthSecurityBadges badges={config.securityBadges} />

          <AuthSupportPanel 
            supportText={config.supportText}
            onContactSupport={() => setStatus({
              message: 'يرجى مراجعة قسم تكنولوجيا المعلومات في حال لم يصلك الرمز الموجه.',
              tone: 'info'
            })}
          />
        </form>
      </AuthCard>
    </AuthShell>
  );
}
