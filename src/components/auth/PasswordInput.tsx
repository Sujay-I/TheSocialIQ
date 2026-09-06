import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = '••••••••',
  label = 'Password',
  error,
  disabled = false,
  required = true,
  autoComplete = 'current-password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xs font-semibold text-[#0B1B33]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          name={name || id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-3.5 py-2.5 pr-11 text-sm bg-white text-[#0B1B33] border rounded-lg transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            error
              ? 'border-red-500 focus:border-red-500 bg-red-50/20'
              : 'border-[#DCE3ED] hover:border-slate-300 focus:border-blue-600'
          }`}
        />
        <button
          type="button"
          tabIndex={0}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 rounded transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 flex items-center gap-1 font-medium mt-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
