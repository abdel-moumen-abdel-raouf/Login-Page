/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorPageConfig } from '../types/error.types';
import { 
  DEFAULT_ERROR_403_CONFIG,
  DEFAULT_ERROR_404_CONFIG,
  DEFAULT_ERROR_500_CONFIG,
  DEFAULT_ERROR_503_CONFIG,
  DEFAULT_BACKEND_OFFLINE_CONFIG,
  DEFAULT_NETWORK_OFFLINE_CONFIG 
} from './sample-pages.config';

export const errorPageConfigs: Record<string, ErrorPageConfig> = {
  error403: DEFAULT_ERROR_403_CONFIG,
  error404: DEFAULT_ERROR_404_CONFIG,
  error500: DEFAULT_ERROR_500_CONFIG,
  error503: DEFAULT_ERROR_503_CONFIG,
  backendOffline: DEFAULT_BACKEND_OFFLINE_CONFIG,
  networkOffline: DEFAULT_NETWORK_OFFLINE_CONFIG
};

export function getErrorPageConfig(pageId: string): ErrorPageConfig {
  return errorPageConfigs[pageId] || DEFAULT_ERROR_404_CONFIG;
}
