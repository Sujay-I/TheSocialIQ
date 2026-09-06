import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IntelligenceMode, OnboardingSetupData } from '../../types';
import {
  Building2,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Check
} from 'lucide-react';

interface OnboardingFlowProps {
  initialStep?: 'welcome' | 'use-case' | 'organization' | 'connect-sources' | 'complete';
  onComplete: (mode: IntelligenceMode) => void;
  onNavigateSubStep?: (step: string) => void;
}

const PERSONAL_INTERESTS = [
  'Technology',
  'Gaming',
  'Entertainment',
  'Sports',
  'Education',
  'Music',
  'Travel',
  'News'
];

const CAMPUS_AREAS = [
  'Campus Life',
  'Placements',
  'Examinations',
  'Events',
  'Hostels',
  'Sports',
  'Clubs',
  'Academics'
];

const SOCIAL_SOURCES = [
  { id: 'x', name: 'X / Twitter', desc: 'Real-time velocity & public opinion', default: true },
  { id: 'instagram', name: 'Instagram', desc: 'Visual creator & brand affinity', default: true },
  { id: 'reddit', name: 'Reddit', desc: 'Deep community & subforum discussions', default: true },
  { id: 'youtube', name: 'YouTube', desc: 'Long-form commentary & sentiment', default: false },
  { id: 'discord', name: 'Discord', desc: 'Public servers & niche student hubs', default: false },
  { id: 'linkedin', name: 'LinkedIn', desc: 'Executive & corporate reputation', default: false }
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialStep = 'welcome',
  onComplete,
  onNavigateSubStep
}) => {
  const { user, completeOnboarding } = useAuth();

  const [step, setStep] = useState<'welcome' | 'use-case' | 'organization' | 'connect-sources' | 'complete'>(initialStep);

  // Setup state
  const [selectedMode, setSelectedMode] = useState<IntelligenceMode>('corporate');

  // Corporate specifics
  const [orgName, setOrgName] = useState('Amazon');
  const [industry, setIndustry] = useState('E-Commerce & Cloud');
  const [keywords, setKeywords] = useState('aws, prime, delivery, alexa');
  const [competitors, setCompetitors] = useState('Walmart, Target, Microsoft');

  // Personal specifics
  const [personalWorkspaceName, setPersonalWorkspaceName] = useState('Household Discovery');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Technology', 'Gaming', 'Education']);

  // Education specifics
  const [institutionName, setInstitutionName] = useState('Stanford University');
  const [institutionType, setInstitutionType] = useState('University');
  const [selectedCampusAreas, setSelectedCampusAreas] = useState<string[]>(['Campus Life', 'Academics', 'Events']);

  // Connected sources
  const [connectedSources, setConnectedSources] = useState<string[]>(['x', 'instagram', 'reddit']);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    if (initialStep) setStep(initialStep);
  }, [initialStep]);

  const goToStep = (next: 'welcome' | 'use-case' | 'organization' | 'connect-sources' | 'complete') => {
    setStep(next);
    if (onNavigateSubStep) {
      if (next === 'welcome') onNavigateSubStep('/onboarding');
      else onNavigateSubStep(`/onboarding/${next}`);
    }
  };

  const handleApplyDemoOrg = (name: 'Amazon' | "McDonald's") => {
    if (name === 'Amazon') {
      setOrgName('Amazon');
      setIndustry('E-Commerce & Cloud Computing');
      setKeywords('aws, prime, delivery, alexa, bedrock');
      setCompetitors('Walmart, Target, Microsoft, Shein');
    } else {
      setOrgName("McDonald's");
      setIndustry('Quick Service Restaurant');
      setKeywords('big mac, happy meal, mcflurry, drive thru');
      setCompetitors("Burger King, Wendy's, Taco Bell");
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleCampusArea = (area: string) => {
    setSelectedCampusAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const toggleSource = (sourceId: string) => {
    setConnectedSources(prev =>
      prev.includes(sourceId) ? prev.filter(s => s !== sourceId) : [...prev, sourceId]
    );
  };

  const handleFinishOnboarding = async () => {
    setIsFinishing(true);
    const data: OnboardingSetupData = {
      intelligenceMode: selectedMode,
      organizationName:
        selectedMode === 'corporate'
          ? orgName
          : selectedMode === 'personal'
          ? personalWorkspaceName
          : institutionName,
      industry: selectedMode === 'corporate' ? industry : undefined,
      keywords: selectedMode === 'corporate' ? keywords.split(',').map(s => s.trim()) : undefined,
      competitors: selectedMode === 'corporate' ? competitors.split(',').map(s => s.trim()) : undefined,
      interests: selectedMode === 'personal' ? selectedInterests : undefined,
      institutionName: selectedMode === 'education' ? institutionName : undefined,
      institutionType: selectedMode === 'education' ? institutionType : undefined,
      monitoringAreas: selectedMode === 'education' ? selectedCampusAreas : undefined,
      connectedSources
    };

    try {
      await completeOnboarding(data);
      onComplete(selectedMode);
    } catch (err) {
      console.error('Failed to save onboarding', err);
      onComplete(selectedMode);
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#F7F9FC] text-[#0B1B33] flex flex-col justify-between font-sans antialiased">
      {/* Top Simple Onboarding Bar */}
      <header className="w-full bg-white border-b border-[#DCE3ED] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            IQ
          </div>
          <span className="font-bold text-lg text-[#0B1B33]">
            Social<span className="text-blue-600">IQ</span>
          </span>
          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
            Setup Wizard
          </span>
        </div>

        {/* Stepper Indicator */}
        {step !== 'welcome' && (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className={step === 'use-case' ? 'text-blue-600 font-bold' : ''}>1. Use Case</span>
            <span className="text-slate-300">→</span>
            <span className={step === 'organization' ? 'text-blue-600 font-bold' : ''}>2. Workspace</span>
            <span className="text-slate-300">→</span>
            <span className={step === 'connect-sources' ? 'text-blue-600 font-bold' : ''}>3. Sources</span>
            <span className="text-slate-300">→</span>
            <span className={step === 'complete' ? 'text-blue-600 font-bold' : ''}>4. Launch</span>
          </div>
        )}

        <div className="text-xs text-slate-500">
          Logged in as <span className="font-semibold text-slate-800">{user?.name || user?.email || 'User'}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-10 flex flex-col justify-center">
        {/* ========================================================
            STEP 1: WELCOME
           ======================================================== */}
        {step === 'welcome' && (
          <div className="bg-white border border-[#DCE3ED] rounded-2xl p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1B33]">Welcome to SocialIQ</h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Choose how you want to use social intelligence. Our multi-modal engine adapts telemetry to your exact operational domain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#DCE3ED]">
                <Building2 className="w-5 h-5 text-blue-600 mb-1.5" />
                <div className="text-xs font-bold text-slate-800">Corporate</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Consumer & Market Intelligence</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#DCE3ED]">
                <Users className="w-5 h-5 text-emerald-600 mb-1.5" />
                <div className="text-xs font-bold text-slate-800">Personal</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Family & Privacy-First Discovery</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#DCE3ED]">
                <GraduationCap className="w-5 h-5 text-indigo-600 mb-1.5" />
                <div className="text-xs font-bold text-slate-800">Education</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Student & Institution Voice</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => goToStep('use-case')}
                className="w-full sm:w-auto min-w-[200px] py-3 px-6 rounded-xl bg-[#061735] hover:bg-[#0B234A] text-white text-sm font-semibold shadow-sm transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: USE CASE SELECTION (3 LARGE CARDS)
           ======================================================== */}
        {step === 'use-case' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B33]">
                Select your primary intelligence use case
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                You can easily switch between all three modes at any time inside the authenticated workspace.
              </p>
            </div>

            {/* 3 Large Selectable Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Corporate */}
              <div
                onClick={() => setSelectedMode('corporate')}
                className={`cursor-pointer rounded-2xl p-6 transition-all border-2 relative flex flex-col justify-between ${
                  selectedMode === 'corporate'
                    ? 'bg-blue-50/50 border-blue-600 shadow-md ring-2 ring-blue-600/20'
                    : 'bg-white border-[#DCE3ED] hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {selectedMode === 'corporate' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-blue-700">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Corporate</span>
                    <h3 className="text-base font-bold text-[#0B1B33] mt-0.5">Consumer & Market Intelligence</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Understand customers, brands, products, markets and influencers. Benchmark competitors and track brand sentiment.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DCE3ED]/60 text-[11px] text-slate-500 font-medium">
                  Ideal for Marketing, PR & Product Intelligence
                </div>
              </div>

              {/* Card 2: Personal */}
              <div
                onClick={() => setSelectedMode('personal')}
                className={`cursor-pointer rounded-2xl p-6 transition-all border-2 relative flex flex-col justify-between ${
                  selectedMode === 'personal'
                    ? 'bg-emerald-50/50 border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                    : 'bg-white border-[#DCE3ED] hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {selectedMode === 'personal' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Personal</span>
                    <h3 className="text-base font-bold text-[#0B1B33] mt-0.5">Family & Personal Intelligence</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Understand activity patterns, interests, topics and sentiment while maintaining strict privacy and zero personal tracking.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DCE3ED]/60 text-[11px] text-slate-500 font-medium">
                  Ideal for Households, Content Creators & Mentors
                </div>
              </div>

              {/* Card 3: Education */}
              <div
                onClick={() => setSelectedMode('education')}
                className={`cursor-pointer rounded-2xl p-6 transition-all border-2 relative flex flex-col justify-between ${
                  selectedMode === 'education'
                    ? 'bg-indigo-50/50 border-indigo-600 shadow-md ring-2 ring-indigo-600/20'
                    : 'bg-white border-[#DCE3ED] hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {selectedMode === 'education' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100/80 border border-indigo-200 flex items-center justify-center text-indigo-700">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Education</span>
                    <h3 className="text-base font-bold text-[#0B1B33] mt-0.5">Student & Institution Intelligence</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Understand campus sentiment, trends, communities and influence. Elevate student voices with aggregate campus health metrics.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#DCE3ED]/60 text-[11px] text-slate-500 font-medium">
                  Ideal for Universities, Student Affairs & Academic Deans
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => goToStep('welcome')}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => goToStep('organization')}
                className="py-2.5 px-6 rounded-xl bg-[#061735] hover:bg-[#0B234A] text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: WORKSPACE / ORGANIZATION CONFIGURATION
           ======================================================== */}
        {step === 'organization' && (
          <div className="bg-white border border-[#DCE3ED] rounded-2xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto space-y-6 animate-fadeIn">
            {/* Corporate Onboarding Form */}
            {selectedMode === 'corporate' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 2: Corporate Setup</div>
                  <h3 className="text-xl font-bold text-[#0B1B33]">Configure your enterprise tenant</h3>
                  <p className="text-xs text-slate-500">
                    Define the organization, industry, and keyword monitors for real-time telemetry.
                  </p>
                </div>

                {/* Demo fast-fill buttons */}
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-blue-900 block">Use Pre-Configured Demo:</span>
                    <span className="text-slate-500 text-[11px]">Load instant data for evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleApplyDemoOrg('Amazon')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-xs font-bold text-blue-700 shadow-2xs"
                    >
                      Amazon
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyDemoOrg("McDonald's")}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-xs font-bold text-blue-700 shadow-2xs"
                    >
                      McDonald&apos;s
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Organization Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE3ED] rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Industry</label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE3ED] rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Monitoring Keywords (comma separated)</label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE3ED] rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Key Competitors</label>
                    <input
                      type="text"
                      value={competitors}
                      onChange={(e) => setCompetitors(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE3ED] rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Personal Onboarding Form */}
            {selectedMode === 'personal' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 2: Personal Setup</div>
                  <h3 className="text-xl font-bold text-[#0B1B33]">Configure your household workspace</h3>
                  <p className="text-xs text-slate-500">
                    Select family interest spheres and configure zero-PII wellness signals.
                  </p>
                </div>

                {/* Privacy Badge Guarantee */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Privacy-First Architecture Active</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    SocialIQ operates strictly on anonymized, high-level interest topics. No individual browser histories, private chat messages, or surveillance feeds are ever stored.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Workspace Name</label>
                    <input
                      type="text"
                      value={personalWorkspaceName}
                      onChange={(e) => setPersonalWorkspaceName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE3ED] rounded-lg focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Areas of Interest</label>
                    <div className="flex flex-wrap gap-2">
                      {PERSONAL_INTERESTS.map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? `✓ ${interest}` : `+ ${interest}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Education Onboarding Form */}
            {selectedMode === 'education' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 2: Education Setup</div>
                  <h3 className="text-xl font-bold text-[#0B1B33]">Configure your campus institution</h3>
                  <p className="text-xs text-slate-500">
                    Monitor aggregated student feedback and community wellness without individual tracking.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Institution Name</label>
                    <input
                      type="text"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE3ED] rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Institution Type</label>
                    <select
                      value={institutionType}
                      onChange={(e) => setInstitutionType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE3ED] rounded-lg focus:outline-none focus:border-indigo-600"
                    >
                      <option value="University">University</option>
                      <option value="College">Liberal Arts College</option>
                      <option value="Community College">Community College</option>
                      <option value="High School">High School District</option>
                      <option value="Research Institute">Research Institute</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#0B1B33]">Campus Monitoring Areas</label>
                    <div className="flex flex-wrap gap-2">
                      {CAMPUS_AREAS.map((area) => {
                        const isSelected = selectedCampusAreas.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleCampusArea(area)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? `✓ ${area}` : `+ ${area}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#DCE3ED]">
              <button
                type="button"
                onClick={() => goToStep('use-case')}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => goToStep('connect-sources')}
                className="py-2.5 px-6 rounded-xl bg-[#061735] hover:bg-[#0B234A] text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Continue to Sources</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: CONNECT SOCIAL SOURCES
           ======================================================== */}
        {step === 'connect-sources' && (
          <div className="bg-white border border-[#DCE3ED] rounded-2xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 3: Intelligence Feeds</div>
              <h3 className="text-xl font-bold text-[#0B1B33]">Connect social and public signals</h3>
              <p className="text-xs text-slate-500">
                Select the channels you wish to feed into your SocialIQ intelligence graph.
              </p>
            </div>

            <div className="space-y-2.5">
              {SOCIAL_SOURCES.map((source) => {
                const isChecked = connectedSources.includes(source.id);
                return (
                  <div
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/40 border-blue-300 shadow-2xs'
                        : 'bg-white border-[#DCE3ED] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isChecked ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {source.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1B33]">{source.name}</div>
                        <div className="text-[11px] text-slate-500">{source.desc}</div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#DCE3ED]">
              <button
                type="button"
                onClick={() => goToStep('organization')}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => goToStep('complete')}
                className="py-2.5 px-6 rounded-xl bg-[#061735] hover:bg-[#0B234A] text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Review & Finish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 5: ONBOARDING COMPLETE
           ======================================================== */}
        {step === 'complete' && (
          <div className="bg-white border border-[#DCE3ED] rounded-2xl p-8 sm:p-12 shadow-sm text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce-short">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B33]">
                You&apos;re ready to use SocialIQ
              </h2>
              <p className="text-sm text-slate-500">
                Your workspace is calibrated and opinion vector feeds are live.
              </p>
            </div>

            {/* Config Summary Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-[#DCE3ED] text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#DCE3ED]/60 pb-2.5">
                <span className="text-slate-500">Intelligence Mode:</span>
                <span className="font-bold text-[#0B1B33] capitalize flex items-center gap-1.5">
                  {selectedMode === 'corporate' && '🏢 Corporate'}
                  {selectedMode === 'personal' && '🏡 Personal'}
                  {selectedMode === 'education' && '🎓 Education'}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#DCE3ED]/60 pb-2.5">
                <span className="text-slate-500">Primary Workspace:</span>
                <span className="font-bold text-[#0B1B33]">
                  {selectedMode === 'corporate'
                    ? orgName
                    : selectedMode === 'personal'
                    ? personalWorkspaceName
                    : institutionName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Connected Sources:</span>
                <span className="font-semibold text-blue-600">
                  {connectedSources.length} Live Feeds Active
                </span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleFinishOnboarding}
                disabled={isFinishing}
                className="w-full py-3.5 px-6 rounded-xl bg-[#061735] hover:bg-[#0B234A] text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {isFinishing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Configuring Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Enter SocialIQ</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-slate-400 border-t border-[#DCE3ED]/60">
        &copy; {new Date().getFullYear()} SocialIQ Platform &bull; Autonomous Social Intelligence
      </footer>
    </div>
  );
};

export default OnboardingFlow;
