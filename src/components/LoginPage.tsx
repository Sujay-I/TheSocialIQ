import React, { useState } from 'react';
import { Corporation, AuthUser, IntelligenceMode } from '../types';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Radio,
  ChevronRight,
  Laptop,
  Fingerprint,
  Zap,
  HelpCircle,
  Eye,
  EyeOff,
  GraduationCap
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: AuthUser, initialCorp?: Corporation, initialMode?: IntelligenceMode) => void;
  corporations: Corporation[];
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, corporations }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'sso'>('signin');
  const [selectedCorpId, setSelectedCorpId] = useState<string>(
    corporations.length > 0 ? corporations[0].id : 'corp-amazon'
  );

  // Sign in form state
  const [signInEmail, setSignInEmail] = useState('alex.chen@socialiq.ai');
  const [signInPassword, setSignInPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Sign up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpCompany, setSignUpCompany] = useState('');
  const [signUpRole, setSignUpRole] = useState('Principal Intelligence Analyst');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Forgot password modal
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Status message
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const getTargetCorp = (corpId: string): Corporation | undefined => {
    return corporations.find((c) => c.id === corpId) || corporations[0];
  };

  // 1-Click Instant Demo Login
  const handleInstantDemoLogin = (customCorpId?: string) => {
    setIsAuthenticating(true);
    setErrorMsg(null);

    const targetCorp = getTargetCorp(customCorpId || selectedCorpId);
    setTimeout(() => {
      const demoUser: AuthUser = {
        id: 'user-demo-1',
        name: 'Alex Chen',
        firstName: 'Alex',
        lastName: 'Chen',
        email: 'alex.chen@socialiq.ai',
        role: 'Principal Intelligence Analyst',
        initials: 'AC',
        organizationId: targetCorp ? targetCorp.id : 'corp-amazon',
        organizationName: targetCorp ? targetCorp.name : 'Amazon Inc.',
        authMethod: 'demo',
        emailVerified: true,
        onboardingCompleted: true,
        intelligenceMode: 'corporate'
      };
      setIsAuthenticating(false);
      onLogin(demoUser, targetCorp);
    }, 450);
  };

  // Handle Standard Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    setIsAuthenticating(true);
    setErrorMsg(null);

    setTimeout(() => {
      const targetCorp = getTargetCorp(selectedCorpId);
      const nameParts = signInEmail.split('@')[0].split('.');
      const fName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'Analyst';
      const lName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'User';
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        name: `${fName} ${lName}`.trim(),
        firstName: fName,
        lastName: lName,
        email: signInEmail,
        role: 'Senior Market Strategist',
        initials: (signInEmail.slice(0, 2) || 'IQ').toUpperCase(),
        organizationId: targetCorp ? targetCorp.id : 'corp-amazon',
        organizationName: targetCorp ? targetCorp.name : 'Enterprise Client',
        authMethod: 'credentials',
        emailVerified: true,
        onboardingCompleted: true,
        intelligenceMode: 'corporate'
      };
      setIsAuthenticating(false);
      onLogin(user, targetCorp);
    }, 600);
  };

  // Handle Sign Up
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim() || !signUpEmail.trim()) {
      setErrorMsg('Please enter your full name and corporate email.');
      return;
    }

    setIsAuthenticating(true);
    setErrorMsg(null);

    setTimeout(() => {
      const initials = signUpName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'IQ';

      const targetCorp = getTargetCorp(selectedCorpId);
      const nameTokens = signUpName.trim().split(' ');
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        name: signUpName,
        firstName: nameTokens[0] || 'Analyst',
        lastName: nameTokens.slice(1).join(' ') || 'User',
        email: signUpEmail,
        role: signUpRole || 'Intelligence Analyst',
        initials,
        organizationId: targetCorp ? targetCorp.id : 'corp-amazon',
        organizationName: signUpCompany || (targetCorp ? targetCorp.name : 'Enterprise Client'),
        authMethod: 'credentials',
        emailVerified: true,
        onboardingCompleted: true,
        intelligenceMode: 'corporate'
      };
      setIsAuthenticating(false);
      onLogin(user, targetCorp);
    }, 700);
  };

  // Handle Enterprise SSO
  const handleSSO = (provider: string) => {
    setIsAuthenticating(true);
    setErrorMsg(null);

    setTimeout(() => {
      const targetCorp = getTargetCorp(selectedCorpId);
      const user: AuthUser = {
        id: `sso-${Date.now()}`,
        name: 'Alex Chen',
        firstName: 'Alex',
        lastName: 'Chen',
        email: 'alex.chen@socialiq.ai',
        role: 'Enterprise Director',
        initials: 'AC',
        organizationId: targetCorp ? targetCorp.id : 'corp-amazon',
        organizationName: targetCorp ? targetCorp.name : 'Enterprise Tenant',
        authMethod: 'sso',
        emailVerified: true,
        onboardingCompleted: true,
        intelligenceMode: 'corporate'
      };
      setIsAuthenticating(false);
      onLogin(user, targetCorp);
    }, 750);
  };

  // Forgot password submit
  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setIsForgotPasswordOpen(false);
      setForgotEmail('');
    }, 2800);
  };

  // Launch demo directly into one of the 3 Intelligence Modes
  const handleModeDemoLaunch = (mode: IntelligenceMode) => {
    setIsAuthenticating(true);
    setErrorMsg(null);
    const targetCorp = getTargetCorp(selectedCorpId);
    setTimeout(() => {
      const fName = mode === 'personal' ? 'Jordan' : mode === 'education' ? 'Sarah' : 'Alex';
      const lName = mode === 'personal' ? 'Smith' : mode === 'education' ? 'Jenkins' : 'Chen';
      const user: AuthUser = {
        id: `demo-${mode}-${Date.now()}`,
        name: mode === 'personal' ? 'Jordan Smith' : mode === 'education' ? 'Dr. Sarah Jenkins' : 'Alex Chen',
        firstName: fName,
        lastName: lName,
        email: mode === 'personal' ? 'jordan.smith@family.socialiq' : mode === 'education' ? 's.jenkins@stanford.edu' : 'alex.chen@socialiq.ai',
        role: mode === 'personal' ? 'Household Admin' : mode === 'education' ? 'Dean of Student Affairs' : 'Principal Analyst',
        initials: mode === 'personal' ? 'JS' : mode === 'education' ? 'SJ' : 'AC',
        organizationId: targetCorp ? targetCorp.id : 'corp-amazon',
        organizationName: targetCorp ? targetCorp.name : 'Enterprise Tenant',
        authMethod: 'demo',
        emailVerified: true,
        onboardingCompleted: true,
        intelligenceMode: mode
      };
      setIsAuthenticating(false);
      onLogin(user, targetCorp, mode);
    }, 450);
  };

  return (
    <div className="min-h-screen w-screen bg-[#050b1b] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-x-hidden font-sans">
      {/* Background Tech Mesh & Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/25 via-[#081028] to-[#040816] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">SocialIQ</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-1.5 py-0.5 rounded border border-blue-400/30">
                PRO
              </span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.16em]">
              Corporate Intelligence Suite
            </div>
          </div>
        </div>

        {/* Right Status Tags */}
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>RoBERTa v4.2 NLP Active</span>
          </div>
          <button
            onClick={() => handleInstantDemoLogin()}
            className="flex items-center gap-1 text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1 rounded-lg border border-white/10 transition-colors font-medium"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Fast Demo Launch</span>
          </button>
        </div>
      </header>

      {/* Main Login / Authentication Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Platform Mission & Telemetry Highlights */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-xs font-semibold text-blue-300">
            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Real-Time Opinion Vector & Sentiment Graph Resolution</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Algorithmic precision for corporate brand intelligence.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Monitor real-time consumer opinion cascades across X, Reddit, Instagram, Telegram, and YouTube.
            Isolate narrative vectors, track Tier-0 key opinion leaders, and predict brand friction before escalation.
          </p>

          {/* Quick Corporation Preview Picker */}
          <div className="bg-[#0b1633]/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Select Starting Enterprise Tenant:
              </span>
              <span className="text-[11px] text-blue-400 font-mono font-medium">5 Tenants Ready</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {corporations.map((corp) => {
                const isSelected = selectedCorpId === corp.id;
                return (
                  <button
                    key={corp.id}
                    type="button"
                    onClick={() => setSelectedCorpId(corp.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border flex items-center gap-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                        : 'bg-[#101c3d] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{corp.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SOC2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>256-bit TLS Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>99.8% RoBERTa Precision</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card with Tabs */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-[#0b1633] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
            {/* Quick Demo Banner Button */}
            <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-blue-950/60 border border-blue-500/30 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Instant Analyst Access</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Skip manual credential entry and explore with pre-loaded intelligence data.
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleInstantDemoLogin()}
                disabled={isAuthenticating}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shrink-0 shadow-md transition-all active:scale-95 flex items-center gap-1"
              >
                <span>Launch</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tab Navigation Switcher */}
            <div className="flex rounded-xl bg-[#060e22] p-1 border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'signin'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'signup'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('sso');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'sso'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Enterprise SSO
              </button>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. SIGN IN TAB */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Corporate Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="analyst@enterprise.com"
                      className="w-full bg-[#060e22] border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordOpen(true)}
                      className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#060e22] border border-slate-700/80 rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-[#060e22] border-slate-700 text-blue-600 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>Remember this workstation</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setSignInEmail('alex.chen@socialiq.ai');
                      setSignInPassword('••••••••••••');
                    }}
                    className="text-[11px] text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Use Demo Credentials
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Authenticating Workstation...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Intelligence Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 2. SIGN UP TAB */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-[#060e22] border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="s.jenkins@enterprise.com"
                      className="w-full bg-[#060e22] border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Enterprise Org</label>
                    <input
                      type="text"
                      value={signUpCompany}
                      onChange={(e) => setSignUpCompany(e.target.value)}
                      placeholder="e.g. Amazon / Tech Corp"
                      className="w-full bg-[#060e22] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Department</label>
                    <input
                      type="text"
                      value={signUpRole}
                      onChange={(e) => setSignUpRole(e.target.value)}
                      placeholder="Principal Analyst"
                      className="w-full bg-[#060e22] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Secure Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full bg-[#060e22] border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Provisioning Analyst Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account & Enter Platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 3. ENTERPRISE SSO TAB */}
            {activeTab === 'sso' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Log in through your organization's unified identity provider (IdP). Single sign-on respects your role-based telemetry boundaries.
                </p>

                <button
                  type="button"
                  onClick={() => handleSSO('okta')}
                  disabled={isAuthenticating}
                  className="w-full p-2.5 rounded-xl bg-[#060e22] hover:bg-[#0c1a3d] border border-slate-700 hover:border-blue-500/60 transition-all flex items-center justify-between text-xs font-semibold text-white group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                      OK
                    </div>
                    <span>Sign In with Okta Workforce</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSSO('azure')}
                  disabled={isAuthenticating}
                  className="w-full p-2.5 rounded-xl bg-[#060e22] hover:bg-[#0c1a3d] border border-slate-700 hover:border-blue-500/60 transition-all flex items-center justify-between text-xs font-semibold text-white group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                      MS
                    </div>
                    <span>Sign In with Microsoft Entra ID</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSSO('google')}
                  disabled={isAuthenticating}
                  className="w-full p-2.5 rounded-xl bg-[#060e22] hover:bg-[#0c1a3d] border border-slate-700 hover:border-blue-500/60 transition-all flex items-center justify-between text-xs font-semibold text-white group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                      G
                    </div>
                    <span>Google Workspace Enterprise</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSSO('saml')}
                  disabled={isAuthenticating}
                  className="w-full p-2.5 rounded-xl bg-[#060e22] hover:bg-[#0c1a3d] border border-slate-700 hover:border-blue-500/60 transition-all flex items-center justify-between text-xs font-semibold text-white group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                      S
                    </div>
                    <span>Custom SAML 2.0 / OIDC Token</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Section: One Platform. Three Intelligence Experiences. */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-xs font-semibold text-blue-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Unified Multi-Modal Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            One Platform. Three Intelligence Experiences.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Switch between corporate market intelligence, privacy-first family discovery, and campus community trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Corporate */}
          <div className="rounded-2xl bg-[#081026] border border-blue-500/30 hover:border-blue-400/70 p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-blue-500/10">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Corporate</div>
                <h3 className="text-base font-bold text-white mt-0.5">Consumer & Market Intelligence</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Understand customer sentiment, brand perception, competitor benchmarking, and crisis escalation.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleModeDemoLaunch('corporate')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all"
              >
                <span>Explore Corporate →</span>
              </button>
            </div>
          </div>

          {/* Card 2: Personal */}
          <div className="rounded-2xl bg-[#081026] border border-emerald-500/30 hover:border-emerald-400/70 p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-emerald-500/10">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Personal</div>
                <h3 className="text-base font-bold text-white mt-0.5">Family & Personal Intelligence</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Privacy-first household insights, interest discovery, digital wellness, and wholesome hobby trends.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleModeDemoLaunch('personal')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-600/30 transition-all"
              >
                <span>Explore Personal →</span>
              </button>
            </div>
          </div>

          {/* Card 3: Education */}
          <div className="rounded-2xl bg-[#081026] border border-indigo-500/30 hover:border-indigo-400/70 p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-indigo-500/10">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Education</div>
                <h3 className="text-base font-bold text-white mt-0.5">Student & Institution Intelligence</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Student voice analysis, campus engagement, academic trends, and institution community feedback.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleModeDemoLaunch('education')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all"
              >
                <span>Explore Education →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#0b1633] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Reset Enterprise Password</h3>
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your corporate email address. We will verify your organization credentials and transmit a cryptographic reset token.
            </p>

            {resetSent ? (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Reset instructions dispatched to your inbox! Closing window...</span>
              </div>
            ) : (
              <form onSubmit={handleSendReset} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="analyst@enterprise.com"
                  className="w-full bg-[#060e22] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white"
                  >
                    Dispatch Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-xs border-t border-slate-800/80">
        <div>
          © 2026 SocialIQ Inc. All rights reserved. Corporate Social & Opinion Telemetry Engine.
        </div>
        <div className="flex items-center gap-4">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('SocialIQ adheres to GDPR, CCPA, and Enterprise SOC2 compliance standards.'); }} className="hover:text-slate-300">
            Privacy Policy
          </a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Authorized corporate enterprise access only.'); }} className="hover:text-slate-300">
            Terms of Service
          </a>
          <a href="#security" onClick={(e) => { e.preventDefault(); alert('Security: All data in transit and at rest encrypted with AES-256.'); }} className="hover:text-slate-300">
            Security Overview
          </a>
        </div>
      </footer>
    </div>
  );
};
