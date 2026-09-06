import React, { useState } from 'react';
import { AnalyticsSummary, TimeRange } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import {
  Sparkles,
  Download,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Info,
  Layers,
  Gauge,
  Users2,
  Share2,
  Plus,
  Radio,
  FileText,
  BadgeCheck
} from 'lucide-react';

interface OverviewViewProps {
  summary: AnalyticsSummary;
  timeRange: TimeRange;
  onSelectTimeRange: (range: TimeRange) => void;
  onExportReport: () => void;
  onNavigateToTrends: () => void;
  onNavigateToInfluencers?: () => void;
  onNavigateToNetwork?: () => void;
  onNavigateToExplorer?: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  summary,
  timeRange,
  onSelectTimeRange,
  onExportReport,
  onNavigateToTrends,
  onNavigateToInfluencers,
  onNavigateToNetwork,
  onNavigateToExplorer
}) => {
  const { metrics, ai_synthesis, sentiment_timeline, high_growth_drivers, channel_telemetry, audience_archetype, key_opinion_vectors } = summary;
  const [chartRange, setChartRange] = useState<'7' | '30' | '90'>('30');
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [trackedTopics, setTrackedTopics] = useState(['#ProductX', '#AI', '#CustomerSupport', '#Innovation']);

  // Custom formatted timeline for AreaChart
  const chartData = [
    { day: 'Day 1', positive: 58, neutral: 28, negative: 14 },
    { day: 'Day 6', positive: 64, neutral: 25, negative: 11 },
    { day: 'Day 12', positive: 62, neutral: 26, negative: 12 },
    { day: 'Day 18', positive: 70, neutral: 21, negative: 9 },
    { day: 'Day 24', positive: 72, neutral: 20, negative: 8 },
    { day: 'Day 26 (Peak)', positive: 88, neutral: 14, negative: 6 },
    { day: 'Day 30', positive: 72.4, neutral: 18.6, negative: 9.0 }
  ];

  const handleAddTopic = () => {
    if (newTopicInput.trim()) {
      const topic = newTopicInput.startsWith('#') ? newTopicInput.trim() : `#${newTopicInput.trim()}`;
      setTrackedTopics([...trackedTopics, topic]);
      setNewTopicInput('');
      setIsTrackModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Eyebrow, Title & Actions Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] mb-1">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              ENTERPRISE INTELLIGENCE MATRIX
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              TELEMETRY ACTIVE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Audience & Corporate Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Understand how your customers think, feel, and behave in real-time across global social streams.
          </p>
        </div>

        {/* Right Controls in Two Stacks Matching Image */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>{summary.corporation.name} Inc. (Corporate Intelligence)</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </div>

            <button
              onClick={() => onSelectTimeRange(timeRange === '7D' ? '30D' : timeRange === '30D' ? '90D' : '7D')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Last {timeRange === '7D' ? '7 Days' : timeRange === '90D' ? '90 Days' : '30 Days'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Topic</span>
            </button>

            <button
              onClick={onExportReport}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Top Metric Cards (Matches Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: TOTAL MENTIONS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              TOTAL MENTIONS
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#4338ca] bg-[#eef2ff] px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +18.4%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">128.4K</div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
              <div>
                <span>vs. 108.5K prev</span>
                <div className="text-[11px] text-blue-700 font-semibold">WoW Index Peak</div>
              </div>
              {/* Mini sparkline */}
              <div className="w-20 h-6">
                <svg viewBox="0 0 80 24" className="w-full h-full stroke-blue-600 fill-none" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M 2 18 Q 18 16, 26 18 T 48 10 T 64 12 T 78 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: NET SENTIMENT SCORE */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              NET SENTIMENT SCORE
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#4338ca] bg-[#eef2ff] px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +6.2%
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">+64</span>
              <span className="text-xs font-semibold text-slate-400">/ 100 NPS</span>
            </div>
            {/* Multi-segment sentiment bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                <span className="text-slate-800 font-bold">72.4% <span className="font-normal text-slate-400">Pos</span></span>
                <span className="text-slate-800 font-bold">18.6% <span className="font-normal text-slate-400">Neu</span></span>
                <span className="text-slate-800 font-bold">9.0% <span className="font-normal text-slate-400">Neg</span></span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100">
                <div className="bg-[#0a1128] h-full" style={{ width: '72.4%' }}></div>
                <div className="bg-blue-600 h-full" style={{ width: '18.6%' }}></div>
                <div className="bg-rose-500 h-full" style={{ width: '9.0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: GROSS ENGAGEMENT */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              GROSS ENGAGEMENT
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#4338ca] bg-[#eef2ff] px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +12.8%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">18.6M</div>
            <div className="flex items-center justify-between mt-2.5 bg-blue-50/70 border border-blue-100/80 rounded-xl p-2.5">
              <div className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs text-slate-500 font-medium">Velocity Rate:</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900 leading-tight">420</div>
                <div className="text-[10px] text-slate-500">interactions / hr</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: AUDIENCE REACH */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              AUDIENCE REACH
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#4338ca] bg-[#eef2ff] px-2.5 py-0.5 rounded-full">
              <Users2 className="w-3 h-3" />
              +21.4%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">2.4M</div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 pt-1">
              <span>Cross-platform footprint</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Omnichannel
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (8 cols) & Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Charts & Autonomous Synthesis & Platform Penetration */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sentiment Dynamics Over Time Card */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-bold text-slate-900">Sentiment Dynamics Over Time</h2>
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cross-network aggregate volume mapped across time buckets
                </p>
              </div>

              {/* Day bucket toggles */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
                {(['7', '30', '90'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setChartRange(d)}
                    className={`px-3 py-1 rounded-md transition-all ${
                      chartRange === d
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 bg-slate-900 rounded-sm"></span>
                <span className="font-semibold text-slate-800">Positive Response (72.4%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 bg-blue-600 rounded-sm"></span>
                <span className="font-semibold text-slate-800">Neutral Inquiries (18.6%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 bg-rose-500 rounded-sm"></span>
                <span className="font-semibold text-slate-800">Escalated Negative (9.0%)</span>
              </div>
            </div>

            {/* Area Chart with Day 26 Callout */}
            <div className="relative h-64 w-full">
              {/* Day 26 Prime Event callout badge positioned over peak */}
              <div className="absolute top-4 right-[22%] z-10 bg-[#0a1128] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md pointer-events-none">
                Day 26: Prime Event
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="neuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <ReferenceLine x="Day 26 (Peak)" stroke="#94a3b8" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="positive" stroke="#0f172a" strokeWidth={2.5} fill="url(#posGrad)" />
                  <Area type="monotone" dataKey="neutral" stroke="#2563eb" strokeWidth={2} fill="url(#neuGrad)" />
                  <Area type="monotone" dataKey="negative" stroke="#f43f5e" strokeWidth={1.8} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Autonomous Synthesis Card (Matches Image 1) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0a1128] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-800">
                    AUTONOMOUS SYNTHESIS
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Confidence: 94.8%
                  </span>
                </div>
                <span className="text-xs text-slate-400">Generated 8 mins ago</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                Positive sentiment is accelerating (<strong className="font-semibold text-slate-900">+18% over 7d</strong>), driven primarily by organic praise around expedited Prime delivery speeds and customer care resolution in Q3. Regional friction in return locker drop-offs identified in Southwest hub.
              </p>
              <button
                onClick={onNavigateToTrends}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>View sentiment driver breakdown</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Platform Penetration & Performance (Live Stream Sampling) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Platform Penetration & Performance</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                LIVE STREAM SAMPLING
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* X / Twitter */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-900">𝕏</span>
                    <span>X / Twitter</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                </div>
                <div className="text-xl font-bold text-slate-900">48.0K</div>
                <div className="text-[11px] text-slate-400">Direct mentions</div>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Positivity</span>
                    <span className="font-semibold text-slate-800">74%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: '74%' }}></div>
                  </div>
                </div>
              </div>

              {/* Telegram */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-500">➤</span>
                    <span>Telegram</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                </div>
                <div className="text-xl font-bold text-slate-900">28.0K</div>
                <div className="text-[11px] text-slate-400">Community msgs</div>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Positivity</span>
                    <span className="font-semibold text-slate-800">62%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-pink-50 flex items-center justify-center text-[10px] font-bold text-pink-500">📷</span>
                    <span>Instagram</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                </div>
                <div className="text-xl font-bold text-slate-900">32.0K</div>
                <div className="text-[11px] text-slate-400">Visual reels & posts</div>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Positivity</span>
                    <span className="font-semibold text-slate-800">81%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-700">f</span>
                    <span>Facebook</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                </div>
                <div className="text-xl font-bold text-slate-900">20.4K</div>
                <div className="text-[11px] text-slate-400">Public feed items</div>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Positivity</span>
                    <span className="font-semibold text-slate-800">68%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Trending Topics, Demographic Segment, Key Opinion Vectors */}
        <div className="lg:col-span-4 space-y-6">
          {/* Trending Topics (Real-time Rank) Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Trending Topics</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">Real-time Rank</span>
            </div>

            <div className="space-y-3">
              {[
                { rank: '01', tag: '#ProductX', mentions: '24.8K', wow: '+84%', vel: '9.8/10', highVelocity: true },
                { rank: '02', tag: '#AI', mentions: '18.2K', wow: '+61%', vel: '8.4/10', highVelocity: true },
                { rank: '03', tag: '#CustomerSupport', mentions: '12.6K', wow: '+42%', vel: '7.2/10', highVelocity: false },
                { rank: '04', tag: '#Innovation', mentions: '9.4K', wow: '+31%', vel: '6.5/10', highVelocity: false }
              ].map((item) => (
                <div
                  key={item.tag}
                  onClick={onNavigateToTrends}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-5">{item.rank}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.tag}</div>
                      <div className="text-[11px] text-slate-400">{item.mentions} mentions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        item.highVelocity
                          ? 'bg-[#0a1128] text-white shadow-xs'
                          : 'text-[#4338ca] bg-[#eef2ff]'
                      }`}
                    >
                      {item.wow} WoW
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">Vel: {item.vel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demographic Segment (Anonymized) Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Demographic Segment</h3>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Anonymized
              </span>
            </div>

            {/* Age Group Allocation */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                AGE GROUP ALLOCATION
              </div>
              {[
                { range: '18–24', pct: 42 },
                { range: '25–34', pct: 31 },
                { range: '35–44', pct: 17 },
                { range: '45+', pct: 10 }
              ].map((age) => (
                <div key={age.range} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">{age.range}</span>
                    <span className="text-slate-900 font-bold">{age.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="bg-[#0a1128] h-full rounded-full" style={{ width: `${age.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Metro Hub */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100/80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOP METRO HUB</div>
                  <div className="text-xs font-bold text-slate-900">Hyderabad, India</div>
                </div>
              </div>
              <div className="w-12 h-5 text-blue-600">
                <svg viewBox="0 0 50 20" className="w-full h-full stroke-blue-600 fill-none" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M 2 15 Q 15 5, 25 12 T 48 3" />
                </svg>
              </div>
            </div>

            {/* Primary Affinity */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100/80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PRIMARY AFFINITY</div>
                  <div className="text-xs font-bold text-slate-900">Cloud Infrastructure & Modern Logistics</div>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
            </div>
          </div>

          {/* Key Opinion Vectors (Top Impact) Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                <BadgeCheck className="w-4 h-4 text-blue-600" />
                <span>Key Opinion Vectors</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">Top Impact</span>
            </div>

            <div className="space-y-3">
              {/* Elena Rostova */}
              <div
                onClick={onNavigateToInfluencers}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&auto=format&fit=crop&q=80"
                      alt="Elena Rostova"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate">Elena Rostova</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">@techinsider • 840K fol</div>
                  </div>
                </div>
                <div className="bg-[#e0eaff] rounded-xl px-2.5 py-1.5 text-center min-w-[76px] shrink-0">
                  <div className="text-xs font-bold text-slate-900">
                    94.2 Score
                  </div>
                  <div className="text-[10px] text-blue-700 font-semibold mt-0.5">92% Positive</div>
                </div>
              </div>

              {/* David Vance */}
              <div
                onClick={onNavigateToInfluencers}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&auto=format&fit=crop&q=80"
                      alt="David Vance"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate">David Vance</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">@productdaily • 412K fol</div>
                  </div>
                </div>
                <div className="bg-[#e0eaff] rounded-xl px-2.5 py-1.5 text-center min-w-[76px] shrink-0">
                  <div className="text-xs font-bold text-slate-900">
                    89.7 Score
                  </div>
                  <div className="text-[10px] text-blue-700 font-semibold mt-0.5">86% Positive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Topic Modal */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Track New Keyword or Hashtag</h3>
            <p className="text-xs text-slate-500">
              SocialIQ will immediately index real-time public conversations and assign RoBERTa sentiment scores.
            </p>
            <input
              type="text"
              placeholder="e.g. #AutonomousDelivery or Bedrock API"
              value={newTopicInput}
              onChange={(e) => setNewTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsTrackModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTopic}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
              >
                Start Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
