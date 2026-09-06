import React, { useState } from 'react';
import { Corporation, AuthUser } from '../types';
import {
  X,
  User,
  Building2,
  Cpu,
  Webhook,
  ShieldCheck,
  Check,
  Bell,
  Sliders,
  Copy,
  CheckCircle2,
  RefreshCw,
  LogOut,
  SlidersHorizontal,
  Key,
  Globe
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onUpdateUser: (updated: Partial<AuthUser>) => void;
  currentCorp: Corporation | null;
  onLogout: () => void;
}

type SettingsTab = 'profile' | 'organization' | 'ai' | 'webhooks' | 'security';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  currentCorp,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Profile state
  const [userName, setUserName] = useState(currentUser?.name || 'Alex Chen');
  const [userEmail, setUserEmail] = useState(currentUser?.email || 'alex.chen@socialiq.ai');
  const [userRole, setUserRole] = useState(currentUser?.role || 'Principal Intelligence Analyst');
  const [refreshInterval, setRefreshInterval] = useState('30s');

  // AI & Scoring state
  const [selectedModel, setSelectedModel] = useState('roberta');
  const [confidenceCutoff, setConfidenceCutoff] = useState(85);
  const [sarcasmFilter, setSarcasmFilter] = useState(true);

  // Webhooks state
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T0123/B0456/intel-war-room');
  const [pagerDutyKey, setPagerDutyKey] = useState('pd_live_948fbc204918e9a2');
  const [webhookTested, setWebhookTested] = useState(false);

  // Security state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [copiedKey, setCopiedKey] = useState(false);
  const [apiKey, setApiKey] = useState('siq_live_49f82d7c9011e4aa9b6271c50e');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: userName,
      email: userEmail,
      role: userRole,
      initials: userName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
    });
    showToast('Analyst Profile & Preferences updated successfully.');
  };

  const handleTestWebhook = () => {
    setWebhookTested(true);
    showToast('Test signal dispatched to Slack #intel-war-room: HTTP 200 OK');
    setTimeout(() => setWebhookTested(false), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
    showToast('API Key copied to clipboard.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#061735] text-white flex items-center justify-between border-b border-[#0B234A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Global Workspace & Telemetry Settings
              </h2>
              <p className="text-xs text-slate-300">
                Configure analyst identity, NLP classification models, webhook relays, and multi-tenant policies.
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

        {/* Modal Content with Sidebar Tabs */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden bg-slate-50/50">
          {/* Settings Tabs Sidebar */}
          <div className="w-full sm:w-56 bg-slate-100/80 border-r border-slate-200 p-3 flex sm:flex-col gap-1 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Account</span>
            </button>

            <button
              onClick={() => setActiveTab('organization')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'organization'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Organization & Tenant</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'ai'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>AI Engine & Scoring</span>
            </button>

            <button
              onClick={() => setActiveTab('webhooks')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'webhooks'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Webhook className="w-4 h-4" />
              <span>Ingestion & Webhooks</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'security'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Security & Access</span>
            </button>

            <div className="mt-auto pt-4 border-t border-slate-200 hidden sm:block">
              <button
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of SocialIQ</span>
              </button>
            </div>
          </div>

          {/* Active Tab Panel */}
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            {/* 1. PROFILE & ACCOUNT TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-5 max-w-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Analyst Profile & Credentials</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your display identity and workstation telemetry preferences.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Designation</label>
                    <input
                      type="text"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email Address</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Live Telemetry Sync Cycle</label>
                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="15s">Every 15 Seconds (High Concurrency)</option>
                    <option value="30s">Every 30 Seconds (Default Balanced)</option>
                    <option value="60s">Every 60 Seconds (Standard Rate)</option>
                    <option value="manual">Manual Refresh Only</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            )}

            {/* 2. ORGANIZATION & TENANT TAB */}
            {activeTab === 'organization' && (
              <div className="space-y-5 max-w-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Active Tenant Configuration</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Managing corporate entity boundaries for{' '}
                    <strong className="text-slate-800">{currentCorp ? currentCorp.name : 'Amazon Inc.'}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Corporate Identifier:</span>
                    <span className="text-xs font-mono font-bold text-slate-800">{currentCorp?.id || 'corp-amazon'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Industry Category:</span>
                    <span className="text-xs font-bold text-slate-800">E-Commerce & Autonomous Logistics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Connected Channels:</span>
                    <span className="text-xs font-bold text-emerald-600">6 Active Ingestion Pipelines</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tracked Competitor Entities</label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Walmart', 'Target', 'Shein', 'Temu', 'Alibaba'].map((comp) => (
                      <span
                        key={comp}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium flex items-center gap-1.5"
                      >
                        <span>{comp}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Competitor sentiment benchmark updated.')}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs"
                >
                  Synchronize Competitor Lexicon
                </button>
              </div>
            )}

            {/* 3. AI ENGINE & SCORING TAB */}
            {activeTab === 'ai' && (
              <div className="space-y-5 max-w-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">NLP Classifier & Affective Nuance</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Adjust neural scoring models, sarcasm detection, and confidence thresholds.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">Primary Classifier Architecture</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setSelectedModel('roberta')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedModel === 'roberta'
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">RoBERTa v4.2 Fine-Tuned</span>
                        {selectedModel === 'roberta' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        99.8% precision, optimized for slang, emojis, sarcasm, and corporate sentiment.
                      </p>
                    </div>

                    <div
                      onClick={() => setSelectedModel('gemini')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedModel === 'gemini'
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Gemini DeepEnsemble</span>
                        {selectedModel === 'gemini' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Deep context reasoning for long-form Reddit and YouTube commentary.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Confidence Score Threshold Cutoff</span>
                    <span className="font-mono text-blue-600">{confidenceCutoff}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="98"
                    value={confidenceCutoff}
                    onChange={(e) => setConfidenceCutoff(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Transcripts with RoBERTa confidence below {confidenceCutoff}% will be routed to human auditor review.
                  </p>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={sarcasmFilter}
                      onChange={(e) => setSarcasmFilter(e.target.checked)}
                      className="rounded text-blue-600 w-4 h-4"
                    />
                    <span>Enable contextual sarcasm & passive-aggressive discourse inversion</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('AI scoring hyperparameters applied.')}
                  className="px-4 py-2 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-white text-xs font-semibold shadow-xs"
                >
                  Apply AI Hyperparameters
                </button>
              </div>
            )}

            {/* 4. WEBHOOKS & INGESTION TAB */}
            {activeTab === 'webhooks' && (
              <div className="space-y-5 max-w-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">External Alerts & Webhook Relays</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Forward critical brand alerts directly into Slack, Discord, or PagerDuty.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Slack Incoming Webhook URL</label>
                  <input
                    type="text"
                    value={slackWebhook}
                    onChange={(e) => setSlackWebhook(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PagerDuty Integration Key</label>
                  <input
                    type="text"
                    value={pagerDutyKey}
                    onChange={(e) => setPagerDutyKey(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleTestWebhook}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    {webhookTested ? 'Dispatched!' : 'Send Test Ping Signal'}
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Webhook configuration saved.')}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs"
                  >
                    Save Webhook Config
                  </button>
                </div>
              </div>
            )}

            {/* 5. SECURITY & ACCESS TAB */}
            {activeTab === 'security' && (
              <div className="space-y-5 max-w-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Workstation Security & Tokens</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage API access keys, cryptographic tokens, and multi-factor authentication.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Telemetry Ingestion API Token</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={apiKey}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-700 select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1 shrink-0"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</div>
                    <div className="text-[11px] text-slate-500">Enforced for all Tier-1 corporate intelligence analysts.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      showToast(twoFactorEnabled ? '2FA disabled.' : '2FA activated.');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      twoFactorEnabled
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Need to exit this workstation?
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">SocialIQ Platform v4.2 • Enterprise Tier</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            Close Settings
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-16 right-6 bg-[#061735] text-white px-4 py-2.5 rounded-xl shadow-xl border border-blue-500/30 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
