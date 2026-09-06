import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, LoginCredentials, SignupData, OnboardingSetupData, AuthError, IntelligenceMode } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionExpired: boolean;
  authError: AuthError | null;
  clearError: () => void;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  loginWithDemo: (preferredMode?: IntelligenceMode) => Promise<AuthUser>;
  loginWithSocial: (provider: 'google' | 'microsoft') => Promise<AuthUser>;
  signup: (data: SignupData) => Promise<{ user: AuthUser; verificationToken: string }>;
  verifyEmail: (token?: string, email?: string) => Promise<AuthUser>;
  resendVerification: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateUser: (updates: Partial<AuthUser>) => Promise<AuthUser>;
  completeOnboarding: (setup: OnboardingSetupData) => Promise<AuthUser>;
  logout: () => Promise<void>;
  triggerSessionExpired: () => void;
  dismissSessionExpired: () => void;
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // Initialize session on mount
  useEffect(() => {
    try {
      const activeUser = authService.getCurrentUser();
      setUser(activeUser);
    } catch (err) {
      console.error('Failed to restore session:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = () => setAuthError(null);

  const login = async (credentials: LoginCredentials): Promise<AuthUser> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const authenticatedUser = await authService.login(credentials);
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (err: any) {
      const errorObj: AuthError = err?.code ? err : {
        code: 'INVALID_CREDENTIALS',
        message: err?.message || 'Authentication failed. Please verify your credentials.'
      };
      setAuthError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithDemo = async (preferredMode?: IntelligenceMode): Promise<AuthUser> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const demoUser = await authService.loginWithDemo(preferredMode);
      setUser(demoUser);
      return demoUser;
    } catch (err: any) {
      const errorObj: AuthError = {
        code: 'NETWORK_ERROR',
        message: 'Could not initialize demo account.'
      };
      setAuthError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithSocial = async (provider: 'google' | 'microsoft'): Promise<AuthUser> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const socialUser = await authService.loginWithSocial(provider);
      setUser(socialUser);
      return socialUser;
    } catch (err: any) {
      const errorObj: AuthError = {
        code: 'NETWORK_ERROR',
        message: `Failed to authenticate with ${provider}.`
      };
      setAuthError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<{ user: AuthUser; verificationToken: string }> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await authService.signup(data);
      // We do not set active session yet because email must be verified
      return result;
    } catch (err: any) {
      const errorObj: AuthError = err?.code ? err : {
        code: 'NETWORK_ERROR',
        message: err?.message || 'Could not complete registration. Please try again.'
      };
      setAuthError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token?: string, email?: string): Promise<AuthUser> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const verifiedUser = await authService.verifyEmail(token, email);
      setUser(verifiedUser);
      return verifiedUser;
    } catch (err: any) {
      const errorObj: AuthError = err?.code ? err : {
        code: 'UNAUTHORIZED',
        message: 'Email verification token is invalid or has expired.'
      };
      setAuthError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (email: string): Promise<void> => {
    try {
      await authService.resendVerification(email);
    } catch (err) {
      console.error('Failed to resend verification:', err);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await authService.forgotPassword(email);
    } catch (err: any) {
      // Do not reveal errors for forgot password
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await authService.resetPassword(token, newPassword);
    } catch (err: any) {
      const errorObj: AuthError = err?.code ? err : {
        code: 'INVALID_RESET_TOKEN',
        message: 'Invalid or expired password reset link.'
      };
      setAuthError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<AuthUser>): Promise<AuthUser> => {
    try {
      const updated = await authService.updateUser(updates);
      setUser(updated);
      return updated;
    } catch (err) {
      console.error('Failed to update user profile:', err);
      throw err;
    }
  };

  const completeOnboarding = async (setup: OnboardingSetupData): Promise<AuthUser> => {
    setIsLoading(true);
    try {
      const updated = await authService.completeOnboarding(setup);
      setUser(updated);
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setSessionExpired(false);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerSessionExpired = () => {
    setSessionExpired(true);
  };

  const dismissSessionExpired = () => {
    setSessionExpired(false);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        sessionExpired,
        authError,
        clearError,
        login,
        loginWithDemo,
        loginWithSocial,
        signup,
        verifyEmail,
        resendVerification,
        forgotPassword,
        resetPassword,
        updateUser,
        completeOnboarding,
        logout,
        triggerSessionExpired,
        dismissSessionExpired,
        redirectPath,
        setRedirectPath
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
