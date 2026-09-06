import React, { useState, useRef, useEffect } from 'react';
import { useIntelligence } from '../context/IntelligenceContext';
import { INTELLIGENCE_MODES } from '../config/intelligenceModes';
import { IntelligenceMode } from '../types';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  variant?: 'sidebar' | 'header' | 'mobile';
  className?: string;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ variant = 'sidebar', className = '' }) => {
  const { currentMode, setMode } = useIntelligence();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeModeConfig = INTELLIGENCE_MODES[currentMode];
  const ActiveIcon = activeModeConfig.icon;

  const modeOptions: IntelligenceMode[] = ['corporate', 'personal', 'education'];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (mode: IntelligenceMode) => {
    setMode(mode);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-xs font-semibold text-white hover:bg-blue-600/30 transition-all"
        >
          <ActiveIcon className="w-3.5 h-3.5 text-blue-400" />
          <span className="truncate max-w-[100px]">{activeModeConfig.shortName}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="fixed inset-x-4 top-16 z-50 bg-[#09122a] border border-blue-500/30 rounded-2xl shadow-2xl p-3 space-y-2 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 flex items-center justify-between">
              <span>Switch Intelligence Mode</span>
              <span className="text-[9px] text-blue-400 font-medium">3 Global Workspaces</span>
            </div>
            <div className="space-y-1.5">
              {modeOptions.map((mode) => {
                const config = INTELLIGENCE_MODES[mode];
                const Icon = config.icon;
                const isSelected = mode === currentMode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleSelect(mode)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-600/25 border-blue-500/60 shadow-md shadow-blue-500/10'
                        : 'bg-[#060c1d] border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-xs text-white">{config.name}</div>
                        {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{config.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#09122a] hover:bg-[#0d1a3d] border border-blue-500/30 hover:border-blue-500/60 transition-all text-left shadow-xs group"
        >
          <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <ActiveIcon className="w-3.5 h-3.5" />
          </div>
          <div className="hidden sm:block">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              Intelligence Mode
            </div>
            <div className="text-xs font-bold text-white tracking-tight leading-tight flex items-center gap-1.5 mt-0.5">
              <span>{activeModeConfig.name}</span>
            </div>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200 ml-1 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 sm:left-0 sm:right-auto top-full mt-2 w-72 bg-[#09122a] border border-blue-500/40 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800/80 mb-1">
              <span>Select Workspace</span>
              <Sparkles className="w-3 h-3 text-blue-400" />
            </div>
            <div className="space-y-1">
              {modeOptions.map((mode) => {
                const config = INTELLIGENCE_MODES[mode];
                const Icon = config.icon;
                const isSelected = mode === currentMode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleSelect(mode)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-800/80 text-blue-400'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {config.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />}
                      </div>
                      <div className={`text-[10px] leading-tight mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {config.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Sidebar variant (Prominently placed at the top of the sidebar)
  return (
    <div className={`relative px-3 mb-2 ${className}`} ref={containerRef}>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1 flex items-center justify-between">
        <span>Intelligence Mode</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0c1636] hover:bg-[#101e4a] border border-blue-500/30 hover:border-blue-500/60 rounded-xl p-2.5 flex items-center justify-between text-left transition-all shadow-sm group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-blue-600/30">
            <ActiveIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate tracking-tight">
              {activeModeConfig.name}
            </div>
            <div className="text-[10px] text-blue-400 truncate">
              {activeModeConfig.subtitle}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-3 right-3 top-full mt-1.5 bg-[#09122a] border border-blue-500/40 rounded-xl shadow-2xl p-1.5 z-50 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[9px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider flex items-center justify-between">
            <span>Global Mode Switch</span>
            <span className="text-[9px] text-blue-400">3 Modes</span>
          </div>
          {modeOptions.map((mode) => {
            const config = INTELLIGENCE_MODES[mode];
            const Icon = config.icon;
            const isSelected = mode === currentMode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => handleSelect(mode)}
                className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-medium shadow-sm shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-blue-400'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {config.shortName}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />}
                  </div>
                  <div className={`text-[10px] leading-tight truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {config.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
