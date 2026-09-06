import React from 'react';
import { LayoutDashboard, HeartPulse, TrendingUp, Share2, MessageSquare, Database } from 'lucide-react';

export type TabType = 'overview' | 'trends' | 'network' | 'posts' | 'ingest';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'network', label: 'Network', icon: <Share2 className="w-4 h-4" /> },
    { id: 'posts', label: 'Posts', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'ingest', label: 'Ingest', icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-500/10' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
