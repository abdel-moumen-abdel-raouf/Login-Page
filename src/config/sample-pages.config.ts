/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthPageConfig } from '../types/auth.types';
import { ErrorPageConfig } from '../types/error.types';

// Default Auth Page Configs (1 to 7)
export const DEFAULT_LOGIN_CONFIG: AuthPageConfig = {
  brandName: 'أبيكس إي آر بي',
  logo: 'cube',
  title: 'تسجيل الدخول للمؤسسة',
  subtitle: 'بوابة موحدة وآمنة لإدارة الخدمات اللوجستية، الدفاتر المالية والتحليلات المؤسسية.',
  description: 'يرجى إدخال بيانات الاعتماد الخاصة بك للوصول إلى النظام. تخضع جميع الاتصالات للمراقبة والتشفير الأمني.',
  layoutMode: 'split',
  primaryColor: 'blue',
  heroTitle: 'نظام الإدارة المتكامل للمؤسسات الحديثة',
  heroSubtitle: 'كفاءة تشغيلية متناهية، ذكاء أعمال لحظي، وحماية مطلقة لأصولك الرقمية وبياناتك المالية.',
  securityBadges: [
    { id: 'shield', label: 'تشفير AES-256' },
    { id: 'iso', label: 'ISO 27001 Certified' },
    { id: 'mfa', label: 'مصادقة ثنائية إلزامية' }
  ],
  primaryActionText: 'دخول آمن للنظام',
  secondaryActionText: 'تسجيل دخول النطاق المحلي',
  supportText: 'تواجه مشكلة؟ اتصل بفريق تكنولوجيا المعلومات الداخلي',
  showRememberDevice: true,
  showForgotPassword: true,
  showDomainLogin: true,
  showMfa: false,
  showLanguageSwitch: true,
};

export const DEFAULT_ACCOUNT_LOCKED_CONFIG: AuthPageConfig = {
  ...DEFAULT_LOGIN_CONFIG,
  title: 'تم قفل الحساب مؤقتاً',
  subtitle: 'أمن الهوية والتحكم بالوصول',
  description: 'تم رصد 5 محاولات تسجيل دخول خاطئة متتالية على حسابك. لحماية البيانات الحساسة، تم تفعيل القفل التلقائي لحسابك لمدة 30 دقيقة.',
  primaryActionText: 'طلب إلغاء القفل الفوري',
  secondaryActionText: 'العودة لصفحة الدخول',
  statusMessage: 'الحساب مغلق: سيتم رفع الحظر تلقائياً بعد 30 دقيقة، أو يمكنك التحقق من هويتك الآن.',
  statusTone: 'warning',
  showRememberDevice: false,
  showForgotPassword: false,
  showDomainLogin: false,
  showMfa: false
};

export const DEFAULT_FORGOT_PASSWORD_CONFIG: AuthPageConfig = {
  ...DEFAULT_LOGIN_CONFIG,
  title: 'استعادة كلمة المرور',
  subtitle: 'إعادة تعيين آمنة لمعرف المرور',
  description: 'أدخل بريدك الإلكتروني المهني المرتبط بحسابك المؤسسي. سنرسل لك رمز تحقق مؤقت ورابطاً آمناً لإعادة تعيين كلمة المرور.',
  primaryActionText: 'إرسال رابط الاستعادة',
  secondaryActionText: 'العودة لصفحة الدخول',
  showRememberDevice: false,
  showForgotPassword: false,
  showDomainLogin: false,
  showMfa: false
};

export const DEFAULT_RESET_PASSWORD_CONFIG: AuthPageConfig = {
  ...DEFAULT_LOGIN_CONFIG,
  title: 'إنشاء كلمة مرور جديدة',
  subtitle: 'متطلبات الأمان القوية للمؤسسة',
  description: 'يرجى إدخال كلمة مرور جديدة. يجب ألا تقل عن 12 خانة وتحتوي على أحرف كبيرة وصغيرة، أرقام، ورموز خاصة لتلبية معايير أمن البيانات.',
  primaryActionText: 'تحديث وحفظ كلمة المرور',
  secondaryActionText: 'إلغاء والعودة للدخول',
  showRememberDevice: false,
  showForgotPassword: false,
  showDomainLogin: false,
  showMfa: false,
  customLabel1: 'كلمة المرور الجديدة',
  customLabel2: 'تأكيد كلمة المرور الجديدة'
};

