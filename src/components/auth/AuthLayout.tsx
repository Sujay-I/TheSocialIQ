import React from 'react';
import { Activity, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeViewTitle?: string;
  badgeText?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  badgeText = 'Autonomous Intelligence'
}) => {
  return (
    <div className="min-h-screen w-screen flex bg-[#F7F9FC] font-sans antialiased text-[#0B1B33]">
      {/* Left Panel: Enterprise Branding & Abstract Intelligence Telemetry (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[48%] bg-[#061735] text-white flex-col justify-between p-12 relative overflow-hidden select-none border-r border-[#0B234A]">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & System Indicator */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-lg tracking-wider">
              IQ
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">Social<span className="text-blue-400">IQ</span></span>
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30 uppercase tracking-widest">
                v2.4 Enterprise
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0B234A] border border-blue-400/20 text-xs text-blue-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telemetry Online</span>
          </div>
        </div>

        {/* Middle: Abstract Intelligence / Network Telemetry Visualization */}
        <div className="relative z-10 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-xs font-semibold text-blue-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{badgeText}</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-lg">
            Turn social signals into actionable intelligence.
          </h1>

          <p className="mt-4 text-sm text-slate-300 max-w-md leading-relaxed">
            Real-time sentiment trajectory, influence topology mapping, and privacy-preserving multi-modal analytics across Corporate, Personal, and Educational domains.
          </p>

          {/* Abstract Network Signal Box */}
          <div className="mt-8 p-5 rounded-2xl bg-[#0B234A]/70 border border-blue-500/20 backdrop-blur-xs max-w-md space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-300 border-b border-blue-500/20 pb-3">
              <span className="font-mono flex items-center gap-1.5 text-blue-300">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                Signal Pipeline
              </span>
              <span className="text-emerald-400 font-medium">99.98% Model Confidence</span>
            </div>

            {/* Simulated Topological Edge Nodes */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-[#061735]/80 border border-blue-400/10">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Processed</div>
                <div className="text-sm font-bold text-white mt-0.5">14.2M/day</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#061735]/80 border border-blue-400/10">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Latency</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">&lt; 140ms</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#061735]/80 border border-blue-400/10">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">K-Anonymity</div>
                <div className="text-sm font-bold text-blue-300 mt-0.5">k = 50</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Enterprise Compliance & Trust */}
        <div className="relative z-10 pt-6 border-t border-[#0B234A] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              SOC 2 Type II
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-400" />
              Zero Plaintext Creds
            </span>
          </div>
          <span>&copy; {new Date().getFullYear()} SocialIQ Platform</span>
        </div>
      </div>

      {/* Right Panel: Clean Centered Card */}
      <div className="w-full lg:w-1/2 xl:w-[52%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Mobile Header (Brand only shown on small screens) */}
        <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#DCE3ED]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              IQ
            </div>
            <span className="font-bold text-lg text-[#0B1B33]">Social<span className="text-blue-600">IQ</span></span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
            Enterprise
          </span>
        </div>

        {/* Main Content Form Card */}
        <div className="my-auto w-full max-w-md mx-auto py-4">
          {children}
        </div>

        {/* Bottom Legal / Help footer */}
        <div className="w-full max-w-md mx-auto pt-6 text-center text-xs text-slate-500 border-t border-[#DCE3ED]/60">
          <p>
            By continuing, you agree to SocialIQ&apos;s{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
