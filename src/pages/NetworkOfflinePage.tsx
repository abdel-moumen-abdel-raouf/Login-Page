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

interface NetworkOfflinePageProps {
  config: ErrorPageConfig;
  callbacks?: ErrorPageCallbacks;
  isMobile?: boolean;
}

export default function NetworkOfflinePage({ config, callbacks, isMobile = false }: NetworkOfflinePageProps) {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setOnlineStatus(true);
      setStatus('تم استعادة اتصال شبكة الإنترنت الخاصة بك بنجاح! يمكنك العودة الآن.');
    };
    
    const handleOffline = () => {
      setOnlineStatus(false);
      setStatus('تنبيه: تم فصل اتصال شبكة الإنترنت المحلية الخاصة بك.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualCheck = () => {
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setLoading(false);
      const isCurrentlyOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
      setOnlineStatus(isCurrentlyOnline);
      if (isCurrentlyOnline) {
        setStatus('تهانينا: فحص الشبكة يظهر اتصالك الحالي بالإنترنت بأمان! يمكنك العودة.');
      } else {
        setStatus('فشل الفحص: ما زال حاسوبك غير قادر على الوصول لشبكة الإنترنت الخارجية. يرجى مراجعة موجه الشبكة (Router).');
      }
    }, 1500);
  };

  return (
    <ErrorShell isMobile={isMobile}>
      <ErrorCard isMobile={isMobile}>
        {/* Column 1: Custom Vector SVG Illustration */}
        <div className="flex items-center justify-center">
          <ErrorIllustration type="network" primaryColor={config.primaryColor} isMobile={isMobile} />
        </div>

        {/* Column 2: Content & Actions */}
        <div className="space-y-6">
          <AuthLogoBlock brandName={config.brandName || 'أبيكس'} primaryColor={config.primaryColor} />

          <div className={`p-4 border-r-4 flex items-start gap-3 ${
            onlineStatus ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'
          }`}>
            <span className="text-2xl mt-0.5">{onlineStatus ? '🌐' : '📡'}</span>
            <div>
              <h4 className={`font-bold text-sm ${onlineStatus ? 'text-emerald-950' : 'text-rose-950'}`}>
                {onlineStatus ? 'حالة الشبكة: متصل بالإنترنت' : 'حالة الشبكة: لا يوجد اتصال بالإنترنت'}
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                {onlineStatus ? 'Local Browser Network Connected' : 'Local Browser Network Disconnected'}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {config.title}
          </h2>

          {status && (
            <div className={`p-3 border text-xs animate-fade-in font-semibold ${
              onlineStatus ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
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
            primaryActionText={loading ? 'جاري فحص الاتصال البيني...' : config.primaryActionText}
            secondaryActionText={config.secondaryActionText}
            onPrimaryAction={handleManualCheck}
            onSecondaryAction={() => callbacks?.onBackToLogin?.()}
            isMobile={isMobile}
          />

          <ErrorSupportBlock supportHint={config.supportHint || config.supportContact} />
        </div>
      </ErrorCard>
    </ErrorShell>
  );
}