export const DEFAULT_MFA_CONFIG: AuthPageConfig = {
  ...DEFAULT_LOGIN_CONFIG,
  title: 'المصادقة الثنائية الإلزامية',
  subtitle: 'حماية إضافية للبيانات الحساسة',
  description: 'يرجى إدخال رمز التحقق المكون من 6 أرقام والمولد بواسطة تطبيق الأمان الخاص بك (Authenticator app) أو المرسل لهاتفك المسجل.',
  primaryActionText: 'التحقق والمتابعة',
  secondaryActionText: 'إرسال رمز جديد',
  showRememberDevice: true,
  showForgotPassword: false,
  showDomainLogin: false,
  showMfa: true,
};

export const DEFAULT_PASSWORD_EXPIRED_CONFIG: AuthPageConfig = {
  ...DEFAULT_LOGIN_CONFIG,
  title: 'انتهت صلاحية كلمة المرور',
  subtitle: 'تحديث دوري إلزامي للأمان',
  description: 'تنص سياسة أمن المعلومات بالمؤسسة على تغيير كلمة المرور كل 90 يوماً. لقد انتهت صلاحية كلمة المرور الحالية الخاصة بك ويرجى تحديثها الآن.',
  primaryActionText: 'تحديث كلمة المرور ومتابعة الدخول',
  secondaryActionText: 'اتصل بمسؤول الأمان',
  showRememberDevice: false,
  showForgotPassword: false,
  showDomainLogin: false,
  showMfa: false,
  customLabel1: 'كلمة المرور الحالية',
  customLabel2: 'كلمة المرور الجديدة'
};

export const DEFAULT_SESSION_EXPIRED_CONFIG: AuthPageConfig = {
  ...DEFAULT_LOGIN_CONFIG,
  title: 'انتهت صلاحية الجلسة',
  subtitle: 'حماية تلقائية عند عدم النشاط',
  description: 'تم تسجيل خروجك تلقائياً لحماية حسابك من الوصول غير المصرح به بعد فترة من الخمول والعدم النشاط الممتدة.',
  primaryActionText: 'إعادة تسجيل الدخول الآن',
  secondaryActionText: 'الخروج النهائي',
  statusMessage: 'تنبيه: الجلسة منتهية الأمان. يرجى إدخال كلمة المرور مجدداً لاستئناف العمل دون فقدان البيانات.',
  statusTone: 'info',
  showRememberDevice: false,
  showForgotPassword: true,
  showDomainLogin: false,
  showMfa: false
};


// Default Error Page Configs (8 to 13)
export const DEFAULT_ERROR_403_CONFIG: ErrorPageConfig = {
  statusCode: '403',
  title: 'تم حظر الوصول إلى هذه البوابة',
  message: 'لقد تم رفض طلب الاتصال الخاص بك بناءً على سياسات جدار الحماية والأمن السيبراني للشركة.',
  safeDetails: 'عنوان IP الخاص بك غير مدرج في القائمة البيضاء المسموح لها بالاتصال، أو أن حسابك الحالي يفتقر إلى الصلاحيات الكافية لاستعراض هذا الموديل الحساس.',
  referenceCode: 'SEC-403-IPX9',
  severity: 'high',
  illustration: '403',
  primaryActionText: 'طلب فك الحظر الفني',
  secondaryActionText: 'العودة لبوابة تسجيل الدخول',
  showRetry: false,
  showBackToLogin: true,
  showSupportContact: true,
  supportHint: 'يمكنك التواصل مع فريق الدعم السيبراني وإعطائهم الرمز المرجعي الموضح أدناه.',
  primaryColor: 'blue'
};

export const DEFAULT_ERROR_404_CONFIG: ErrorPageConfig = {
  statusCode: '404',
  title: 'الموديول أو الصفحة غير موجودة',
  message: 'عذراً، لم نتمكن من العثور على الصفحة أو المورد المطلوبة في نظام أبيكس.',
  safeDetails: 'قد يكون هذا الموديول قيد التحديث الفني، أو تم تغيير مساره الهيكلي، أو لا تملك ترخيص تفعيله ضمن حزمة اشتراكك الحالية.',
  referenceCode: 'ERP-404-NF2',
  severity: 'low',
  illustration: '404',
  primaryActionText: 'العودة للوحة التحكم الرئيسية',
  secondaryActionText: 'تسجيل الدخول مجدداً',
  showRetry: false,
  showBackToLogin: true,
  showSupportContact: true,
  primaryColor: 'indigo'
};

