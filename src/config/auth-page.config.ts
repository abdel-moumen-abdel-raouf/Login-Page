/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthPageConfig } from '../types/auth.types';
import { 
  DEFAULT_LOGIN_CONFIG,
  DEFAULT_ACCOUNT_LOCKED_CONFIG,
  DEFAULT_FORGOT_PASSWORD_CONFIG,
  DEFAULT_RESET_PASSWORD_CONFIG,
  DEFAULT_MFA_CONFIG,
  DEFAULT_PASSWORD_EXPIRED_CONFIG,
  DEFAULT_SESSION_EXPIRED_CONFIG 
} from './sample-pages.config';

export const authPageConfigs: Record<string, AuthPageConfig> = {
  login: DEFAULT_LOGIN_CONFIG,
  accountLocked: DEFAULT_ACCOUNT_LOCKED_CONFIG,
  forgotPassword: DEFAULT_FORGOT_PASSWORD_CONFIG,
  resetPassword: DEFAULT_RESET_PASSWORD_CONFIG,
  mfaChallenge: DEFAULT_MFA_CONFIG,
  passwordExpired: DEFAULT_PASSWORD_EXPIRED_CONFIG,
  sessionExpired: DEFAULT_SESSION_EXPIRED_CONFIG
};

export function getAuthPageConfig(pageId: string): AuthPageConfig {
  return authPageConfigs[pageId] || DEFAULT_LOGIN_CONFIG;
}
