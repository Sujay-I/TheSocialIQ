import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  IntelligenceMode,
  Corporation,
  TimeRange,
  PersonalAnalyticsSummary,
  EducationAnalyticsSummary,
  AnalyticsSummary
} from '../types';
import { INTELLIGENCE_MODES, IntelligenceModeConfig } from '../config/intelligenceModes';
import { api } from '../lib/api';

interface IntelligenceContextType {
  currentMode: IntelligenceMode;
  modeConfig: IntelligenceModeConfig;
  currentPath: string;
  currentSubRoute: string;
  selectedOrganization: Corporation | null;
  selectedInstitution: string;
  timeRange: TimeRange;
  platformFilter: string;
  sentimentFilter: string;
  isLoading: boolean;
  corporateData: AnalyticsSummary | null;
  personalData: PersonalAnalyticsSummary | null;
  educationData: EducationAnalyticsSummary | null;
  setMode: (mode: IntelligenceMode) => void;
  navigate: (pathOrSubRoute: string) => void;
  setSelectedOrganization: (corp: Corporation) => void;
  setSelectedInstitution: (instId: string) => void;
  setTimeRange: (range: TimeRange) => void;
  setPlatformFilter: (platform: string) => void;
  setSentimentFilter: (sentiment: string) => void;
  refreshData: () => Promise<void>;
}

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

