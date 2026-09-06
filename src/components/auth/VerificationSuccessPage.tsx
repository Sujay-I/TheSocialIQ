import React from 'react';
import { AuthLayout } from './AuthLayout';
import { CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface VerificationSuccessPageProps {
  onNavigate: (path: string) => void;
}

export const VerificationSuccessPage: React.FC<VerificationSuccessPageProps> = ({ onNavigate }) => {
  return (
    <AuthLayout badgeText="Email Verified">
      <div className="w-full space-y-6 text-center">
        {/* Large Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce-short">
          <CheckCircle className="w-8 h-8" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33]">Email verified</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Your SocialIQ account is ready. Let&apos;s personalize your intelligence workspace in just a few quick steps.
          </p>
        </div>

        {/* Security Summary Badge */}
        <div className="p-4 rounded-xl bg-slate-50 border border-[#DCE3ED] text-left space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-[#0B1B33] font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographic Session Activated</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Your identity has been verified under SOC 2 Type II strict credential policies. You may now customize your preferred intelligence domain.
          </p>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() => onNavigate('/onboarding')}
          className="w-full py-3 px-4 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <span>Continue to SocialIQ</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </AuthLayout>
  );
};

export default VerificationSuccessPage;
