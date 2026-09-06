import React, { useState } from 'react';
import { Corporation } from '../types';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Radio,
  Trash2,
  TrendingUp,
  Mail,
  Smartphone,
  Send,
  X,
  Volume2,
  VolumeX,
  ShieldAlert
} from 'lucide-react';

interface AlertsViewProps {
  corporation: Corporation;
}

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  channel: string;
  status: boolean;
  lastTriggered: string;
  severity: 'high' | 'medium' | 'critical';
}

export const AlertsView: React.FC<AlertsViewProps> = ({ corporation }) => {
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'muted'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Alert Rule Form
  const [ruleName, setRuleName] = useState('');
  const [conditionType, setConditionType] = useState('sentiment_drop');
  const [thresholdVal, setThresholdVal] = useState('20');
  const [targetChannel, setTargetChannel] = useState('Slack #war-room & Email');
  const [severity, setSeverity] = useState<'high' | 'medium' | 'critical'>('high');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: 'rule-1',
      name: 'High Friction Spike Alert',
      condition: 'Negative sentiment > 15% in any 1-hour window',
      channel: 'Slack & Email Ops',
      status: true,
      lastTriggered: '3 days ago',
      severity: 'critical'
    },
    {
      id: 'rule-2',
      name: 'Tier 0 Influencer Shift',
      condition: 'Key opinion leader sentiment flip from positive to negative',
      channel: 'SMS & PagerDuty',
      status: true,
      lastTriggered: 'Never',
      severity: 'critical'
    },
    {
      id: 'rule-3',
      name: 'Virality Velocity Surge',
      condition: 'Mention volume > 300% of rolling 7-day average',
      channel: 'Slack #executive-war-room',
      status: true,
      lastTriggered: 'Yesterday 10:45 AM',
      severity: 'high'
    },
    {
      id: 'rule-4',
      name: 'Competitor Mention Parity',
      condition: 'Share of voice drops below 35% in consumer tech category',
      channel: 'Email Digest',
      status: false,
      lastTriggered: '2 weeks ago',
      severity: 'medium'
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleRule = (id: string) => {
    setAlertRules((rules) =>
      rules.map((r) => {
        if (r.id === id) {
          const next = !r.status;
          showToast(`Rule "${r.name}" ${next ? 'activated' : 'muted'}.`);
          return { ...r, status: next };
        }
        return r;
      })
    );
  };

  const deleteRule = (id: string) => {
    setAlertRules((rules) => rules.filter((r) => r.id !== id));
    showToast('Alert rule removed from telemetry pipeline.');
  };

  const testFireAlert = (rule: AlertRule) => {
    showToast(`Test alert broadcast sent for "${rule.name}" via ${rule.channel}`);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim()) return;

    let conditionText = '';
    if (conditionType === 'sentiment_drop') {
      conditionText = `Negative sentiment increases by > ${thresholdVal}% in rolling 60m`;
    } else if (conditionType === 'volume_surge') {
      conditionText = `Total mentions exceed baseline by > ${thresholdVal}% in 15m`;
    } else if (conditionType === 'influencer_flip') {
      conditionText = `Tier-0 account publishes post with negative score < ${thresholdVal}%`;
    } else {
      conditionText = `Share of Voice decreases by > ${thresholdVal}% vs primary competitors`;
    }

    const newRule: AlertRule = {
      id: `rule-${Date.now()}`,
      name: ruleName,
      condition: conditionText,
      channel: targetChannel,
      status: true,
      lastTriggered: 'Just created',
      severity
    };

    setAlertRules([newRule, ...alertRules]);
    setIsCreateModalOpen(false);
    setRuleName('');
    showToast(`New alert rule "${ruleName}" deployed.`);
  };

  const filteredRules = alertRules.filter((r) => {
    if (filterTab === 'active') return r.status;
    if (filterTab === 'muted') return !r.status;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>THRESHOLD TRIGGERS</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Early Warning Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Realtime Alerts & Threshold Rules
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Configure algorithmic alerts triggered by sentiment anomalies, influencer cascades, and volume surges for{' '}
            <strong className="text-slate-800">{corporation.name}</strong>.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Alert Rule</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">ACTIVE RULES</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {alertRules.filter((r) => r.status).length}
          </div>
          <div className="text-xs text-blue-600 font-semibold mt-1">Real-time evaluation active</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">SIGNALS EVALUATED / MIN</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">4,820</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">0.12s latency guarantee</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">LAST DISPATCHED ALERT</span>
          <div className="text-xl font-bold text-slate-900 mt-2 truncate">Virality Velocity Surge</div>
          <div className="text-xs text-slate-500 mt-1">Yesterday 10:45 AM • Slack Ops</div>
        </div>
      </div>

      {/* Alert Rules Container */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        {/* Sub-tab Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                filterTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Rules ({alertRules.length})
            </button>
            <button
              onClick={() => setFilterTab('active')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                filterTab === 'active' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active ({alertRules.filter((r) => r.status).length})
            </button>
            <button
              onClick={() => setFilterTab('muted')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                filterTab === 'muted' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Muted ({alertRules.filter((r) => !r.status).length})
            </button>
          </div>

          <span className="text-xs text-slate-500">
            {alertRules.filter((r) => r.status).length} of {alertRules.length} Threshold Rules Listening
          </span>
        </div>

        {/* Rules List */}
        <div className="divide-y divide-slate-100">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{rule.name}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      rule.severity === 'critical'
                        ? 'bg-rose-100 text-rose-700'
                        : rule.severity === 'high'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {rule.severity.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                    {rule.channel}
                  </span>
                </div>
                <div className="text-xs text-slate-600">{rule.condition}</div>
                <div className="text-[10px] text-slate-400">Last triggered: {rule.lastTriggered}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => testFireAlert(rule)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1 transition-colors"
                  title="Dispatch simulated ping"
                >
                  <Send className="w-3 h-3 text-blue-600" />
                  <span>Test Ping</span>
                </button>

                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    rule.status
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {rule.status ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{rule.status ? 'Active' : 'Muted'}</span>
                </button>

                <button
                  onClick={() => deleteRule(rule.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete rule"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Alert Rule Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Create Algorithmic Alert Rule</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  required
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g. Rapid Negative Stance Acceleration"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Trigger Anomaly Type</label>
                  <select
                    value={conditionType}
                    onChange={(e) => setConditionType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="sentiment_drop">Negative Sentiment Surge</option>
                    <option value="volume_surge">Mention Volume Anomaly</option>
                    <option value="influencer_flip">Tier-0 KOL Negative Flip</option>
                    <option value="sov_parity">Competitive SOV Drop</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Threshold Value (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={thresholdVal}
                    onChange={(e) => setThresholdVal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dispatch Destination</label>
                  <select
                    value={targetChannel}
                    onChange={(e) => setTargetChannel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Slack #executive-war-room">Slack #executive-war-room</option>
                    <option value="SMS & PagerDuty">SMS & PagerDuty</option>
                    <option value="Email Ops Digest">Email Ops Digest</option>
                    <option value="External Webhook (JSON)">External Webhook (JSON)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Severity Level</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="critical">Critical (Immediate Alert)</option>
                    <option value="high">High (Priority Queue)</option>
                    <option value="medium">Medium (Standard Log)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-white font-semibold shadow-xs"
                >
                  Deploy Alert Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#061735] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-500/30 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
