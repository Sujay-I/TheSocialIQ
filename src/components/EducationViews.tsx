import React, { useState } from 'react';
import { useIntelligence } from '../context/IntelligenceContext';
import {
  GraduationCap,
  Smile,
  TrendingUp,
  Award,
  BookOpen,
  MessageSquare,
  BarChart3,
  FileText,
  BellRing,
  Database,
  Download,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const EducationOverviewView: React.FC = () => {
  const { educationData, isLoading, refreshData, navigate, selectedInstitution, setSelectedInstitution } = useIntelligence();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const metrics = educationData?.metrics || {
    student_sentiment_nps: 71,
    sentiment_growth_pct: 8.4,
    campus_engagement_count: '48.2K Students Active',
    engagement_growth_pct: 21.6,
    trending_topics_count: 24,
    topics_growth_pct: 14.8,
    community_discussions_daily: '1,420',
    activity_growth_pct: 18.2,
    positive_pct: 78.4,
    neutral_pct: 14.2,
    negative_pct: 7.4
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(educationData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `socialiq-${selectedInstitution}-campus-intelligence.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('Campus Intelligence Dossier exported.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-900 text-indigo-100 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-indigo-500/40 text-xs">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>INSTITUTION INTELLIGENCE</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">{educationData?.institution?.name || 'Stanford University'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Student & Institution Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Understand student sentiment, campus conversations and community trends without individual surveillance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick campus selector pills */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {[
              { id: 'stanford', label: 'Stanford' },
              { id: 'mit', label: 'MIT' },
              { id: 'berkeley', label: 'UC Berkeley' }
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedInstitution(c.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedInstitution === c.id
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

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
            <span>Export Campus Report</span>
          </button>
        </div>
      </div>

      {/* Aggregation & Non-Surveillance Notice */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>Community Sentiment Pulse</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded-full">
                Zero Individual Surveillance
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Insights are aggregated to reflect campus-wide community trends without individual student surveillance.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/education/trends')}
          className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 hover:underline shrink-0"
        >
          View Campus Trends →
        </button>
      </div>

      {/* 4 Primary Education KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Student Sentiment */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Student Sentiment</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Smile className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">+{metrics.student_sentiment_nps} NPS</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.sentiment_growth_pct}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">78.4% Favorable student discourse</p>
        </div>

        {/* 2. Campus Engagement */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Campus Engagement</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.campus_engagement_count}</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.engagement_growth_pct}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active student council & club participants</p>
        </div>

        {/* 3. Trending Topics */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Trending Topics</span>
            <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.trending_topics_count} Tracked</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.topics_growth_pct}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Career fairs, hackathons & dining</p>
        </div>

        {/* 4. Community Activity */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Community Activity</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{metrics.community_discussions_daily}</span>
            <span className="text-xs font-bold text-emerald-600">+{metrics.activity_growth_pct}% / day</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Discord, Reddit & academic forums</p>
        </div>
      </div>

      {/* AI Campus Executive Synthesis */}
      {educationData?.ai_campus_synthesis && (
        <div className="p-5 rounded-2xl bg-[#09122a] border border-indigo-500/40 text-white shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Autonomous Campus Synthesis</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold text-[10px]">
              {educationData.ai_campus_synthesis.confidence_pct}% Confidence
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
            {educationData.ai_campus_synthesis.headline}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {educationData.ai_campus_synthesis.summary}
          </p>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-indigo-300 font-medium">
              Actionable Vector: {educationData.ai_campus_synthesis.recommended_action}
            </span>
          </div>
        </div>
      )}

      {/* Main Grid: Campus Trends & Community Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Campus Trends Table & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sentiment Timeline */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Student Sentiment Trajectory</h3>
                <p className="text-xs text-slate-500 mt-0.5">Semester progression from orientation to midterms</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
                +71 NPS Peak
              </span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={educationData?.sentiment_timeline || []}>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#09122a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="positive" name="Positive %" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                  <Area type="monotone" dataKey="neutral" name="Neutral %" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campus Trends Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Campus Conversation Vectors</h3>
                <p className="text-xs text-slate-500 mt-0.5">Key topics driving student engagement and discussion</p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/education/trends')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                View Detailed Trends →
              </button>
            </div>

            <div className="space-y-3">
              {(educationData?.campus_trends || []).map((t) => (
                <div key={t.id} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{t.topic}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                        {t.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-3">
                      <span>{t.mentions} discussions</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">{t.sentiment_score}% Positive</span>
                      <span>•</span>
                      <span className="text-indigo-600 font-semibold">{t.wow_growth}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 self-start sm:self-center">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Community Insights & Influence Vectors */}
        <div className="space-y-6">
          {/* Community Insights Pillars */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Community Health Pillars</h3>
            <p className="text-xs text-slate-500 mb-4">Core institutional experience metrics</p>

            <div className="space-y-4">
              {(educationData?.community_insights || []).map((c) => (
                <div key={c.pillar} className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span>{c.pillar}</span>
                    <span className="text-indigo-600 font-bold">{c.score}/100</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{c.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Influence Vectors */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Influence Mapping</h3>
            <p className="text-xs text-slate-500 mb-4">Community leadership & representation</p>

            <div className="space-y-3">
              {(educationData?.influence_mapping || []).map((inf) => (
                <div key={inf.vector_name} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{inf.vector_name}</span>
                    <span className="text-[10px] text-indigo-600 font-semibold">{inf.reach}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Focus: {inf.focus_area}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
