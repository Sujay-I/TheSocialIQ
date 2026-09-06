import React, { useState, useMemo, useEffect } from 'react';
import { Corporation, PlatformType, SentimentLabel, SocialPost } from '../types';
import { api } from '../lib/api';
import {
  X,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  FileJson,
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface RawTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  corporation: Corporation;
}

type SortField = 'timestamp' | 'engagement' | 'sentiment' | 'confidence' | 'author_followers' | 'platform';
type SortOrder = 'asc' | 'desc';

export const RawTelemetryModal: React.FC<RawTelemetryModalProps> = ({
  isOpen,
  onClose,
  corporation
}) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [inspectedPost, setInspectedPost] = useState<SocialPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch telemetry data for the corporation
  const fetchTelemetry = async () => {
    setLoading(true);
    try {
      const res = await api.getPosts(corporation.id, { limit: 100 });
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load raw telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTelemetry();
      setCurrentPage(1);
      setInspectedPost(null);
    }
  }, [isOpen, corporation.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle sort field or direction
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  // Filter and sort the posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.text.toLowerCase().includes(q) ||
          p.author_username.toLowerCase().includes(q) ||
          (p.topic && p.topic.toLowerCase().includes(q))
      );
    }

    // Filter by platform
    if (selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform);
    }

    // Filter by sentiment
    if (selectedSentiment !== 'all') {
      result = result.filter(p => p.sentiment === selectedSentiment);
    }

    // Sort
    result.sort((a, b) => {
      let compA: any;
      let compB: any;

      switch (sortField) {
        case 'timestamp':
          compA = new Date(a.timestamp).getTime();
          compB = new Date(b.timestamp).getTime();
          break;
        case 'engagement':
          compA = a.engagement || 0;
          compB = b.engagement || 0;
          break;
        case 'confidence':
          compA = a.confidence || 0;
          compB = b.confidence || 0;
          break;
        case 'author_followers':
          compA = a.author_followers || 0;
          compB = b.author_followers || 0;
          break;
        case 'platform':
          compA = a.platform;
          compB = b.platform;
          break;
        case 'sentiment':
          const rank = { POSITIVE: 3, NEUTRAL: 2, NEGATIVE: 1 };
          compA = rank[a.sentiment] || 0;
          compB = rank[b.sentiment] || 0;
          break;
        default:
          return 0;
      }

      if (compA < compB) return sortOrder === 'asc' ? -1 : 1;
      if (compA > compB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [posts, searchQuery, selectedPlatform, selectedSentiment, sortField, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPosts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedPosts, currentPage, itemsPerPage]);

  // Trigger CSV export of current filtered telemetry
  const handleExportFilteredCsv = () => {
    if (filteredAndSortedPosts.length === 0) {
      showToast('No records available to export.');
      return;
    }

    const headers = [
      'id',
      'platform',
      'author_username',
      'author_followers',
      'text',
      'sentiment',
      'confidence',
      'likes',
      'reposts',
      'replies',
      'engagement',
      'timestamp',
      'topic'
    ];

    const rows = filteredAndSortedPosts.map(p => [
      `"${p.id}"`,
      `"${p.platform}"`,
      `"${p.author_username}"`,
      p.author_followers || 0,
      `"${(p.text || '').replace(/"/g, '""')}"`,
      `"${p.sentiment}"`,
      (p.confidence || 0).toFixed(2),
      p.likes || 0,
      p.reposts || 0,
      p.replies || 0,
      p.engagement || 0,
      `"${p.timestamp}"`,
      `"${p.topic || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `SocialIQ_${corporation.slug}_telemetry_preview_${filteredAndSortedPosts.length}records.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported ${filteredAndSortedPosts.length} records as CSV!`);
  };

  // Trigger JSON export
  const handleExportJson = () => {
    if (filteredAndSortedPosts.length === 0) {
      showToast('No records available to export.');
      return;
    }

    const exportData = {
      corporation: {
        id: corporation.id,
        name: corporation.name,
        slug: corporation.slug
      },
      exported_at: new Date().toISOString(),
      total_records: filteredAndSortedPosts.length,
      telemetry: filteredAndSortedPosts
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `SocialIQ_${corporation.slug}_telemetry_${filteredAndSortedPosts.length}records.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported ${filteredAndSortedPosts.length} records as JSON!`);
  };

  if (!isOpen) return null;

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-300 ml-1 inline group-hover:text-slate-500" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-blue-600 ml-1 inline" />
    ) : (
      <ArrowDown className="w-3 h-3 text-blue-600 ml-1 inline" />
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#061735] text-white flex items-center justify-between border-b border-[#0b234a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Raw Ingested Telemetry Live Preview
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Pre-Export Audit
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Live inspectable record buffer for <span className="text-white font-semibold">{corporation.name}</span> • 99.8% RoBERTa NLP confidence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTelemetry}
              disabled={loading}
              title="Refresh Telemetry Buffer"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-1 items-center gap-2.5 min-w-[260px] max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search raw transcripts, @author handles, keywords..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 placeholder-slate-400 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Platform filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium text-[11px]">Platform:</span>
              <select
                value={selectedPlatform}
                onChange={e => {
                  setSelectedPlatform(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs"
              >
                <option value="all">All Channels</option>
                <option value="x">X / Twitter</option>
                <option value="telegram">Telegram</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="reddit">Reddit</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            {/* Sentiment filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium text-[11px]">Sentiment:</span>
              <select
                value={selectedSentiment}
                onChange={e => {
                  setSelectedSentiment(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs"
              >
                <option value="all">All Sentiments</option>
                <option value="POSITIVE">Positive (+)</option>
                <option value="NEUTRAL">Neutral (•)</option>
                <option value="NEGATIVE">Negative (-)</option>
              </select>
            </div>

            {/* Page Size */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 font-medium text-[11px]">Rows:</span>
              <select
                value={itemsPerPage}
                onChange={e => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Table Area */}
        <div className="flex-1 overflow-auto min-h-[320px] bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-3">
              <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin"></div>
              <p className="text-xs text-slate-500 font-medium">Fetching raw ingested telemetry records...</p>
            </div>
          ) : filteredAndSortedPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No matching telemetry records found</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Try adjusting your search keywords or relaxing the platform and sentiment filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPlatform('all');
                  setSelectedSentiment('all');
                }}
                className="mt-3 px-3 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#0B234A] text-white text-[11px] uppercase tracking-wider font-semibold sticky top-0 z-10 select-none">
                <tr>
                  <th
                    onClick={() => handleSort('timestamp')}
                    className="p-3 cursor-pointer hover:bg-[#123568] transition-colors whitespace-nowrap group"
                  >
                    Timestamp {renderSortIndicator('timestamp')}
                  </th>
                  <th
                    onClick={() => handleSort('platform')}
                    className="p-3 cursor-pointer hover:bg-[#123568] transition-colors whitespace-nowrap group"
                  >
                    Platform {renderSortIndicator('platform')}
                  </th>
                  <th
                    onClick={() => handleSort('author_followers')}
                    className="p-3 cursor-pointer hover:bg-[#123568] transition-colors whitespace-nowrap group"
                  >
                    Author & Reach {renderSortIndicator('author_followers')}
                  </th>
                  <th className="p-3 min-w-[280px]">Raw Conversational Payload</th>
                  <th
                    onClick={() => handleSort('sentiment')}
                    className="p-3 cursor-pointer hover:bg-[#123568] transition-colors whitespace-nowrap group"
                  >
                    Sentiment {renderSortIndicator('sentiment')}
                  </th>
                  <th
                    onClick={() => handleSort('confidence')}
                    className="p-3 cursor-pointer hover:bg-[#123568] transition-colors whitespace-nowrap group"
                  >
                    Confidence {renderSortIndicator('confidence')}
                  </th>
                  <th
                    onClick={() => handleSort('engagement')}
                    className="p-3 cursor-pointer hover:bg-[#123568] transition-colors whitespace-nowrap group text-right"
                  >
                    Engagement {renderSortIndicator('engagement')}
                  </th>
                  <th className="p-3 text-center">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedPosts.map((post, idx) => {
                  const isPos = post.sentiment === 'POSITIVE';
                  const isNeg = post.sentiment === 'NEGATIVE';
                  const confPct = Math.round((post.confidence || 0.85) * 100);

                  return (
                    <tr
                      key={post.id || idx}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => setInspectedPost(post)}
                    >
                      {/* Timestamp */}
                      <td className="p-3 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                        {new Date(post.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* Platform */}
                      <td className="p-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                          {post.platform}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="p-3 whitespace-nowrap">
                        <div className="font-semibold text-slate-900 flex items-center gap-1">
                          <span>{post.author_username}</span>
                          {post.author_verified && (
                            <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0 inline" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {post.author_followers ? `${(post.author_followers / 1000).toFixed(0)}k reach` : 'Organic'}
                        </div>
                      </td>

                      {/* Raw Payload Text */}
                      <td className="p-3">
                        <div className="text-slate-800 line-clamp-2 max-w-md font-sans">
                          {post.text}
                        </div>
                        {post.topic && (
                          <span className="inline-block mt-1 text-[10px] text-blue-600 font-medium">
                            {post.topic}
                          </span>
                        )}
                      </td>

                      {/* Sentiment */}
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            isPos
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isNeg
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              isPos ? 'bg-emerald-500' : isNeg ? 'bg-red-500' : 'bg-slate-400'
                            }`}
                          ></span>
                          {post.sentiment}
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full ${
                                confPct >= 85 ? 'bg-blue-600' : 'bg-amber-500'
                              }`}
                              style={{ width: `${confPct}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-[11px] text-slate-600">{confPct}%</span>
                        </div>
                      </td>

                      {/* Engagement */}
                      <td className="p-3 text-right whitespace-nowrap font-mono text-slate-700">
                        {(post.engagement || 0).toLocaleString()}
                      </td>

                      {/* Inspect Action */}
                      <td className="p-3 text-center">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setInspectedPost(post);
                          }}
                          title="Inspect JSON Schema"
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Selected Record JSON Inspection Drawer (if user clicks inspect) */}
        {inspectedPost && (
          <div className="p-4 bg-slate-900 text-slate-200 border-t border-slate-800 text-xs shrink-0 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800">
              <span className="font-mono font-bold text-blue-400">
                JSON Telemetry Payload [ID: {inspectedPost.id}]
              </span>
              <button
                onClick={() => setInspectedPost(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Close Payload ×
              </button>
            </div>
            <pre className="font-mono text-[10px] text-emerald-400 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(inspectedPost, null, 2)}
            </pre>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Showing{' '}
              <strong className="text-slate-900">
                {filteredAndSortedPosts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
              </strong>{' '}
              to{' '}
              <strong className="text-slate-900">
                {Math.min(currentPage * itemsPerPage, filteredAndSortedPosts.length)}
              </strong>{' '}
              of <strong className="text-slate-900">{filteredAndSortedPosts.length}</strong> records
              {filteredAndSortedPosts.length !== posts.length && (
                <span className="text-slate-400 ml-1">({posts.length} total in buffer)</span>
              )}
            </span>

            {/* Pagination buttons */}
            <div className="flex items-center gap-1 ml-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-slate-700 font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportFilteredCsv}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#061735] hover:bg-[#0B234A] text-xs font-semibold text-white shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
              <span>Export Filtered CSV</span>
            </button>

            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-xs transition-colors"
            >
              <FileJson className="w-3.5 h-3.5 text-slate-500" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Floating Toast Notification */}
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
