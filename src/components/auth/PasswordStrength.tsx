import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export interface PasswordCriteria {
  hasLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
}

export function checkPasswordCriteria(pwd: string): PasswordCriteria {
  return {
    hasLength: pwd.length >= 8,
    hasUpper: /[A-Z]/.test(pwd),
    hasLower: /[a-z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd)
  };
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const criteria = checkPasswordCriteria(password);
  const metCount = [criteria.hasLength, criteria.hasUpper, criteria.hasLower, criteria.hasNumber].filter(Boolean).length;

  if (!password) return null;

  let strengthLabel = 'Very Weak';
  let strengthColor = 'bg-red-500';
  let strengthText = 'text-red-600';

  if (metCount === 2) {
    strengthLabel = 'Fair';
    strengthColor = 'bg-amber-500';
    strengthText = 'text-amber-600';
  } else if (metCount === 3) {
    strengthLabel = 'Good';
    strengthColor = 'bg-blue-500';
    strengthText = 'text-blue-600';
  } else if (metCount === 4) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-emerald-600';
    strengthText = 'text-emerald-600';
  }

  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">Security strength:</span>
        <span className={`font-semibold ${strengthText}`}>{strengthLabel}</span>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        <div className={`rounded-full transition-all ${metCount >= 1 ? strengthColor : 'bg-slate-200'}`} />
        <div className={`rounded-full transition-all ${metCount >= 2 ? strengthColor : 'bg-slate-200'}`} />
        <div className={`rounded-full transition-all ${metCount >= 3 ? strengthColor : 'bg-slate-200'}`} />
        <div className={`rounded-full transition-all ${metCount >= 4 ? strengthColor : 'bg-slate-200'}`} />
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1 text-[11px]">
        <div className={`flex items-center gap-1.5 ${criteria.hasLength ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
          {criteria.hasLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          <span>8+ characters</span>
        </div>
        <div className={`flex items-center gap-1.5 ${criteria.hasUpper ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
          {criteria.hasUpper ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          <span>Uppercase letter</span>
        </div>
        <div className={`flex items-center gap-1.5 ${criteria.hasLower ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
          {criteria.hasLower ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          <span>Lowercase letter</span>
        </div>
        <div className={`flex items-center gap-1.5 ${criteria.hasNumber ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
          {criteria.hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          <span>At least 1 number</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
