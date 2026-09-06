import React, { useState } from 'react';
import { Corporation, AuthUser } from '../types';
import { useIntelligence } from '../context/IntelligenceContext';
import { ModeSelector } from './ModeSelector';
import {
  Building2,
  GraduationCap,
  ShieldCheck,
  ChevronsUpDown,
  Check,
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  Lock
} from 'lucide-react';

export type ScreenId = string;

interface SidebarProps {
  activeScreen?: string;
  onSelectScreen?: (screen: string) => void;
  corporations?: Corporation[];
  selectedCorporation?: Corporation | null;
  onSelectCorporation?: (corp: Corporation) => void;
  onOpenAddModal?: () => void;
  onOpenSettings?: () => void;
  onOpenHelp?: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  corporations = [],
  selectedCorporation,
  onSelectCorporation,
  onOpenAddModal,
  onOpenSettings,
  onOpenHelp,
  currentUser,
  onLogout
}) => {
  const {
    currentMode,
    modeConfig,
    currentSubRoute,
    navigate,
    selectedOrganization,
    setSelectedOrganization,
    selectedInstitution,
    setSelectedInstitution
  } = useIntelligence();

  const [isTenantOpen, setIsTenantOpen] = useState(false);
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);

  // Active corporation is from context or props
  const activeCorp = selectedCorporation || selectedOrganization;

  const handleNavClick = (itemId: string, path: string) => {
    if (onSelectScreen) {
      onSelectScreen(itemId);
    }
    navigate(path);
  };

  const institutions = [
    { id: 'stanford', name: 'Stanford University', type: 'Research Campus', code: 'SU' },
    { id: 'mit', name: 'MIT Tech Institute', type: 'Polytechnic Institute', code: 'MIT' },
    { id: 'berkeley', name: 'UC Berkeley', type: 'State University', code: 'UCB' }
  ];

  return (
    <aside className="w-64 bg-[#080e22] text-slate-300 flex flex-col h-screen border-r border-[#121c3d] shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-4 pb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white tracking-tight">SocialIQ</span>
              <span className="text-[9px] bg-blue-500/20 text-blue-400 font-bold px-1 py-0.5 rounded border border-blue-500/30">
                PRO
              </span>
            </div>
            <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.15em] truncate max-w-[140px]">
              {modeConfig.shortName} Suite
            </div>
          </div>
        </div>
      </div>

      {/* 1. Global Intelligence Mode Selector */}
      <ModeSelector variant="sidebar" />

      {/* 2. Organization / Context Selector (Only where relevant) */}
      {currentMode === 'corporate' && (
        <div className="px-3 mb-2 relative">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1">
            Enterprise Organization
          </div>
          <button
            type="button"
            onClick={() => setIsTenantOpen(!isTenantOpen)}
            className="w-full bg-[#111c3d]/80 hover:bg-[#111c3d] border border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">
                  {activeCorp ? `${activeCorp.name} Inc.` : 'Amazon Inc.'}
                </div>
                <div className="text-[10px] text-slate-400">Active Tenant</div>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          </button>

          {/* Tenant Dropdown Menu */}
          {isTenantOpen && (
            <div className="absolute left-3 right-3 top-full mt-1 bg-[#0d1633] border border-slate-700/80 rounded-xl shadow-2xl p-1.5 z-50 space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Switch Organization
              </div>
              {corporations.map((corp) => (
                <button
                  key={corp.id}
                  type="button"
                  onClick={() => {
                    if (onSelectCorporation) onSelectCorporation(corp);
                    setSelectedOrganization(corp);
                    setIsTenantOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    activeCorp?.id === corp.id
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="truncate">{corp.name} Inc.</span>
                  </div>
                  {activeCorp?.id === corp.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
              {onOpenAddModal && (
                <div className="pt-1 border-t border-slate-700/60">
                  <button
                    type="button"
                    onClick={() => {
                      setIsTenantOpen(false);
                      onOpenAddModal();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-blue-400 hover:bg-blue-950/40 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Enterprise Entity</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {currentMode === 'education' && (
        <div className="px-3 mb-2 relative">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1">
            Campus / Institution
          </div>
          <button
            type="button"
            onClick={() => setIsInstitutionOpen(!isInstitutionOpen)}
            className="w-full bg-[#111c3d]/80 hover:bg-[#111c3d] border border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">
                  {institutions.find(i => i.id === selectedInstitution)?.name || 'Stanford University'}
                </div>
                <div className="text-[10px] text-slate-400">Campus Workspace</div>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          </button>

          {isInstitutionOpen && (
            <div className="absolute left-3 right-3 top-full mt-1 bg-[#0d1633] border border-slate-700/80 rounded-xl shadow-2xl p-1.5 z-50 space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select Campus
              </div>
              {institutions.map((inst) => (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => {
                    setSelectedInstitution(inst.id);
                    setIsInstitutionOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedInstitution === inst.id
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded bg-slate-800 text-[10px] font-bold flex items-center justify-center text-indigo-300">
                      {inst.code}
                    </span>
                    <span className="truncate">{inst.name}</span>
                  </div>
                  {selectedInstitution === inst.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {currentMode === 'personal' && (
        <div className="px-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-tight">
              <div className="font-semibold text-emerald-200">Privacy-First Insights</div>
              <div className="text-[10px] text-emerald-400/80 mt-0.5">
                Aggregated & anonymized. Zero personal data tracked.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
        {modeConfig.navigation.map((group) => (
          <div key={group.title} className="space-y-0.5">
            <div className="text-[10px] font-bold tracking-wider text-slate-400 px-2.5 py-1">
              {group.title}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = (activeScreen ? activeScreen === item.id : currentSubRoute === item.id) ||
                (item.id === 'overview' && (currentSubRoute === 'overview' || !currentSubRoute));
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? 'bg-[#dbeafe] text-[#0a1128] font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f1938]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0a1128]' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      isActive ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[#121c3d] bg-[#060b1b] space-y-2">
        <div className="flex items-center justify-between px-2 py-1 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-medium text-slate-300">
              {currentMode === 'personal' ? 'Aggregated Stream' : 'Live Syncing'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {currentMode === 'personal' ? 'COPPA OK' : '42/min'}
          </span>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:text-slate-200 hover:bg-[#0f1938] transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:text-slate-200 hover:bg-[#0f1938] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Docs</span>
          </button>
        </div>

        {/* User Profile with Logout */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-blue-900 border border-blue-500 text-blue-200 font-bold text-xs flex items-center justify-center shrink-0">
              {currentUser?.initials || 'AC'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">
                {currentUser?.name || 'Alex Chen'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {currentUser?.role || (currentMode === 'personal' ? 'Household Admin' : currentMode === 'education' ? 'Dean of Student Affairs' : 'Principal Analyst')}
              </div>
            </div>
          </div>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
