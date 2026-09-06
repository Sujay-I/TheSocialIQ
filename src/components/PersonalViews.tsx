import React, { useState } from 'react';
import { useIntelligence } from '../context/IntelligenceContext';
import {
  ShieldCheck,
  Sparkles,
  Heart,
  TrendingUp,
  Download,
  CheckCircle2,
  Lock,
  Activity,
  Compass,
  BarChart3,
  FileText,
  Clock,
  Calendar,
  Layers,
  Smile,
  Info,
  Sliders,
  RefreshCw,
  Search
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const PersonalOverviewView: React.FC = () => {
  const { personalData, isLoading, refreshData, navigate } = useIntelligence();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const metrics = personalData?.metrics || {
    topics_explored: 34,
    topics_growth_pct: 12.4,
    interest_trends_index: 86.4,
    interest_growth_pct: 18.2,
    activity_patterns_hours: 4.2,
    activity_growth_pct: -6.4,
    sentiment_positive_pct: 82.6,
    sentiment_growth_pct: 5.8,
    positive_pct: 82.6,
    neutral_pct: 12.2,
    negative_pct: 5.2
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(personalData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'socialiq-family-intelligence-summary.json';
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('Family Intelligence Summary exported.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-emerald-100 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-500/40 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header with Title & Privacy Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>FAMILY INTELLIGENCE</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Household Wellness & Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Family Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Understand activity patterns, interests and sentiment while keeping insights privacy-first.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refreshData()}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-xs"
            title="Refresh Stream"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Family Brief</span>
          </button>
        </div>
      </div>

      {/* Privacy Notice Banner (First-Class Feature) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>Privacy-First Insights</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                K-Anonymity Verified (50+)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Insights are aggregated to protect individual privacy. No personally identifiable information (PII) is tracked or stored.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/personal/privacy')}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
        >
          View Privacy Standards →
        </button>
      </div>

      {/* 4 Primary Personal KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Topics Explored */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Topics Explored</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Compass className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.topics_explored}</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.topics_growth_pct}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active wholesome subjects curated</p>
        </div>

        {/* 2. Interest Trends */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Interest Trends</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.interest_trends_index}</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.interest_growth_pct}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">STEM & Creative arts momentum</p>
        </div>

        {/* 3. Activity Patterns */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Activity Patterns</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.activity_patterns_hours} hrs</span>
            <span className="text-xs font-bold text-emerald-600">{metrics.activity_growth_pct}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Healthy recreational balance index</p>
        </div>

        {/* 4. Sentiment Trends */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Sentiment Trends</span>
            <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <Heart className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.sentiment_positive_pct}%</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.sentiment_growth_pct}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Uplifting, constructive discourse</p>
        </div>
      </div>

      {/* Main Grid: Activity Patterns & Sentiment Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Activity Timeline & Interest Pillars */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Hourly Distribution */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Activity Patterns (Time-of-Day)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aggregated recreational & learning engagements across weekday vs weekend cycles
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                Balanced Routine
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personalData?.activity_patterns || []}>
                  <XAxis dataKey="time_slot" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#09122a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="weekday_index" name="Weekday Routine" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="weekend_index" name="Weekend Recreation" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topics Explored Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Household Topic Vectors</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Top emerging hobbies, STEM learning modules, and family pursuits
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/personal/topics')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Explore All Topics →
              </button>
            </div>

            <div className="space-y-3">
              {(personalData?.topics || []).map((t) => (
                <div key={t.id} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{t.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                        {t.safety_rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{t.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {t.tags.map((tag) => (
                        <span key={tag} className="text-[9px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <span className="text-xs font-bold text-emerald-600">{t.growth}</span>
                    <span className="text-[11px] text-slate-400">{t.mentions} interactions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Platform Breakdown & Sentiment Spectrum */}
        <div className="space-y-6">
          {/* Platform Distribution */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Platform Activity</h3>
            <p className="text-xs text-slate-500 mb-4">Curated family learning and entertainment platforms</p>

            <div className="space-y-3">
              {(personalData?.platform_distribution || []).map((p, idx) => (
                <div key={p.platform} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{p.platform}</span>
                    <span className="text-slate-500 font-medium">{p.share_pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${p.share_pct}%`,
                        backgroundColor: COLORS[idx % COLORS.length]
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{p.avg_minutes} min avg daily session</span>
                    <span className="font-medium text-emerald-600">{p.family_rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Health Index */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Sentiment Trends</h3>
            <p className="text-xs text-slate-500 mb-4">4-week rolling sentiment index</p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={personalData?.sentiment_timeline || []}>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#09122a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="positive" name="Positive %" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                  <Area type="monotone" dataKey="neutral" name="Neutral %" stroke="#64748b" fill="#64748b" fillOpacity={0.1} strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600">82.6% Wholesome</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span className="text-slate-600">12.2% Neutral</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span className="text-slate-600">5.2% Friction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PersonalPrivacyView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600">
        <ShieldCheck className="w-4 h-4" />
        <span>PRIVACY & SECURITY CHARTER</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Family Privacy Standards</h1>
      <p className="text-sm text-slate-500">
        SocialIQ Family Intelligence adheres to stringent data anonymization, k-anonymity protocols, and COPPA compliance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Zero PII Stored</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No real names, physical locations, IP addresses, or device IDs are ever ingested or persisted in the SocialIQ intelligence layer.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">K-Anonymity (k=50)</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Signals are aggregated across a minimum cluster of 50 similar demographic nodes before registering in telemetry trends.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">14-Day Ephemeral Retention</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Raw signal digests are purged automatically after a rolling 14-day window. Only high-level trend vectors are retained.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">COPPA & Family-Safe Verified</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Strict automated guardrails filter out mature content, commercial microtargeting, and invasive ad trackers.
          </p>
        </div>
      </div>
    </div>
  );
};
