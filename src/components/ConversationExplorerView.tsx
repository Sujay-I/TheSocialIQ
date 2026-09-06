import React, { useState } from 'react';
import { Corporation } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Download,
  Terminal,
  Flag,
  Sparkles,
  Share2,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Code,
  FileSpreadsheet,
  X,
  MessageSquare,
  ShieldCheck,
  Send
} from 'lucide-react';

interface ConversationItem {
  id: string;
  platform: 'x' | 'reddit' | 'instagram' | 'telegram';
  platformLabel: string;
  authorName: string;
  authorHandle: string;
  authorRole: string;
  reach: string;
  avatar: string;
  verified: boolean;
  content: string;
  timestamp: string;
  tags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  sentimentText: string;
  confidence: number;
  // Dossier details
  primaryAffect: string;
  sarcasmScore: number;
  semantics: string[];
  directImpressions: string;
  downstreamAmp: string;
  secondaryReach: string;
  alertType?: string;
  alertMsg?: string;
}

const mockConversations: ConversationItem[] = [
  {
    id: 'conv-1',
    platform: 'x',
    platformLabel: '𝕏',
    authorName: 'TechInsider Research',
    authorHandle: '@techinsider',
    authorRole: 'Tier 1 Media Analyst',
    reach: '842,500',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&auto=format&fit=crop&q=80',
    verified: true,
    content: "Amazon's new autonomous delivery dispatch system cut prime arrival times across Seattle by 40% this morning. The algorithmic speed and instant turnaround is remarkable. Autonomous dispatch is finally feeling like a flawless UI experience.",
    timestamp: 'Oct 24, 2024 • 11:04:12 AM PDT',
    tags: ['#AutonomousLogistics', '#PrimeDelivery'],
    sentiment: 'positive',
    sentimentScore: 92,
    sentimentText: '+92% Pos',
    confidence: 98.4,
    primaryAffect: 'Gratitude (Excitement 89%)',
    sarcasmScore: 0.02,
    semantics: ['instant turnaround', 'autonomous dispatch', 'flawless UI', 'Seattle Hub GEO: 47.6062° N'],
    directImpressions: '142,000',
    downstreamAmp: '1,240 events',
    secondaryReach: '680,000 souls',
    alertType: 'Tier-1 Signal',
    alertMsg: 'Message detected from Tier 1 domain authority with zero brand-risk markers. Recommended for inclusion in the upcoming Q4 Autonomous Tech Briefing for VP of Communications.'
  },
  {
    id: 'conv-2',
    platform: 'reddit',
    platformLabel: 'r/',
    authorName: 'u/dev_architect',
    authorHandle: 'r/aws_cloud',
    authorRole: 'Senior Cloud Consultant',
    reach: '48,200',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&auto=format&fit=crop&q=80',
    verified: false,
    content: 'Did anyone else catch the stealth surcharge on high-frequency Bedrock API endpoints? Customer care was evasive when questioned about token concurrency throttles.',
    timestamp: 'Oct 24, 2024 • 10:48:30 AM PDT',
    tags: ['#BedrockAPI', '#PricingEscalation'],
    sentiment: 'negative',
    sentimentScore: -68,
    sentimentText: '-68% Neg',
    confidence: 94.1,
    primaryAffect: 'Frustration (Skepticism 78%)',
    sarcasmScore: 0.14,
    semantics: ['stealth surcharge', 'Bedrock API', 'token concurrency', 'evasive customer care'],
    directImpressions: '38,400',
    downstreamAmp: '412 events',
    secondaryReach: '124,000 souls',
    alertType: 'Friction Hotspot',
    alertMsg: 'Pricing escalation thread gaining momentum among verified developer accounts. Flagged for Product & Developer Relations.'
  },
  {
    id: 'conv-3',
    platform: 'instagram',
    platformLabel: 'IG',
    authorName: 'sarah_urbanstyle',
    authorHandle: '@sarah_urbanstyle',
    authorRole: 'Lifestyle & Urban Living Creator',
    reach: '310,000',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&auto=format&fit=crop&q=80',
    verified: true,
    content: 'Obsessed with the new contactless locker return kiosks at Whole Foods. Literally scanned QR code and done in 4 seconds flat. No boxes, no tape!',
    timestamp: 'Oct 24, 2024 • 09:22:15 AM PDT',
    tags: ['#WholeFoodsReturn', '#CXFulfillment'],
    sentiment: 'positive',
    sentimentScore: 88,
    sentimentText: '+88% Pos',
    confidence: 96.7,
    primaryAffect: 'Delight (Convenience 94%)',
    sarcasmScore: 0.01,
    semantics: ['contactless return', 'Whole Foods locker', 'instant QR scan', 'frictionless CX'],
    directImpressions: '94,200',
    downstreamAmp: '680 events',
    secondaryReach: '410,000 souls',
    alertType: 'Positive Organic Reach',
    alertMsg: 'High organic engagement with consumer demographics under 35. Benchmark for frictionless fulfillment campaign.'
  },
  {
    id: 'conv-4',
    platform: 'telegram',
    platformLabel: 'TG',
    authorName: 'LogisticsFeed EU',
    authorHandle: 't.me/logisticsfeed',
    authorRole: 'Supply Chain Wire Desk',
    reach: '94,000',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&auto=format&fit=crop&q=80',
    verified: false,
    content: 'Monitoring reports of minor regional parcel dispatch bottlenecks around Frankfurt fulfillment node due to seasonal rail maintenance.',
    timestamp: 'Oct 24, 2024 • 08:15:40 AM PDT',
    tags: ['#SupplyChain', '#EUHubs'],
    sentiment: 'neutral',
    sentimentScore: 0,
    sentimentText: '0% Neu',
    confidence: 89.2,
    primaryAffect: 'Objective Telemetry (Neutral 92%)',
    sarcasmScore: 0.0,
    semantics: ['Frankfurt node', 'rail maintenance', 'regional dispatch', 'neutral advisory'],
    directImpressions: '22,100',
    downstreamAmp: '84 events',
    secondaryReach: '62,000 souls'
  },
  {
    id: 'conv-5',
    platform: 'x',
    platformLabel: '𝕏',
    authorName: 'Marcus Vance',
    authorHandle: '@mvance_pdx',
    authorRole: 'Software Engineer',
    reach: '14,100',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&auto=format&fit=crop&q=80',
    verified: false,
    content: 'Lockbox pin failed twice at Hawthorne branch. Had to wait 25 mins on line for override code. Total nightmare during morning commute.',
    timestamp: 'Oct 24, 2024 • 07:44:02 AM PDT',
    tags: ['#HardwareFailure', '#CustomerSupport'],
    sentiment: 'negative',
    sentimentScore: -42,
    sentimentText: '-42% Neg',
    confidence: 91.5,
    primaryAffect: 'Annoyance (Delay 82%)',
    sarcasmScore: 0.08,
    semantics: ['lockbox pin failure', 'Hawthorne branch', 'override code wait', 'hardware glitch'],
    directImpressions: '12,400',
    downstreamAmp: '48 events',
    secondaryReach: '31,000 souls',
    alertType: 'Hardware Alert',
    alertMsg: 'Repeated PIN generation failure reported at Hawthorne locker cluster. Incident ticket logged to Locker Support Ops.'
  }
];

