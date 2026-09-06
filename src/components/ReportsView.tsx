import React, { useState, useEffect } from 'react';
import { AnalyticsSummary, Corporation, SocialPost } from '../types';
import { api } from '../lib/api';
import { generateIntelligencePdfReport } from '../lib/pdfReportGenerator';
import {
  FileText,
  Download,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Printer,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  FileSpreadsheet,
  FileJson,
  Layers,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface ReportsViewProps {
  corporation: Corporation;
  summary?: AnalyticsSummary | null;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ corporation, summary: initialSummary }) => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(initialSummary || null);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');

  // Load summary and sample posts if not available
  useEffect(() => {
    if (initialSummary) {
      setSummary(initialSummary);
    } else {
      api.getAnalytics(corporation.id, '30D').then(data => setSummary(data)).catch(console.error);
    }

    api.getPosts(corporation.id, { limit: 12 }).then(res => setPosts(res.data)).catch(console.error);
  }, [corporation.id, initialSummary]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Client-side PDF Report generation & download
  const handleDownloadPdfReport = async () => {
    setIsGeneratingPdf(true);
    try {
      // Ensure we have latest analytics summary
      let currentSummary = summary;
      if (!currentSummary) {
        currentSummary = await api.getAnalytics(corporation.id, '30D');
        setSummary(currentSummary);
      }

      let currentPosts = posts;
      if (currentPosts.length === 0) {
        const res = await api.getPosts(corporation.id, { limit: 15 });
        currentPosts = res.data;
        setPosts(currentPosts);
      }

      // Small delay for smooth UI feedback
      await new Promise(resolve => setTimeout(resolve, 600));

      // Trigger client-side PDF generation and download
      generateIntelligencePdfReport({
        corporation,
        summary: currentSummary,
        posts: currentPosts,
        timeRange: '30D'
      });

      setReportReady(true);
      showToast(`Successfully generated & downloaded Executive PDF Report for ${corporation.name}!`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      showToast('Error generating PDF report. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleGenerateNewBrief = () => {
    setIsGeneratingBrief(true);
    setTimeout(() => {
      setIsGeneratingBrief(false);
      setReportReady(true);
      showToast('Intelligence dossier compiled and ready for export.');
    }, 1000);
  };

  const handleExportCsv = () => {
    window.open(api.getPostsCsvUrl(corporation.id), '_blank');
    showToast(`Triggered CSV download for ${corporation.name} intelligence feed.`);
  };

  const pastReports = [
    {
      id: 'rep-1',
      title: `${corporation.name} 30-Day Sentiment & Virality Executive Briefing`,
      date: 'Just now',
      size: 'Multi-page Vector PDF',
      status: 'Ready',
      type: 'Executive Brief'
    },
    {
      id: 'rep-2',
      title: 'Regional Delivery Friction & Customer Feedback Audit',
      date: 'Yesterday, 4:30 PM',
      size: '2.4 MB PDF',
      status: 'Ready',
      type: 'Sentiment Audit'
    },
    {
      id: 'rep-3',
      title: 'Eigenvector Network Propagation & Key Influencer Index',
      date: '3 days ago',
      size: '1.8 MB PDF',
      status: 'Ready',
      type: 'Network Topology'
    },
    {
      id: 'rep-4',
      title: 'Competitive Share of Voice & Cross-Platform Volume Yield',
      date: 'Oct 14, 2024',
      size: '3.1 MB PDF',
      status: 'Ready',
      type: 'Competitive Intel'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>EXECUTIVE BRIEFINGS</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Automated Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Executive Reports & Dossiers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Generate board-ready intelligence briefings synthesizing cross-platform sentiment, key opinion leaders, and narrative cascades.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Main Client-Side PDF Generation Button */}
          <button
            onClick={handleDownloadPdfReport}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-xs font-bold text-white shadow-sm transition-all"
          >
            <Download className={`w-4 h-4 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
            <span>{isGeneratingPdf ? 'Generating Client-Side PDF...' : 'Download Executive PDF Report'}</span>
          </button>

          <button
            onClick={handleGenerateNewBrief}
            disabled={isGeneratingBrief}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{isGeneratingBrief ? 'Compiling AI Dossier...' : 'Compile New Brief'}</span>
          </button>
        </div>
      </div>

      {/* Featured PDF Download Hero Banner */}
      <div className="bg-gradient-to-r from-[#061735] via-[#0B234A] to-[#123568] text-white rounded-2xl p-6 shadow-xl border border-slate-800/80 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] font-bold uppercase tracking-wider text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Instant Client-Side Vector PDF Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {corporation.name} Executive Intelligence Dossier
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Export a publication-grade, multi-page vector PDF containing executive Net Sentiment score, sentiment polarity distribution, high-growth breakthrough trend drivers, dominant influencer rankings, and network modularity analysis.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span>• Zero external API dependencies</span>
              <span>• RoBERTa confidence metrics included</span>
              <span>• Instant local browser download</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <button
              onClick={handleDownloadPdfReport}
              disabled={isGeneratingPdf}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 text-[#061735] font-bold text-xs shadow-md transition-all group"
            >
              <FileText className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>{isGeneratingPdf ? 'Rendering PDF Pages...' : 'Download Executive PDF'}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-blue-300" />
              <span>Export Raw Data (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {reportReady && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-slate-900">Executive Briefing PDF Successfully Compiled!</div>
              <div className="text-slate-600">
                Synthesized 30-day sentiment trajectory, breakthrough topic drivers, and key opinion vector benchmarks for {corporation.name}.
              </div>
            </div>
          </div>
          <button
            onClick={handleDownloadPdfReport}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Now</span>
          </button>
        </div>
      )}

      {/* Available Intelligence Dossiers & Archive */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs space-y-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-xs font-bold text-slate-900">Archived Intelligence Briefs & Dynamic Exports</span>
            <span className="text-xs text-slate-500 ml-2">({pastReports.length} Reports Ready)</span>
          </div>
          <span className="text-[11px] text-blue-600 font-medium">Auto-updated on daily telemetry cycle</span>
        </div>

        <div className="divide-y divide-slate-100">
          {pastReports.map((rep, idx) => (
            <div
              key={rep.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{rep.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {rep.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {rep.date} • {rep.size} • Verified by RoBERTa Engine
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadPdfReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-xs font-semibold text-white shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={handleExportCsv}
                  title="Export raw data as CSV"
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#061735] text-white px-4 py-3 rounded-xl shadow-2xl border border-blue-500/30 text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
