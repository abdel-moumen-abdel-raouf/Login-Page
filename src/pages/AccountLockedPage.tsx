/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthPageConfig, AuthPageCallbacks } from '../types/auth.types';
import AuthShell from '../components/auth/AuthShell';
import AuthCard from '../components/auth/AuthCard';
import AuthLogoBlock from '../components/auth/AuthLogoBlock';
import AuthStatusBanner from '../components/auth/AuthStatusBanner';
import AuthPrimaryAction from '../components/auth/AuthPrimaryAction';
import AuthSecondaryAction from '../components/auth/AuthSecondaryAction';
import AuthSecurityBadges from '../components/auth/AuthSecurityBadges';
import AuthSupportPanel from '../components/auth/AuthSupportPanel';

interface AccountLockedPageProps {
  config: AuthPageConfig;
  callbacks?: AuthPageCallbacks;
  isMobile?: boolean;
}

export default function AccountLockedPage({ config, callbacks, isMobile = false }: AccountLockedPageProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: 'success' | 'error' | 'warning' | 'info' } | null>({
    message: config.statusMessage || 'بسبب محاولات دخول متكررة فاشلة، تم تأمين حسابك لحماية البيانات الحساسة.',
    tone: config.statusTone || 'warning'
  });

  const handleUnlockRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        message: 'تم إرسال تعليمات إلغاء القفل الآمن ورابط التحقق إلى بريدك الإلكتروني المؤسسي المسجل بنجاح.',
        tone: 'success'
      });
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
        <form onSubmit={handleUnlockRequest} className="space-y-6 text-right">
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
              message: 'يرجى تقديم هويتك للمكتب الفني لإعادة تعيين الحساب يدوياً.',
              tone: 'info'
            })}
          />
        </form>
      </AuthCard>
    </AuthShell>
  );
}