export const DEFAULT_ERROR_500_CONFIG: ErrorPageConfig = {
  statusCode: '500',
  title: 'خطأ فني في خادم معالجة البيانات',
  message: 'تعذر إكمال العملية حاليًا بسبب استثناء غير متوقع في محرك المعالجة الرئيسي.',
  safeDetails: 'يرجى العلم أن هذا الخطأ آمن وتلقائي ولا يؤثر على سلامة بياناتك المسجلة. تم إرسال تقرير فني لغرفة التحكم لإصلاح الخلل.',
  referenceCode: 'SRV-500-ERR_DB_TIMEOUT',
  severity: 'high',
  illustration: '500',
  primaryActionText: 'تحديث ومحاولة مرة أخرى',
  secondaryActionText: 'العودة لصفحة الدخول',
  showRetry: true,
  showBackToLogin: true,
  showSupportContact: true,
  primaryColor: 'teal'
};

export const DEFAULT_ERROR_503_CONFIG: ErrorPageConfig = {
  statusCode: '503',
  title: 'النظام في وضع الصيانة الدورية',
  message: 'نعمل حالياً على ترقية خوادم أبيكس إي آر بي لتقديم أداء أسرع وميزات أكثر أماناً.',
  safeDetails: 'تنتهي نافذة الصيانة المجدولة قريباً. سيتم حفظ وإعادة تشغيل كافة المهام المعلقة تلقائياً.',
  referenceCode: 'MNT-503-SCHEDULED',
  severity: 'medium',
  illustration: '503',
  primaryActionText: 'التحقق الفوري من الاتصال',
  secondaryActionText: 'استعراض حالة الخادم',
  showRetry: true,
  showBackToLogin: false,
  showSupportContact: true,
  maintenanceWindow: 'من الساعة 02:00 وحتى الساعة 04:00 بتوقيت مكة المكرمة',
  autoRefreshSeconds: 15,
  primaryColor: 'amber'
};

export const DEFAULT_BACKEND_OFFLINE_CONFIG: ErrorPageConfig = {
  statusCode: 'OFFLINE',
  title: 'خادم المصادقة الرئيسي غير متصل',
  message: 'فشل الاتصال بمركز البيانات التابع لأبيكس إي آر بي.',
  safeDetails: 'لم نتمكن من إنشاء ممر تواصل آمن مع خادم الهويات المركزي. قد يكون ذلك بسبب انقطاع جزئي في الخدمة أو خضوع الخادم لإعادة تشغيل عاجلة.',
  referenceCode: 'SYS-OFF-CONN_REFUSED',
  severity: 'critical',
  illustration: 'offline',
  primaryActionText: 'إعادة محاولة الاتصال بالمركز',
  secondaryActionText: 'التحول للنظام الاحتياطي المحلي',
  showRetry: true,
  showBackToLogin: true,
  showSupportContact: true,
  primaryColor: 'slate'
};

export const DEFAULT_NETWORK_OFFLINE_CONFIG: ErrorPageConfig = {
  statusCode: 'NETWORK',
  title: 'لا يوجد اتصال بالإنترنت لديك',
  message: 'يرجى التحقق من اتصال الشبكة الخاص بجهازك لإكمال تصفح نظام أبيكس.',
  safeDetails: 'يبدو أن جهازك غير متصل بالإنترنت حالياً (Network Offline). يتطلب نظام أبيكس إي آر بي اتصالاً مستمراً مشفراً وموثوقاً لمزامنة البيانات والتقارير الفورية.',
  referenceCode: 'NET-OFF-NO_CARRIER',
  severity: 'medium',
  illustration: 'network',
  primaryActionText: 'إعادة فحص الشبكة المحلية',
  showRetry: true,
  showBackToLogin: false,
  showSupportContact: false,
  primaryColor: 'emerald'
};