function parseCurrentPath(pathname: string): { mode: IntelligenceMode; subRoute: string; fullPath: string } {
  if (pathname.startsWith('/personal')) {
    const sub = pathname.replace('/personal', '').replace(/^\//, '') || 'overview';
    return { mode: 'personal', subRoute: sub, fullPath: pathname };
  }
  if (pathname.startsWith('/education')) {
    const sub = pathname.replace('/education', '').replace(/^\//, '') || 'overview';
    return { mode: 'education', subRoute: sub, fullPath: pathname };
  }
  if (pathname.startsWith('/corporate')) {
    const sub = pathname.replace('/corporate', '').replace(/^\//, '') || 'overview';
    return { mode: 'corporate', subRoute: sub, fullPath: pathname };
  }
  // Default to corporate overview
  return { mode: 'corporate', subRoute: 'overview', fullPath: '/corporate' };
}

export const IntelligenceProvider: React.FC<{
  children: React.ReactNode;
  initialCorporations?: Corporation[];
  initialCorp?: Corporation | null;
}> = ({ children, initialCorporations = [], initialCorp = null }) => {
  // Initialize from current URL or localStorage
  const initialUrlState = typeof window !== 'undefined' ? parseCurrentPath(window.location.pathname) : { mode: 'corporate' as IntelligenceMode, subRoute: 'overview', fullPath: '/corporate' };

  const [currentMode, setCurrentModeState] = useState<IntelligenceMode>(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/personal') || window.location.pathname.startsWith('/education') || window.location.pathname.startsWith('/corporate'))) {
      return initialUrlState.mode;
    }
    const saved = typeof window !== 'undefined' ? localStorage.getItem('socialiq_mode') : null;
    if (saved === 'corporate' || saved === 'personal' || saved === 'education') {
      return saved;
    }
    return 'corporate';
  });

  const [currentSubRoute, setCurrentSubRoute] = useState<string>(initialUrlState.subRoute);
  const [currentPath, setCurrentPath] = useState<string>(initialUrlState.fullPath);
  const [selectedOrganization, setSelectedOrganizationState] = useState<Corporation | null>(initialCorp);
  const [selectedInstitution, setSelectedInstitutionState] = useState<string>('stanford');
  const [timeRange, setTimeRangeState] = useState<TimeRange>('30D');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [corporateData, setCorporateData] = useState<AnalyticsSummary | null>(null);
  const [personalData, setPersonalData] = useState<PersonalAnalyticsSummary | null>(null);
  const [educationData, setEducationData] = useState<EducationAnalyticsSummary | null>(null);

  const modeConfig = INTELLIGENCE_MODES[currentMode];

  // Fetch structured mode data from API
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (currentMode === 'personal') {
        const res = await api.getModeAnalytics({
          mode: 'personal',
          range: timeRange,
          platform: platformFilter !== 'all' ? platformFilter : undefined
        });
        setPersonalData(res.data);
      } else if (currentMode === 'education') {
        const res = await api.getModeAnalytics({
          mode: 'education',
          institution: selectedInstitution,
          range: timeRange,
          platform: platformFilter !== 'all' ? platformFilter : undefined
        });
        setEducationData(res.data);
      } else {
        // Corporate
        const orgSlug = selectedOrganization?.slug || 'amazon';
        const res = await api.getModeAnalytics({
          mode: 'corporate',
          organization: orgSlug,
          range: timeRange,
          platform: platformFilter !== 'all' ? platformFilter : undefined
        });
        setCorporateData(res.data);
      }
    } catch (err) {
      console.error('Failed to load mode analytics:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentMode, selectedOrganization?.slug, selectedInstitution, timeRange, platformFilter]);

  // Handle URL navigation
  const navigate = useCallback((pathOrSubRoute: string) => {
    let targetPath = pathOrSubRoute;
    let targetMode = currentMode;
    let targetSub = 'overview';

    if (pathOrSubRoute.startsWith('/')) {
      targetPath = pathOrSubRoute;
      const parsed = parseCurrentPath(pathOrSubRoute);
      targetMode = parsed.mode;
      targetSub = parsed.subRoute;
    } else {
      targetSub = pathOrSubRoute;
      targetPath = pathOrSubRoute === 'overview' ? modeConfig.basePath : `${modeConfig.basePath}/${pathOrSubRoute}`;
    }

    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ mode: targetMode, subRoute: targetSub }, '', targetPath);
    }

    setCurrentModeState(targetMode);
    setCurrentSubRoute(targetSub);
    setCurrentPath(targetPath);
    if (typeof window !== 'undefined') {
      localStorage.setItem('socialiq_mode', targetMode);
    }
  }, [currentMode, modeConfig.basePath]);

  // Switch mode directly
  const setMode = useCallback((newMode: IntelligenceMode) => {
    if (newMode === currentMode) return;
    const targetConfig = INTELLIGENCE_MODES[newMode];
    const targetPath = targetConfig.basePath;
    
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ mode: newMode, subRoute: 'overview' }, '', targetPath);
      localStorage.setItem('socialiq_mode', newMode);
    }

    setCurrentModeState(newMode);
    setCurrentSubRoute('overview');
    setCurrentPath(targetPath);
  }, [currentMode]);

  const setSelectedOrganization = (corp: Corporation) => {
    setSelectedOrganizationState(corp);
  };

  const setSelectedInstitution = (instId: string) => {
    setSelectedInstitutionState(instId);
  };

  const setTimeRange = (range: TimeRange) => {
    setTimeRangeState(range);
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseCurrentPath(window.location.pathname);
      setCurrentModeState(parsed.mode);
      setCurrentSubRoute(parsed.subRoute);
      setCurrentPath(parsed.fullPath);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch data on mode, org, inst, or range change
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <IntelligenceContext.Provider
      value={{
        currentMode,
        modeConfig,
        currentPath,
        currentSubRoute,
        selectedOrganization,
        selectedInstitution,
        timeRange,
        platformFilter,
        sentimentFilter,
        isLoading,
        corporateData,
        personalData,
        educationData,
        setMode,
        navigate,
        setSelectedOrganization,
        setSelectedInstitution,
        setTimeRange,
        setPlatformFilter,
        setSentimentFilter,
        refreshData
      }}
    >
      {children}
    </IntelligenceContext.Provider>
  );
};

export const useIntelligence = (): IntelligenceContextType => {
  const context = useContext(IntelligenceContext);
  if (!context) {
    throw new Error('useIntelligence must be used within an IntelligenceProvider');
  }
  return context;
};
