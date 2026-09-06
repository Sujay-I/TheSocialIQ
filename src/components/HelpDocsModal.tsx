import React, { useState } from 'react';
import {
  X,
  BookOpen,
  HelpCircle,
  Cpu,
  Keyboard,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Database,
  Radio,
  FileText
} from 'lucide-react';

interface HelpDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type HelpTab = 'guide' | 'formulas' | 'connectors' | 'shortcuts' | 'support';

export const HelpDocsModal: React.FC<HelpDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<HelpTab>('guide');

  // Support ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketPriority, setTicketPriority] = useState('Medium');
  const [ticketCategory, setTicketCategory] = useState('Telemetry Ingestion');
  const [ticketDetails, setTicketDetails] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketDetails('');
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#061735] text-white flex items-center justify-between border-b border-[#0B234A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                SocialIQ Intelligence Documentation & Help Center
              </h2>
              <p className="text-xs text-slate-300">
                System architecture guides, mathematical formulas, channel ingestion specs, and technical support.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden bg-slate-50/50">
          {/* Tabs Sidebar */}
          <div className="w-full sm:w-56 bg-slate-100/80 border-r border-slate-200 p-3 flex sm:flex-col gap-1 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'guide'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Quick Start & Views</span>
            </button>

            <button
              onClick={() => setActiveTab('formulas')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'formulas'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Mathematical Formulas</span>
            </button>

            <button
              onClick={() => setActiveTab('connectors')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'connectors'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Channel Ingestion</span>
            </button>

            <button
              onClick={() => setActiveTab('shortcuts')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'shortcuts'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Keyboard className="w-4 h-4" />
              <span>Keyboard Shortcuts</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'support'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Submit Analyst Ticket</span>
            </button>
          </div>

          {/* Tab Panel */}
          <div className="flex-1 p-6 overflow-y-auto bg-white text-slate-800 text-xs leading-relaxed">
            {/* 1. QUICK START */}
            {activeTab === 'guide' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Navigating SocialIQ Intelligence Screens</h3>
                  <p className="text-slate-500 mt-1">
                    SocialIQ is an end-to-end corporate intelligence platform structured into 13 coordinated screens.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>Overview & Executive KPIs</span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Aggregated high-level pulse of brand health, Net Sentiment, high-growth drivers, and influencer leaderboards.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>Network Graph & Topology</span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Visualizes cluster modularity, information bridges, and simulation cascade tests if a central opinion node is silenced.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>Conversation Explorer</span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Full-text search, cross-platform filtering, deep affective nuance dossiers, and live sentiment inspections.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      <span>Reports & Client-Side PDF Generation</span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Compiles executive briefings with automated AI summaries and downloads standalone vector PDFs or CSV telemetry.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. FORMULAS */}
            {activeTab === 'formulas' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Mathematical Formulations & Scoring Metrics</h3>
                  <p className="text-slate-500 mt-1">
                    Every score in the dashboard is mathematically reproducible from the underlying social telemetry stream.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-2">
                  <div className="text-blue-400 font-bold">// 1. Net Sentiment Score (NSS)</div>
                  <div>NSS = ((Positive_Posts - Negative_Posts) / Total_Analyzed_Posts) * 100</div>
                  <div className="text-slate-400 text-[10px]">
                    Range: -100 to +100. Neutral posts act as stabilizing denominator dampeners.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-2">
                  <div className="text-emerald-400 font-bold">// 2. Eigenvector Centrality & Influence Rank</div>
                  <div>x_v = (1 / λ) * Σ (A_vt * x_t)</div>
                  <div className="text-slate-400 text-[10px]">
                    Measures not just raw follower counts, but how connected an influencer is to other influential opinion makers.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-2">
                  <div className="text-amber-400 font-bold">// 3. Virality Velocity Delta (WoW)</div>
                  <div>Velocity = ((Mentions_Current_Hour - Mentions_Rolling_Baseline) / Mentions_Rolling_Baseline) * 100</div>
                  <div className="text-slate-400 text-[10px]">
                    Triggers high-friction warning alarms when velocity exceeds +300% standard deviations.
                  </div>
                </div>
              </div>
            )}

            {/* 3. CONNECTORS */}
            {activeTab === 'connectors' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Connected Channels & Payload Specifications</h3>
                  <p className="text-slate-500 mt-1">
                    SocialIQ maintains compliant, real-time firehose integrations with the following social ecosystems:
                  </p>
                </div>

                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">𝕏 / Twitter Firehose</span>
                      <p className="text-slate-500 text-[11px]">Direct filtered stream API v2 • 120 posts/min</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Operational
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">Reddit Subreddit Stream</span>
                      <p className="text-slate-500 text-[11px]">OAuth2 push websocket for r/technology, r/investing • 45 posts/min</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Operational
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">Instagram Graph API</span>
                      <p className="text-slate-500 text-[11px]">Hashtag search & reel audio captions • 60 posts/min</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Operational
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">Telegram Public Channels</span>
                      <p className="text-slate-500 text-[11px]">MTProto consumer radar channels • 80 posts/min</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Operational
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SHORTCUTS */}
            {activeTab === 'shortcuts' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Workstation Keyboard Shortcuts</h3>
                  <p className="text-slate-500 mt-1">
                    Execute rapid triage and navigation without taking your hands off the keyboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span>Global Search Bar</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-xs">
                      /
                    </kbd>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span>Jump to Overview</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-xs">
                      G + O
                    </kbd>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span>Jump to Explorer</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-xs">
                      G + E
                    </kbd>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span>Close Modals / Overlays</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-xs">
                      ESC
                    </kbd>
                  </div>
                </div>
              </div>
            )}

            {/* 5. SUPPORT TICKET */}
            {activeTab === 'support' && (
              <div className="space-y-4 max-w-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Submit Analyst Support Ticket</h3>
                  <p className="text-slate-500 mt-1">
                    Direct escalation to SocialIQ tier-3 systems engineers and data pipeline architects.
                  </p>
                </div>

                {ticketSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Ticket #SIQ-8492 Logged Successfully</span>
                    </div>
                    <p className="text-xs">
                      Our intelligence on-call engineer has been notified via PagerDuty. SLA response time: &lt;15 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTicket} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ticket Subject</label>
                      <input
                        type="text"
                        required
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="e.g. Anomaly in r/technology sentiment classification"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={ticketCategory}
                          onChange={(e) => setTicketCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="Telemetry Ingestion">Telemetry Ingestion</option>
                          <option value="AI Classification">AI Classification</option>
                          <option value="Export & PDF Reports">Export & PDF Reports</option>
                          <option value="Billing / Tenant Tier">Billing / Tenant Tier</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                        <select
                          value={ticketPriority}
                          onChange={(e) => setTicketPriority(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="Low">Low (General Inquiry)</option>
                          <option value="Medium">Medium (Telemetry Delay)</option>
                          <option value="Critical">Critical (War-Room Escalation)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description</label>
                      <textarea
                        rows={3}
                        required
                        value={ticketDetails}
                        onChange={(e) => setTicketDetails(e.target.value)}
                        placeholder="Provide details of the behavior or request..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Ticket to Support</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">SocialIQ Engineering & Knowledge Base</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
