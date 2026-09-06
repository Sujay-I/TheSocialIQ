import React, { useState } from 'react';
import { Corporation } from '../types';
import {
  Sparkles,
  TrendingUp,
  Download,
  Share2,
  CheckCircle2,
  SlidersHorizontal,
  RotateCw,
  Search,
  Pin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  Gauge,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Radio
} from 'lucide-react';

interface InfluencerItem {
  id: string;
  rank: number;
  name: string;
  handle: string;
  platform: 'x' | 'instagram' | 'youtube' | 'telegram';
  platformLabel: string;
  niche: string;
  reach: string;
  er: string;
  score: number;
  sentimentText: string;
  sentimentTone: 'pos' | 'neu' | 'neg';
  sentimentPct: number;
  verified: boolean;
  avatar: string;
  bio: string;
  globalRank: string;
  tier: string;
  influenceIndex: number;
  sentimentPull: number;
  frictionPct: number;
  topTopics: { name: string; count: number }[];
  networkTie: { name: string; handle: string; weight: number; coCitations: string };
}

const mockInfluencers: InfluencerItem[] = [
  {
    id: 'inf-1',
    rank: 1,
    name: 'Elena Rostova',
    handle: '@techinsider',
    platform: 'x',
    platformLabel: '𝕏',
    niche: 'Tech Analyst & Infra Architect',
    reach: '842K',
    er: '8.4%',
    score: 94.2,
    sentimentText: '92% Pos High Impact',
    sentimentTone: 'pos',
    sentimentPct: 92,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&auto=format&fit=crop&q=80',
    bio: 'Enterprise SaaS reviewer & AI infrastructure commentator. High narrative friction on enterprise cloud contracts and GPU distribution clusters.',
    globalRank: '#14 in Cloud Systems',
    tier: 'Tier 1 Sovereign Voice • Verified Enterprise Anchor',
    influenceIndex: 94.2,
    sentimentPull: 78,
    frictionPct: 6,
    topTopics: [
      { name: '#CloudInfra', count: 482 },
      { name: '#ProductivityTools', count: 319 },
      { name: '#AutonomousDelivery', count: 194 }
    ],
    networkTie: {
      name: 'David Vance',
      handle: '@productdaily',
      weight: 0.89,
      coCitations: 'Co-cited across 14 community clusters and 8 corporate panels'
    }
  },
  {
    id: 'inf-2',
    rank: 2,
    name: 'David Vance',
    handle: '@productdaily',
    platform: 'x',
    platformLabel: '𝕏',
    niche: 'Product Lead & Design Strategist',
    reach: '621K',
    er: '6.2%',
    score: 89.7,
    sentimentText: '88% Bull Sustained',
    sentimentTone: 'pos',
    sentimentPct: 88,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&auto=format&fit=crop&q=80',
    bio: 'Author of Product Loops newsletter. Focus on customer ergonomics, friction-free checkout, and logistics automation.',
    globalRank: '#22 in Product Leadership',
    tier: 'Tier 1 Anchor • Verified Creator',
    influenceIndex: 89.7,
    sentimentPull: 72,
    frictionPct: 8,
    topTopics: [
      { name: '#CXDesign', count: 390 },
      { name: '#PrimeDelivery', count: 240 },
      { name: '#FulfillmentUI', count: 180 }
    ],
    networkTie: {
      name: 'Elena Rostova',
      handle: '@techinsider',
      weight: 0.89,
      coCitations: 'Co-cited across 14 community clusters and 8 corporate panels'
    }
  },
  {
    id: 'inf-3',
    rank: 3,
    name: 'Maya Lin',
    handle: '@futuretech',
    platform: 'youtube',
    platformLabel: 'YT',
    niche: 'Video Creator & Hardware Benchmark',
    reach: '508K',
    er: '7.9%',
    score: 86.4,
    sentimentText: '76% Neut Balanced',
    sentimentTone: 'neu',
    sentimentPct: 76,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&auto=format&fit=crop&q=80',
    bio: 'Deep-dive hardware tear downs, smart home devices, and edge AI compute systems. Audience values strict benchmark accuracy.',
    globalRank: '#35 in Hardware Media',
    tier: 'Tier 2 High Yield • Sovereign Publisher',
    influenceIndex: 86.4,
    sentimentPull: 64,
    frictionPct: 12,
    topTopics: [
      { name: '#EchoDevices', count: 310 },
      { name: '#SmartWarehouse', count: 195 },
      { name: '#ChipArchitecture', count: 140 }
    ],
    networkTie: {
      name: 'Alex Rivera',
      handle: '@digitalworld',
      weight: 0.74,
      coCitations: 'Shared audience overlap in West Coast developer channels'
    }
  },
  {
    id: 'inf-4',
    rank: 4,
    name: 'Alex Rivera',
    handle: '@digitalworld',
    platform: 'telegram',
    platformLabel: 'TG',
    niche: 'Enterprise Community & AI Research',
    reach: '391K',
    er: '5.1%',
    score: 82.1,
    sentimentText: '64% Pos Rising Pulse',
    sentimentTone: 'pos',
    sentimentPct: 64,
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&auto=format&fit=crop&q=80',
    bio: 'Curator of modern enterprise tech stacks and distributed computing nodes. High citation frequency among engineering leads.',
    globalRank: '#48 in AI Research Groups',
    tier: 'Tier 2 Emerging Voice • Developer Hub',
    influenceIndex: 82.1,
    sentimentPull: 58,
    frictionPct: 15,
    topTopics: [
      { name: '#BedrockAPI', count: 260 },
      { name: '#DevOps', count: 180 },
      { name: '#CloudScalability', count: 130 }
    ],
    networkTie: {
      name: 'Maya Lin',
      handle: '@futuretech',
      weight: 0.74,
      coCitations: 'Shared audience overlap in West Coast developer channels'
    }
  }
];

