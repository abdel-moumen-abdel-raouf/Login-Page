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

interface MfaChallengePageProps {
  config: AuthPageConfig;
  callbacks?: AuthPageCallbacks;
  isMobile?: boolean;
}

export default function MfaChallengePage({ config, callbacks, isMobile = false }: MfaChallengePageProps) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: 'success' | 'error' | 'warning' | 'info' } | null>(
    config.statusMessage ? { message: config.statusMessage, tone: config.statusTone || 'info' } : null
  );

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || token.length !== 6) {
      setStatus({ message: 'خطأ أمني: رمز الأمان المؤقت يجب أن يتكون من 6 أرقام.', tone: 'error' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        message: 'تم التحقق من تطابق الهوية الثنائي بنجاح! جاري التوجيه للوحة العمل...',
        tone: 'success'
      });
      if (callbacks?.onVerifyMfa) {
        callbacks.onVerifyMfa({ tokenProvided: Boolean(token) });
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
        <form onSubmit={handleVerifySubmit} className="space-y-6 text-right">
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
              label="رمز التحقق الآمن (Authenticator Token)"
              iconName="mfa"
              placeholder="000000"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value)}
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
                onClick={() => {
                  setStatus({
                    message: 'تم إرسال رمز مصادقة بديل عبر الهاتف المحمول المسجل أو البريد الاحتياطي بنجاح.',
                    tone: 'info'
                  });
                }}
              />
            )}
          </div>

          <AuthSecurityBadges badges={config.securityBadges} />

          <AuthSupportPanel 
            supportText={config.supportText}
            onContactSupport={() => setStatus({
              message: 'يرجى مراجعة مدير النظام لمطابقة بصمة الـ Key والتحقق من التوقيت الفعلي لهاتفك.',
              tone: 'info'
            })}
          />
        </form>
      </AuthCard>
    </AuthShell>
  );
}
