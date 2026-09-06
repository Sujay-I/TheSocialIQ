import React, { useState } from 'react';
import { Corporation, DataSourceType } from '../types';
import {
  Activity,
  Bell,
  ChevronDown,
  Plus,
  Radio,
  Sparkles,
  Database,
  Layers,
  Building2,
  Users,
  GraduationCap,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  corporations: Corporation[];
  selectedCorporation: Corporation | null;
  onSelectCorporation: (corp: Corporation) => void;
  onOpenAddModal: () => void;
  dataSource: DataSourceType;
  activeUseCase: 'corporate' | 'personal' | 'education';
  onSelectUseCase: (useCase: 'corporate' | 'personal' | 'education') => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  corporations,
  selectedCorporation,
  onSelectCorporation,
  onOpenAddModal,
  dataSource,
  activeUseCase,
  onSelectUseCase,
  onResetDemo
}) => {
  const [corpDropdownOpen, setCorpDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [useCaseDropdownOpen, setUseCaseDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Use Case */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Activity className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">Social<span className="text-blue-500">IQ</span></span>
            </div>
          </div>

          {/* Use Case Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setUseCaseDropdownOpen(!useCaseDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-lg px-2.5 py-1.5 transition-colors"
            >
              {activeUseCase === 'corporate' && <Building2 className="w-3.5 h-3.5 text-blue-400" />}
              {activeUseCase === 'personal' && <Users className="w-3.5 h-3.5 text-emerald-400" />}
              {activeUseCase === 'education' && <GraduationCap className="w-3.5 h-3.5 text-purple-400" />}
              <span className="capitalize">{activeUseCase} Mode</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {useCaseDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50">
                <button
                  onClick={() => { onSelectUseCase('corporate'); setUseCaseDropdownOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                    activeUseCase === 'corporate' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <div className="font-semibold">Corporate Intelligence</div>
                    <div className="text-[10px] text-slate-400">Market telemetry & trends</div>
                  </div>
                </button>
                <button
                  onClick={() => { onSelectUseCase('personal'); setUseCaseDropdownOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                    activeUseCase === 'personal' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold">Personal & Family</div>
                    <div className="text-[10px] text-slate-400">Interests & topic discovery</div>
                  </div>
                </button>
                <button
                  onClick={() => { onSelectUseCase('education'); setUseCaseDropdownOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                    activeUseCase === 'education' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="font-semibold">Educational Intelligence</div>
                    <div className="text-[10px] text-slate-400">Campus trends & student voice</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Corporation Selector (Top Center) */}
        {activeUseCase === 'corporate' && (
          <div className="relative">
            <button
              onClick={() => setCorpDropdownOpen(!corpDropdownOpen)}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl px-3.5 py-1.5 text-sm font-medium text-white transition-all shadow-sm hover:shadow-blue-500/10"
            >
              <div className="w-4 h-4 rounded bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                {selectedCorporation?.logo_url ? (
                  <img src={selectedCorporation.logo_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-2.5 h-2.5 text-blue-400" />
                )}
              </div>
              <span className="tracking-tight">{selectedCorporation?.name || 'Select Corporation'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {corpDropdownOpen && (
              <div className="absolute left-0 md:left-auto md:right-0 mt-1.5 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50">
                <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Select Profile
                </div>
                {corporations.map(corp => (
                  <button
                    key={corp.id}
                    onClick={() => {
                      onSelectCorporation(corp);
                      setCorpDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                      selectedCorporation?.id === corp.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-slate-800 overflow-hidden shrink-0">
                        <img src={corp.logo_url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span>{corp.name}</span>
                    </div>
                    {selectedCorporation?.id === corp.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}

                <div className="my-1 border-t border-slate-800"></div>

                <button
                  onClick={() => {
                    setCorpDropdownOpen(false);
                    onOpenAddModal();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-blue-400 hover:bg-blue-950/40 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Corporation</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Right Actions: Data Source Badge + Bell + Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Data Source Badge (Matches requirement for DEMO DATA vs LIVE DATA vs IMPORTED) */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800/80 rounded-full px-2.5 py-1 text-[11px] font-medium text-slate-300">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                dataSource === 'live'
                  ? 'bg-emerald-500 animate-pulse'
                  : dataSource === 'imported'
                  ? 'bg-purple-500'
                  : 'bg-amber-400'
              }`}
            ></span>
            <span className="uppercase tracking-wider font-semibold text-[10px]">
              {dataSource === 'live' ? 'Live Data' : dataSource === 'imported' ? 'Imported Data' : 'Demo Data'}
            </span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-white">Live Telemetry Alerts</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">1 new</span>
                </div>
                <div className="py-2.5 space-y-2">
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
                    <div className="flex items-center gap-1 text-blue-400 font-medium">
                      <Radio className="w-3 h-3 animate-ping" />
                      <span>Early Warning Virality Signal</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Spatial Commerce & AR try-on posts surging +240% across Gen-Z tech influencers.
                    </p>
                    <span className="text-[9px] text-slate-500">2 minutes ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-600 flex items-center justify-center text-xs font-semibold text-white overflow-hidden"
              title="User Account"
            >
              <span className="text-xs">S</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
                <div className="px-2.5 py-2 border-b border-slate-800">
                  <div className="text-xs font-semibold text-white">Staff Analyst</div>
                  <div className="text-[10px] text-slate-400 truncate">sujay.op@gmail.com</div>
                  <div className="text-[9px] mt-1 text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Enterprise Operator
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onResetDemo();
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 text-left transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Reset Demo Dataset</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
