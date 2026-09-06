import React, { useState } from 'react';
import { Corporation } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import {
  Share2,
  TrendingUp,
  Download,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Sparkles,
  Radio,
  FileSpreadsheet,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface PlatformAnalyticsViewProps {
  corporation: Corporation;
}

export const PlatformAnalyticsView: React.FC<PlatformAnalyticsViewProps> = ({ corporation }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'engagement' | 'breakdown'>('comparison');
  const [sortBy, setSortBy] = useState<'share' | 'sentiment' | 'er'>('share');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const platformComparisonData = [
    { platform: 'X / Twitter', share: 38, er: 5.2, erLabel: '5.2%', sentiment: 78, volume: '1.42M posts', primaryTopic: 'Prime autonomous logistics' },
    { platform: 'Reddit', share: 22, er: 8.4, erLabel: '8.4%', sentiment: 72, volume: '820K comments', primaryTopic: 'AWS Bedrock model latency' },
    { platform: 'Instagram', share: 18, er: 6.8, erLabel: '6.8%', sentiment: 84, volume: '670K reels/posts', primaryTopic: 'Prime Day lifestyle unboxings' },
    { platform: 'Telegram', share: 12, er: 9.1, erLabel: '9.1%', sentiment: 69, volume: '450K forwards', primaryTopic: 'Locker refund speed leaks' },
    { platform: 'YouTube', share: 10, er: 7.4, erLabel: '7.4%', sentiment: 81, volume: '370K comments', primaryTopic: 'Long-form hardware benchmarks' }
  ];

  const sortedPlatforms = [...platformComparisonData].sort((a, b) => {
    if (sortBy === 'share') return b.share - a.share;
    if (sortBy === 'sentiment') return b.sentiment - a.sentiment;
    return b.er - a.er;
  });

  const handleExportCSV = () => {
    const headers = ['Platform,ShareOfVoicePct,EngagementRate,SentimentPct,Volume,PrimaryTopic\n'];
    const rows = sortedPlatforms.map(
      (p) => `${p.platform},${p.share}%,${p.erLabel},${p.sentiment}%,${p.volume},"${p.primaryTopic}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${corporation.slug}-cross-platform-metrics.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('Cross-platform comparative CSV downloaded.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>CROSS-CHANNEL BENCHMARK</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Multi-Channel Ingestion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Platform Analytics & Share of Voice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Compare narrative velocity, engagement yields, and sentiment indexes across all major networks for{' '}
            <strong className="text-slate-800">{corporation.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Channel CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">LEAD CHANNEL</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-3">X / Twitter</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">38% Global Share of Voice</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">HIGHEST ENGAGEMENT</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-3">Telegram</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">9.1% High-Yield ER</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">MOST POSITIVE BIAS</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-3">Instagram</div>
          <div className="text-xs text-slate-500 mt-1">84% Positive Polarity</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">DEEPEST TECHNICAL DISCOURSE</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-3">Reddit</div>
          <div className="text-xs text-purple-600 font-semibold mt-1">Long-tail comment threads</div>
        </div>
      </div>

      {/* Main Analysis Container with Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                activeTab === 'comparison' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visual Benchmark (Bar Chart)
            </button>
            <button
              onClick={() => setActiveTab('engagement')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                activeTab === 'engagement' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Detailed Channel Matrix
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Sort Matrix By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium"
            >
              <option value="share">Share of Voice (%)</option>
              <option value="sentiment">Positive Sentiment (%)</option>
              <option value="er">Engagement Rate (%)</option>
            </select>
          </div>
        </div>

        {/* Tab 1: Chart View */}
        {activeTab === 'comparison' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Share of Voice & Positive Polarity by Channel</h3>
                <p className="text-xs text-slate-500">Cross-channel comparative performance over 30-day window</p>
              </div>
              <span className="text-xs font-mono text-slate-400">Aggregated 30D Window</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedPlatforms} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="platform" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="share" name="Share of Voice (%)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sentiment" name="Positive Polarity (%)" fill="#0f172a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="er" name="Engagement Rate (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: Detailed Matrix Table */}
        {activeTab === 'engagement' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Channel / Platform</th>
                  <th className="py-3 px-4 font-semibold">Share of Voice</th>
                  <th className="py-3 px-4 font-semibold">Engagement Rate</th>
                  <th className="py-3 px-4 font-semibold">Net Sentiment</th>
                  <th className="py-3 px-4 font-semibold">Monthly Ingestion Volume</th>
                  <th className="py-3 px-4 font-semibold">Dominant Narrative Cluster</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedPlatforms.map((p) => (
                  <tr key={p.platform} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.platform}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.share * 2.5}%` }} />
                        </div>
                        <span className="font-semibold text-slate-800">{p.share}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">{p.erLabel}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-semibold">
                        +{p.sentiment}% Pos
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{p.volume}</td>
                    <td className="py-3 px-4 text-slate-600">{p.primaryTopic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#061735] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-500/30 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
