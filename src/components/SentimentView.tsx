import React, { useState } from 'react';
import { Corporation } from '../types';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Smile,
  TrendingUp,
  AlertTriangle,
  Download,
  Info,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Heart,
  HelpCircle
} from 'lucide-react';

interface SentimentViewProps {
  corporation: Corporation;
}

export const SentimentView: React.FC<SentimentViewProps> = ({ corporation }) => {
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '90D'>('30D');

  const emotionalAffectData = [
    { name: 'Gratitude', score: 84, color: '#2563eb' },
    { name: 'Excitement', score: 76, color: '#3b82f6' },
    { name: 'Delight', score: 68, color: '#60a5fa' },
    { name: 'Neutral Inquiry', score: 42, color: '#94a3b8' },
    { name: 'Skepticism', score: 28, color: '#f59e0b' },
    { name: 'Frustration', score: 14, color: '#f43f5e' }
  ];

  const timelineData = [
    { time: 'W1', positive: 65, neutral: 22, negative: 13 },
    { time: 'W2', positive: 70, neutral: 20, negative: 10 },
    { time: 'W3', positive: 68, neutral: 24, negative: 8 },
    { time: 'W4', positive: 78, neutral: 15, negative: 7 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>SENTIMENT POLARITY TELEMETRY</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Multi-Model Ensemble</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Sentiment & Emotional Nuance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Granular natural language polarity, affect classification, and friction hotspot detection.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Exporting Sentiment Polarity Audit...')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Sentiment Audit</span>
          </button>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">NET SENTIMENT</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">+6.2% WoW</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">+64 NPS</div>
          <div className="text-xs text-slate-500 mt-1">72.4% Pos / 18.6% Neu / 9.0% Neg</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">CONFIDENCE INDEX</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">High Fidelity</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">96.4%</div>
          <div className="text-xs text-slate-500 mt-1">RoBERTa TweetEval Model</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">SARCASM RESISTANCE</span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">Calibrated</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">0.03 Index</div>
          <div className="text-xs text-slate-500 mt-1">Minimal irony detected in corporate stream</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">ESCALATED FRICTION</span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">1 Hotspot</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">9.0%</div>
          <div className="text-xs text-slate-500 mt-1">Primarily locker PIN generation tickets</div>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Emotional Affect Spectrum */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Emotional Affect Distribution</h3>
              <p className="text-xs text-slate-500">Decomposed emotional drivers across public discourse</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              Ensemble Model
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emotionalAffectData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#1e293b' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="score" fill="#2563eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-slate-700 space-y-1">
            <div className="font-bold text-blue-900">Model Takeaway:</div>
            <p>
              Gratitude (84) and Excitement (76) dominate consumer discourse, largely generated by same-morning delivery completions and customer care resolutions.
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Friction Hotspots */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Friction Hotspots & Escalations</h3>
            <span className="text-xs font-semibold text-rose-600">Active Monitoring</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/40 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Hawthorne Return Locker Glitch</span>
                <span className="text-rose-600">-42% Neg</span>
              </div>
              <p className="text-xs text-slate-600">
                14 mentions of temporary SMS verification delay at Oregon locker kiosks. Ops dispatch notified.
              </p>
              <div className="text-[10px] text-slate-400">First recorded: 3h ago • Resolution in progress</div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Bedrock API Rate Limit Discussions</span>
                <span className="text-amber-600">-28% Skeptical</span>
              </div>
              <p className="text-xs text-slate-600">
                Developer inquiries on concurrency tiering. Addressed in documentation release #42.
              </p>
              <div className="text-[10px] text-slate-400">First recorded: Yesterday • De-escalating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
