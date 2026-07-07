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
  onChange: (newConfig: LoginConfig) => void;
}

export default function PreviewPane({ config, heroImageUrl, mockError, onClearError, onChange }: PreviewPaneProps) {
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

  // 503 Auto-retry countdown state
  const [countdown, setCountdown] = useState(15);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (config.pageType !== 'error503') return;
    
    // Reset countdown when entering page
    setCountdown(15);
    setIsRetrying(false);
  }, [config.pageType]);

  useEffect(() => {
    if (config.pageType !== 'error503') return;
    if (isRetrying) return;

    if (countdown <= 0) {
      handleAutoRetry();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, config.pageType, isRetrying]);

  const handleAutoRetry = () => {
    setIsRetrying(true);
    // Simulate connection attempt for 2 seconds
    setTimeout(() => {
      setIsRetrying(false);
      setCountdown(15); // restart countdown
      alert('محاكاة: فشلت محاولة الاتصال التلقائية بالخادم الرئيسي لـ ' + config.brandName + ' (خطأ 503). سيعيد النظام المحاولة مجدداً بعد انتهاء العداد.');
    }, 2000);
  };

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
          {config.pageType && config.pageType !== 'login' ? (
            <div 
              className={`flex-1 overflow-y-auto flex items-center justify-center ${
                viewport === 'mobile' ? 'p-3' : 'p-4 md:p-12'
              } ${
                config.layoutStyle === 'glassmorphic' ? 'glassmorphic-screen-bg bg-slate-100/50' : 'bg-slate-50'
              }`}
              dir="rtl"
            >
              {/* Standalone Dual-Pane Error Screen */}
              <div className={`w-full max-w-4xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-none grid items-center animate-fade-in text-right ${
                viewport === 'mobile' 
                  ? 'grid-cols-1 p-4 gap-6' 
                  : 'grid-cols-1 md:grid-cols-2 p-5 sm:p-8 md:p-12 gap-6 sm:gap-10 md:gap-16'
              }`}>
                
                {/* Column 1: BIG Modern, Elegant SVG Illustration */}
                <div className="flex items-center justify-center">
                  {config.pageType === 'error403' && (
                    <svg className={viewport === 'mobile' ? 'w-28 h-28' : 'w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64'} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-403" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                        </radialGradient>
                        <linearGradient id="shield-grad" x1="50" y1="30" x2="150" y2="170" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#fbbf24"/>
                          <stop offset="50%" stopColor="#f59e0b"/>
                          <stop offset="100%" stopColor="#d97706"/>
                        </linearGradient>
                        <linearGradient id="lock-body-grad" x1="70" y1="85" x2="130" y2="155" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#1e293b"/>
                          <stop offset="100%" stopColor="#0f172a"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-403)"/>
                      <circle cx="100" cy="100" r="75" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" className="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="55" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="20 4" opacity="0.3"/>
                      <path d="M100 25 L165 62 L165 138 L100 175 L35 138 L35 62 Z" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
                      <line x1="100" y1="10" x2="100" y2="190" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
                      <line x1="10" y1="100" x2="190" y2="100" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
                      <path d="M75 100 V75 C75 61.2 86.2 50 100 50 C113.8 50 125 61.2 125 75 V100" stroke="url(#shield-grad)" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
                      <path d="M85 100 V75 C85 66.7 91.7 60 100 60 C108.3 60 115 66.7 115 75 V100" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                      <rect x="60" y="92" width="80" height="65" rx="12" fill="url(#lock-body-grad)" stroke="#0f172a" strokeWidth="3"/>
                      <rect x="64" y="96" width="72" height="57" rx="9" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8"/>
                      <circle cx="100" cy="120" r="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" className="animate-pulse" />
                      <path d="M100 110 V124" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
                      <circle cx="100" cy="131" r="2.5" fill="#ef4444"/>
                      <circle cx="60" cy="92" r="3" fill="#f59e0b"/>
                      <circle cx="140" cy="92" r="3" fill="#f59e0b"/>
                      <circle cx="60" cy="157" r="3" fill="#f59e0b" opacity="0.6"/>
                      <circle cx="140" cy="157" r="3" fill="#f59e0b" opacity="0.6"/>
                      <path d="M45 80 L35 90 M35 80 L45 90" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
                      <path d="M165 80 L155 90 M155 80 L165 90" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
                    </svg>
                  )}

                  {config.pageType === 'error404' && (
                    <svg className={`${viewport === 'mobile' ? 'w-28 h-28' : 'w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64'} animate-float`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-404" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                        </radialGradient>
                        <linearGradient id="folder-grad" x1="45" y1="65" x2="135" y2="155" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#818cf8"/>
                          <stop offset="100%" stopColor="#4f46e5"/>
                        </linearGradient>
                        <linearGradient id="glass-lens-grad" x1="120" y1="100" x2="170" y2="150" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-404)"/>
                      <g opacity="0.2">
                        <path d="M20 120 L100 160 L180 120 L100 80 Z" stroke="#6366f1" strokeWidth="1" />
                        <path d="M40 110 L100 140 L160 110 L100 80 Z" stroke="#6366f1" strokeWidth="1" />
                        <path d="M60 100 L100 120 L140 100 L100 80 Z" stroke="#6366f1" strokeWidth="1" />
                        <line x1="100" y1="80" x2="100" y2="160" stroke="#6366f1" strokeWidth="1" />
                        <line x1="20" y1="120" x2="180" y2="120" stroke="#6366f1" strokeWidth="1" />
                      </g>
                      <circle cx="100" cy="100" r="65" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 12" opacity="0.3" className="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="45" stroke="#818cf8" strokeWidth="0.75" strokeDasharray="2 6" opacity="0.4"/>
                      <g transform="translate(10, -5)">
                        <path d="M55 135 L95 150 L135 135 L95 120 Z" fill="#0f172a" opacity="0.1" />
                        <path d="M50 75 L90 55 L135 72 V125 L95 142 L50 122 Z" fill="url(#folder-grad)" stroke="#4338ca" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M62 58 L94 42 L127 55 V108 L94 124 L62 108 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" strokeLinejoin="round" />
                        <line x1="75" y1="68" x2="102" y2="56" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
                        <line x1="75" y1="78" x2="114" y2="61" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
                        <line x1="75" y1="88" x2="108" y2="74" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M50 88 L95 106 L135 88 V125 L95 142 L50 122 Z" fill="#4f46e5" stroke="#3730a3" strokeWidth="2" strokeLinejoin="round" opacity="0.95"/>
                        <path d="M85 110 L95 105 L105 110 L105 122 L95 127 L85 122 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.2" />
                        <text x="95" y="120" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
                      </g>
                      <g className="animate-pulse" style={{ transformOrigin: '140px 125px' }}>
                        <line x1="148" y1="133" x2="175" y2="160" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                        <line x1="148" y1="133" x2="175" y2="160" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="128" cy="113" r="24" fill="url(#glass-lens-grad)" stroke="#1e293b" strokeWidth="3.5" />
                        <circle cx="128" cy="113" r="22" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.6" />
                        <path d="M114 105 A 16 16 0 0 1 138 97" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                      </g>
                    </svg>
                  )}

                  {config.pageType === 'error500' && (
                    <svg className={viewport === 'mobile' ? 'w-28 h-28' : 'w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64'} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-500" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
                        </radialGradient>
                        <linearGradient id="server-body-grad" x1="40" y1="35" x2="160" y2="165" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#1e293b"/>
                          <stop offset="100%" stopColor="#0f172a"/>
                        </linearGradient>
                        <linearGradient id="error-glow" x1="70" y1="80" x2="130" y2="110" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#f43f5e"/>
                          <stop offset="100%" stopColor="#be123c"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-500)"/>
                      <circle cx="100" cy="100" r="78" stroke="#ef4444" strokeWidth="0.75" strokeDasharray="8 8" opacity="0.2" className="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="65" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.15"/>
                      <g opacity="0.15">
                        <line x1="50" y1="20" x2="50" y2="180" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 6"/>
                        <line x1="150" y1="20" x2="150" y2="180" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 6"/>
                        <path d="M40 40 L60 40 M140 40 L160 40 M40 160 L60 160 M140 160 L160 160" stroke="#ef4444" strokeWidth="1"/>
                      </g>
                      <rect x="55" y="30" width="90" height="140" rx="8" fill="url(#server-body-grad)" stroke="#0f172a" strokeWidth="3.5" />
                      <rect x="61" y="36" width="78" height="128" rx="5" fill="none" stroke="#475569" strokeWidth="1" opacity="0.6" />
                      <g transform="translate(64, 42)">
                        <rect x="0" y="0" width="72" height="24" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
                        <circle cx="8" cy="12" r="2.5" fill="#10b981" />
                        <circle cx="16" cy="12" r="1.5" fill="#10b981" opacity="0.6" />
                        <line x1="28" y1="12" x2="58" y2="12" stroke="#1e293b" strokeWidth="2.5" strokeDasharray="3 2" />
                      </g>
                      <g transform="translate(64, 76)">
                        <rect x="0" y="0" width="72" height="36" rx="4" fill="url(#error-glow)" stroke="#f43f5e" strokeWidth="2" className="animate-pulse" />
                        <circle cx="8" cy="12" r="3" fill="#ffffff" className="animate-pulse" />
                        <circle cx="8" cy="24" r="2.5" fill="#991b1b" />
                        <line x1="22" y1="12" x2="62" y2="12" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" opacity="0.8"/>
                        <line x1="22" y1="24" x2="62" y2="24" stroke="#7f1d1d" strokeWidth="2" />
                        <path d="M-8 6 L-2 14 M-14 22 L-4 18 M80 14 L74 24" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" className="animate-float" />
                      </g>
                      <g transform="translate(64, 122)">
                        <rect x="0" y="0" width="72" height="24" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
                        <circle cx="8" cy="12" r="2.5" fill="#10b981" />
                        <circle cx="16" cy="12" r="1.5" fill="#10b981" opacity="0.6" />
                        <line x1="28" y1="12" x2="58" y2="12" stroke="#1e293b" strokeWidth="2.5" strokeDasharray="3 2" />
                      </g>
                      <g opacity="0.8">
                        <path d="M25 80 L50 95 L64 95" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="25" cy="80" r="3" fill="#f43f5e" />
                        <path d="M175 110 L150 95 L136 95" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="175" cy="110" r="3" fill="#f43f5e" />
                      </g>
                      <path d="M22 135 L12 155 H28 L18 175" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" className="animate-pulse" />
                      <path d="M178 35 L168 55 H184 L174 75" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" className="animate-pulse" />
                    </svg>
                  )}

                  {config.pageType === 'error503' && (
                    <svg className={viewport === 'mobile' ? 'w-28 h-28' : 'w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64'} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="grad-503" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                        </radialGradient>
                        <linearGradient id="gear-blue" x1="45" y1="45" x2="115" y2="115" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#60a5fa"/>
                          <stop offset="100%" stopColor="#2563eb"/>
                        </linearGradient>
                        <linearGradient id="gear-gray" x1="100" y1="100" x2="150" y2="150" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#cbd5e1"/>
                          <stop offset="100%" stopColor="#64748b"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="url(#grad-503)"/>
                      <circle cx="100" cy="100" r="82" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1 5" opacity="0.3"/>
                      <circle cx="100" cy="100" r="74" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 4 2 4" opacity="0.2" className="animate-spin-slow"/>
                      <circle cx="100" cy="100" r="50" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3"/>
                      <line x1="100" y1="10" x2="100" y2="190" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.2" />
                      <line x1="10" y1="100" x2="190" y2="100" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.2" />
                      <path d="M100 26 A74 74 0 0 1 174 100" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
                      <path d="M100 174 A74 74 0 0 1 26 100" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" opacity="0.6"/>
                      <g className="animate-spin-slow" style={{ transformOrigin: '85px 85px' }}>
                        <circle cx="85" cy="85" r="30" fill="none" stroke="url(#gear-blue)" strokeWidth="8"/>
                        <g stroke="url(#gear-blue)" strokeWidth="8" strokeLinecap="round">
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
                        <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="85" y1="67" x2="85" y2="103"/>
                          <line x1="67" y1="85" x2="103" y2="85"/>
                        </g>
                        <circle cx="85" cy="85" r="8" fill="#1e293b"/>
                        <circle cx="85" cy="85" r="4" fill="#ffffff"/>
                      </g>
                      <g className="animate-spin-reverse" style={{ transformOrigin: '130px 130px' }}>
                        <circle cx="130" cy="130" r="18" fill="none" stroke="url(#gear-gray)" strokeWidth="6"/>
                        <g stroke="url(#gear-gray)" strokeWidth="6" strokeLinecap="round">
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
                      <g opacity="0.4" stroke="#3b82f6" strokeWidth="0.75">
                        <path d="M25 45 L50 45 L65 60" fill="none"/>
                        <circle cx="25" cy="45" r="2" fill="#3b82f6"/>
                        <text x="25" y="38" fill="#3b82f6" fontSize="7" fontFamily="monospace">REF: SYS_MNT_503</text>
                        <path d="M175 155 L150 155 L135 140" fill="none"/>
                        <circle cx="175" cy="155" r="2" fill="#3b82f6"/>
                        <text x="145" y="165" fill="#3b82f6" fontSize="7" fontFamily="monospace">STATUS: BUSY</text>
                      </g>
                    </svg>
                  )}
                </div>

                {/* Column 2: Information, Code Log, Actions */}
                <div className="flex flex-col">
                  {/* Brand & Logo Header */}
                  <div className="mb-6 select-none flex items-center justify-start gap-3">
                    <div className="grid grid-cols-2 gap-[3px] w-8 h-8 shrink-0">
                      <div className={`w-[14.5px] h-[14.5px] ${activeTheme.primary}`}></div>
                      <div className="w-[14.5px] h-[14.5px] bg-slate-300"></div>
                      <div className="w-[14.5px] h-[14.5px] bg-slate-900"></div>
                      <div className={`w-[14.5px] h-[14.5px] ${activeTheme.primary}`}></div>
                    </div>
                    <span className="font-extrabold text-xs text-slate-900 tracking-[0.15em] uppercase leading-none">{config.brandName}</span>
                  </div>

                  {config.pageType === 'error403' && (
                    <div className="space-y-6">
                      <div className="p-4 bg-amber-50 border-r-4 border-amber-500 flex items-start gap-3">
                        <span className="text-2xl mt-0.5">🚫</span>
                        <div>
                          <h4 className="font-bold text-sm text-amber-950">خطأ 403: غير مسموح بالدخول</h4>
                          <p className="text-xs text-amber-800 mt-1 font-mono">Access Forbidden / Blocked</p>
                        </div>
                      </div>

                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">تم حظر الوصول إلى هذه البوابة</h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        لقد تم رفض طلب الاتصال الخاص بك بناءً على سياسات جدار الحماية والأمن السيبراني لشركة <strong className="text-slate-800">{config.brandName}</strong>. عنوان IP الخاص بك غير مدرج في القائمة البيضاء أو تم حظره لدواعي أمنية.
                      </p>

                      <div className="bg-slate-950 border border-slate-900 p-3.5 font-mono text-[10px] text-cyan-400 rounded-none space-y-1 text-left" dir="ltr">
                        <div>SENDER_IP: 197.34.112.90</div>
                        <div>REASON: ACCESS_CONTROL_VIOLATION</div>
                        <div>NODE: GATEWAY_EMEA_01</div>
                      </div>

                      <div className={`flex gap-3 pt-2 ${viewport === 'mobile' ? 'flex-col' : 'flex-col sm:flex-row'}`}>
                        <button 
                          onClick={() => onChange({ ...config, pageType: 'login' })}
                          className={`flex-1 py-3.5 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${activeTheme.primary} ${activeTheme.hover}`}
                        >
                          العودة لبوابة تسجيل الدخول
                        </button>
                        <button 
                          onClick={() => alert('تم تقديم طلب فك الحظر لمشرفي النظام للأمان.')}
                          className="flex-1 py-3.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                        >
                          طلب فك الحظر الفني
                        </button>
                      </div>
                    </div>
                  )}

                  {config.pageType === 'error404' && (
                    <div className="space-y-6">
                      <div className="p-4 bg-slate-100 border-r-4 border-slate-800 flex items-start gap-3">
                        <span className="text-2xl mt-0.5">🔍</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">خطأ 404: الصفحة غير موجودة</h4>
                          <p className="text-xs text-slate-650 mt-1 font-mono">ERP Module Not Found</p>
                        </div>
                      </div>

                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">لم نتمكن من العثور على هذا القسم</h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        عذراً، يبدو أنك تحاول الوصول إلى وحدة نظام ERP غير مفعلة في اشتراكك الحالي أو تم نقل ملف المصادقة الخاص بها لمسار آخر على خوادم شركة <strong className="text-slate-800">{config.brandName}</strong>.
                      </p>

                      <div className="bg-slate-950 border border-slate-900 p-3.5 font-mono text-[10px] text-cyan-400 rounded-none space-y-1 text-left" dir="ltr">
                        <div>REQUEST_URI: /modules/admin/dashboard.jsp</div>
                        <div>ERROR_CODE: ERR_FILE_NOT_FOUND</div>
                        <div>MODULE: ADMIN_CORE_STATION</div>
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => onChange({ ...config, pageType: 'login' })}
                          className={`w-full py-3.5 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${activeTheme.primary} ${activeTheme.hover}`}
                        >
                          الذهاب للرئيسية والتسجيل
                        </button>
                      </div>
                    </div>
                  )}

                  {config.pageType === 'error500' && (
                    <div className="space-y-6">
                      <div className="p-4 bg-red-50 border-r-4 border-red-500 flex items-start gap-3">
                        <span className="text-2xl mt-0.5">💥</span>
                        <div>
                          <h4 className="font-bold text-sm text-red-900">خطأ 500: خلل داخلي</h4>
                          <p className="text-xs text-red-800 mt-1 font-mono">Internal Database Server Error</p>
                        </div>
                      </div>

                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">فشل غير متوقع في جلب البيانات</h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        حدث خطأ غير متوقع في قاعدة البيانات الرئيسية لنظام <strong className="text-slate-800">{config.brandName}</strong> أثناء معالجة استعلام المصادقة. تم إرسال تنبيه بالحدث تلقائياً لمهندسي الدعم الفني.
                      </p>

                      <div className="bg-slate-950 border border-slate-900 p-3.5 font-mono text-[10px] text-cyan-400 rounded-none space-y-1 text-left" dir="ltr">
                        <div>EXCEPTION: NullPointerException</div>
                        <div>SOURCE: database_pool_connector.rs:240</div>
                        <div>STATUS: SQL_DATABASE_UNREACHABLE</div>
                      </div>

                      <div className={`flex gap-3 pt-2 ${viewport === 'mobile' ? 'flex-col' : 'flex-col sm:flex-row'}`}>
                        <button 
                          onClick={() => {
                            alert('تم تحديث الطلب، لكن قاعدة البيانات لا تزال تبلغ عن استثناء 500. تم حفظ التقرير.');
                          }}
                          className={`flex-1 py-3.5 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${activeTheme.primary} ${activeTheme.hover}`}
                        >
                          تحديث الصفحة والمحاولة
                        </button>
                        <button 
                          onClick={() => onChange({ ...config, pageType: 'login' })}
                          className="flex-1 py-3.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                        >
                          بوابة الدخول البديلة
                        </button>
                      </div>
                    </div>
                  )}

                  {config.pageType === 'error503' && (
                    <div className="space-y-6">
                      <div className="p-4 bg-blue-50 border-r-4 border-blue-500 flex items-start gap-3">
                        <span className="text-2xl mt-0.5">⏳</span>
                        <div>
                          <h4 className="font-bold text-sm text-blue-900">خطأ 503: الخدمة غير متوفرة</h4>
                          <p className="text-xs text-blue-800 mt-1 font-mono">Service Temporarily Offline</p>
                        </div>
                      </div>

                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">بوابة المزامنة تحت الصيانة الدورية</h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        الخوادم التابعة لنظام <strong className="text-slate-800">{config.brandName}</strong> متوقفة مؤقتاً لتثبيت التحديثات الأمنية المقررة. سيقوم النظام بمحاولة إعادة الاتصال التلقائي بالبوابة فور اكتمال أعمال الترقية.
                      </p>

                      {/* Countdown Progress Card */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-none flex flex-col items-center justify-center space-y-3 select-none">
                        <div className="flex items-center gap-3">
                          {isRetrying ? (
                            <Loader2 size={18} className="animate-spin text-blue-600" />
                          ) : (
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                            </span>
                          )}
                          <span className="text-xs font-bold text-slate-700">
                            {isRetrying ? 'جاري محاولة إعادة الاتصال بالبوابة...' : `إعادة محاولة الاتصال التلقائي خلال ${countdown} ثانية...`}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 h-1.5 rounded-none overflow-hidden">
                          <div 
                            className="bg-blue-600 h-1.5 transition-all duration-1000"
                            style={{ width: `${(countdown / 15) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className={`flex gap-3 pt-2 ${viewport === 'mobile' ? 'flex-col' : 'flex-col sm:flex-row'}`}>
                        <button 
                          disabled={isRetrying}
                          onClick={handleAutoRetry}
                          className={`flex-1 py-3.5 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isRetrying 
                              ? 'bg-slate-500 cursor-not-allowed opacity-80' 
                              : `${activeTheme.primary} ${activeTheme.hover}`
                          }`}
                        >
                          {isRetrying ? 'جاري الفحص...' : 'حاول الاتصال الفوري'}
                        </button>
                        <button 
                          onClick={() => onChange({ ...config, pageType: 'login' })}
                          className="flex-1 py-3.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                        >
                          الرجوع للرئيسية
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          ) : (
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
                config.layoutStyle === 'split' && viewport !== 'mobile' ? 'p-6 md:p-12 bg-white h-full' : ''
              }`}>
                
                {/* Form Outer card frame (centered / glassmorphic vs split) */}
                <div 
                  dir="rtl"
                  className={`w-full max-w-md text-right ${
                    config.layoutStyle === 'centered' || viewport === 'mobile' 
                      ? 'bg-white border-2 border-slate-900 p-5 sm:p-8 rounded-none' 
                      : config.layoutStyle === 'glassmorphic'
                      ? 'bg-white border-[3px] border-double border-slate-900 p-5 sm:p-8 rounded-none'
                      : ''
                  }`}
                >
                  {/* 1. Standard Login Page */}
                  {(!config.pageType || config.pageType === 'login') && (
                    <>
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
                    </>
                  )}
                </div>
              </div>

            </div>
          )}

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