const velocityData = [
  { time: '10:00', pos: 180, neu: 80, neg: 40 },
  { time: '10:15', pos: 220, neu: 95, neg: 50 },
  { time: '10:30', pos: 290, neu: 110, neg: 45 },
  { time: '10:45', pos: 382, neu: 130, neg: 65 },
  { time: '11:00', pos: 340, neu: 115, neg: 55 }
];

interface ConversationExplorerViewProps {
  corporation: Corporation;
}

export const ConversationExplorerView: React.FC<ConversationExplorerViewProps> = ({ corporation }) => {
  const [selectedConv, setSelectedConv] = useState<ConversationItem>(mockConversations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [isCopiedToast, setIsCopiedToast] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [aiReply, setAiReply] = useState<string | null>(null);

  const filteredConversations = mockConversations.filter((c) => {
    if (selectedPlatform !== 'all' && c.platform !== selectedPlatform) return false;
    if (selectedSentiment !== 'all' && c.sentiment !== selectedSentiment) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = c.content.toLowerCase().includes(q);
      const matchAuthor = c.authorName.toLowerCase().includes(q) || c.authorHandle.toLowerCase().includes(q);
      const matchTag = c.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchText && !matchAuthor && !matchTag) return false;
    }
    return true;
  });

  const handleGenerateReply = () => {
    setAiReply(
      `Hello ${selectedConv.authorHandle}, we appreciate your observation regarding our ${selectedConv.tags[0] || 'services'}. Our operations team constantly analyzes telemetry to ensure optimal performance. Thank you for helping us innovate!`
    );
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(mockConversations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `telemetry_explorer_${corporation.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCsv = () => {
    const header = 'ID,Author,Platform,Sentiment,Confidence,Content\n';
    const rows = mockConversations.map(
      (c) => `"${c.id}","${c.authorHandle}","${c.platform}","${c.sentimentScore}","${c.confidence}%","${c.content.replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `telemetry_stream_${corporation.id}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Eyebrow & Badges (Matches Image 2) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>REAL-TIME TELEMETRY STREAM</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Live Ingestion Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Conversation Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Deep-dive into granular social messages, natural language telemetry, and algorithmic sentiment scoring.
          </p>
        </div>

        {/* 3 Top Right Metrics */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs">
            <span className="text-slate-500">Captured / hr: </span>
            <span className="font-bold text-slate-900">14,289</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs">
            <span className="text-slate-500">Avg Confidence: </span>
            <span className="font-bold text-blue-600">94.8%</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs">
            <span className="text-slate-500">High Impact: </span>
            <span className="font-bold text-slate-900">412 nodes</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs space-y-3">
        {/* Main Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search conversations by keyword, phrase, author, or #hashtag... (Press / to focus)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg pl-10 pr-16 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
            ⌘K /
          </span>
        </div>

        {/* Secondary Filter Dropdowns & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            {/* Platform dropdown */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="all">Platform: All Sources</option>
              <option value="x">X / Twitter</option>
              <option value="reddit">Reddit</option>
              <option value="instagram">Instagram</option>
              <option value="telegram">Telegram</option>
            </select>

            {/* Sentiment dropdown */}
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="all">Sentiment: All (Pos, Neu, Neg)</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>

            {/* Topic Filter */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
              <span className="text-slate-400">Topic:</span>
              <span className="font-semibold text-slate-900">Logistics & AI</span>
            </div>

            {/* Confidence Filter */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
              <span className="text-slate-400">Confidence:</span>
              <span className="font-semibold text-slate-900">Min 80%</span>
            </div>

            {/* Date Filter */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
              <span className="text-slate-400">Date:</span>
              <span className="font-semibold text-slate-900">Last 24 Hours</span>
            </div>

            {/* Reset Filters */}
            {(searchQuery || selectedPlatform !== 'all' || selectedSentiment !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPlatform('all');
                  setSelectedSentiment('all');
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 px-2 py-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>CSV</span>
            </button>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs"
            >
              <Code className="w-3.5 h-3.5 text-slate-500" />
              <span>JSON</span>
            </button>
            <button
              onClick={() => alert('Live stream listening on WebSocket socket:wss://stream.socialiq.internal/telemetry')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Stream Query</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Event Stream & Ingestion Velocity */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
            {/* Stream Status Header */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-900">5,410</span>
                <span className="text-slate-500">matching events</span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Auto-updating (120ms)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Sort:</span>
                <span className="text-xs font-semibold text-slate-700">Recency (Desc)</span>
              </div>
            </div>

            {/* Conversation Table */}
            <div className="divide-y divide-slate-100">
              {filteredConversations.map((item) => {
                const isSelected = selectedConv.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedConv(item)}
                    className={`p-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/60 border-l-4 border-blue-600'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      {/* Platform & Author */}
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center shrink-0 ${
                          item.platform === 'x' ? 'bg-slate-900 text-white' :
                          item.platform === 'reddit' ? 'bg-orange-500 text-white' :
                          item.platform === 'instagram' ? 'bg-pink-600 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                          {item.platformLabel}
                        </span>
                        <div className="min-w-0 truncate">
                          <span className="text-xs font-bold text-slate-900">{item.authorName}</span>
                          <span className="text-xs text-slate-500 ml-1.5">{item.authorHandle}</span>
                        </div>
                        {item.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                      </div>

                      {/* Sentiment & Confidence */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                          item.sentiment === 'positive'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : item.sentiment === 'negative'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {item.sentimentText}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {item.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Snippet Content */}
                    <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed mt-1">
                      {item.content}
                    </p>

                    {/* Tags & Timestamp */}
                    <div className="flex items-center justify-between mt-2.5 pt-1 text-[11px]">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 text-slate-600 font-medium px-1.5 py-0.5 rounded text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-slate-400">{item.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="p-3.5 bg-slate-50/60 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <span>Showing rows 1 - 5 of 5,410</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-100">
                  Previous
                </button>
                <button className="px-2.5 py-1 rounded border border-blue-500 bg-blue-600 text-white font-bold">
                  1
                </button>
                <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100">
                  2
                </button>
                <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Ingestion Velocity by Sentiment Chart */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Real-Time Ingestion Velocity by Sentiment</h3>
                <span className="text-xs text-slate-400">Telemetry Window: 60m</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-blue-700 font-semibold">Positive +64%</span>
                <span className="text-slate-500">Neutral 22%</span>
                <span className="text-rose-600 font-semibold">Negative 14%</span>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                  Peak: 382 msgs/sec
                </span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="streamPos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="pos" stroke="#2563eb" strokeWidth={2} fill="url(#streamPos)" />
                  <Area type="monotone" dataKey="neu" stroke="#64748b" strokeWidth={1.5} fill="none" />
                  <Area type="monotone" dataKey="neg" stroke="#f43f5e" strokeWidth={1.5} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Conversation Intelligence Dossier */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-5">
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h3 className="text-sm font-bold text-slate-900">Conversation Intelligence Dossier</h3>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <button
                  onClick={() => alert('Flagged conversation for security audit')}
                  className="p-1 rounded hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Flag"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => alert('Exporting individual event telemetry dossier...')}
                  className="p-1 rounded hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Export"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Author Profile Header */}
            <div className="flex items-center gap-3">
              <img
                src={selectedConv.avatar}
                alt={selectedConv.authorName}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 truncate">{selectedConv.authorName}</span>
                  {selectedConv.verified && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                </div>
                <div className="text-xs text-slate-500 truncate">{selectedConv.authorHandle} • {selectedConv.authorRole}</div>
                <div className="text-[11px] text-blue-700 font-semibold mt-0.5">
                  Verified Reach: {selectedConv.reach}
                </div>
              </div>
            </div>

            {/* Full Quote Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-slate-800 text-xs leading-relaxed italic relative">
              <span className="text-2xl text-slate-300 absolute top-1 left-2 font-serif select-none">“</span>
              <p className="relative z-10 pl-3">{selectedConv.content}</p>
              <div className="flex items-center justify-between not-italic text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-200/60">
                <span>{selectedConv.timestamp}</span>
                <a
                  href={`https://x.com/${selectedConv.authorHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <span>View Original Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* AI Natural Language Telemetry */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Natural Language Telemetry</span>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-100">
                  Claude 3.5 Sonnet Engine
                </span>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500 font-medium">Net Sentiment</div>
                  <div className="text-xs font-bold text-blue-700 mt-0.5">
                    {selectedConv.sentimentScore > 0 ? `+${selectedConv.sentimentScore}%` : `${selectedConv.sentimentScore}%`}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Extreme Bullish</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500 font-medium">Primary Affect</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5 truncate">
                    {selectedConv.primaryAffect.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Score: 89%</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-500 font-medium">Sarcasm Score</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {selectedConv.sarcasmScore}
                  </div>
                  <div className="text-[9px] text-emerald-600 font-medium mt-0.5">Genuine Intent</div>
                </div>
              </div>

              {/* Extracted Semantics & Entities */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  EXTRACTED SEMANTICS & ENTITIES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedConv.semantics.map((sem) => (
                    <span
                      key={sem}
                      className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md border border-slate-200 font-medium"
                    >
                      {sem}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Influence Propagation Telemetry (Depth 3 Hops) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Influence Propagation Telemetry</span>
                <span className="text-[10px] text-slate-400">Depth 3 Hops</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-600">Direct Impressions</span>
                    <span className="font-bold text-slate-900">{selectedConv.directImpressions}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-600">Downstream Amplification (Reposts/Quotes)</span>
                    <span className="font-bold text-slate-900">{selectedConv.downstreamAmp}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-600">Secondary Audience Ingestion (Potential)</span>
                    <span className="font-bold text-slate-900">{selectedConv.secondaryReach}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Associated Topic Clusters */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ASSOCIATED TOPIC CLUSTERS
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  #AI (Corporate Tag)
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-medium">
                  #AutonomousLogistics
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-medium">
                  #PrimeDelivery
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-medium">
                  #RoboticsFleet
                </span>
              </div>
            </div>

            {/* Operational Actions */}
            <div className="pt-2 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => alert(`Added "${selectedConv.authorHandle}" event to Executive Dossier!`)}
                  className="px-2 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white transition-colors"
                >
                  Add to Exec Report
                </button>
                <button
                  onClick={handleGenerateReply}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Generate AI Reply
                </button>
                <button
                  onClick={() => alert(`Now monitoring ${selectedConv.authorHandle} with 60-second polling cadence.`)}
                  className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Monitor
                </button>
              </div>

              {/* Generated AI Reply Box */}
              {aiReply && (
                <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span>Generated Response Draft</span>
                    <button onClick={() => setAiReply(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">{aiReply}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiReply);
                      alert('Copied response draft to clipboard!');
                    }}
                    className="text-[11px] font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Copy Draft to Clipboard</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Automated Sentiment Alert Box */}
            {selectedConv.alertMsg && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{selectedConv.alertType || 'Tier-1 Signal'}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {selectedConv.alertMsg}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
