import React, { useState } from 'react';
import { Corporation } from '../types';
import {
  Users,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Download,
  Share2,
  Layers,
  Sparkles,
  PieChart as PieIcon
} from 'lucide-react';

interface AudienceViewProps {
  corporation: Corporation;
}

export const AudienceView: React.FC<AudienceViewProps> = ({ corporation }) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const metroHubs = [
    { city: 'Hyderabad, India', share: '38%', growth: '+28% YoY', primary: 'Cloud Infra Developers' },
    { city: 'Seattle, WA, USA', share: '24%', growth: '+14% YoY', primary: 'Autonomous Tech Early Adopters' },
    { city: 'London, United Kingdom', share: '18%', growth: '+19% YoY', primary: 'Retail & Prime Shoppers' },
    { city: 'Bengaluru, India', share: '12%', growth: '+32% YoY', primary: 'AI & Enterprise Systems' },
    { city: 'Tokyo, Japan', share: '8%', growth: '+11% YoY', primary: 'Robotics & Hardware Consumers' }
  ];

  const personas = [
    {
      name: 'The Algorithmic Shopper',
      size: '42% of base',
      traits: ['Same-day fulfillment', 'Prime locker user', 'High mobile checkout rate'],
      topTag: '#PrimeDelivery'
    },
    {
      name: 'Cloud Systems Architect',
      size: '28% of base',
      traits: ['AWS/Bedrock consumer', 'Active in developer forums', 'Evaluates token concurrency'],
      topTag: '#BedrockAPI'
    },
    {
      name: 'Sustainable Living Advocate',
      size: '18% of base',
      traits: ['Prefers combined shipment packaging', 'Monitors carbon footprint', 'Values paperless returns'],
      topTag: '#EcoPackaging'
    },
    {
      name: 'Campus Technologist',
      size: '12% of base',
      traits: ['Student developer', 'Hackathon participant', 'High citation of open source models'],
      topTag: '#CampusDev'
    }
  ];

  const handleExport = () => {
    const data = {
      corporation: corporation.name,
      exportDate: new Date().toISOString(),
      demographics: {
        uniqueReach: '2.4M',
        dominantAge: '25-34 (42%)',
        coreGeography: 'North America (48%), EMEA (28%), APAC (24%)'
      },
      metroHubs,
      personas
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${corporation.slug}-audience-archetypes.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('Audience Persona Matrix exported successfully.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>AUDIENCE ARCHETYPE MATRIX</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Demographic Vectorization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Audience Intelligence & Archetypes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Understand your global audience footprint, demographic segments, regional hubs, and affinity clusters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Persona Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">UNIQUE REACH</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">+21.4% WoW</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">2.4M</div>
          <div className="text-xs text-slate-500 mt-1">Omnichannel verified footprint</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">DOMINANT AGE BRACKET</span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">42% Share</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">18–24 Yrs</div>
          <div className="text-xs text-slate-500 mt-1">Next: 25–34 (31% Share)</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">TOP GLOBAL METRO</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">+28% YoY</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-3 truncate">Hyderabad</div>
          <div className="text-xs text-slate-500 mt-1">Leading cloud systems discourse</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">PRIMARY AFFINITY</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">High Affinity</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-3 truncate">Cloud Logistics</div>
          <div className="text-xs text-slate-500 mt-1">94% cross-correlation index</div>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Global Metro Hubs (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Geographic Density & Metro Concentration</h3>
              <p className="text-xs text-slate-500">Key regional consumer and enterprise telemetry hotspots</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              5 Primary Metros
            </span>
          </div>

          <div className="space-y-3">
            {metroHubs.map((hub) => (
              <div
                key={hub.city}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{hub.city}</div>
                    <div className="text-[11px] text-slate-500">{hub.primary}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">{hub.share}</div>
                  <div className="text-[10px] text-blue-600 font-semibold">{hub.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Core Audience Personas (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Key Audience Archetypes</h3>
            <span className="text-xs text-slate-400">Behavioral Clusters</span>
          </div>

          <div className="space-y-3">
            {personas.map((persona) => (
              <div
                key={persona.name}
                className="p-3.5 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{persona.name}</span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {persona.size}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {persona.traits.map((trait) => (
                    <span key={trait} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-slate-400">
                  Dominant Hashtag: <strong className="text-slate-800">{persona.topTag}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#061735] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-500/30 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
