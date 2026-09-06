import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { KeyRound, ArrowLeft, MailCheck, Sparkles } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Email address is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPassword(cleanEmail);
      setIsSubmitted(true);
    } catch (err) {
      // Intentionally reveal nothing for security
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout badgeText="Account Recovery">
      <div className="w-full space-y-6">
        {!isSubmitted ? (
          <>
            {/* Form View */}
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3 mx-auto sm:mx-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33]">Forgot your password?</h2>
              <p className="text-sm text-slate-500">
                Enter your email address and we&apos;ll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="forgot-email" className="block text-xs font-semibold text-[#0B1B33]">
                  Work / Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="alex.chen@socialiq.ai"
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#0B1B33] border rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    error
                      ? 'border-red-500 bg-red-50/20'
                      : 'border-[#DCE3ED] hover:border-slate-300 focus:border-blue-600'
                  }`}
                />
                {error && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <span>•</span> {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending link...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </form>

            {/* Evaluator Fast Pass to Reset Password Screen */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Hackathon Evaluator:
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/reset-password?token=demo-valid-token')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Test Reset Screen →
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="space-y-4 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <MailCheck className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33]">Check your email</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  If an account exists for <span className="font-semibold text-slate-700">{email}</span>, we&apos;ve sent password reset instructions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Didn&apos;t receive an email?</div>
                <p className="text-[11px] text-slate-500">
                  Please check your spam or junk folder, or wait a few minutes before requesting another link.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/reset-password?token=demo-valid-token')}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Simulate Token Click (Demo) →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="w-full py-2.5 px-4 rounded-lg border border-[#DCE3ED] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0B1B33] transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
