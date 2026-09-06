import React, { useState, useEffect, useCallback } from 'react';
import { AnalyticsSummary, Corporation, TimeRange, AuthUser, IntelligenceMode } from './types';
import { api } from './lib/api';
import { AuthProvider, useAuth } from './context/AuthContext';
import { IntelligenceProvider, useIntelligence } from './context/IntelligenceContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';

// Authentication & Onboarding Components
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { VerifyEmailPage } from './components/auth/VerifyEmailPage';
import { VerificationSuccessPage } from './components/auth/VerificationSuccessPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { SessionExpiredModal } from './components/auth/SessionExpiredModal';

// Modals
import { SettingsModal } from './components/SettingsModal';
import { HelpDocsModal } from './components/HelpDocsModal';
import { CorporationModal } from './components/CorporationModal';

// Workspace Views
import { OverviewView } from './components/OverviewView';
import { ConversationExplorerView } from './components/ConversationExplorerView';
import { InfluencerIntelligenceView } from './components/InfluencerIntelligenceView';
import { NetworkIntelligenceView } from './components/NetworkIntelligenceView';
import { ConsumerTrendsView } from './components/ConsumerTrendsView';
import { SentimentView } from './components/SentimentView';
import { AudienceView } from './components/AudienceView';
import { DataSourcesView } from './components/DataSourcesView';
import { PlatformAnalyticsView } from './components/PlatformAnalyticsView';
import { ReportsView } from './components/ReportsView';
import { AlertsView } from './components/AlertsView';
import { PersonalOverviewView, PersonalPrivacyView } from './components/PersonalViews';
import { EducationOverviewView } from './components/EducationViews';

