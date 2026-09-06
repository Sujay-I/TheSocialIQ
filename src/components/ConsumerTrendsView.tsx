import React, { useState } from 'react';
import { AnalyticsSummary, BreakthroughDriver } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Radio,
  Layers,
  ChevronDown,
  Download,
  CheckCircle2
} from 'lucide-react';

interface ConsumerTrendsViewProps {
  summary: AnalyticsSummary;
  onTrackDriver?: (driver: BreakthroughDriver) => void;
}

export const ConsumerTrendsView: React.FC<ConsumerTrendsViewProps> = ({ summary, onTrackDriver }) => {
  const [activeFilter, setActiveFilter] = useState<'rising' | 'falling' | 'emerging'>('rising');
  const { breakthrough_drivers, timeline_milestones, ai_synthesis } = summary;

  const platformIndexData = [
    { time: 'T-48h', ai_shopping: 40, same_day: 30, eco_pack: 22 },
    { time: 'T-24h', ai_shopping: 68, same_day: 52, eco_pack: 38 },
    { time: 'Realtime Peak', ai_shopping: 94.8, same_day: 82, eco_pack: 54 }
  ];

  const driversList = [
    {
      id: 'd1',
      topic: '#AutonomousDispatch',
      status: 'rising',
      velocity_rating: 9.8,
      wow_growth_pct: 84,
      driver_summary: 'Consumer buzz surrounding same-morning deliveries in metropolitan zones.',
      confidence: 96,
      actionable_brief: 'Maintain high server capacity on routing telemetry to prevent queue delays.',
      sources: ['X', 'Reddit', 'Instagram']
    },
    {
      id: 'd2',
      topic: '#BedrockAPIPricing',
      status: 'falling',
      velocity_rating: 7.2,
      wow_growth_pct: -32,
      driver_summary: 'Discussions around token overcharges declining following official documentation update.',
      confidence: 92,
      actionable_brief: 'Publish case studies on enterprise cost optimization strategies.',
      sources: ['Reddit', 'Developer Forums']
    },
    {
      id: 'd3',
      topic: '#ContactlessLockerReturns',
      status: 'emerging',
      velocity_rating: 8.6,
      wow_growth_pct: 65,
      driver_summary: 'Unprompted user praise around QR-code drop-offs at grocery partner kiosks.',
      confidence: 94,
      actionable_brief: 'Expand physical signage at retail partner locations.',
      sources: ['Instagram', 'TikTok', 'X']
    },
    {
      id: 'd4',
      topic: '#EcoPackaging2025',
      status: 'rising',
      velocity_rating: 6.9,
      wow_growth_pct: 42,
      driver_summary: 'Consumers noting reduced cardboard volume in residential parcels.',
      confidence: 88,
      actionable_brief: 'Highlight sustainable logistics metrics in annual consumer impact briefing.',
      sources: ['X', 'Telegram']
    }
  ];

  const filteredDrivers = driversList.filter((d) => {
    if (activeFilter === 'rising') return d.status === 'rising';
    if (activeFilter === 'falling') return d.status === 'falling';
    return d.status === 'emerging';
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Eyebrow & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>PREDICTIVE VIRALITY RADAR</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Early Warning Signal Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Consumer Trends & Virality
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Identify rising topics, viral shifts, and emerging conversations before competitors.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Exporting consumer virality forecast brief...')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Forecast Brief</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveFilter('rising')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all ${
            activeFilter === 'rising' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span>Rising Topics</span>
        </button>
        <button
          onClick={() => setActiveFilter('falling')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all ${
            activeFilter === 'falling' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
          <span>Falling Topics</span>
        </button>
        <button
          onClick={() => setActiveFilter('emerging')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all ${
            activeFilter === 'emerging' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Emerging Signals</span>
        </button>
      </div>

      {/* 2-Column Split: Forecast Curve & Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Aggregated Platform Index Chart & Milestones */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">72-Hour Aggregated Virality Index</h3>
                <p className="text-xs text-slate-500">Cross-channel velocity curve mapped from T-48h to peak</p>
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                Live Signal Scan
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={platformIndexData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="ai_shopping" name="Autonomous Dispatch" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="same_day" name="Locker Returns" stroke="#0f172a" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="eco_pack" name="Eco Packaging" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-3 h-1 bg-blue-600 rounded"></span>
                <span>Autonomous Dispatch (Peak 94.8)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-3 h-1 bg-slate-900 rounded"></span>
                <span>Locker Returns (82.0)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-3 h-1 bg-emerald-500 rounded"></span>
                <span>Eco Packaging (54.0)</span>
              </div>
            </div>
          </div>

          {/* Emerging Timeline Milestones */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Timeline of Emerging Drivers</h3>
              <span className="text-[10px] text-slate-400">Sequential Telemetry</span>
            </div>

            <div className="space-y-3">
              {[
                { time: '08:00 AM', title: 'First Surge in Prime Drone Sightings', count: '1.2K mentions', vel: '5.2x baseline' },
                { time: '10:30 AM', title: 'Tech Media Amplification (@techinsider)', count: '14.8K mentions', vel: '8.4x baseline' },
                { time: '11:15 AM', title: 'Cross-platform Re-propagation onto Reddit', count: '28.4K mentions', vel: '12.1x baseline' }
              ].map((m, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded shrink-0">
                    {m.time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900">{m.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{m.count} • {m.vel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Filtered Breakthrough Drivers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Breakthrough Signal Vectors</h3>
            <span className="text-xs text-slate-500">{filteredDrivers.length} Items</span>
          </div>

          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{driver.topic}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  driver.wow_growth_pct > 0 ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                  {driver.wow_growth_pct > 0 ? `+${driver.wow_growth_pct}%` : `${driver.wow_growth_pct}%`} WoW
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {driver.driver_summary}
              </p>

              {/* Actionable brief */}
              <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] text-slate-700">
                <strong className="font-semibold text-blue-900">Strategic Rec: </strong>
                {driver.actionable_brief}
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span>Velocity: <strong className="text-slate-800 font-bold">{driver.velocity_rating}/10</strong></span>
                  <span>•</span>
                  <span>Confidence: <strong className="text-slate-800 font-bold">{driver.confidence}%</strong></span>
                </div>
                <div className="flex gap-1">
                  {driver.sources.map((s) => (
                    <span key={s} className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
