import React, { useState } from 'react';
import { Corporation, PlatformType } from '../types';
import { api } from '../lib/api';
import { Download, Upload, RefreshCw, CheckCircle2, AlertCircle, Radio, FileText, Database } from 'lucide-react';

interface IngestReportsViewProps {
  corporation: Corporation;
  onDataUpdated: () => void;
}

export const IngestReportsView: React.FC<IngestReportsViewProps> = ({ corporation, onDataUpdated }) => {
  const [ingestingPlatform, setIngestingPlatform] = useState<string | null>(null);
  const [ingestMessage, setIngestMessage] = useState<string | null>(null);
  const [importText, setImportText] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleTriggerIngest = async (p: PlatformType) => {
    setIngestingPlatform(p);
    setIngestMessage(null);
    try {
      const res = await api.triggerIngest(corporation.id, p);
      setIngestMessage(`Ingested ${res.job.posts_analyzed} new posts from ${p.toUpperCase()} and classified sentiment!`);
      onDataUpdated();
    } catch (err: any) {
      setIngestMessage(`Ingestion error: ${err.message}`);
    } finally {
      setIngestingPlatform(null);
    }
  };

  const handleImportJson = async () => {
    if (!importText.trim()) return;
    setIsImporting(true);
    setImportStatus(null);
    try {
      const parsed = JSON.parse(importText);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      const res = await api.importPosts(corporation.id, items);
      setImportStatus(`Successfully classified and imported ${res.count} posts!`);
      setImportText('');
      onDataUpdated();
    } catch (err: any) {
      setImportStatus(`Import failed: ${err.message}. Please supply valid JSON array with 'text' properties.`);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Ingestion & Reports</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Manage social connectors, trigger telemetry ingestion pipelines, and export executive intelligence reports.
        </p>
      </div>

      {/* Social Connectors Matrix */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
        <h2 className="text-sm font-bold text-white mb-2">Active Social Connectors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {corporation.official_social_accounts.map((acc) => (
            <div key={acc.platform} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{acc.platform}</span>
                <div className="text-xs font-semibold text-white mt-0.5 truncate">{acc.handle}</div>
              </div>
              <button
                onClick={() => handleTriggerIngest(acc.platform)}
                disabled={ingestingPlatform === acc.platform}
                className="mt-3 w-full py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-[10px] font-bold rounded border border-blue-500/30 flex items-center justify-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${ingestingPlatform === acc.platform ? 'animate-spin' : ''}`} />
                <span>{ingestingPlatform === acc.platform ? 'Ingesting...' : 'Ingest'}</span>
              </button>
            </div>
          ))}
        </div>
        {ingestMessage && (
          <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{ingestMessage}</span>
          </div>
        )}
      </div>

      {/* Import Custom Dataset (RoBERTa Auto-Classification) */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-bold text-white">Import Custom Telemetry Posts</h2>
        </div>
        <p className="text-xs text-slate-400">
          Paste a JSON array of posts (e.g. <code className="text-purple-300">[{`{"text": "Love the fast shipping!", "platform": "x"}`}]</code>). Each post will be evaluated through our server-side RoBERTa sentiment classifier.
        </p>

        <textarea
          rows={4}
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder={`[\n  {"text": "The latest software update is astonishingly fast!", "platform": "x"},\n  {"text": "Packaging could use less plastic.", "platform": "reddit"}\n]`}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-purple-500"
        />

        <div className="flex items-center justify-between">
          <button
            onClick={handleImportJson}
            disabled={isImporting || !importText.trim()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isImporting ? 'Classifying...' : 'Classify & Import Posts'}</span>
          </button>
          {importStatus && <span className="text-xs text-purple-300 font-medium">{importStatus}</span>}
        </div>
      </div>

      {/* Export Reports */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-white">Executive Data & Report Export</h2>
          <p className="text-xs text-slate-400 mt-0.5">Download full analyzed dataset in CSV format or printable summary.</p>
        </div>
        <a
          href={api.getPostsCsvUrl(corporation.id)}
          download
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-2 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Posts (CSV)</span>
        </a>
      </div>
    </div>
  );
};
