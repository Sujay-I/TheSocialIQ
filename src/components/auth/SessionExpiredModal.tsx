import React from 'react';
import { AlertCircle, LogIn } from 'lucide-react';

interface SessionExpiredModalProps {
  isOpen: boolean;
  onSignIn: () => void;
}

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onSignIn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-[#DCE3ED] rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-5 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-[#0B1B33]">Your session has expired</h3>
          <p className="text-xs text-slate-500">
            For your security, active sessions expire periodically. Please sign in again to continue.
          </p>
        </div>

        <button
          type="button"
          onClick={onSignIn}
          className="w-full py-2.5 px-4 bg-[#061735] hover:bg-[#0B234A] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
