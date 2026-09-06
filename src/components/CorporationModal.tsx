import React, { useState } from 'react';
import { api } from '../lib/api';
import { Corporation } from '../types';
import { Building2, X } from 'lucide-react';

interface CorporationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newCorp: Corporation) => void;
}

export const CorporationModal: React.FC<CorporationModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.createCorporation({
        name: name.trim(),
        description: description.trim(),
        keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
        hashtags: hashtags.split(',').map((h) => (h.trim().startsWith('#') ? h.trim() : `#${h.trim()}`)).filter(Boolean)
      });
      onCreated(res.data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create corporation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white">Add New Corporation Profile</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Corporation / Brand Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Tesla, Apple, Nike"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Description / Industry</label>
            <input
              type="text"
              placeholder="e.g. Electric vehicles, energy & robotics"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Keywords (comma-separated)</label>
            <input
              type="text"
              placeholder="autopilot, ev, battery, robotaxi"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Hashtags (comma-separated)</label>
            <input
              type="text"
              placeholder="#Tesla, #Robotaxi, #EVs"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold"
            >
              {loading ? 'Creating...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
