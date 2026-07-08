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

interface Error503PageProps {
  config: ErrorPageConfig;
  callbacks?: ErrorPageCallbacks;
  isMobile?: boolean;
}

export default function Error503Page({ config, callbacks, isMobile = false }: Error503PageProps) {
  const [countdown, setCountdown] = useState(120);
  const [isRetrying, setIsRetrying] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Active countdown timer ticking every second
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
      setCountdown(120);
      setStatus('تم التحقق التلقائي: لم تنتهِ نافذة تحديث الخوادم بعد. يرجى الانتظار حتى اكتمال نقل البيانات بأمان.');
    }, 2000);
  };

  return (
    <ErrorShell isMobile={isMobile}>
      <ErrorCard isMobile={isMobile}>
        {/* Column 1: Custom Vector SVG Illustration */}
        <div className="flex items-center justify-center">
          <ErrorIllustration type="503" primaryColor={config.primaryColor} isMobile={isMobile} />
        </div>

        {/* Column 2: Content & Actions */}
        <div className="space-y-6">
          <AuthLogoBlock brandName={config.brandName || 'أبيكس'} primaryColor={config.primaryColor} />

          <div className="p-4 bg-blue-50 border-r-4 border-blue-500 flex items-start gap-3">
            <span className="text-2xl mt-0.5">⚙️</span>
            <div>
              <h4 className="font-bold text-sm text-blue-950">خطأ {config.statusCode}: الخدمة غير متوفرة حالياً</h4>
              <p className="text-xs text-blue-800 mt-1 font-mono">Scheduled Maintenance In Progress</p>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {config.title}
          </h2>

          {status && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs animate-fade-in font-semibold">
              {status}
            </div>
          )}

          <ErrorReferenceCode 
            referenceCode={config.referenceCode} 
            statusCode={config.statusCode}
            safeDetails={config.safeDetails || config.message}
            debugFields={config.technicalPayload}
            debugMode={config.debugMode}
          />

          <ErrorActionGroup 
            primaryColor={config.primaryColor}
            primaryActionText={isRetrying ? 'جاري الفحص الآن...' : config.primaryActionText}
            secondaryActionText={config.secondaryActionText}
            onPrimaryAction={handleAutoRetry}
            onSecondaryAction={() => callbacks?.onBackToLogin?.()}
            isMobile={isMobile}
          />

          <ErrorSupportBlock 
            maintenanceWindow="02:00 ص - 04:00 ص (KSA)"
            countdown={countdown}
            isRetrying={isRetrying}
            supportHint={config.supportHint || config.supportContact} 
          />
        </div>
      </ErrorCard>
    </ErrorShell>
  );
}
