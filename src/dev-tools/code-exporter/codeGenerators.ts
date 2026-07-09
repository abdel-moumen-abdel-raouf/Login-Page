import { LoginConfig } from '../../types';

export const COLOR_PALETTES = {
  blue: { primary: '#2563eb', primaryHover: '#1d4ed8', primaryLight: '#eff6ff', accent: '#3b82f6' },
  teal: { primary: '#0d9488', primaryHover: '#0f766e', primaryLight: '#f0fdfa', accent: '#14b8a6' },
  indigo: { primary: '#4f46e5', primaryHover: '#4338ca', primaryLight: '#eef2ff', accent: '#6366f1' },
  emerald: { primary: '#059669', primaryHover: '#047857', primaryLight: '#ecfdf5', accent: '#10b981' },
  amber: { primary: '#d97706', primaryHover: '#b45309', primaryLight: '#fef3c7', accent: '#f59e0b' },
  slate: { primary: '#334155', primaryHover: '#1e293b', primaryLight: '#f1f5f9', accent: '#475569' },
};

export function generateHTML(config: LoginConfig, heroImageUrl: string = ''): string {
  const {
    brandName,
    brandTagline,
    layoutStyle,
    showForgotPassword,
    showSignUpLink,
    showRememberMe,
    requireMFA,
    companyDomainLogin,
    pageType = 'login'
  } = config;

  const isSplit = layoutStyle === 'split';
  const isGlass = layoutStyle === 'glassmorphic';

  // SVG Icons
  const googleIcon = `<svg class="sso-icon" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>`;
  const microsoftIcon = `<svg class="sso-icon" viewBox="0 0 23 23" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="11" height="11" fill="#f25022"/><rect x="12" y="0" width="11" height="11" fill="#7fba00"/><rect x="0" y="12" width="11" height="11" fill="#00a4ef"/><rect x="12" y="12" width="11" height="11" fill="#ffb900"/></svg>`;
  const lockIcon = `<svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="0" ry="0"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  const mailIcon = `<svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
  const domainIcon = `<svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="0" ry="0"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;

  let pageTitle = 'تسجيل الدخول';
  if (pageType === 'error403') pageTitle = 'غير مصرح بالدخول | 403';
  if (pageType === 'error404') pageTitle = 'الصفحة غير موجودة | 404';
  if (pageType === 'error500') pageTitle = 'خلل داخلي في الخادم | 500';
  if (pageType === 'error503') pageTitle = 'الخدمة غير متوفرة حالياً | 503';

  let cardContent = '';
  let scriptContent = '';

  if (pageType === 'login') {
    cardContent = `
        <!-- Header / Branding (Geometric Balance Style) -->
        <header id="erp-login-header">
          <div id="erp-login-brand">
            <div class="brand-logo-grid">
              <div class="logo-square-1"></div>
              <div class="logo-square-2"></div>
              <div class="logo-square-3"></div>
              <div class="logo-square-4"></div>
            </div>
            <span class="brand-name">${brandName.toUpperCase()}</span>
          </div>
          <h1 id="erp-login-title">مرحباً بك مجدداً</h1>
          <p id="erp-login-subtitle">${brandTagline || 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى بوابة المؤسسة.'}</p>
        </header>

        <!-- Login Form -->
        <form id="erp-login-form" action="#" method="POST" autocomplete="on">
          
          ${companyDomainLogin ? `
          <!-- Company Domain -->
          <div class="form-group" id="group-company-domain">
            <label for="input-company-domain" class="form-label">نطاق الشركة</label>
            <div class="input-wrapper">
              <span class="input-icon-container">${domainIcon}</span>
              <input 
                id="input-company-domain" 
                class="form-input text-right" 
                type="text" 
                name="domain" 
                placeholder="yourcompany" 
                required 
                autocomplete="organization"
              >
              <span class="input-suffix">.erp.com</span>
            </div>
          </div>` : ''}

          <!-- Email Input -->
          <div class="form-group" id="group-email">
            <label for="input-email" class="form-label">البريد الإلكتروني للعمل</label>
            <div class="input-wrapper">
              <span class="input-icon-container">${mailIcon}</span>
              <input 
                id="input-email" 
                class="form-input text-left" 
                type="email" 
                name="email" 
                placeholder="name@company.com" 
                required 
                autocomplete="email"
                dir="ltr"
              >
            </div>
          </div>

          <!-- Password Input -->
          <div class="form-group" id="group-password">
            <div class="label-row">
              <label for="input-password" class="form-label">كلمة المرور</label>
              ${showForgotPassword ? `<a id="link-forgot-password" href="#" class="form-link">هل نسيت كلمة المرور؟</a>` : ''}
            </div>
            <div class="input-wrapper">
              <span class="input-icon-container">${lockIcon}</span>
              <input 
                id="input-password" 
                class="form-input text-left" 
                type="password" 
                name="password" 
                placeholder="••••••••••••" 
                required 
                autocomplete="current-password"
                dir="ltr"
              >
              <button type="button" id="btn-toggle-password" class="password-toggle" aria-label="Toggle password visibility">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          ${requireMFA ? `
          <!-- MFA Security Code -->
          <div class="form-group" id="group-mfa">
            <label for="input-mfa" class="form-label">رمز التحقق الإضافي (2FA)</label>
            <div class="input-wrapper">
              <span class="input-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="0" ry="0"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </span>
              <input 
                id="input-mfa" 
                class="form-input text-center font-mono" 
                type="text" 
                name="mfa" 
                pattern="[0-9]{6}" 
                placeholder="000000" 
                inputmode="numeric" 
                maxlength="6"
                dir="ltr"
              >
            </div>
            <p class="input-hint">أدخل رمز الأمان المكون من 6 أرقام والموجود في بطاقة التحقق الخاصة بك.</p>
          </div>` : ''}

          <!-- Remember Me -->
          ${showRememberMe ? `
          <div class="form-actions-row">
            <label class="checkbox-container" id="remember-me-container">
              <input id="input-remember-me" type="checkbox" name="remember">
              <span class="checkmark"></span>
              <span class="checkbox-label">الوثوق بهذا الجهاز لمدة 30 يوماً</span>
            </label>
          </div>` : ''}

          <!-- Submit Button -->
          <button id="btn-submit" type="submit" class="btn-primary">
            مصادقة الحساب والاتصال
          </button>
        </form>

        ${showSignUpLink ? `
        <!-- Sign Up Link -->
        <footer id="erp-login-footer">
          <p class="footer-text">ليس لديك حساب مؤسسي؟ <a id="link-signup" href="#" class="form-link font-medium text-bold">اتصل بمسؤول الدعم الفني</a></p>
        </footer>` : ''}
    `;

    scriptContent = `
      const form = document.getElementById('erp-login-form');
      const submitBtn = document.getElementById('btn-submit');
      const passwordInput = document.getElementById('input-password');
      const passwordToggle = document.getElementById('btn-toggle-password');

      if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
          const isPassword = passwordInput.type === 'password';
          passwordInput.type = isPassword ? 'text' : 'password';
        });
      }

      if (form && submitBtn) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const originalText = submitBtn.textContent;
          submitBtn.disabled = true;
          submitBtn.classList.add('loading');
          submitBtn.textContent = 'جاري التحقق من معايير الأمان...';

          setTimeout(() => {
            submitBtn.textContent = 'مزامنة وحدات النظام...';
            setTimeout(() => {
              submitBtn.classList.remove('loading');
              submitBtn.classList.add('success');
              submitBtn.textContent = 'تم الاتصال بنجاح';
              console.log('محاكاة تسجيل الدخول نجحت! تم تسليم النموذج بأمان لمسؤولي النظام.');
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
              submitBtn.classList.remove('success');
            }, 1200);
          }, 1000);
        });
      }
    `;
  } else if (pageType === 'error403') {
    cardContent = `
        <header id="erp-login-header">
          <div id="erp-login-brand">
            <div class="brand-logo-grid">
              <div class="logo-square-1"></div>
              <div class="logo-square-2"></div>
              <div class="logo-square-3"></div>
              <div class="logo-square-4"></div>
            </div>
            <span class="brand-name">${brandName.toUpperCase()}</span>
          </div>
        </header>

        <div class="system-error-view">
          <div class="alert-block alert-warning">
            <span class="alert-icon">🚫</span>
            <div>
              <h4 class="alert-heading">خطأ 403: غير مسموح بالدخول</h4>
              <p class="alert-subheading">Access Forbidden / Blocked</p>
            </div>
          </div>

          <h2 class="error-title">تم حظر الوصول إلى هذه البوابة</h2>
          <p class="error-desc">
            لقد تم رفض طلب الاتصال الخاص بك بناءً على سياسات جدار الحماية والأمن السيبراني لشركة <strong>${brandName}</strong>. جهازك غير مصرح له بالدخول أو تم حظره لدواعي أمنية.
          </p>

          <div class="code-log-box">
            <div>REF_ID: SEC-403-DEV1</div>
          </div>

          <div class="error-actions">
            <button onclick="window.location.reload()" class="btn-primary" style="width: 100%;">إعادة محاولة الاتصال</button>
            <button onclick="console.log('تم تقديم طلب الفك لمراجعة الأمان.')" class="btn-secondary" style="width: 100%; margin-top: 10px;">طلب فك الحظر الفني</button>
          </div>
        </div>
    `;
  } else if (pageType === 'error404') {
    cardContent = `
        <header id="erp-login-header">
          <div id="erp-login-brand">
            <div class="brand-logo-grid">
              <div class="logo-square-1"></div>
              <div class="logo-square-2"></div>
              <div class="logo-square-3"></div>
              <div class="logo-square-4"></div>
            </div>
            <span class="brand-name">${brandName.toUpperCase()}</span>
          </div>
        </header>

        <div class="system-error-view">
          <div class="alert-block alert-neutral">
            <span class="alert-icon">🔍</span>
            <div>
              <h4 class="alert-heading">خطأ 404: الصفحة غير موجودة</h4>
              <p class="alert-subheading">ERP Module Not Found</p>
            </div>
          </div>

          <h2 class="error-title">لم نتمكن من العثور على هذا القسم</h2>
          <p class="error-desc">
            عذراً، يبدو أنك تحاول الوصول إلى وحدة نظام ERP غير مفعلة في اشتراكك الحالي أو تم نقل ملف المصادقة الخاص بها لمسار آخر على خوادم شركة <strong>${brandName}</strong>.
          </p>

          <div class="code-log-box">
            <div>REF_ID: ERP-404-NF2</div>
          </div>

          <div class="error-actions">
            <button onclick="console.log('جاري التوجيه للرئيسية...')" class="btn-primary" style="width: 100%;">العودة للرئيسية والتسجيل</button>
          </div>
        </div>
    `;
  } else if (pageType === 'error500') {
    cardContent = `
        <header id="erp-login-header">
          <div id="erp-login-brand">
            <div class="brand-logo-grid">
              <div class="logo-square-1"></div>
              <div class="logo-square-2"></div>
              <div class="logo-square-3"></div>
              <div class="logo-square-4"></div>
            </div>
            <span class="brand-name">${brandName.toUpperCase()}</span>
          </div>
        </header>

        <div class="system-error-view">
          <div class="alert-block alert-danger">
            <span class="alert-icon">💥</span>
            <div>
              <h4 class="alert-heading">خطأ 500: خلل داخلي</h4>
              <p class="alert-subheading">Internal Connection Timeout</p>
            </div>
          </div>

          <h2 class="error-title">فشل غير متوقع في جلب البيانات</h2>
          <p class="error-desc">
            حدث خطأ غير متوقع أثناء الاتصال بالخادم الرئيسي لنظام <strong>${brandName}</strong>. تم إرسال تنبيه بالحدث تلقائياً لفرق الدعم الفني.
          </p>

          <div class="code-log-box">
            <div>REF_ID: SRV-500-ERR1</div>
          </div>

          <div class="error-actions">
            <button onclick="window.location.reload()" class="btn-primary" style="width: 100%;">إعادة المحاولة وتحديث الصفحة</button>
          </div>
        </div>
    `;
  } else if (pageType === 'error503') {
    cardContent = `
        <header id="erp-login-header">
          <div id="erp-login-brand">
            <div class="brand-logo-grid">
              <div class="logo-square-1"></div>
              <div class="logo-square-2"></div>
              <div class="logo-square-3"></div>
              <div class="logo-square-4"></div>
            </div>
            <span class="brand-name">${brandName.toUpperCase()}</span>
          </div>
        </header>

        <div class="system-error-view">
          <div class="alert-block alert-info">
            <span class="alert-icon">⏳</span>
            <div>
              <h4 class="alert-heading">خطأ 503: الخدمة غير متوفرة</h4>
              <p class="alert-subheading">Service Temporarily Offline</p>
            </div>
          </div>

          <h2 class="error-title">بوابة المزامنة تحت الصيانة الدورية</h2>
          <p class="error-desc">
            الخوادم التابعة لنظام <strong>${brandName}</strong> متوقفة مؤقتاً لتثبيت التحديثات الأمنية المقررة. سيقوم النظام بمحاولة إعادة الاتصال التلقائي بالبوابة فور اكتمال أعمال الترقية.
          </p>

          <div class="countdown-card">
            <div class="countdown-header">
              <span class="pulsing-dot"></span>
              <span id="countdown-text">إعادة محاولة الاتصال التلقائي خلال <span id="timer-val">15</span> ثانية...</span>
            </div>
            <div class="progress-track">
              <div id="progress-bar" class="progress-fill" style="width: 100%"></div>
            </div>
          </div>

          <div class="error-actions">
            <button id="btn-retry-now" class="btn-primary" style="width: 100%;">حاول الاتصال الفوري الآن</button>
          </div>
        </div>
    `;

    scriptContent = `
      const timerVal = document.getElementById('timer-val');
      const progressBar = document.getElementById('progress-bar');
      const retryBtn = document.getElementById('btn-retry-now');
      const countdownText = document.getElementById('countdown-text');

      if (timerVal && progressBar) {
        let timeLeft = 15;
        let isRetrying = false;

        const updateTimer = () => {
          if (isRetrying) return;
          if (timeLeft <= 0) {
            triggerRetry();
            return;
          }
          timeLeft--;
          timerVal.textContent = timeLeft;
          progressBar.style.width = (timeLeft / 15 * 100) + '%';
        };

        let timerInterval = setInterval(updateTimer, 1000);

        const triggerRetry = () => {
          if (isRetrying) return;
          isRetrying = true;
          countdownText.innerHTML = 'جاري محاولة إعادة الاتصال بالبوابة...';
          progressBar.style.width = '100%';
          progressBar.classList.add('loading-pulse');
          if (retryBtn) retryBtn.disabled = true;

          setTimeout(() => {
            isRetrying = false;
            timeLeft = 15;
            timerVal.textContent = timeLeft;
            countdownText.innerHTML = 'إعادة محاولة الاتصال التلقائي خلال <span id="timer-val">15</span> ثانية...';
            progressBar.classList.remove('loading-pulse');
            progressBar.style.width = '100%';
            if (retryBtn) retryBtn.disabled = false;
            console.log('فشلت محاولة الاتصال التلقائي بالخادم الرئيسي (خطأ 503). سيعيد النظام المحاولة مجدداً بعد انتهاء العداد.');
          }, 2000);
        };

        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            triggerRetry();
          });
        }
      }
    `;
  }

  if (pageType !== 'login') {
    let bigSvg = '';
    let errorDetails = '';

    if (pageType === 'error403') {
      bigSvg = `
                    <svg class="error-illustration" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-403" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
                          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                        </radialGradient>
                        <linearGradient id="shield-grad" x1="50" y1="30" x2="150" y2="170" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#fbbf24"/>
                          <stop offset="50%" stop-color="#f59e0b"/>
                          <stop offset="100%" stop-color="#d97706"/>
                        </linearGradient>
                        <linearGradient id="lock-body-grad" x1="70" y1="85" x2="130" y2="155" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#1e293b"/>
                          <stop offset="100%" stop-color="#0f172a"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-403)"/>
                      <circle cx="100" cy="100" r="75" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 6" opacity="0.4" class="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="55" stroke="#94a3b8" stroke-width="0.5" stroke-dasharray="20 4" opacity="0.3"/>
                      <path d="M100 25 L165 62 L165 138 L100 175 L35 138 L35 62 Z" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 8" opacity="0.25" />
                      <line x1="100" y1="10" x2="100" y2="190" stroke="#f59e0b" stroke-width="0.5" stroke-dasharray="5 5" opacity="0.15" />
                      <line x1="10" y1="100" x2="190" y2="100" stroke="#f59e0b" stroke-width="0.5" stroke-dasharray="5 5" opacity="0.15" />
                      <path d="M75 100 V75 C75 61.2 86.2 50 100 50 C113.8 50 125 61.2 125 75 V100" stroke="url(#shield-grad)" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
                      <path d="M85 100 V75 C85 66.7 91.7 60 100 60 C108.3 60 115 66.7 115 75 V100" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
                      <rect x="60" y="92" width="80" height="65" rx="12" fill="url(#lock-body-grad)" stroke="#0f172a" stroke-width="3"/>
                      <rect x="64" y="96" width="72" height="57" rx="9" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.8"/>
                      <circle cx="100" cy="120" r="16" fill="#0f172a" stroke="#f59e0b" stroke-width="2" class="animate-pulse" />
                      <path d="M100 110 V124" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
                      <circle cx="100" cy="131" r="2.5" fill="#ef4444"/>
                      <circle cx="60" cy="92" r="3" fill="#f59e0b"/>
                      <circle cx="140" cy="92" r="3" fill="#f59e0b"/>
                      <circle cx="60" cy="157" r="3" fill="#f59e0b" opacity="0.6"/>
                      <circle cx="140" cy="157" r="3" fill="#f59e0b" opacity="0.6"/>
                      <path d="M45 80 L35 90 M35 80 L45 90" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
                      <path d="M165 80 L155 90 M155 80 L165 90" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
                    </svg>
      `;
      errorDetails = `
        <div class="system-error-view">
          <div class="alert-block alert-warning">
            <span class="alert-icon">🚫</span>
            <div>
              <h4 class="alert-heading">خطأ 403: غير مسموح بالدخول</h4>
              <p class="alert-subheading">Access Forbidden / Blocked</p>
            </div>
          </div>

          <h2 class="error-title">تم حظر الوصول إلى هذه البوابة</h2>
          <p class="error-desc">
            لقد تم رفض طلب الاتصال الخاص بك بناءً على سياسات جدار الحماية والأمن السيبراني لشركة <strong>${brandName}</strong>. جهازك غير مصرح له بالدخول أو تم حظره لدواعي أمنية.
          </p>

          <div class="code-log-box">
            <div>REF_ID: SEC-403-DEV1</div>
          </div>

          <div class="error-actions">
            <button onclick="window.location.href='login.html'" class="btn-primary" style="width: 100%;">العودة لبوابة تسجيل الدخول</button>
            <button onclick="console.log('تم تقديم طلب فك الحظر الفني.')" class="btn-secondary" style="width: 100%; margin-top: 10px;">طلب فك الحظر الفني</button>
          </div>
        </div>
      `;
    } else if (pageType === 'error404') {
      bigSvg = `
                    <svg class="error-illustration animate-float" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-404" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
                          <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
                        </radialGradient>
                        <linearGradient id="folder-grad" x1="45" y1="65" x2="135" y2="155" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#818cf8"/>
                          <stop offset="100%" stop-color="#4f46e5"/>
                        </linearGradient>
                        <linearGradient id="glass-lens-grad" x1="120" y1="100" x2="170" y2="150" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/>
                          <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.05"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-404)"/>
                      <g opacity="0.2">
                        <path d="M20 120 L100 160 L180 120 L100 80 Z" stroke="#6366f1" stroke-width="1" />
                        <path d="M40 110 L100 140 L160 110 L100 80 Z" stroke="#6366f1" stroke-width="1" />
                        <path d="M60 100 L100 120 L140 100 L100 80 Z" stroke="#6366f1" stroke-width="1" />
                        <line x1="100" y1="80" x2="100" y2="160" stroke="#6366f1" stroke-width="1" />
                        <line x1="20" y1="120" x2="180" y2="120" stroke="#6366f1" stroke-width="1" />
                      </g>
                      <circle cx="100" cy="100" r="65" stroke="#6366f1" stroke-width="1" stroke-dasharray="4 12" opacity="0.3" class="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="45" stroke="#818cf8" stroke-width="0.75" stroke-dasharray="2 6" opacity="0.4"/>
                      <g transform="translate(10, -5)">
                        <path d="M55 135 L95 150 L135 135 L95 120 Z" fill="#0f172a" opacity="0.1" />
                        <path d="M50 75 L90 55 L135 72 V125 L95 142 L50 122 Z" fill="url(#folder-grad)" stroke="#4338ca" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M62 58 L94 42 L127 55 V108 L94 124 L62 108 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" stroke-linejoin="round" />
                        <line x1="75" y1="68" x2="102" y2="56" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="75" y1="78" x2="114" y2="61" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="75" y1="88" x2="108" y2="74" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
                        <path d="M50 88 L95 106 L135 88 V125 L95 142 L50 122 Z" fill="#4f46e5" stroke="#3730a3" stroke-width="2" stroke-linejoin="round" opacity="0.95"/>
                        <path d="M85 110 L95 105 L105 110 L105 122 L95 127 L85 122 Z" fill="#f43f5e" stroke="#ffffff" stroke-width="1.2" />
                        <text x="95" y="120" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">?</text>
                      </g>
                      <g class="animate-pulse" style="transform-origin: 140px 125px;">
                        <line x1="148" y1="133" x2="175" y2="160" stroke="#1e293b" stroke-width="6" stroke-linecap="round" />
                        <line x1="148" y1="133" x2="175" y2="160" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" />
                        <circle cx="128" cy="113" r="24" fill="url(#glass-lens-grad)" stroke="#1e293b" stroke-width="3.5" />
                        <circle cx="128" cy="113" r="22" fill="none" stroke="#6366f1" stroke-width="1" opacity="0.6" />
                        <path d="M114 105 A 16 16 0 0 1 138 97" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
                      </g>
                    </svg>
      `;
      errorDetails = `
        <div class="system-error-view">
          <div class="alert-block alert-neutral">
            <span class="alert-icon">🔍</span>
            <div>
              <h4 class="alert-heading">خطأ 404: الصفحة غير موجودة</h4>
              <p class="alert-subheading">ERP Module Not Found</p>
            </div>
          </div>

          <h2 class="error-title">لم نتمكن من العثور على هذا القسم</h2>
          <p class="error-desc">
            عذراً، يبدو أنك تحاول الوصول إلى وحدة نظام ERP غير مفعلة في اشتراكك الحالي أو تم نقل ملف المصادقة الخاص بها لمسار آخر على خوادم شركة <strong>${brandName}</strong>.
          </p>

          <div class="code-log-box">
            <div>REF_ID: ERP-404-NF2</div>
          </div>

          <div class="error-actions">
            <button onclick="window.location.href='login.html'" class="btn-primary" style="width: 100%;">الذهاب للرئيسية والتسجيل</button>
          </div>
        </div>
      `;
    } else if (pageType === 'error500') {
      bigSvg = `
                    <svg class="error-illustration" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-500" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.2"/>
                          <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
                        </radialGradient>
                        <linearGradient id="server-body-grad" x1="40" y1="35" x2="160" y2="165" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#1e293b"/>
                          <stop offset="100%" stop-color="#0f172a"/>
                        </linearGradient>
                        <linearGradient id="error-glow" x1="70" y1="80" x2="130" y2="110" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#f43f5e"/>
                          <stop offset="100%" stop-color="#be123c"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-500)"/>
                      <circle cx="100" cy="100" r="78" stroke="#ef4444" stroke-width="0.75" stroke-dasharray="8 8" opacity="0.2" class="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="65" stroke="#ef4444" stroke-width="0.5" stroke-dasharray="2 4" opacity="0.15"/>
                      <g opacity="0.15">
                        <line x1="50" y1="20" x2="50" y2="180" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 6"/>
                        <line x1="150" y1="20" x2="150" y2="180" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 6"/>
                        <path d="M40 40 L60 40 M140 40 L160 40 M40 160 L60 160 M140 160 L160 160" stroke="#ef4444" stroke-width="1"/>
                      </g>
                      <rect x="55" y="30" width="90" height="140" rx="8" fill="url(#server-body-grad)" stroke="#0f172a" stroke-width="3.5" />
                      <rect x="61" y="36" width="78" height="128" rx="5" fill="none" stroke="#475569" stroke-width="1" opacity="0.6" />
                      <g transform="translate(64, 42)">
                        <rect x="0" y="0" width="72" height="24" rx="3" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                        <circle cx="8" cy="12" r="2.5" fill="#10b981" />
                        <circle cx="16" cy="12" r="1.5" fill="#10b981" opacity="0.6" />
                        <line x1="28" y1="12" x2="58" y2="12" stroke="#1e293b" stroke-width="2.5" stroke-dasharray="3 2" />
                      </g>
                      <g transform="translate(64, 76)">
                        <rect x="0" y="0" width="72" height="36" rx="4" fill="url(#error-glow)" stroke="#f43f5e" stroke-width="2" class="animate-pulse" />
                        <circle cx="8" cy="12" r="3" fill="#ffffff" class="animate-pulse" />
                        <circle cx="8" cy="24" r="2.5" fill="#991b1b" />
                        <line x1="22" y1="12" x2="62" y2="12" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 2" opacity="0.8"/>
                        <line x1="22" y1="24" x2="62" y2="24" stroke="#7f1d1d" stroke-width="2" />
                        <path d="M-8 6 L-2 14 M-14 22 L-4 18 M80 14 L74 24" stroke="#f43f5e" stroke-width="1.5" stroke-linecap="round" class="animate-float" />
                      </g>
                      <g transform="translate(64, 122)">
                        <rect x="0" y="0" width="72" height="24" rx="3" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                        <circle cx="8" cy="12" r="2.5" fill="#10b981" />
                        <circle cx="16" cy="12" r="1.5" fill="#10b981" opacity="0.6" />
                        <line x1="28" y1="12" x2="58" y2="12" stroke="#1e293b" stroke-width="2.5" stroke-dasharray="3 2" />
                      </g>
                      <g opacity="0.8">
                        <path d="M25 80 L50 95 L64 95" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-linecap="round" />
                        <circle cx="25" cy="80" r="3" fill="#f43f5e" />
                        <path d="M175 110 L150 95 L136 95" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-linecap="round" />
                        <circle cx="175" cy="110" r="3" fill="#f43f5e" />
                      </g>
                      <path d="M22 135 L12 155 H28 L18 175" stroke="#ef4444" stroke-width="2" stroke-linejoin="round" class="animate-pulse" />
                      <path d="M178 35 L168 55 H184 L174 75" stroke="#ef4444" stroke-width="2" stroke-linejoin="round" class="animate-pulse" />
                    </svg>
      `;
      errorDetails = `
        <div class="system-error-view">
          <div class="alert-block alert-danger">
            <span class="alert-icon">💥</span>
            <div>
              <h4 class="alert-heading">خطأ 500: خلل داخلي</h4>
              <p class="alert-subheading">Internal Connection Timeout</p>
            </div>
          </div>

          <h2 class="error-title">فشل غير متوقع في جلب البيانات</h2>
          <p class="error-desc">
            حدث خطأ غير متوقع أثناء الاتصال بالخادم الرئيسي لنظام <strong>${brandName}</strong>. تم إرسال تنبيه بالحدث تلقائياً لفرق الدعم الفني.
          </p>

          <div class="code-log-box">
            <div>REF_ID: SRV-500-ERR1</div>
          </div>

          <div class="error-actions">
            <button onclick="window.location.reload()" class="btn-primary" style="width: 100%;">تحديث الصفحة والمحاولة</button>
            <button onclick="window.location.href='login.html'" class="btn-secondary" style="width: 100%; margin-top: 10px;">بوابة الدخول البديلة</button>
          </div>
        </div>
      `;
    } else if (pageType === 'error503') {
      bigSvg = `
                    <svg class="error-illustration" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-503" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25"/>
                          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                        </radialGradient>
                        <linearGradient id="gear-blue" x1="45" y1="45" x2="115" y2="115" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#60a5fa"/>
                          <stop offset="100%" stop-color="#2563eb"/>
                        </linearGradient>
                        <linearGradient id="gear-gray" x1="100" y1="100" x2="150" y2="150" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#cbd5e1"/>
                          <stop offset="100%" stop-color="#64748b"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-503)"/>
                      <circle cx="100" cy="100" r="82" stroke="#3b82f6" stroke-width="0.5" stroke-dasharray="1 5" opacity="0.3"/>
                      <circle cx="100" cy="100" r="74" stroke="#3b82f6" stroke-width="1" stroke-dasharray="10 4 2 4" opacity="0.2" class="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="50" stroke="#cbd5e1" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.3"/>
                      <line x1="100" y1="10" x2="100" y2="190" stroke="#3b82f6" stroke-width="0.5" stroke-dasharray="6 6" opacity="0.2" />
                      <line x1="10" y1="100" x2="190" y2="100" stroke="#3b82f6" stroke-width="0.5" stroke-dasharray="6 6" opacity="0.2" />
                      <path d="M100 26 A74 74 0 0 1 174 100" stroke="#3b82f6" stroke-width="3.5" stroke-linecap="round" opacity="0.8" />
                      <path d="M100 174 A74 74 0 0 1 26 100" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 5" opacity="0.6"/>
                      <g class="animate-spin-slow" style="transform-origin: 85px 85px;">
                        <circle cx="85" cy="85" r="30" fill="none" stroke="url(#gear-blue)" stroke-width="8"/>
                        <g stroke="url(#gear-blue)" stroke-width="8" stroke-linecap="round">
                          <line x1="85" y1="47" x2="85" y2="53" />
                          <line x1="85" y1="117" x2="85" y2="123" />
                          <line x1="47" y1="85" x2="53" y2="85" />
                          <line x1="117" y1="85" x2="123" y2="85" />
                          <line x1="58" y1="58" x2="62" y2="62" />
                          <line x1="108" y1="108" x2="112" y2="112" />
                          <line x1="112" y1="58" x2="108" y2="62" />
                          <line x1="62" y1="108" x2="58" y2="112" />
                        </g>
                        <circle cx="85" cy="85" r="26" fill="url(#gear-blue)" />
                        <circle cx="85" cy="85" r="14" fill="#ffffff" />
                        <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round">
                          <line x1="85" y1="67" x2="85" y2="103"/>
                          <line x1="67" y1="85" x2="103" y2="85"/>
                        </g>
                        <circle cx="85" cy="85" r="8" fill="#1e293b"/>
                        <circle cx="85" cy="85" r="4" fill="#ffffff"/>
                      </g>
                      <g class="animate-spin-reverse" style="transform-origin: 130px 130px;">
                        <circle cx="130" cy="130" r="18" fill="none" stroke="url(#gear-gray)" stroke-width="6"/>
                        <g stroke="url(#gear-gray)" stroke-width="6" stroke-linecap="round">
                          <line x1="130" y1="106" x2="130" y2="110"/>
                          <line x1="130" y1="150" x2="130" y2="154"/>
                          <line x1="106" y1="130" x2="110" y2="130"/>
                          <line x1="150" y1="130" x2="154" y2="130"/>
                          <line x1="113" y1="113" x2="116" y2="116"/>
                          <line x1="144" y1="144" x2="147" y2="147"/>
                          <line x1="147" y1="113" x2="144" y2="116"/>
                          <line x1="116" y1="144" x2="113" y2="147"/>
                        </g>
                        <circle cx="130" cy="130" r="15" fill="url(#gear-gray)"/>
                        <circle cx="130" cy="130" r="6" fill="#ffffff"/>
                        <circle cx="130" cy="130" r="3" fill="#334155"/>
                      </g>
                      <g opacity="0.4" stroke="#3b82f6" stroke-width="0.75">
                        <path d="M25 45 L50 45 L65 60" fill="none"/>
                        <circle cx="25" cy="45" r="2" fill="#3b82f6"/>
                        <text x="25" y="38" fill="#3b82f6" font-size="7" font-family="monospace">REF: SYS_MNT_503</text>
                        <path d="M175 155 L150 155 L135 140" fill="none"/>
                        <circle cx="175" cy="155" r="2" fill="#3b82f6"/>
                        <text x="145" y="165" fill="#3b82f6" font-size="7" font-family="monospace">SYSTEM: BUSY</text>
                      </g>
                    </svg>
      `;
      errorDetails = `
        <div class="system-error-view">
          <div class="alert-block alert-info">
            <span class="alert-icon">⏳</span>
            <div>
              <h4 class="alert-heading">خطأ 503: الخدمة غير متوفرة</h4>
              <p class="alert-subheading">Service Temporarily Offline</p>
            </div>
          </div>

          <h2 class="error-title">بوابة المزامنة تحت الصيانة الدورية</h2>
          <p class="error-desc">
            الخوادم التابعة لنظام <strong>${brandName}</strong> متوقفة مؤقتاً لتثبيت التحديثات الأمنية المقررة. سيقوم النظام بمحاولة إعادة الاتصال التلقائي بالبوابة فور اكتمال أعمال الترقية.
          </p>

          <div class="countdown-card">
            <div class="countdown-header">
              <span class="pulsing-dot"></span>
              <span id="countdown-text">إعادة محاولة الاتصال التلقائي خلال <span id="timer-val">15</span> ثانية...</span>
            </div>
            <div class="progress-track">
              <div id="progress-bar" class="progress-fill" style="width: 100%"></div>
            </div>
          </div>

          <div class="error-actions">
            <button id="btn-retry-now" class="btn-primary" style="width: 100%;">حاول الاتصال الفوري الآن</button>
            <button onclick="window.location.href='login.html'" class="btn-secondary" style="width: 100%; margin-top: 10px;">الرجوع لبوابة تسجيل الدخول</button>
          </div>
        </div>
      `;
    }

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle} | ${brandName} ERP</title>
  <!-- Google Fonts: Inter & Cairo for Arabic -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="style.css">
</head>
<body class="erp-error-body ${isGlass ? 'glassmorphic-bg' : ''}">

  <main class="erp-error-wrapper animate-fade-in">
    <div class="erp-error-container">
      <!-- Illustration Column -->
      <div class="error-illustration-box">
        ${bigSvg}
      </div>

      <!-- Info Column -->
      <div class="error-info-box">
        <header id="erp-login-header" style="margin-bottom: 1.5rem; text-align: right;">
          <div id="erp-login-brand">
            <div class="brand-logo-grid">
              <div class="logo-square-1"></div>
              <div class="logo-square-2"></div>
              <div class="logo-square-3"></div>
              <div class="logo-square-4"></div>
            </div>
            <span class="brand-name">${brandName.toUpperCase()}</span>
          </div>
        </header>

        ${errorDetails}
      </div>
    </div>
  </main>

  <!-- Interactive Demo Script -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      ${scriptContent}
    });
  </script>
</body>
</html>`;
  }

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle} | ${brandName} ERP</title>
  <!-- Google Fonts: Inter & Cairo for Arabic -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="style.css">
