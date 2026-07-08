/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeColor } from './design.types';

export interface ErrorPageConfig {
  statusCode: string; // e.g. '403' | '404' | '500' | '503' | 'OFFLINE'
  title: string;
  message: string;
  safeDetails?: string;
  referenceCode: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  illustration: '403' | '404' | '500' | '503' | 'offline' | 'network';
  primaryActionText: string;
  secondaryActionText?: string;
  showRetry: boolean;
  showBackToLogin: boolean;
  showSupportContact: boolean;
  maintenanceWindow?: string; // e.g., "02:00 - 04:00 AST"
  autoRefreshSeconds?: number;
  supportHint?: string;
  primaryColor: ThemeColor;
  brandName?: string;
  technicalPayload?: Record<string, string>;
  supportContact?: string;
  debugMode?: boolean;
}

export interface ErrorPageCallbacks {
  onRetry?: () => void;
  onBackToLogin?: () => void;
  onContactSupport?: () => void;
  onSecondaryAction?: () => void;
}
