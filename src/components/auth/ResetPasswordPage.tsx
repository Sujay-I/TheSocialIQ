import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PasswordInput } from './PasswordInput';
import { PasswordStrength, checkPasswordCriteria } from './PasswordStrength';
import { AuthLayout } from './AuthLayout';
import { Lock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ResetPasswordPageProps {
  onNavigate: (path: string) => void;
  token?: string;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  onNavigate,
  token = 'demo-valid-token'
}) => {
  const { resetPassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    // Check if token exists or expired
    if (!token || token === 'expired') {
      setTokenError('This password reset link is invalid or has expired. Please request a new one.');
    } else {
      setTokenError(null);
    }
  }, [token]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!newPassword) {
      errs.newPassword = 'Password is required';
    } else {
      const criteria = checkPasswordCriteria(newPassword);
      if (!criteria.hasLength || !criteria.hasUpper || !criteria.hasLower || !criteria.hasNumber) {
        errs.newPassword = 'Password must meet all security criteria';
      }
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm your password';
    } else if (confirmPassword !== newPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ newPassword: true, confirmPassword: true });
    const valErrs = validate();
    setErrors(valErrs);
    if (Object.keys(valErrs).length > 0) return;

    setIsSubmitting(true);
    try {
      await resetPassword(token, newPassword);
      setIsSuccess(true);
    } catch (err: any) {
      setTokenError(err?.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout badgeText="Password Update">
      <div className="w-full space-y-6">
        {tokenError ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#0B1B33]">Link Expired or Invalid</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {tokenError}
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/forgot-password')}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Request New Reset Link
              </button>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-[#0B1B33]">Password updated successfully.</h2>
              <p className="text-xs text-slate-500">
                You can now sign in to SocialIQ with your updated credentials.
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="w-full py-2.5 px-4 bg-[#061735] hover:bg-[#0B234A] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33]">Reset your password</h2>
              <p className="text-sm text-slate-500">
                Enter your new password below. It must meet standard enterprise security criteria.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <PasswordInput
                  id="reset-new-password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (touched.newPassword) setErrors(validate());
                  }}
                  onBlur={() => handleBlur('newPassword')}
                  error={touched.newPassword ? errors.newPassword : undefined}
                  disabled={isSubmitting}
                  label="New password"
                  autoComplete="new-password"
                />
                <PasswordStrength password={newPassword} />
              </div>

              <div className="space-y-1.5">
                <PasswordInput
                  id="reset-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (touched.confirmPassword) setErrors(validate());
                  }}
                  onBlur={() => handleBlur('confirmPassword')}
                  error={touched.confirmPassword ? errors.confirmPassword : undefined}
                  disabled={isSubmitting}
                  label="Confirm new password"
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/20 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Resetting password...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