</head>
<body class="erp-login-body ${isGlass ? 'glassmorphic-bg' : ''}">

  <main id="erp-login-wrapper" class="layout-${layoutStyle}">
    
    <!-- Form Side -->
    <section id="erp-login-form-container">
      <div id="erp-login-card">
        ${cardContent}
      </div>
    </section>

    ${isSplit ? `
    <!-- Graphic Hero Side: Geometric composition layout -->
    <section id="erp-login-visual-container">
      <!-- Abstract Grid Overlay -->
      <div class="abstract-geometric-grid">
        <div class="grid-line"></div>
        <div class="grid-line"></div>
        <div class="grid-line"></div>
        <div class="grid-line"></div>
        <div class="grid-line"></div>
        <div class="grid-line"></div>
      </div>

      <div class="visual-content">
        <!-- Giant overlapping abstract squares composition -->
        <div class="geometric-shapes-stage">
          <div class="shape-accent-frame"></div>
          <div class="shape-primary-cube"></div>
          <div class="shape-decorative-lines">
            <div class="shape-line-1"></div>
            <div class="shape-line-2"></div>
          </div>
        </div>

        <h2 class="visual-title">ترابط واستقرار ممتد</h2>
        <p class="visual-desc">يوفر نظام أبيكس إي آر بي طبقة بيانات موحدة وآمنة لإدارة الخدمات اللوجستية الإقليمية، الموارد المؤسسية، والرقابة المالية والدفاتر.</p>
        
        <!-- Live System Status (Clean, humble design) -->
        <div class="system-status-container">
          <span>v4.2.0-stable</span>
          <span>اتصال آمن ومشفّر</span>
          <span>المنطقة: EMEA-01</span>
        </div>
      </div>
    </section>` : ''}

  </main>

  <!-- Interactive Demo Script -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      ${scriptContent}
    });
  </script>
</body>
</html>`;
}

/**
 * @deprecated SCSS generation is deprecated and has been archived from active UI.
 * Component-based architecture in React/Angular is the sole source of truth.
 */
export function generateSCSS(config: any, heroImageUrl: string = ""): string {
  return `/* 
  ========================================================================
  DEPRECATION & ARCHIVE NOTICE: GENERATED SCSS TEMPLATE REMOVED
  ========================================================================
  Directly importing or compiling legacy SCSS files into Honesty ERP is
  no longer a supported integration path to prevent styling leaks.
  
  The modular component architecture of this React design sandbox (or its
  direct translation to native Angular components) is the sole source 
  of truth for conversion.
  ========================================================================
  */`;
}
