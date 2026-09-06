import React, { useState, useEffect } from 'react';
import { Corporation, PlatformType, SentimentLabel, SocialPost } from '../types';
import { api } from '../lib/api';
import { Search, Filter, MessageSquare, ThumbsUp, Repeat, CheckCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface PostsExplorerViewProps {
  corporation: Corporation;
}

export const PostsExplorerView: React.FC<PostsExplorerViewProps> = ({ corporation }) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<string>('all');
  const [sentiment, setSentiment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.getPosts(corporation.id, {
        platform: platform !== 'all' ? platform : undefined,
        sentiment: sentiment !== 'all' ? sentiment : undefined,
        q: searchQuery || undefined,
        page,
        limit: 10
      });
      setPosts(res.data);
      setTotalPages(res.meta.total_pages);
      setTotalCount(res.meta.total);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [corporation.id, platform, sentiment]);

  useEffect(() => {
    fetchPosts();
  }, [corporation.id, platform, sentiment, page]);

  return (
    <div className="space-y-4 pb-20 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Posts Explorer</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Inspect public conversations analyzed by the TweetEval RoBERTa model.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search text, author, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchPosts()}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Platform filter */}
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Platforms</option>
          <option value="x">X (Twitter)</option>
          <option value="telegram">Telegram</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="reddit">Reddit</option>
          <option value="youtube">YouTube</option>
        </select>

        {/* Sentiment filter */}
        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Sentiments</option>
          <option value="POSITIVE">Positive</option>
          <option value="NEUTRAL">Neutral</option>
          <option value="NEGATIVE">Negative</option>
        </select>
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading social posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800">
            No social data available for this filter.
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-xl p-3.5 transition-colors cursor-pointer space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{post.author_username}</span>
                  {post.author_verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">{post.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      post.sentiment === 'POSITIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : post.sentiment === 'NEGATIVE'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}
                  >
                    {post.sentiment} ({(post.confidence * 100).toFixed(0)}%)
                  </span>
                  <span className="text-[10px] text-slate-500">{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{post.text}</p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                <span className="text-blue-400 font-medium">{post.topic}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3 h-3" />
                    {post.reposts}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {post.replies}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>Showing {posts.length} of {totalCount} posts</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Inspect Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white">Post Telemetry Inspection</span>
              <button onClick={() => setSelectedPost(null)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <div><span className="text-slate-500">Author:</span> <span className="text-white font-semibold">{selectedPost.author_username}</span></div>
              <div><span className="text-slate-500">Platform:</span> <span className="text-white uppercase font-semibold">{selectedPost.platform}</span></div>
              <div><span className="text-slate-500">Timestamp:</span> <span className="text-white">{selectedPost.timestamp}</span></div>
              <div><span className="text-slate-500">Model:</span> <span className="text-blue-400 font-mono">cardiffnlp/twitter-roberta-base</span></div>
              <div><span className="text-slate-500">Classification:</span> <span className="text-emerald-400 font-bold">{selectedPost.sentiment}</span> ({selectedPost.confidence})</div>
              {selectedPost.nuance && <div><span className="text-slate-500">Nuance Flag:</span> <span className="text-purple-400 font-bold">{selectedPost.nuance}</span></div>}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 mt-2">{selectedPost.text}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
