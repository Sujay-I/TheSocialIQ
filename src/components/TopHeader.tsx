import React, { useState } from 'react';
import { Corporation, TimeRange, AuthUser } from '../types';
import { useIntelligence } from '../context/IntelligenceContext';
import { ModeSelector } from './ModeSelector';
import { UserMenu } from './auth/UserMenu';
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Database,
  Check,
  ExternalLink,
  X,
  Settings,
  HelpCircle,
  Building2,
  GraduationCap,
  LogOut,
  User,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface TopHeaderProps {
  activeScreen?: string;
  selectedCorporation?: Corporation | null;
  timeRange?: TimeRange;
  onSelectTimeRange?: (range: TimeRange) => void;
  onExportReport?: (format: 'csv' | 'json' | 'summary') => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  currentUser?: AuthUser | null;
  onOpenSettings?: () => void;
  onOpenHelp?: () => void;
  onOpenCorpSelector?: () => void;
  onLogout?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeScreen,
  selectedCorporation,
  timeRange: propTimeRange,
  onSelectTimeRange,
  onExportReport,
  searchQuery = '',
  onSearchChange,
  currentUser,
  onOpenSettings,
  onOpenHelp,
  onOpenCorpSelector,
  onLogout
}) => {
  const {
    currentMode,
    modeConfig,
    currentSubRoute,
    timeRange: contextTimeRange,
    setTimeRange,
    selectedOrganization,
    selectedInstitution
  } = useIntelligence();

  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const activeTimeRange = propTimeRange || contextTimeRange;
  const activeCorp = selectedCorporation || selectedOrganization;

  // Derive dynamic breadcrumbs based on mode and active subRoute
  const getBreadcrumbs = () => {
    const modeName = modeConfig.name;
    const subLabel =
      modeConfig.navigation
        .flatMap((g) => g.items)
        .find((i) => i.id === currentSubRoute || i.id === activeScreen)?.label || 'Overview';

    return ['SocialIQ', modeName, subLabel];
  };

  const breadcrumbs = getBreadcrumbs();

  const notifications = [
    {
      id: '1',
      title:
        currentMode === 'personal'
          ? 'Weekly Family Interest Digest Ready'
          : currentMode === 'education'
          ? 'Campus Career Fair Sentiment Pulse Synced'
          : 'Tier-1 Signal Spike: @techinsider',
      desc:
        currentMode === 'personal'
          ? 'Positive growth (+18%) in hands-on STEM and nature exploration topics across your household.'
          : currentMode === 'education'
          ? '84% favorable feedback logged for the annual engineering recruitment fair.'
          : 'Significant velocity increase (+84% WoW) in Prime autonomous dispatch discussion.',
      time: '8m ago',
      unread: true
    },
    {
      id: '2',
      title:
        currentMode === 'personal'
          ? 'Screen Time Balance Healthy'
          : currentMode === 'education'
          ? 'Midterm Study Lounges Discussion Surge'
          : 'Customer Support Clustering Shift',
      desc:
        currentMode === 'personal'
          ? 'Recreation & learning ratio improved by 6.4% over the past 7 days.'
          : currentMode === 'education'
          ? 'High activity around 24-hour library study space availability.'
          : 'Clustering detected in customer support sub-threads with 98% resolution velocity.',
      time: '24m ago',
      unread: true
    }
  ];

  const handleTimeSelect = (r: TimeRange) => {
    if (onSelectTimeRange) {
      onSelectTimeRange(r);
    }
    setTimeRange(r);
    setIsTimeDropdownOpen(false);
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 select-none">
      {/* Left: Mobile Mode Switcher & Desktop Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Mode Switcher */}
        <div className="sm:hidden">
          <ModeSelector variant="mobile" />
        </div>

        {/* Desktop Breadcrumbs with Mode Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb}>
              {idx > 0 && <span className="text-slate-300">›</span>}
              <span
                className={
                  idx === breadcrumbs.length - 1
                    ? 'text-slate-900 font-bold'
                    : idx === 1
                    ? 'text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100'
                    : 'text-slate-500 hover:text-slate-700 cursor-pointer'
                }
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Input */}
        <div className="relative hidden lg:block w-56 xl:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              currentMode === 'personal'
                ? 'Search family topics, hobbies...'
                : currentMode === 'education'
                ? 'Search campus topics, clubs...'
                : 'Search conversations, vectors...'
            }
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Active Workspace / Entity Pill */}
        {currentMode === 'corporate' && (
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-200/80 bg-blue-50/70 text-blue-700 text-xs font-medium">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="truncate max-w-[130px]">
              {activeCorp ? `${activeCorp.name} Inc.` : 'Amazon Inc.'}
            </span>
          </div>
        )}

        {currentMode === 'education' && (
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-indigo-200/80 bg-indigo-50/70 text-indigo-700 text-xs font-medium">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="truncate max-w-[130px]">
              {selectedInstitution === 'mit' ? 'MIT Institute' : selectedInstitution === 'berkeley' ? 'UC Berkeley' : 'Stanford Univ'}
            </span>
          </div>
        )}

        {currentMode === 'personal' && (
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200/80 bg-emerald-50/70 text-emerald-700 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero PII / COPPA</span>
          </div>
        )}

        {/* Header Mode Switcher (Desktop quick switch popover) */}
        <div className="hidden sm:block">
          <ModeSelector variant="header" />
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">
                  {currentMode === 'personal' ? 'Family Alerts' : currentMode === 'education' ? 'Campus Alerts' : 'Telemetry Alerts'}
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.5 rounded">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 rounded">
                    <div className="flex items-start justify-between gap-1">
                      <div className="text-xs font-semibold text-slate-800">{n.title}</div>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Time Range Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Last {activeTimeRange === '7D' ? '7 Days' : activeTimeRange === '90D' ? '90 Days' : '30 Days'}</span>
            <span className="sm:hidden">{activeTimeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {isTimeDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-50">
              {(['7D', '30D', '90D'] as TimeRange[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleTimeSelect(r)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    activeTimeRange === r
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Last {r === '7D' ? '7 Days' : r === '90D' ? '90 Days' : '30 Days'}</span>
                  {activeTimeRange === r && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Report Button (Navy) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {isExportDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50">
              <button
                type="button"
                onClick={() => {
                  onExportReport?.('csv');
                  setIsExportDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 text-left"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Export Dataset (.CSV)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onExportReport?.('json');
                  setIsExportDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 text-left"
              >
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export Payload (.JSON)</span>
              </button>
            </div>
          )}
        </div>

        {/* Authenticated User Menu */}
        <UserMenu onOpenSettings={onOpenSettings} />
      </div>
    </header>
  );
};
