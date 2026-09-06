import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useIntelligence } from '../../context/IntelligenceContext';
import { IntelligenceMode } from '../../types';
import {
  User,
  Settings,
  Shield,
  Bell,
  Sparkles,
  LogOut,
  ChevronDown,
  Building2,
  Users,
  GraduationCap
} from 'lucide-react';

interface UserMenuProps {
  onOpenSettings?: () => void;
  onOpenNotifications?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onOpenSettings }) => {
  const { user, logout } = useAuth();
  const { currentMode, setMode } = useIntelligence();

  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showModeSubMenu, setShowModeSubMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowModeSubMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    setIsOpen(false);
    await logout();
  };

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : user?.name || user?.email?.split('@')[0] || 'User';

  const userInitials = user?.initials || displayName.slice(0, 2).toUpperCase() || 'IQ';

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-expanded={isOpen}
        aria-label="User profile menu"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#061735] to-[#0B234A] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
          {user?.avatar ? (
            <img src={user.avatar} alt={displayName} className="w-full h-full rounded-lg object-cover" />
          ) : (
            userInitials
          )}
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-[#0B1B33] leading-tight line-clamp-1">{user?.firstName || displayName}</span>
          <span className="text-[10px] text-slate-500 font-mono leading-tight capitalize">{currentMode}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-[#DCE3ED] rounded-xl shadow-xl py-1.5 z-50 animate-fadeIn divide-y divide-slate-100 text-xs">
          {/* User Info Header */}
          <div className="px-3.5 py-2.5 space-y-0.5">
            <div className="font-bold text-sm text-[#0B1B33] line-clamp-1">{displayName}</div>
            <div className="text-[11px] text-slate-500 font-mono truncate">{user?.email}</div>
            <div className="pt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-600 font-medium">
                {user?.role || 'Principal Analyst'}
              </span>
            </div>
          </div>

          {/* Core Actions */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (onOpenSettings) onOpenSettings();
              }}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-[#0B1B33] flex items-center gap-2.5 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (onOpenSettings) onOpenSettings();
              }}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-[#0B1B33] flex items-center gap-2.5 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Settings</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (onOpenSettings) onOpenSettings();
              }}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-[#0B1B33] flex items-center gap-2.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Security & Access</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (onOpenSettings) onOpenSettings();
              }}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-[#0B1B33] flex items-center gap-2.5 transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-slate-400" />
              <span>Notifications</span>
            </button>
          </div>

          {/* Mode Switcher inside User Menu */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => setShowModeSubMenu(!showModeSubMenu)}
              className="w-full px-3.5 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-[#0B1B33] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Switch Intelligence Mode</span>
              </div>
              <span className="text-[10px] font-bold uppercase text-blue-600">
                {currentMode} ▾
              </span>
            </button>

            {showModeSubMenu && (
              <div className="bg-slate-50 px-2 py-1.5 space-y-1 mx-2 rounded-lg my-1 border border-slate-200/80 animate-fadeIn">
                <button
                  type="button"
                  onClick={() => {
                    setMode('corporate');
                    setShowModeSubMenu(false);
                    setIsOpen(false);
                  }}
                  className={`w-full p-1.5 rounded text-left flex items-center gap-2 ${
                    currentMode === 'corporate' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  <Building2 className="w-3 h-3" />
                  <span>Corporate</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('personal');
                    setShowModeSubMenu(false);
                    setIsOpen(false);
                  }}
                  className={`w-full p-1.5 rounded text-left flex items-center gap-2 ${
                    currentMode === 'personal' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  <span>Personal</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('education');
                    setShowModeSubMenu(false);
                    setIsOpen(false);
                  }}
                  className={`w-full p-1.5 rounded text-left flex items-center gap-2 ${
                    currentMode === 'education' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  <GraduationCap className="w-3 h-3" />
                  <span>Education</span>
                </button>
              </div>
            )}
          </div>

          {/* Logout Trigger */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#DCE3ED] rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#0B1B33]">Sign out of SocialIQ?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to sign out? Your current session state will be safely closed.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2 px-3.5 rounded-lg border border-[#DCE3ED] text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
