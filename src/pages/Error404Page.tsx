/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ErrorPageConfig, ErrorPageCallbacks } from '../types/error.types';
import ErrorShell from '../components/error/ErrorShell';
import ErrorCard from '../components/error/ErrorCard';
import ErrorIllustration from '../components/error/ErrorIllustration';
import ErrorReferenceCode from '../components/error/ErrorReferenceCode';
import ErrorActionGroup from '../components/error/ErrorActionGroup';
import ErrorSupportBlock from '../components/error/ErrorSupportBlock';
import AuthLogoBlock from '../components/auth/AuthLogoBlock';

interface Error404PageProps {
  config: ErrorPageConfig;
  callbacks?: ErrorPageCallbacks;
  isMobile?: boolean;
}

export default function Error404Page({ config, callbacks, isMobile = false }: Error404PageProps) {
  return (
    <ErrorShell isMobile={isMobile}>
      <ErrorCard isMobile={isMobile}>
        {/* Column 1: Custom Vector SVG Illustration */}
        <div className="flex items-center justify-center">
          <ErrorIllustration type="404" primaryColor={config.primaryColor} isMobile={isMobile} />
        </div>

        {/* Column 2: Content & Actions */}
        <div className="space-y-6">
          <AuthLogoBlock brandName={config.brandName || 'أبيكس'} primaryColor={config.primaryColor} />

          <div className="p-4 bg-slate-100 border-r-4 border-slate-800 flex items-start gap-3">
            <span className="text-2xl mt-0.5">🔍</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">خطأ {config.statusCode}: الصفحة غير موجودة</h4>
              <p className="text-xs text-slate-650 mt-1 font-mono">ERP Section Not Found</p>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {config.title}
          </h2>

          <ErrorReferenceCode 
            referenceCode={config.referenceCode} 
            statusCode={config.statusCode}
            safeDetails={config.safeDetails || config.message}
            debugFields={config.technicalPayload}
          />

          <ErrorActionGroup 
            primaryColor={config.primaryColor}
            primaryActionText={config.primaryActionText}
            secondaryActionText={config.secondaryActionText}
            onPrimaryAction={() => callbacks?.onBackToLogin?.()}
            onSecondaryAction={() => callbacks?.onBackToLogin?.()}
            isMobile={isMobile}
          />

          <ErrorSupportBlock supportHint={config.supportHint || config.supportContact} />
        </div>
      </ErrorCard>
    </ErrorShell>
  );
}
