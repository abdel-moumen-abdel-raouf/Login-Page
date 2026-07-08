import React, { useState } from 'react';
import { LoginConfig } from '../../types';
import { generateHTML, generateSCSS } from './codeGenerators';
import { Copy, Check, Download, FileCode, Cpu, Lightbulb, AlertTriangle } from 'lucide-react';

interface CodeExporterProps {
  config: LoginConfig;
  heroImageUrl: string;
}

export default function CodeExporter({ config, heroImageUrl }: CodeExporterProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'scss'>('html');
  const [copied, setCopied] = useState(false);

  const htmlCode = generateHTML(config, heroImageUrl);
  const scssCode = generateSCSS(config, heroImageUrl);

  const handleCopy = () => {
    const codeToCopy = activeTab === 'html' ? htmlCode : scssCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const code = activeTab === 'html' ? htmlCode : scssCode;
    const filename = activeTab === 'html' ? 'login.html' : 'style.scss';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="code-exporter" className="h-full bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col overflow-hidden">
      
      {/* Deprecation Warning Banner */}
      <div className="bg-amber-950/40 border-b border-amber-900/40 p-4 flex gap-3 items-start select-none">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
        <div>
          <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            LEGACY DESIGN EXPORTER — NOT PRODUCTION SOURCE OF TRUTH
          </h4>
          <p className="text-[10px] text-amber-300/85 mt-1 leading-relaxed">
            The static HTML &amp; SCSS output below is legacy/deprecated and not representative of the production modular React component architecture. Do not use this output for direct ERP integrations.
          </p>
        </div>
      </div>

      {/* Exporter Header & Tab Selectors */}
      <div className="p-6 border-b border-slate-800 bg-slate-900 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
              <FileCode size={18} />
            </div>
            <h2 className="font-bold text-sm text-white tracking-tight">Source Code Exporter <span className="text-[10px] text-amber-500 ml-1.5 font-normal uppercase tracking-wider border border-amber-900/40 px-1.5 py-0.5 rounded bg-amber-950/20">(Legacy)</span></h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                copied 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button 
              onClick={downloadFile}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Download file"
            >
              <Download size={14} />
            </button>
          </div>
        </div>

        {/* Tab Selectors */}
        <div className="flex bg-slate-950/60 border border-slate-850 p-1 rounded-xl">
          <button 
            onClick={() => { setActiveTab('html'); setCopied(false); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'html' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            login.html
          </button>

          <button 
            onClick={() => { setActiveTab('scss'); setCopied(false); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'scss' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            style.scss
          </button>
        </div>
      </div>

      {/* Code Text Area (Read-only scrollable panel) */}
      <div className="flex-1 overflow-auto p-6 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950">
        <pre className="whitespace-pre select-all selection:bg-indigo-500/30">
          {activeTab === 'html' ? htmlCode : scssCode}
        </pre>
      </div>

      {/* Guide Tips / Implementation Guidelines */}
      <div className="p-6 border-t border-slate-800 bg-slate-900/50 space-y-4 shrink-0">
        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
          <Lightbulb size={14} className="text-yellow-400" /> Implementation Guidelines
        </h4>
        
        <div className="space-y-2.5 text-[11px] text-slate-400 leading-relaxed">
          <div className="flex gap-2">
            <span className="text-indigo-400 font-bold">1.</span>
            <p>
              <strong>Sass Compilation</strong>: Place <code className="text-indigo-300 font-mono">style.scss</code> inside your styles directory and compile it to <code className="text-indigo-300 font-mono">style.css</code> via Webpack, Vite, or the CLI (<code className="bg-slate-950 px-1 py-0.5 rounded text-indigo-300 font-mono">sass style.scss style.css</code>).
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-indigo-400 font-bold">2.</span>
            <p>
              <strong>Responsive Behavior</strong>: The split side-panel automatically collapses cleanly on mobile viewports (<code className="text-indigo-300 font-mono">max-width: 1024px</code>) using CSS Flexbox/Grid media queries.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-indigo-400 font-bold">3.</span>
            <p>
              <strong>Accessibility (a11y)</strong>: Fully loaded with semantic HTML elements, strict labels matching input IDs, and responsive ARIA properties for security tokens.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
