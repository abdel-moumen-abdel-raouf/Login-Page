/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ErrorPageConfig, ErrorPageCallbacks } from '../types/error.types';
import ErrorShell from '../components/error/ErrorShell';
import ErrorCard from '../components/error/ErrorCard';
import ErrorIllustration from '../components/error/ErrorIllustration';
import ErrorReferenceCode from '../components/error/ErrorReferenceCode';
import ErrorActionGroup from '../components/error/ErrorActionGroup';
import ErrorSupportBlock from '../components/error/ErrorSupportBlock';
import AuthLogoBlock from '../components/auth/AuthLogoBlock';

interface Error500PageProps {
  config: ErrorPageConfig;
  callbacks?: ErrorPageCallbacks;
  isMobile?: boolean;
}

export default function Error500Page({ config, callbacks, isMobile = false }: Error500PageProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleRetry = () => {
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setLoading(false);
      setStatus('تنبيه: فشلت محاولة الاتصال التلقائي بالخادم مجدداً. ما زالت قاعدة البيانات غير مستجيبة لمصادقة الجلسات الموقعة.');
    }, 1200);
  };

  return (
    <ErrorShell isMobile={isMobile}>
      <ErrorCard isMobile={isMobile}>
        {/* Column 1: Custom Vector SVG Illustration */}
        <div className="flex items-center justify-center">
          <ErrorIllustration type="500" primaryColor={config.primaryColor} isMobile={isMobile} />
        </div>

        {/* Column 2: Content & Actions */}
        <div className="space-y-6">
          <AuthLogoBlock brandName={config.brandName || 'أبيكس'} primaryColor={config.primaryColor} />

          <div className="p-4 bg-red-50 border-r-4 border-red-500 flex items-start gap-3">
            <span className="text-2xl mt-0.5">💥</span>
            <div>
              <h4 className="font-bold text-sm text-red-900">خطأ {config.statusCode}: خلل داخلي بالخادم</h4>
              <p className="text-xs text-red-800 mt-1 font-mono">Internal Database Connection Fail</p>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {config.title}
          </h2>

          {status && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs animate-fade-in font-semibold">
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
            primaryActionText={loading ? 'جاري التحقق الفوري...' : config.primaryActionText}
            secondaryActionText={config.secondaryActionText}
            onPrimaryAction={handleRetry}
            onSecondaryAction={() => callbacks?.onBackToLogin?.()}
            isMobile={isMobile}
          />

          <ErrorSupportBlock supportHint={config.supportHint || config.supportContact} />
        </div>
      </ErrorCard>
    </ErrorShell>
  );
}