const DEFAULT_CORPS: Corporation[] = [
  {
    id: 'corp-amazon',
    name: 'Amazon',
    slug: 'amazon',
    description: 'Global logistics, cloud computing, and e-commerce leader.',
    logo_url: 'https://images.unsplash.com/photo-1523474255658-4af910049d14?w=64&auto=format&fit=crop&q=80',
    keywords: ['amazon', 'prime', 'aws', 'bedrock', 'delivery'],
    hashtags: ['#Amazon', '#PrimeDay', '#AWS', '#AmazonDelivery'],
    official_social_accounts: [
      { platform: 'x', handle: '@amazon', connected: true },
      { platform: 'instagram', handle: '@amazon', connected: true },
      { platform: 'reddit', handle: 'r/amazon', connected: true }
    ],
    competitors: ['Walmart', 'Target', 'Shein', 'Temu'],
    data_source: 'live',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'corp-mcdonalds',
    name: "McDonald's",
    slug: 'mcdonalds',
    description: 'Multinational fast food chain and QSR innovator.',
    logo_url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=64&auto=format&fit=crop&q=80',
    keywords: ['mcdonalds', 'big mac', 'happy meal', 'mcflurry'],
    hashtags: ['#McDonalds', '#ImLovinIt', '#BigMac'],
    official_social_accounts: [
      { platform: 'x', handle: '@mcdonalds', connected: true }
    ],
    competitors: ['Burger King', "Wendy's", 'KFC'],
    data_source: 'live',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'corp-tesla',
    name: 'Tesla',
    slug: 'tesla',
    description: 'Electric vehicles, clean energy, and autonomous artificial intelligence.',
    logo_url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=64&auto=format&fit=crop&q=80',
    keywords: ['tesla', 'cybertruck', 'fsd', 'model y'],
    hashtags: ['#Tesla', '#FSD', '#Cybertruck'],
    official_social_accounts: [
      { platform: 'x', handle: '@tesla', connected: true }
    ],
    competitors: ['BYD', 'Rivian', 'Lucid', 'Ford'],
    data_source: 'live',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'corp-apple',
    name: 'Apple',
    slug: 'apple',
    description: 'Consumer electronics, software, and services ecosystem.',
    logo_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=64&auto=format&fit=crop&q=80',
    keywords: ['apple', 'iphone', 'vision pro', 'ios', 'macbook'],
    hashtags: ['#Apple', '#iPhone16', '#AppleIntelligence'],
    official_social_accounts: [
      { platform: 'x', handle: '@apple', connected: true }
    ],
    competitors: ['Samsung', 'Google', 'Microsoft'],
    data_source: 'live',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'corp-nike',
    name: 'Nike',
    slug: 'nike',
    description: 'Global athletic footwear, apparel, and lifestyle brand.',
    logo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=64&auto=format&fit=crop&q=80',
    keywords: ['nike', 'jordan', 'just do it', 'air max'],
    hashtags: ['#Nike', '#JustDoIt', '#AirJordan'],
    official_social_accounts: [
      { platform: 'x', handle: '@nike', connected: true }
    ],
    competitors: ['Adidas', 'Puma', 'Under Armour', 'Lululemon'],
    data_source: 'live',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const MainAppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading, sessionExpired, logout, dismissSessionExpired } = useAuth();
  const {
    currentMode,
    setMode,
    currentSubRoute,
    navigate,
    selectedOrganization,
    setSelectedOrganization,
    timeRange,
    setTimeRange,
    corporateData,
    isLoading
  } = useIntelligence();

  // Synchronized browser route state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/corporate';
  });

  const [corporations, setCorporations] = useState<Corporation[]>(DEFAULT_CORPS);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePop = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Central Navigation Handler
  const handleNavigate = useCallback((toPath: string) => {
    if (typeof window !== 'undefined' && (window.location.pathname + window.location.search) !== toPath) {
      window.history.pushState(null, '', toPath);
    }
    setCurrentPath(toPath);

    // If navigating to workspace mode, sync IntelligenceContext
    if (toPath.startsWith('/corporate')) {
      if (currentMode !== 'corporate') setMode('corporate');
      const sub = toPath.replace('/corporate', '').replace(/^\//, '') || 'overview';
      navigate(sub);
    } else if (toPath.startsWith('/personal')) {
      if (currentMode !== 'personal') setMode('personal');
      const sub = toPath.replace('/personal', '').replace(/^\//, '') || 'overview';
      navigate(sub);
    } else if (toPath.startsWith('/education')) {
      if (currentMode !== 'education') setMode('education');
      const sub = toPath.replace('/education', '').replace(/^\//, '') || 'overview';
      navigate(sub);
    }
  }, [currentMode, setMode, navigate]);

  // Load corporations on mount
  useEffect(() => {
    const fetchCorps = async () => {
      try {
        const res = await api.getCorporations();
        if (res.data && res.data.length > 0) {
          setCorporations(res.data);
          if (!selectedOrganization) {
            setSelectedOrganization(res.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load corporations, using built-in defaults:', err);
      }
    };
    fetchCorps();
  }, [selectedOrganization, setSelectedOrganization]);

  // Sync user's intelligenceMode on authentication
  useEffect(() => {
    if (user?.intelligenceMode && user.intelligenceMode !== currentMode) {
      setMode(user.intelligenceMode);
    }
  }, [user?.intelligenceMode, currentMode, setMode]);

  // Route guarding
  const pathname = currentPath.split('?')[0];
  const searchParams = new URLSearchParams(currentPath.includes('?') ? currentPath.split('?')[1] : '');
  const redirectTarget = searchParams.get('redirect') || undefined;
  const resetToken = searchParams.get('token') || 'demo-valid-token';

  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/verify-email' ||
    pathname === '/verification-success' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password';

  const isOnboardingRoute = pathname.startsWith('/onboarding');

  // Handle automatic redirects based on auth status
  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      // If user tries to access protected routes while logged out, redirect to /login
      if (!isAuthRoute) {
        const target = pathname === '/' ? '/corporate' : pathname;
        handleNavigate(`/login?redirect=${encodeURIComponent(target)}`);
      }
    } else {
      // User is authenticated
      if (!user?.onboardingCompleted && !isOnboardingRoute) {
        // Must complete onboarding first
        handleNavigate('/onboarding');
      } else if (isAuthRoute) {
        // Authenticated users shouldn't see auth forms
        if (redirectTarget && !redirectTarget.startsWith('/login') && !redirectTarget.startsWith('/signup')) {
          handleNavigate(redirectTarget);
        } else {
          handleNavigate(`/${user?.intelligenceMode || currentMode || 'corporate'}`);
        }
      } else if (pathname === '/') {
        handleNavigate(`/${user?.intelligenceMode || currentMode || 'corporate'}`);
      }
    }
  }, [isAuthenticated, authLoading, pathname, isAuthRoute, isOnboardingRoute, user?.onboardingCompleted, user?.intelligenceMode, currentMode, redirectTarget, handleNavigate]);

  const handleExportReport = (format: 'csv' | 'json' | 'summary' = 'csv') => {
    if (selectedOrganization && currentMode === 'corporate') {
      if (format === 'csv') {
        window.open(api.getPostsCsvUrl(selectedOrganization.id), '_blank');
      } else {
        const dump = {
          tenant: selectedOrganization.name,
          mode: currentMode,
          timeRange,
          exportDate: new Date().toISOString(),
          metrics: corporateData?.metrics,
          highGrowthDrivers: corporateData?.high_growth_drivers
        };
        const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedOrganization.slug}-corporate-intelligence.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  // 1. Initial Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen w-screen bg-[#F7F9FC] flex flex-col items-center justify-center space-y-3">
        <div className="w-9 h-9 rounded-full border-3 border-blue-600 border-t-transparent animate-spin" />
        <div className="text-xs font-semibold text-slate-600">
          Initializing SocialIQ Enterprise Engine...
        </div>
      </div>
    );
  }

  // 2. Authentication Screen Routes
  if (pathname === '/login') {
    return <LoginPage onNavigate={handleNavigate} redirectTarget={redirectTarget} />;
  }

  if (pathname === '/signup') {
    return <SignupPage onNavigate={handleNavigate} />;
  }

  if (pathname === '/verify-email') {
    return <VerifyEmailPage onNavigate={handleNavigate} />;
  }

  if (pathname === '/verification-success') {
    return <VerificationSuccessPage onNavigate={handleNavigate} />;
  }

  if (pathname === '/forgot-password') {
    return <ForgotPasswordPage onNavigate={handleNavigate} />;
  }

  if (pathname === '/reset-password') {
    return <ResetPasswordPage onNavigate={handleNavigate} token={resetToken} />;
  }

  // 3. Onboarding Flow
  if (isOnboardingRoute) {
    let subStep: 'welcome' | 'use-case' | 'organization' | 'connect-sources' | 'complete' = 'welcome';
    if (pathname.includes('/use-case')) subStep = 'use-case';
    else if (pathname.includes('/organization')) subStep = 'organization';
    else if (pathname.includes('/connect-sources')) subStep = 'connect-sources';
    else if (pathname.includes('/complete')) subStep = 'complete';

    return (
      <OnboardingFlow
        initialStep={subStep}
        onComplete={(mode) => {
          setMode(mode);
          handleNavigate(`/${mode}`);
        }}
        onNavigateSubStep={handleNavigate}
      />
    );
  }

  // 4. Authenticated Workspace Dashboard
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc] font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Session Expired Security Modal */}
      <SessionExpiredModal
        isOpen={sessionExpired}
        onSignIn={() => {
          dismissSessionExpired();
          handleNavigate('/login');
        }}
      />

      {/* Persistent Left Dark Navy Sidebar with Global Mode Selector */}
      <Sidebar
        activeScreen={currentSubRoute}
        onSelectScreen={(screen) => {
          const next = `/${currentMode}/${screen}`;
          handleNavigate(next);
        }}
        corporations={corporations}
        selectedCorporation={selectedOrganization}
        onSelectCorporation={(corp) => setSelectedOrganization(corp)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        currentUser={user}
        onLogout={logout}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header with Breadcrumbs, Global Mode Selector, Search, Time & Profile */}
        <TopHeader
          activeScreen={currentSubRoute}
          selectedCorporation={selectedOrganization}
          timeRange={timeRange}
          onSelectTimeRange={(r) => setTimeRange(r)}
          onExportReport={handleExportReport}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentUser={user}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          onOpenCorpSelector={() => setIsAddModalOpen(true)}
          onLogout={logout}
        />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#f8fafc]">
          {isLoading && !corporateData && currentMode === 'corporate' ? (
            <div className="flex flex-col items-center justify-center min-h-[55vh] space-y-3">
              <div className="w-9 h-9 rounded-full border-3 border-blue-600 border-t-transparent animate-spin"></div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide">
                Resolving corporate telemetry & opinion vector graph...
              </div>
            </div>
          ) : (
            <>
              {/* ========================================================
                  MODE 1: CORPORATE / CONSUMER INTELLIGENCE
                 ======================================================== */}
              {currentMode === 'corporate' && (
                <>
                  {/* Overview Screen */}
                  {(currentSubRoute === 'overview' || !currentSubRoute) && corporateData && (
                    <OverviewView
                      summary={corporateData}
                      timeRange={timeRange}
                      onSelectTimeRange={(r) => setTimeRange(r)}
                      onExportReport={() => handleExportReport('csv')}
                      onNavigateToTrends={() => handleNavigate('/corporate/trends')}
                      onNavigateToInfluencers={() => handleNavigate('/corporate/influencers')}
                      onNavigateToNetwork={() => handleNavigate('/corporate/network')}
                      onNavigateToExplorer={() => handleNavigate('/corporate/conversations')}
                    />
                  )}

                  {/* Conversation Explorer */}
                  {(currentSubRoute === 'conversations' || currentSubRoute === 'explorer') && selectedOrganization && (
                    <ConversationExplorerView corporation={selectedOrganization} />
                  )}

                  {/* Influencer Intelligence */}
                  {currentSubRoute === 'influencers' && selectedOrganization && (
                    <InfluencerIntelligenceView
                      corporation={selectedOrganization}
                      onNavigateToNetwork={() => handleNavigate('/corporate/network')}
                    />
                  )}

                  {/* Network Intelligence */}
                  {currentSubRoute === 'network' && selectedOrganization && (
                    <NetworkIntelligenceView corporation={selectedOrganization} />
                  )}

                  {/* Consumer Trends */}
                  {currentSubRoute === 'trends' && corporateData && (
                    <ConsumerTrendsView
                      summary={corporateData}
                      onTrackDriver={() => handleNavigate('/corporate/network')}
                    />
                  )}

                  {/* Sentiment */}
                  {currentSubRoute === 'sentiment' && selectedOrganization && (
                    <SentimentView corporation={selectedOrganization} />
                  )}

                  {/* Audience */}
                  {currentSubRoute === 'audience' && selectedOrganization && (
                    <AudienceView corporation={selectedOrganization} />
                  )}

                  {/* Data Sources */}
                  {currentSubRoute === 'datasources' && selectedOrganization && (
                    <DataSourcesView corporation={selectedOrganization} />
                  )}

                  {/* Platform Analytics */}
                  {currentSubRoute === 'platforms' && selectedOrganization && (
                    <PlatformAnalyticsView corporation={selectedOrganization} />
                  )}

                  {/* Reports */}
                  {currentSubRoute === 'reports' && selectedOrganization && (
                    <ReportsView corporation={selectedOrganization} summary={corporateData} />
                  )}

                  {/* Alerts */}
                  {currentSubRoute === 'alerts' && selectedOrganization && (
                    <AlertsView corporation={selectedOrganization} />
                  )}
                </>
              )}

              {/* ========================================================
                  MODE 2: PERSONAL / FAMILY INTELLIGENCE
                 ======================================================== */}
              {currentMode === 'personal' && (
                <>
                  {currentSubRoute === 'privacy' ? (
                    <PersonalPrivacyView />
                  ) : (
                    <PersonalOverviewView />
                  )}
                </>
              )}

              {/* ========================================================
                  MODE 3: EDUCATIONAL / INSTITUTION INTELLIGENCE
                 ======================================================== */}
              {currentMode === 'education' && (
                <>
                  <EducationOverviewView />
                </>
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Workspace Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={user}
        onUpdateUser={() => {}}
        currentCorp={selectedOrganization}
        onLogout={logout}
      />

      {/* Help & Documentation Center Modal */}
      <HelpDocsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Tenant Onboarding / Switch Modal */}
      <CorporationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreated={(newCorp) => {
          setCorporations((prev) => [...prev, newCorp]);
          setSelectedOrganization(newCorp);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <IntelligenceProvider initialCorporations={DEFAULT_CORPS} initialCorp={DEFAULT_CORPS[0]}>
        <MainAppContent />
      </IntelligenceProvider>
    </AuthProvider>
  );
};

export default App;
