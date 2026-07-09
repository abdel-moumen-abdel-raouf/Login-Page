/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthPageConfig, AuthPageCallbacks } from '../types/auth.types';
import AuthShell from '../components/auth/AuthShell';
import AuthCard from '../components/auth/AuthCard';
import AuthLogoBlock from '../components/auth/AuthLogoBlock';
import AuthPasswordField from '../components/auth/AuthPasswordField';
import AuthTextField from '../components/auth/AuthTextField';
import AuthStatusBanner from '../components/auth/AuthStatusBanner';
import AuthPrimaryAction from '../components/auth/AuthPrimaryAction';
import AuthSecondaryAction from '../components/auth/AuthSecondaryAction';
import AuthSecurityBadges from '../components/auth/AuthSecurityBadges';
import AuthSupportPanel from '../components/auth/AuthSupportPanel';

interface ResetPasswordPageProps {
  config: AuthPageConfig;
  callbacks?: AuthPageCallbacks;
  isMobile?: boolean;
}

export default function ResetPasswordPage({ config, callbacks, isMobile = false }: ResetPasswordPageProps) {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: 'success' | 'error' | 'warning' | 'info' } | null>(
    config.statusMessage ? { message: config.statusMessage, tone: config.statusTone || 'info' } : null
  );

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus({ message: 'خطأ: يرجى إدخال رمز التحقق (OTP) المرسل إليك.', tone: 'error' });
      return;
    }
    if (password.length < 8) {
      setStatus({ message: 'خطأ: يجب أن تتكون كلمة المرور الجديدة من 8 خانات على الأقل.', tone: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      setStatus({ message: 'خطأ: كلمتا المرور المدخلتان غير متطابقتين.', tone: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        message: 'تم تحديث كلمة المرور وحفظها في قاعدة البيانات المشفرة بأمان. يمكنك الآن تسجيل الدخول.',
        tone: 'success'
      });
      if (callbacks?.onResetPassword) {
        callbacks.onResetPassword({ 
          tokenProvided: Boolean(token), 
          passwordProvided: Boolean(password) 
        });
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
        <form onSubmit={handleResetSubmit} className="space-y-6 text-right">
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
              label="رمز التحقق المؤقت (OTP)"
              iconName="mfa"
              placeholder="000000"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              primaryColor={config.primaryColor}
              required
            />

            <AuthPasswordField
              label="كلمة المرور الجديدة"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              primaryColor={config.primaryColor}
              required
            />

            <AuthPasswordField
              label="تأكيد كلمة المرور الجديدة"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              message: 'يرجى الاتصال بالدعم الفني إذا تكرر فشل فك التشفير الخاص برموز OTP.',
              tone: 'info'
            })}
          />
        </form>
      </AuthCard>
    </AuthShell>
  );
}
