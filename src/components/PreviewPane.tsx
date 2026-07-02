import React, { useState, useEffect } from 'react';
import { LoginConfig, ThemeColor } from '../types';
import { 
  Laptop, 
  Smartphone, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Building2,
  LockKeyhole,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Globe,
  Loader2
} from 'lucide-react';

interface PreviewPaneProps {
  config: LoginConfig;
  heroImageUrl: string;
  mockError: string | null;
  onClearError: () => void;
}

export default function PreviewPane({ config, heroImageUrl, mockError, onClearError }: PreviewPaneProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    domain: '',
    email: '',
    password: '',
    mfa: '',
    remember: false
  });
  
  // Interaction animation states
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (mockError) {
      setErrorMessage(mockError);
      setStatus('error');
    }
  }, [mockError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClearError();
    setErrorMessage(null);
    setStatus('loading');

    // Simulate enterprise security validation
    setTimeout(() => {
      if (config.companyDomainLogin && !formData.domain) {
        setStatus('error');
        setErrorMessage('Required: Company tenant domain is not configured.');
        return;
      }

      if (config.requireMFA && (!formData.mfa || formData.mfa.length !== 6)) {
        setStatus('error');
        setErrorMessage('Required: 6-digit Multi-Factor Security Token is invalid.');
        return;
      }

      // Successful simulated login!
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ domain: '', email: '', password: '', mfa: '', remember: false });
      }, 3500);
    }, 1800);
  };

  const themeColors: Record<ThemeColor, {
    primary: string;
    hover: string;
    text: string;
    bgLight: string;
    ring: string;
    borderFocus: string;
    border: string;
  }> = {
    blue: {
      primary: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      bgLight: 'bg-blue-50/50',
      ring: 'focus:ring-blue-500/20',
      borderFocus: 'focus:border-blue-500',
      border: 'border-blue-600'
    },
    teal: {
      primary: 'bg-teal-600',
      hover: 'hover:bg-teal-700',
      text: 'text-teal-600',
      bgLight: 'bg-teal-50/50',
      ring: 'focus:ring-teal-500/20',
      borderFocus: 'focus:border-teal-500',
      border: 'border-teal-600'
    },
    indigo: {
      primary: 'bg-indigo-600',
      hover: 'hover:bg-indigo-700',
      text: 'text-indigo-600',
      bgLight: 'bg-indigo-50/50',
      ring: 'focus:ring-indigo-500/20',
      borderFocus: 'focus:border-indigo-500',
      border: 'border-indigo-600'
    },
    emerald: {
      primary: 'bg-emerald-600',
      hover: 'hover:bg-emerald-700',
      text: 'text-emerald-600',
      bgLight: 'bg-emerald-50/50',
      ring: 'focus:ring-emerald-500/20',
      borderFocus: 'focus:border-emerald-500',
      border: 'border-emerald-600'
    },
    amber: {
      primary: 'bg-amber-600',
      hover: 'hover:bg-amber-700',
      text: 'text-amber-600',
      bgLight: 'bg-amber-50/50',
      ring: 'focus:ring-amber-500/20',
      borderFocus: 'focus:border-amber-500',
      border: 'border-amber-600'
    },
    slate: {
      primary: 'bg-slate-700',
      hover: 'hover:bg-slate-800',
      text: 'text-slate-700',
      bgLight: 'bg-slate-100',
      ring: 'focus:ring-slate-500/20',
      borderFocus: 'focus:border-slate-500',
      border: 'border-slate-700'
    }
  };

  const activeTheme = themeColors[config.primaryColor];

  return (
    <div className="h-full flex flex-col bg-slate-950 p-4 md:p-6 lg:p-8">
      {/* Top controls: Viewport toggles */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Preview Simulator</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              viewport === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Laptop size={14} />
            <span>Desktop</span>
          </button>
          <button 
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              viewport === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Actual Responsive Frame Container */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        <div 
          style={{ width: viewport === 'mobile' ? '375px' : '100%', height: viewport === 'mobile' ? '680px' : '100%' }}
          className={`relative rounded-xl border border-slate-800 shadow-2xl transition-all duration-300 bg-slate-900 overflow-hidden flex flex-col ${
            viewport === 'mobile' ? 'ring-8 ring-slate-800/50' : ''
          }`}
        >
          {/* Simulated Browser URL bar */}
          <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></span>
              <span class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></span>
            </div>
            <div className="flex-1 max-w-sm mx-auto bg-slate-950 border border-slate-850 h-6 rounded-md flex items-center justify-center text-[10px] text-slate-500 gap-1 font-mono">
              <Globe size={10} className="text-slate-600" />
              <span>https://{formData.domain || 'auth'}.{config.brandName.toLowerCase().replace(/\s+/g, '')}.com/login</span>
            </div>
          </div>

          {/* Interactive Login Content */}
          <div className={`flex-1 overflow-y-auto bg-slate-50 text-slate-900 flex ${
            config.layoutStyle === 'split' && viewport !== 'mobile' ? 'flex-row' : 'flex-col items-center justify-center p-6 bg-slate-100/50'
          } ${
            config.layoutStyle === 'glassmorphic' ? 'glassmorphic-screen-bg' : ''
          }`}>
            
            {/* Split layout: Geometric Hero Illustration sidebar (desktop-only) */}
            {config.layoutStyle === 'split' && viewport !== 'mobile' && (
              <div 
                className="w-[50%] lg:w-[55%] relative flex flex-col justify-end p-12 overflow-hidden bg-slate-950 select-none shrink-0"
              >
                {/* Abstract grid lines overlay */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10 z-10">
                  <div className="w-[1px] h-full bg-white"></div>
                  <div className="w-[1px] h-full bg-white"></div>
                  <div className="w-[1px] h-full bg-white"></div>
                  <div className="w-[1px] h-full bg-white"></div>
                  <div className="w-[1px] h-full bg-white"></div>
                </div>

                <div className="relative z-20 text-white w-full text-right">
                  {/* Giant overlapping abstract squares composition */}
                  <div className="relative w-48 h-48 mb-12 mr-auto ml-0">
                    <div className="absolute top-6 right-6 w-36 h-36 border-[6px] border-white/10 z-10"></div>
                    <div className={`absolute top-0 right-0 w-36 h-36 border-[6px] ${activeTheme.border} z-20`}></div>
                    <div className="absolute -top-4 left-4 flex flex-col gap-1 z-30">
                      <div className={`w-16 h-[2px] ${activeTheme.primary}`}></div>
                      <div className={`w-10 h-[2px] ${activeTheme.primary}/50`}></div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight mb-3 leading-tight">
                    استقرار تقني متكامل
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed mb-10 max-w-sm mr-auto ml-0">
                    يوفر نظام أبيكس لإدارة موارد المؤسسات طبقة بيانات موحدة وآمنة لإدارة الخدمات اللوجستية الإقليمية، الموارد التشغيلية والرقابة المالية.
                  </p>

                  {/* System Telemetry blocks */}
                  <div className="flex justify-between border-t border-white/10 pt-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest direction-ltr">
                    <span>v4.2.0-stable</span>
                    <span>اتصال آمن ومشفّر</span>
                    <span>المنطقة: EMEA-01</span>
                  </div>
                </div>
              </div>
            )}

            {/* Split layout: Form side (desktop or fallback) */}
            <div className={`w-full flex-1 flex flex-col items-center justify-center ${
              config.layoutStyle === 'split' && viewport !== 'mobile' ? 'p-12 bg-white h-full' : ''
            }`}>
              
              {/* Form Outer card frame (centered / glassmorphic vs split) */}
              <div 
                dir="rtl"
                className={`w-full max-w-md text-right ${
                  config.layoutStyle === 'centered' || viewport === 'mobile' 
                    ? 'bg-white border-2 border-slate-900 p-8 rounded-none' 
                    : config.layoutStyle === 'glassmorphic'
                    ? 'bg-white border-[3px] border-double border-slate-900 p-8 rounded-none'
                    : ''
                }`}
              >
                {/* Brand & Logo Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6 select-none">
                    {/* 4-square geometric logo grid */}
                    <div className="grid grid-cols-2 gap-[3px] w-8 h-8 shrink-0">
                      <div className={`w-[14.5px] h-[14.5px] ${activeTheme.primary}`}></div>
                      <div className="w-[14.5px] h-[14.5px] bg-slate-300"></div>
                      <div className="w-[14.5px] h-[14.5px] bg-slate-900"></div>
                      <div className={`w-[14.5px] h-[14.5px] ${activeTheme.primary}`}></div>
                    </div>
                    <span className="font-extrabold text-sm text-slate-900 tracking-[0.15em] uppercase leading-none">{config.brandName}</span>
                  </div>

                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">مرحباً بك مجدداً</h1>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {config.brandTagline || 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى بوابة المؤسسة.'}
                  </p>
                </div>

                {/* State banners: Success, loading, error */}
                {status === 'success' && (
                  <div className="mb-5 p-4 bg-slate-900 border-r-4 border-emerald-500 rounded-none flex items-start gap-3 animate-fade-in text-white">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider">تم التحقق بنجاح</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">تفويض رموز الجلسة آمن. جاري تحميل لوحة التحكم...</p>
                    </div>
                  </div>
                )}

                {status === 'error' && errorMessage && (
                  <div className="mb-5 p-4 bg-slate-900 border-r-4 border-red-500 rounded-none flex items-start gap-3 animate-fade-in text-white">
                    <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <h4 className="font-bold text-xs uppercase tracking-wider">تنبيه أمني للمؤسسة</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{errorMessage}</p>
                    </div>
                    <button 
                      onClick={() => { setStatus('idle'); setErrorMessage(null); onClearError(); }}
                      className="text-[10px] font-bold text-red-400 hover:underline cursor-pointer mr-2"
                    >
                      إغلاق
                    </button>
                  </div>
                )}

                {/* Form Group */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Multi-tenant Domain */}
                  {config.companyDomainLogin && (
                    <div className="space-y-1.5">
                      <label htmlFor="prev-domain" className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">نطاق الشركة</label>
                      <div className="relative flex items-center">
                        <Building2 size={16} className="absolute right-3.5 text-slate-400 pointer-events-none" />
                        <input 
                          id="prev-domain"
                          type="text"
                          name="domain"
                          value={formData.domain}
                          onChange={handleInputChange}
                          required
                          className={`w-full bg-white border border-slate-300 rounded-none pr-10 pl-24 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${activeTheme.ring} ${activeTheme.borderFocus} shadow-none transition-all text-right`}
                          placeholder="yourcompany"
                        />
                        <span className="absolute left-3 text-[10px] font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-none">
                          .erp.com
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="prev-email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">البريد الإلكتروني للعمل</label>
                    <div className="relative flex items-center">
                      <Mail size={16} className="absolute right-3.5 text-slate-400 pointer-events-none" />
                      <input 
                        id="prev-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-white border border-slate-300 rounded-none pr-10 pl-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${activeTheme.ring} ${activeTheme.borderFocus} shadow-none transition-all text-left`}
                        placeholder="name@company.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="prev-password" className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">كلمة المرور</label>
                      {config.showForgotPassword && (
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); alert('تم تفعيل محاكاة استعادة كلمة المرور للمؤسسة.'); }}
                          className="text-xs font-bold text-slate-900 underline uppercase tracking-wider"
                        >
                          هل نسيت كلمة المرور؟
                        </a>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <Lock size={16} className="absolute right-3.5 text-slate-400 pointer-events-none" />
                      <input 
                        id="prev-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-white border border-slate-300 rounded-none pr-10 pl-12 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${activeTheme.ring} ${activeTheme.borderFocus} shadow-none transition-all text-left`}
                        placeholder="••••••••••••"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 text-slate-400 hover:text-slate-650 focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* MFA Code field */}
                  {config.requireMFA && (
                    <div className="space-y-1.5 animate-fade-in">
                      <label htmlFor="prev-mfa" className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">رمز التحقق الإضافي (2FA)</label>
                      <div className="relative flex items-center">
                        <LockKeyhole size={16} className="absolute right-3.5 text-slate-400 pointer-events-none" />
                        <input 
                          id="prev-mfa"
                          type="text"
                          name="mfa"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          inputMode="numeric"
                          value={formData.mfa}
                          onChange={handleInputChange}
                          required
                          className={`w-full bg-white border border-slate-300 rounded-none pr-10 pl-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${activeTheme.ring} ${activeTheme.borderFocus} shadow-none font-mono tracking-widest text-center`}
                          placeholder="000000"
                          dir="ltr"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">أدخل رمز الأمان المكون من 6 أرقام والموجود في بطاقة التحقق الخاصة بك.</p>
                    </div>
                  )}

                  {/* Remember Me Checkbox */}
                  {config.showRememberMe && (
                    <div className="flex items-center pt-1.5 justify-start">
                      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          name="remember"
                          checked={formData.remember}
                          onChange={handleInputChange}
                          className={`rounded-none border-slate-300 ${activeTheme.text} focus:ring-0 w-4.5 h-4.5 cursor-pointer`}
                        />
                        <span className="text-xs text-slate-500 font-medium">الوثوق بهذا الجهاز لمدة 30 يوماً</span>
                      </label>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-3.5 rounded-none text-white font-extrabold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      status === 'loading' 
                        ? 'bg-slate-700 hover:bg-slate-700 cursor-not-allowed opacity-80' 
                        : status === 'success'
                        ? 'bg-emerald-500 hover:bg-emerald-500 cursor-not-allowed'
                        : `${activeTheme.primary} ${activeTheme.hover}`
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white" />
                        <span>جاري التحقق من معايير الأمان...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle2 size={16} className="text-white" />
                        <span>تم الاتصال بنجاح</span>
                      </>
                    ) : (
                      <span>مصادقة الحساب والاتصال</span>
                    )}
                  </button>
                </form>

                {/* Footer link */}
                {config.showSignUpLink && (
                  <div className="mt-8 text-center border-t border-slate-100 pt-5 select-none">
                    <p className="text-xs text-slate-500">
                      ليس لديك حساب مؤسسي؟{' '}
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); alert('يرجى التواصل مع مسؤول تكنولوجيا المعلومات لاستلام بيانات الدخول الخاصة بك.'); }}
                        className="font-bold text-slate-900 underline uppercase tracking-wider"
                      >
                        اتصل بمسؤول الدعم الفني
                      </a>
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Simulated Mobile Device Notch/Home bar if viewport mobile */}
          {viewport === 'mobile' && (
            <div className="h-6 bg-slate-900 border-t border-slate-800 flex items-center justify-center select-none shrink-0">
              <div className="w-28 h-1.5 bg-slate-700 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