interface InfluencerIntelligenceViewProps {
  corporation: Corporation;
  onNavigateToNetwork?: () => void;
}

export const InfluencerIntelligenceView: React.FC<InfluencerIntelligenceViewProps> = ({
  corporation,
  onNavigateToNetwork
}) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerItem>(mockInfluencers[0]);
  const [activePlatformTab, setActivePlatformTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredInfluencers = mockInfluencers.filter((inf) => {
    if (activePlatformTab !== 'all' && inf.platform !== activePlatformTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return inf.name.toLowerCase().includes(q) || inf.handle.toLowerCase().includes(q) || inf.niche.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSyncGraph = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Influencer Node Vector Graph re-indexed with live network edge weights!');
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Eyebrow, Title & Actions (Matches Image 3) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>TELEMETRIC VECTOR MATRIX</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700">Realtime Entity Node Index</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Influencer Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Identify, benchmark, and map key opinion leaders driving public perception and narrative velocity.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Threshold Config: Sensitivity 0.85, Minimum Reach: 100K, Velocity Factor: 2.0x')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-xs transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Threshold Config</span>
          </button>
          <button
            onClick={handleSyncGraph}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Graph</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards (Matches Image 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: TOTAL IDENTIFIED VOICES */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              TOTAL IDENTIFIED VOICES
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              +14% this month
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">4,820 <span className="text-base font-medium text-slate-500">accounts</span></div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
              <span>Active coverage</span>
              <div className="w-16 h-4">
                <svg viewBox="0 0 60 16" className="w-full h-full stroke-blue-600 fill-none" strokeWidth="2">
                  <path d="M 0 12 Q 20 14, 30 6 T 60 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: TOP INFLUENCE SCORE */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              TOP INFLUENCE SCORE
            </span>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
              Tier 0
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">98.4 <span className="text-base font-normal text-slate-400">/ 100</span></div>
            <div className="text-xs text-slate-500 mt-2">
              Leader: <strong className="text-slate-900 font-semibold">@techinsider</strong>
            </div>
          </div>
        </div>

        {/* Card 3: AVG ENGAGEMENT RATE */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              AVG ENGAGEMENT RATE
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              +2.7x index
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">4.8% <span className="text-base font-normal text-emerald-600 font-medium text-xs">high-yield</span></div>
            <div className="text-xs text-slate-500 mt-2">
              Benchmark: <span className="text-slate-700 font-medium">2.1% across industry</span>
            </div>
          </div>
        </div>

        {/* Card 4: POTENTIAL REACH */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              POTENTIAL REACH
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
              Unique overlap: 64%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">48.2M <span className="text-base font-medium text-slate-500">gross accounts</span></div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-3">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '64%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar with Platform Tabs & Search */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Platform Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
          {[
            { id: 'all', label: 'All Platforms' },
            { id: 'x', label: 'X / Twitter' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'youtube', label: 'YouTube' },
            { id: 'telegram', label: 'Telegram' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePlatformTab(tab.id)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activePlatformTab === tab.id
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-2.5 flex-1 max-w-md justify-end">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter influencers by handle, niche"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none">
            <option>Ranked by Influence Score</option>
            <option>Ranked by Reach</option>
            <option>Ranked by Engagement Rate</option>
          </select>

          <button
            onClick={() => alert('Exporting influencer matrix ranking...')}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Priority Target Matrix Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            {/* Table Header Status */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-900">Priority Target Matrix</span>
                <span className="text-slate-400">({filteredInfluencers.length} Active Matches)</span>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Realtime Telemetry Active
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/30">
                    <th className="py-3 px-4">RANK</th>
                    <th className="py-3 px-4">VOICE & CHANNEL</th>
                    <th className="py-3 px-4">REACH</th>
                    <th className="py-3 px-4">SCORE</th>
                    <th className="py-3 px-4">SENTIMENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInfluencers.map((inf) => {
                    const isSelected = selectedInfluencer.id === inf.id;
                    return (
                      <tr
                        key={inf.id}
                        onClick={() => setSelectedInfluencer(inf)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50/70'
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-3.5 px-4 font-bold text-slate-900 w-12">
                          #{inf.rank}
                        </td>

                        {/* Voice & Channel */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={inf.avatar}
                              alt={inf.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-900">{inf.handle}</span>
                                {inf.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                                {inf.niche}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Reach */}
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div>{inf.reach}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{inf.er} ER</div>
                        </td>

                        {/* Score */}
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {inf.score}
                          </span>
                        </td>

                        {/* Sentiment */}
                        <td className="py-3.5 px-4">
                          <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                            inf.sentimentTone === 'pos'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {inf.sentimentText}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="p-3.5 bg-slate-50/60 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <span>Displaying 4 priority node influencers of 4,820 indexed entities</span>
            <div className="flex items-center gap-1.5">
              <button className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-600">
                Prev
              </button>
              <span className="font-semibold text-slate-800">1 of 121</span>
              <button className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-600">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right: NODE TELEMETRY INSPECTOR (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-5">
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h3 className="text-sm font-bold text-slate-900">Opinion Vector Profile</h3>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={() => setIsPinned(!isPinned)}
                  className={`p-1.5 rounded transition-colors ${isPinned ? 'text-blue-600 bg-blue-50' : 'hover:text-slate-700'}`}
                  title="Pin"
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => alert(`Copied node vector link for ${selectedInfluencer.handle}`)}
                  className="p-1.5 rounded hover:text-slate-700 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Profile Card Header */}
            <div className="flex items-start gap-3.5">
              <div className="relative">
                <img
                  src={selectedInfluencer.avatar}
                  alt={selectedInfluencer.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                  {selectedInfluencer.platformLabel}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-slate-900 truncate">{selectedInfluencer.handle}</span>
                  {selectedInfluencer.verified && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{selectedInfluencer.tier}</div>
                <div className="text-[11px] font-semibold text-blue-600 mt-1">
                  Global Rank: {selectedInfluencer.globalRank}
                </div>
              </div>
            </div>

            {/* Bio Box */}
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 leading-relaxed italic">
              "{selectedInfluencer.bio}"
            </div>

            {/* Dual Gauges: Influence Index Donut + Sentiment Pull */}
            <div className="grid grid-cols-2 gap-3">
              {/* Gauge 1: Influence Index Donut */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center flex flex-col items-center justify-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  INFLUENCE INDEX
                </div>
                {/* SVG Donut */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeDasharray="94.2, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-extrabold text-slate-900">{selectedInfluencer.influenceIndex}</span>
                    <span className="text-[8px] text-slate-400">/ 100</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mt-2">
                  Top 1% Tier
                </span>
              </div>

              {/* Gauge 2: Sentiment Pull Index */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    SENTIMENT PULL INDEX
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">
                    +{selectedInfluencer.sentimentPull}%
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                    Positive pull on audience discourse across monitored tech circles.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Positive Tilt Friction</span>
                    <span className="font-bold text-slate-800">{selectedInfluencer.frictionPct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${selectedInfluencer.frictionPct * 5}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Mentioned Topic Clusters (30-Day Window) */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                TOP MENTIONED TOPIC CLUSTERS (30-Day Window)
              </div>
              <div className="space-y-1.5">
                {selectedInfluencer.topTopics.map((top) => (
                  <div
                    key={top.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                  >
                    <span className="font-semibold text-slate-800">{top.name}</span>
                    <span className="text-slate-500 font-medium">{top.count} mentions</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Network Topology Anchor */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  NETWORK TOPOLOGY
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                  {selectedInfluencer.networkTie.weight} Weight
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {selectedInfluencer.networkTie.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-xs font-bold text-slate-900">
                  Strong tie with {selectedInfluencer.networkTie.handle}
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {selectedInfluencer.networkTie.coCitations}
              </p>
            </div>

            {/* Operational Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => alert(`Added ${selectedInfluencer.handle} to real-time watchlist!`)}
                className="py-2 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
              >
                Pin to Watchlist
              </button>
              <button
                onClick={onNavigateToNetwork}
                className="py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
              >
                Simulate Narrative Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
