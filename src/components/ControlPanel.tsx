import React from 'react';
import { LoginConfig, ThemeColor, LayoutStyle } from '../types';
import { 
  Settings, 
  Palette, 
  Layout, 
  Sliders, 
  ShieldAlert, 
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface ControlPanelProps {
  config: LoginConfig;
  onChange: (newConfig: LoginConfig) => void;
  onReset: () => void;
  onTriggerMockError: (type: string) => void;
}

export default function ControlPanel({ config, onChange, onReset, onTriggerMockError }: ControlPanelProps) {
  const updateField = <K extends keyof LoginConfig>(key: K, value: LoginConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const colors: { name: string; value: ThemeColor; bg: string; text: string }[] = [
    { name: 'Core Blue', value: 'blue', bg: 'bg-blue-600', text: 'text-blue-600' },
    { name: 'Teal Admin', value: 'teal', bg: 'bg-teal-600', text: 'text-teal-600' },
    { name: 'Indigo Hub', value: 'indigo', bg: 'bg-indigo-600', text: 'text-indigo-600' },
    { name: 'Emerald Ledger', value: 'emerald', bg: 'bg-emerald-600', text: 'text-emerald-600' },
    { name: 'Amber Logistics', value: 'amber', bg: 'bg-amber-600', text: 'text-amber-600' },
    { name: 'Slate Corporate', value: 'slate', bg: 'bg-slate-700', text: 'text-slate-700' },
  ];

  const layouts: { name: string; value: LayoutStyle; desc: string }[] = [
    { name: 'Split Screen', value: 'split', desc: 'Graphic hero side-panel on desktop, form card on mobile' },
    { name: 'Centered Card', value: 'centered', desc: 'Clean, professional card centered over minimal background' },
    { name: 'Glassmorphic', value: 'glassmorphic', desc: 'Sleek frosted-glass floating design with high-end ambient backdrop' },
  ];

  return (
    <div id="control-panel" className="bg-slate-900 text-slate-100 h-full overflow-y-auto flex flex-col border-r border-slate-800">
      {/* Sidebar Header */}
      <div id="control-panel-header" className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
            <Sliders size={20} />
          </div>
          <div>
            <h2 className="font-bold text-base text-white tracking-tight">Login Designer</h2>
            <p className="text-xs text-slate-400">Configure your ERP screen</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          title="Reset options to default"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Settings Sections */}
      <div className="p-6 flex-1 space-y-8">
        
        {/* Section 0: Page Selector */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layout size={14} /> Active Page Template
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => updateField('pageType', 'login')}
              className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                (config.pageType || 'login') === 'login'
                  ? 'bg-slate-800 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-800/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🔐</span>
                <div>
                  <div className="font-semibold text-xs">Enterprise Login</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Secure authentication portal</div>
                </div>
              </div>
              <span className="text-[10px] text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-900/30 font-mono">200 OK</span>
            </button>

            <button
              onClick={() => updateField('pageType', 'error403')}
              className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                config.pageType === 'error403'
                  ? 'bg-slate-800 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-800/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🚫</span>
                <div>
                  <div className="font-semibold text-xs">403 Forbidden / Access Denied</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">IP blockade or missing authorizations</div>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-900/30 font-mono">403</span>
            </button>

            <button
              onClick={() => updateField('pageType', 'error404')}
              className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                config.pageType === 'error404'
                  ? 'bg-slate-800 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-800/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🔍</span>
                <div>
                  <div className="font-semibold text-xs">404 Page Not Found</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Missing ERP system module/endpoint</div>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-900/30 font-mono">404</span>
            </button>

            <button
              onClick={() => updateField('pageType', 'error500')}
              className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                config.pageType === 'error500'
                  ? 'bg-slate-800 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-800/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">💥</span>
                <div>
                  <div className="font-semibold text-xs">500 Internal Error</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Uncaught server failure</div>
                </div>
              </div>
              <span className="text-[10px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/30 font-mono">500</span>
            </button>

            <button
              onClick={() => updateField('pageType', 'error503')}
              className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                config.pageType === 'error503'
                  ? 'bg-slate-800 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-800/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">⏳</span>
                <div>
                  <div className="font-semibold text-xs">503 Server Down / Maintenance</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Offline gateway with auto-refresh/retry</div>
                </div>
              </div>
              <span className="text-[10px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/30 font-mono">503</span>
            </button>
          </div>
        </div>

        {/* Section 1: Brand Configuration */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Settings size={14} /> Brand Details
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">ERP Brand Name</label>
              <input 
                type="text"
                value={config.brandName}
                onChange={(e) => updateField('brandName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enterprise ERP"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Form Subtitle / Tagline</label>
              <textarea 
                value={config.brandTagline}
                onChange={(e) => updateField('brandTagline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-16 resize-none"
                placeholder="Sign in to manage your workspace and enterprise tools."
              />
            </div>
          </div>
        </div>

        {/* Section 2: Color Palette */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Palette size={14} /> Theme Palette
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => updateField('primaryColor', c.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left text-xs font-medium transition-all cursor-pointer ${
                  config.primaryColor === c.value 
                    ? 'bg-slate-800 border-blue-500 text-white shadow-md shadow-blue-500/5' 
                    : 'bg-slate-950 border-slate-880/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full ${c.bg} shrink-0`}></span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Layout Style */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layout size={14} /> Screen Layout
          </h3>
          <div className="space-y-2">
            {layouts.map((l) => (
              <button
                key={l.value}
                onClick={() => updateField('layoutStyle', l.value)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer block ${
                  config.layoutStyle === l.value 
                    ? 'bg-slate-800 border-blue-500 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-xs mb-1">{l.name}</div>
                <div className="text-slate-400 text-[11px] leading-relaxed">{l.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Auth Features & Toggles */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles size={14} /> ERP Modules & Security
          </h3>
          
          <div className="space-y-3.5">
            {/* Toggle: Multi-tenant Domain */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
              <div>
                <span className="block text-xs font-semibold text-slate-200">Company Domain Login</span>
                <span className="text-[10px] text-slate-400">Require tenant sub-domain parameter</span>
              </div>
              <button 
                onClick={() => updateField('companyDomainLogin', !config.companyDomainLogin)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {config.companyDomainLogin ? (
                  <ToggleRight size={36} className="text-blue-500" />
                ) : (
                  <ToggleLeft size={36} />
                )}
              </button>
            </div>

            {/* Toggle: 2FA MFA */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
              <div>
                <span className="block text-xs font-semibold text-slate-200">MFA / 2FA Token Field</span>
                <span className="text-[10px] text-slate-400">Append high-security credential token</span>
              </div>
              <button 
                onClick={() => updateField('requireMFA', !config.requireMFA)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {config.requireMFA ? (
                  <ToggleRight size={36} className="text-blue-500" />
                ) : (
                  <ToggleLeft size={36} />
                )}
              </button>
            </div>

            {/* Toggle: Forgot Password */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
              <div>
                <span className="block text-xs font-semibold text-slate-200">Forgot Password Link</span>
                <span className="text-[10px] text-slate-400">Show password recovery triggers</span>
              </div>
              <button 
                onClick={() => updateField('showForgotPassword', !config.showForgotPassword)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {config.showForgotPassword ? (
                  <ToggleRight size={36} className="text-blue-500" />
                ) : (
                  <ToggleLeft size={36} />
                )}
              </button>
            </div>

            {/* Toggle: Remember Me */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
              <div>
                <span className="block text-xs font-semibold text-slate-200">Remember Session Checkbox</span>
                <span className="text-[10px] text-slate-400">Toggle persistent cookie login disclaimer</span>
              </div>
              <button 
                onClick={() => updateField('showRememberMe', !config.showRememberMe)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {config.showRememberMe ? (
                  <ToggleRight size={36} className="text-blue-500" />
                ) : (
                  <ToggleLeft size={36} />
                )}
              </button>
            </div>

            {/* Toggle: Contact Admin Link */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
              <div>
                <span className="block text-xs font-semibold text-slate-200">Contact Admin Link</span>
                <span className="text-[10px] text-slate-400">Footer link for unregistered users</span>
              </div>
              <button 
                onClick={() => updateField('showSignUpLink', !config.showSignUpLink)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {config.showSignUpLink ? (
                  <ToggleRight size={36} className="text-blue-500" />
                ) : (
                  <ToggleLeft size={36} />
                )}
              </button>
            </div>

            {/* Toggle: Debug Mode */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
              <div>
                <span className="block text-xs font-semibold text-slate-200">Simulate Debug Mode</span>
                <span className="text-[10px] text-slate-400">Reveal simulated developer-only diagnostic panels</span>
              </div>
              <button 
                onClick={() => updateField('debugMode', !config.debugMode)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {config.debugMode ? (
                  <ToggleRight size={36} className="text-amber-500" />
                ) : (
                  <ToggleLeft size={36} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Interaction Sandbox tools */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <ShieldAlert size={14} /> Live Testing Simulation
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Trigger simulated security alerts or network bottlenecks to see how the form handles validation states:
          </p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => onTriggerMockError('ip_ban')}
              className="w-full text-left px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-800/80 text-red-200 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex justify-between items-center"
            >
              <span>🚫 IP Ban / Connection Block</span>
              <span className="text-[9px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/30 font-mono">IP_BAN</span>
            </button>
            <button
              onClick={() => onTriggerMockError('user_banned')}
              className="w-full text-left px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-800/80 text-red-200 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex justify-between items-center"
            >
              <span>🔒 User Banned</span>
              <span className="text-[9px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/30 font-mono">BANNED</span>
            </button>
            <button
              onClick={() => onTriggerMockError('account_locked')}
              className="w-full text-left px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-800/80 text-red-200 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex justify-between items-center"
            >
              <span>⏱️ Account Locked (Attempts)</span>
              <span className="text-[9px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/30 font-mono">LOCKED</span>
            </button>
            <button
              onClick={() => onTriggerMockError('wrong_credentials')}
              className="w-full text-left px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-800/80 text-red-200 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex justify-between items-center"
            >
              <span>❌ Invalid Credentials</span>
              <span className="text-[9px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/30 font-mono">WRONG_AUTH</span>
            </button>
            <button
              onClick={() => onTriggerMockError('server_down')}
              className="w-full text-left px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-800/80 text-red-200 text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex justify-between items-center"
            >
              <span>⚠️ Server Down / Error 503</span>
              <span className="text-[9px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/30 font-mono">SERVER_503</span>
            </button>
          </div>
        </div>

      </div>

      {/* Code Credit */}
      <div className="p-6 border-t border-slate-800 bg-slate-950/30 flex items-center justify-between text-[11px] text-slate-500">
        <span>Responsive layout ready</span>
        <span className="flex items-center gap-1"><HelpCircle size={12} /> SCSS Variables Enabled</span>
      </div>
    </div>
  );
}
