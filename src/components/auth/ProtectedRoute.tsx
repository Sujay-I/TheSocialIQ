import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  currentPath: string;
  onRedirectToLogin: (redirectUrl: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  currentPath,
  onRedirectToLogin
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      onRedirectToLogin(currentPath);
    }
  }, [isAuthenticated, isLoading, currentPath, onRedirectToLogin]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-[#F7F9FC] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin" />
        <span className="text-xs font-semibold text-slate-500">Verifying SocialIQ cryptographic session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
