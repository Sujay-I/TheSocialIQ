import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PasswordInput } from './PasswordInput';
import { PasswordStrength, checkPasswordCriteria } from './PasswordStrength';
import { SocialAuthButtons } from './SocialAuthButtons';
import { AuthLayout } from './AuthLayout';
import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const { signup, loginWithSocial, authError, clearError } = useAuth();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Errors and touch tracking
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!firstName.trim()) {
      errs.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      errs.lastName = 'Last name is required';
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else {
      const criteria = checkPasswordCriteria(password);
      if (!criteria.hasLength) {
        errs.password = 'Password must be at least 8 characters';
      } else if (!criteria.hasUpper || !criteria.hasLower || !criteria.hasNumber) {
        errs.password = 'Password must include uppercase, lowercase, and a number';
      }
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true
    });

    const valErrors = validate();
    setErrors(valErrors);
    if (Object.keys(valErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        agreeTerms
      });
      // Store pending verification email temporarily for /verify-email screen
      sessionStorage.setItem('socialiq_pending_verify_email', email.trim().toLowerCase());
      onNavigate('/verify-email');
    } catch (err) {
      // Handled via authError
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'microsoft') => {
    clearError();
    setIsSubmitting(true);
    try {
      const user = await loginWithSocial(provider);
      if (!user.onboardingCompleted) {
        onNavigate('/onboarding');
      } else {
        onNavigate(`/${user.intelligenceMode || 'corporate'}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout badgeText="Enterprise Registration">
      <div className="w-full space-y-6">
        {/* Title and Subtitle */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              IQ
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Enterprise Onboarding</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33]">Create your SocialIQ account</h2>
          <p className="text-sm text-slate-500">
            Start turning social signals into actionable intelligence.
          </p>
        </div>

        {/* Global Error */}
        {authError && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-fadeIn"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold block">Registration Error</span>
              <span>{authError.message}</span>
            </div>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* First and Last Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="signup-firstname" className="block text-xs font-semibold text-[#0B1B33]">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                id="signup-firstname"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (touched.firstName) setErrors(validate());
                }}
                onBlur={() => handleBlur('firstName')}
                placeholder="Sarah"
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#0B1B33] border rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.firstName && touched.firstName
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-[#DCE3ED] hover:border-slate-300 focus:border-blue-600'
                }`}
              />
              {errors.firstName && touched.firstName && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <span>•</span> {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup-lastname" className="block text-xs font-semibold text-[#0B1B33]">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                id="signup-lastname"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (touched.lastName) setErrors(validate());
                }}
                onBlur={() => handleBlur('lastName')}
                placeholder="Jenkins"
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#0B1B33] border rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.lastName && touched.lastName
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-[#DCE3ED] hover:border-slate-300 focus:border-blue-600'
                }`}
              />
              {errors.lastName && touched.lastName && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <span>•</span> {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="signup-email" className="block text-xs font-semibold text-[#0B1B33]">
              Work / Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) setErrors(validate());
              }}
              onBlur={() => handleBlur('email')}
              placeholder="s.jenkins@stanford.edu"
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#0B1B33] border rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.email && touched.email
                  ? 'border-red-500 bg-red-50/20'
                  : 'border-[#DCE3ED] hover:border-slate-300 focus:border-blue-600'
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <span>•</span> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <PasswordInput
              id="signup-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) setErrors(validate());
              }}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              disabled={isSubmitting}
              label="Create password"
            />
            <PasswordStrength password={password} />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <PasswordInput
              id="signup-confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (touched.confirmPassword) setErrors(validate());
              }}
              onBlur={() => handleBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              disabled={isSubmitting}
              label="Confirm password"
              placeholder="Re-enter password"
              autoComplete="new-password"
            />
          </div>

          {/* Terms and Privacy Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600">
              <input
                id="signup-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  if (touched.agreeTerms) setErrors(validate());
                }}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
              />
              <span>
                I agree to the{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-blue-600 font-medium hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-blue-600 font-medium hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.agreeTerms && touched.agreeTerms && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 pl-6">
                <span>•</span> {errors.agreeTerms}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/20 mt-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Create Account</span>
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

        {/* Social Signup */}
        <SocialAuthButtons
          actionText="Sign up"
          disabled={isSubmitting}
          onGoogleClick={() => handleSocialSignup('google')}
          onMicrosoftClick={() => handleSocialSignup('microsoft')}
        />

        {/* Switch to Login */}
        <div className="text-center pt-2 text-xs text-slate-600">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none"
          >
            Sign in
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
