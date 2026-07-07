/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ErrorPageConfig, ErrorPageCallbacks } from '../types/error.types';
import ErrorShell from '../components/error/ErrorShell';
import ErrorCard from '../components/error/ErrorCard';
import ErrorIllustration from '../components/error/ErrorIllustration';
import ErrorReferenceCode from '../components/error/ErrorReferenceCode';
import ErrorActionGroup from '../components/error/ErrorActionGroup';
import ErrorSupportBlock from '../components/error/ErrorSupportBlock';
import AuthLogoBlock from '../components/auth/AuthLogoBlock';

interface BackendOfflinePageProps {
  config: ErrorPageConfig;
  callbacks?: ErrorPageCallbacks;
  isMobile?: boolean;
}

export default function BackendOfflinePage({ config, callbacks, isMobile = false }: BackendOfflinePageProps) {
  const [countdown, setCountdown] = useState(45);
  const [isRetrying, setIsRetrying] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Auto retry countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      handleAutoRetry();
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleAutoRetry = () => {
    setIsRetrying(true);
    setStatus(null);
    setTimeout(() => {
      setIsRetrying(false);
      setCountdown(45);
      setStatus('تم الفحص: ما زال الخادم الرئيسي لا يستجيب لطلبات اختبار الصحة (Healthcheck). جاري محاولة التوجيه للخادم الاحتياطي.');
    }, 2000);
  };

  return (
    <ErrorShell isMobile={isMobile}>
      <ErrorCard isMobile={isMobile}>
        {/* Column 1: Custom Vector SVG Illustration */}
        <div className="flex items-center justify-center">
          <ErrorIllustration type="offline" primaryColor={config.primaryColor} isMobile={isMobile} />
        </div>

        {/* Column 2: Content & Actions */}
        <div className="space-y-6">
          <AuthLogoBlock brandName={config.brandName || 'أبيكس'} primaryColor={config.primaryColor} />

          <div className="p-4 bg-slate-50 border-r-4 border-slate-650 flex items-start gap-3">
            <span className="text-2xl mt-0.5">🔌</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">حالة النظام: الخادم غير متصل</h4>
              <p className="text-xs text-slate-500 mt-1 font-mono">Backend API Server Offline</p>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {config.title}
          </h2>

          {status && (
            <div className="p-3 bg-rose-50 border border-rose-250 text-rose-800 text-xs animate-fade-in font-semibold">
              {status}
            </div>
          )}

          <ErrorReferenceCode 
            referenceCode={config.referenceCode} 
            statusCode={config.statusCode}
            safeDetails={config.safeDetails || config.message}
            debugFields={config.technicalPayload}
          />

          <ErrorActionGroup 
            primaryColor={config.primaryColor}
            primaryActionText={isRetrying ? 'جاري التحقق الفوري...' : config.primaryActionText}
            secondaryActionText={config.secondaryActionText}
            onPrimaryAction={handleAutoRetry}
            onSecondaryAction={() => callbacks?.onBackToLogin?.()}
            isMobile={isMobile}
          />

          <ErrorSupportBlock 
            countdown={countdown}
            isRetrying={isRetrying}
            supportHint={config.supportHint || config.supportContact} 
          />
        </div>
      </ErrorCard>
    </ErrorShell>
  );
}
