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

interface Error403PageProps {
  config: ErrorPageConfig;
  callbacks?: ErrorPageCallbacks;
  isMobile?: boolean;
}

export default function Error403Page({ config, callbacks, isMobile = false }: Error403PageProps) {
  const [status, setStatus] = useState<string | null>(null);

  const handleRequestUnblock = () => {
    setStatus('تم تسجيل طلب إلغاء الحظر وتوقيعه رقمياً لإرساله لمشرفي النظام الأمنيين للمراجعة اليدوية.');
  };

  return (
    <ErrorShell isMobile={isMobile}>
      <ErrorCard isMobile={isMobile}>
        {/* Column 1: Custom Vector SVG Illustration */}
        <div className="flex items-center justify-center">
          <ErrorIllustration type="403" primaryColor={config.primaryColor} isMobile={isMobile} />
        </div>

        {/* Column 2: Content & Actions */}
        <div className="space-y-6">
          <AuthLogoBlock brandName={config.brandName || 'أبيكس'} primaryColor={config.primaryColor} />

          <div className="p-4 bg-amber-50 border-r-4 border-amber-500 flex items-start gap-3">
            <span className="text-2xl mt-0.5">🚫</span>
            <div>
              <h4 className="font-bold text-sm text-amber-950">خطأ {config.statusCode}: غير مسموح بالدخول</h4>
              <p className="text-xs text-amber-800 mt-1 font-mono">Access Forbidden / IP Blocked</p>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {config.title}
          </h2>

          {status && (
            <div className="p-3 bg-slate-900 border-r-4 border-emerald-500 text-white text-xs animate-fade-in font-semibold">
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
            primaryActionText={config.primaryActionText}
            secondaryActionText={config.secondaryActionText}
            onPrimaryAction={() => callbacks?.onBackToLogin?.()}
            onSecondaryAction={handleRequestUnblock}
            isMobile={isMobile}
          />

          <ErrorSupportBlock supportHint={config.supportHint || config.supportContact} />
        </div>
      </ErrorCard>
    </ErrorShell>
  );
}
