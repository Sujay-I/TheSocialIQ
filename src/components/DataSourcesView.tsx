import React, { useState } from 'react';
import { Corporation } from '../types';
import {
  Database,
  Radio,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Upload,
  Download,
  Settings2,
  FileText,
  Key,
  ShieldCheck,
  Plus,
  TableProperties,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { RawTelemetryModal } from './RawTelemetryModal';

interface DataSourcesViewProps {
  corporation: Corporation;
}

export const DataSourcesView: React.FC<DataSourcesViewProps> = ({ corporation }) => {
  const [connectors, setConnectors] = useState([
    { id: 'x', name: 'X / Twitter Firehose', status: 'active', speed: '48.0K events/hr', health: '99.9% uptime', latency: '42ms' },
    { id: 'reddit', name: 'Reddit Public Pushshift API', status: 'active', speed: '18.4K events/hr', health: '99.4% uptime', latency: '86ms' },
    { id: 'instagram', name: 'Instagram Graph API Webhook', status: 'active', speed: '32.0K events/hr', health: '98.8% uptime', latency: '110ms' },
    { id: 'telegram', name: 'Telegram Telemetry Ingestion Node', status: 'active', speed: '28.0K events/hr', health: '100% uptime', latency: '24ms' },
    { id: 'facebook', name: 'Facebook Public Pages Graph', status: 'active', speed: '20.4K events/hr', health: '99.1% uptime', latency: '120ms' },
    { id: 'youtube', name: 'YouTube Data API v3 Transcript Stream', status: 'standby', speed: '12.1K events/hr', health: '97.4% uptime', latency: '140ms' }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>INGESTION PIPELINES</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">6 Connected Streams</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Data Sources & Ingestion Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Monitor real-time social platform connectors, ingestion latency, API quota consumption, and preview raw ingested telemetry before export.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-blue-700 border border-blue-200 shadow-xs transition-colors"
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>Preview Raw Telemetry</span>
          </button>

          <button
            onClick={() => alert('All social connectors checked and synced.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync All Pipelines</span>
          </button>
        </div>
      </div>

      {/* Quick Pre-Export Notification Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              Live Ingested Telemetry Pre-Export Inspector
            </div>
            <div className="text-[11px] text-slate-600">
              Audit raw conversational payloads, RoBERTa sentiment confidence scores, and platform metadata in a live sortable table before triggering exports.
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsPreviewModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0 transition-colors shadow-xs"
        >
          <TableProperties className="w-3.5 h-3.5" />
          <span>Launch Live Table Preview</span>
        </button>
      </div>

      {/* Main Connectors Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-900">Connected Social Telemetry Feeds</span>
            <span className="text-slate-400">({connectors.length} Pipelines)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <TableProperties className="w-3 h-3" />
              <span>Inspect Live Data</span>
            </button>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Ingestion Active
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {connectors.map((c) => (
            <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{c.name}</div>
                  <div className="text-[11px] text-slate-500">{c.speed} • Latency: {c.latency}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-500">{c.health}</span>
                <span className={`font-semibold px-2.5 py-1 rounded-full text-[11px] ${
                  c.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                }`}>
                  {c.status.toUpperCase()}
                </span>
                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  title="Preview records from this pipeline"
                  className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                >
                  Preview Feed
                </button>
                <button
                  onClick={() => alert(`Configuring API credentials for ${c.name}`)}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Data Ingestion Card */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Custom Telemetry CSV / JSON Ingestion</h3>
            <p className="text-xs text-slate-500">Upload proprietary customer support logs, focus group transcripts, or survey feedback</p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
            Automated NLP Scoring
          </span>
        </div>

        <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-8 text-center bg-slate-50/50 transition-colors cursor-pointer" onClick={handleSimulateUpload}>
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <div className="text-sm font-bold text-slate-900">Drop your CSV or JSON file here</div>
          <div className="text-xs text-slate-500 mt-1">Supports fields: author, platform, text, timestamp</div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              disabled={isUploading}
              className="px-4 py-2 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs"
            >
              {isUploading ? 'Processing File...' : 'Select File from Device'}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPreviewModalOpen(true);
              }}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs"
            >
              Preview Existing Buffer
            </button>
          </div>
        </div>

        {uploadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Successfully ingested 250 custom records into {corporation.name} telemetry stream!</span>
          </div>
        )}
      </div>

      {/* Live Raw Telemetry Sortable Table Modal */}
      <RawTelemetryModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        corporation={corporation}
      />
    </div>
  );
};
