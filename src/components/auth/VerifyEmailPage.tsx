import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { Mail, ArrowLeft, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

interface VerifyEmailPageProps {
  onNavigate: (path: string) => void;
}

function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return 'your.email@organization.com';
  const [local, domain] = email.split('@');
  const maskedLocal = local.length <= 2 ? local : `${local[0]}***${local[local.length - 1]}`;
  const domainParts = domain.split('.');
  const maskedDomain = domainParts[0].length <= 2 ? domainParts[0] : `${domainParts[0][0]}***${domainParts[0][domainParts[0].length - 1]}`;
  return `${maskedLocal}@${maskedDomain}.${domainParts.slice(1).join('.')}`;
}

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ onNavigate }) => {
  const { verifyEmail, resendVerification } = useAuth();
  const [cooldown, setCooldown] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Retrieve pending email from session storage
  const pendingEmail = sessionStorage.getItem('socialiq_pending_verify_email') || 'alex.chen@socialiq.ai';

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(c => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    setResendSuccess(false);
    try {
      await resendVerification(pendingEmail);
      setResendSuccess(true);
      setCooldown(45);
      setTimeout(() => setResendSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsResending(false);
    }
  };

  const handleInstantVerify = async () => {
    setIsVerifying(true);
    try {
      await verifyEmail('demo-token', pendingEmail);
      onNavigate('/verification-success');
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AuthLayout badgeText="Security Verification">
      <div className="w-full space-y-6 text-center">
        {/* Verification Icon */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
          <Mail className="w-7 h-7" />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33]">Verify your email</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            We&apos;ve sent a verification link to your email address:
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-800">
            {maskEmail(pendingEmail)}
          </div>
        </div>

        {/* Resend status */}
        {resendSuccess && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>A fresh verification link has been dispatched to your inbox.</span>
          </div>
        )}

        {/* Demo Fast-Verify Button */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 text-left space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-600 text-white">
                <Sparkles className="w-3 h-3" />
              </span>
              <span className="text-xs font-bold text-[#0B1B33]">Hackathon Demo Bypass</span>
            </div>
            <span className="text-[10px] font-semibold text-blue-600">Simulate Inbox Click</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Test the complete verified onboarding journey immediately without leaving the browser.
          </p>
          <button
            type="button"
            onClick={handleInstantVerify}
            disabled={isVerifying}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify Demo Account →</span>
            )}
          </button>
        </div>

        {/* Resend and Navigation Actions */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className={`w-full py-2.5 px-4 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              cooldown > 0
                ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border-[#DCE3ED] text-[#0B1B33] hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            {cooldown > 0 ? (
              <span>Resend available in {cooldown}s</span>
            ) : (
              <span>Resend verification email</span>
            )}
          </button>

          <div className="flex items-center justify-between text-xs pt-1 px-1">
            <button
              type="button"
              onClick={() => onNavigate('/signup')}
              className="text-slate-500 hover:text-slate-800 hover:underline"
            >
              Change email address
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to sign in</span>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
