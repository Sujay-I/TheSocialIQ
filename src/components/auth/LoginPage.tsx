import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PasswordInput } from './PasswordInput';
import { SocialAuthButtons } from './SocialAuthButtons';
import { AuthLayout } from './AuthLayout';
import { Sparkles, AlertCircle, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { IntelligenceMode } from '../../types';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  redirectTarget?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, redirectTarget }) => {
  const { login, loginWithDemo, loginWithSocial, authError, clearError } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Field validation errors
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoModeSelectOpen, setDemoModeSelectOpen] = useState(false);

  // Validate form
  const validate = () => {
    const errs: { email?: string; password?: string } = {};

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    return errs;
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(errs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setTouched({ email: true, password: true });

    const valErrors = validate();
    setErrors(valErrors);
    if (Object.keys(valErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const user = await login({ email, password, rememberMe });
      // Redirect handling
      handlePostAuthRedirect(user);
    } catch (err) {
      // Error handled in AuthContext and displayed via authError
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostAuthRedirect = (user: any) => {
    if (redirectTarget) {
      onNavigate(redirectTarget);
      return;
    }
    if (!user.onboardingCompleted) {
      onNavigate('/onboarding');
      return;
    }
    const mode: IntelligenceMode = user.intelligenceMode || 'corporate';
    onNavigate(`/${mode}`);
  };

  const handleDemoSignIn = async (mode: IntelligenceMode = 'corporate') => {
    clearError();
    setIsSubmitting(true);
    try {
      const user = await loginWithDemo(mode);
      handlePostAuthRedirect(user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'microsoft') => {
    clearError();
    setIsSubmitting(true);
    try {
      const user = await loginWithSocial(provider);
      handlePostAuthRedirect(user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout badgeText="Enterprise Sign In">
      <div className="w-full space-y-6">
        {/* Title and Subtitle */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              IQ
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Enterprise Access</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33]">Welcome back</h2>
          <p className="text-sm text-slate-500">
            Sign in to continue to SocialIQ intelligence workspace
          </p>
        </div>

        {/* Global Auth Error Alert */}
        {authError && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-fadeIn"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold block">Authentication Failed</span>
              <span>{authError.message}</span>
            </div>
          </div>
        )}

        {/* Quick Demo Access Bar for Hackathon Evaluator */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-600 text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-[#0B1B33]">Hackathon Evaluator Fast Pass</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-semibold">
              Instant Demo
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Evaluate SocialIQ immediately without registering or configuring external credentials.
          </p>
          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn('corporate')}
              disabled={isSubmitting}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <span>Continue with Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDemoModeSelectOpen(!demoModeSelectOpen)}
              className="px-2.5 py-2 border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 rounded-lg text-xs font-medium transition-colors"
              title="Select initial demo mode"
            >
              Mode ▾
            </button>
          </div>

          {demoModeSelectOpen && (
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-blue-200/60 animate-fadeIn">
              <button
                type="button"
                onClick={() => handleDemoSignIn('corporate')}
                className="p-1.5 rounded-md bg-white hover:bg-blue-100 border border-blue-200 text-left text-[11px] font-medium text-slate-700"
              >
                🏢 Corporate
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('personal')}
                className="p-1.5 rounded-md bg-white hover:bg-emerald-100 border border-emerald-200 text-left text-[11px] font-medium text-slate-700"
              >
                🏡 Personal
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('education')}
                className="p-1.5 rounded-md bg-white hover:bg-indigo-100 border border-indigo-200 text-left text-[11px] font-medium text-slate-700"
              >
                🎓 Education
              </button>
            </div>
          )}
        </div>

        {/* Traditional Credentials Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="block text-xs font-semibold text-[#0B1B33]">
              Work / Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) setErrors(validate());
              }}
              onBlur={() => handleBlur('email')}
              placeholder="alex.chen@socialiq.ai"
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#0B1B33] border rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.email && touched.email
                  ? 'border-red-500 focus:border-red-500 bg-red-50/20'
                  : 'border-[#DCE3ED] hover:border-slate-300 focus:border-blue-600'
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <span>•</span> {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <PasswordInput
              id="login-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) setErrors(validate());
              }}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              disabled={isSubmitting}
              label="Password"
            />
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('/forgot-password')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Divider OR */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#DCE3ED] w-full" />
          <span className="bg-[#F7F9FC] px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest absolute">
            OR
          </span>
        </div>

        {/* Social Authentication */}
        <SocialAuthButtons
          actionText="Continue"
          disabled={isSubmitting}
          onGoogleClick={() => handleSocialAuth('google')}
          onMicrosoftClick={() => handleSocialAuth('microsoft')}
        />

        {/* Switch to Signup */}
        <div className="text-center pt-2 text-xs text-slate-600">
          <span>Don&apos;t have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate('/signup')}
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none"
          >
            Create an account
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
