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
import AuthStatusBanner from '../components/auth/AuthStatusBanner';
import AuthPrimaryAction from '../components/auth/AuthPrimaryAction';
import AuthSecondaryAction from '../components/auth/AuthSecondaryAction';
import AuthSecurityBadges from '../components/auth/AuthSecurityBadges';
import AuthSupportPanel from '../components/auth/AuthSupportPanel';

interface PasswordExpiredPageProps {
  config: AuthPageConfig;
  callbacks?: AuthPageCallbacks;
  isMobile?: boolean;
}

export default function PasswordExpiredPage({ config, callbacks, isMobile = false }: PasswordExpiredPageProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: 'success' | 'error' | 'warning' | 'info' } | null>(
    config.statusMessage ? { message: config.statusMessage, tone: config.statusTone || 'info' } : null
  );

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setStatus({ message: 'خطأ: يرجى إدخال كلمة المرور الحالية للتحقق.', tone: 'error' });
      return;
    }
    if (newPassword.length < 8) {
      setStatus({ message: 'خطأ: يجب أن تتكون كلمة المرور الجديدة من 8 خانات على الأقل وتتوافق مع سياسة الشركة المعقدة.', tone: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus({ message: 'خطأ: كلمتا المرور المدخلتان غير متطابقتين.', tone: 'error' });
      return;
    }
    if (currentPassword === newPassword) {
      setStatus({ message: 'خطأ سياسة الأمان: لا يمكن استخدام نفس كلمة المرور منتهية الصلاحية ككلمة مرور جديدة.', tone: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        message: 'تم تحديث كلمة المرور وحفظها بنجاح في سجلات السياسة الآمنة! يمكنك الآن تسجيل الدخول مجدداً.',
        tone: 'success'
      });
      if (callbacks?.onResetPassword) {
        callbacks.onResetPassword({ 
          currentPasswordProvided: Boolean(currentPassword), 
          passwordProvided: Boolean(newPassword) 
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
        <form onSubmit={handleUpdateSubmit} className="space-y-6 text-right">
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
            <AuthPasswordField
              label="كلمة المرور الحالية (منتهية الصلاحية)"
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              primaryColor={config.primaryColor}
              required
            />

            <AuthPasswordField
              label="كلمة المرور الجديدة المقترحة"
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              message: 'يرجى تقديم الهوية المهنية لمكتب دعم الـ IT لإعادة تهيئة صلاحية الحساب الاستثنائية.',
              tone: 'info'
            })}
          />
        </form>
      </AuthCard>
    </AuthShell>
  );
}
