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

interface SessionExpiredPageProps {
  config: AuthPageConfig;
  callbacks?: AuthPageCallbacks;
  isMobile?: boolean;
}

export default function SessionExpiredPage({ config, callbacks, isMobile = false }: SessionExpiredPageProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: 'success' | 'error' | 'warning' | 'info' } | null>({
    message: config.statusMessage || 'انتهت صلاحية جلسة العمل الحالية نتيجة الخمول الطويل لحماية خصوصية بياناتك.',
    tone: config.statusTone || 'warning'
  });

  const handleReauth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        message: 'جاري تحويلك لبوابة تسجيل الدخول الآمن لتجديد مفاتيح الجلسة...',
        tone: 'success'
      });
      if (callbacks?.onSecondaryAction) {
        callbacks.onSecondaryAction();
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
        <form onSubmit={handleReauth} className="space-y-6 text-right">
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
              message: 'يرجى العلم أن النظام يغلق تلقائياً بعد 20 دقيقة من الخمول التام كمتطلب لمعايير الهيئة الوطنية للأمن السيبراني.',
              tone: 'info'
            })}
          />
        </form>
      </AuthCard>
    </AuthShell>
  );
}
