import React, { useState } from 'react';
import { Corporation } from '../types';
import {
  Share2,
  TrendingUp,
  Download,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronDown,
  Layers,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Radio
} from 'lucide-react';

interface NetworkIntelligenceViewProps {
  corporation: Corporation;
}

export const NetworkIntelligenceView: React.FC<NetworkIntelligenceViewProps> = ({ corporation }) => {
  const [activeTimeTab, setActiveTimeTab] = useState<'7D' | '30D' | '90D'>('30D');
  const [selectedClusterFilter, setSelectedClusterFilter] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>('techinsider');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 1200);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulationComplete(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Eyebrow, Title & Action Controls (Matches Image 4) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>GRAPH ENGINE V4.2</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Eigenvector Topology Resolved</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Network Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Understand how ideas, sentiment, and influence propagate across communities, clusters, and echo chambers.
          </p>
        </div>

        {/* Right Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Cluster filter dropdown */}
          <select
            value={selectedClusterFilter}
            onChange={(e) => setSelectedClusterFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium shadow-xs focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Clusters</option>
            <option value="tech">Tech Pioneers</option>
            <option value="retail">Value Shoppers</option>
            <option value="media">Media Hub</option>
            <option value="campus">Campus Chapters</option>
          </select>

          {/* Time range pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            {(['7D', '30D', '90D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setActiveTimeTab(r)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeTimeTab === r
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Simulate button */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <Play className={`w-3.5 h-3.5 text-blue-400 ${isSimulating ? 'animate-pulse' : ''}`} />
            <span>{isSimulating ? 'Simulating...' : 'Simulate Cascade Propagation'}</span>
          </button>

          {/* Export button */}
          <button
            onClick={() => alert('Exporting SVG Network Topology and Node Centrality matrix...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Graph</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Network Visualizer (7 cols) & Right Stats + Sandbox (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): SVG Interactive Topology Canvas & 3 Metric Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Graph Canvas Card */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
            {/* Canvas Header Bar */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="font-bold text-slate-900">3,429 Active Nodes</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">14,812 Edges</span>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.15, 1.6))}
                  className="p-1 rounded hover:bg-slate-200/70 text-slate-600 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 0.15, 0.7))}
                  className="p-1 rounded hover:bg-slate-200/70 text-slate-600 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 rounded hover:bg-slate-200/70 text-slate-600 transition-colors"
                  title="Reset View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SVG Canvas Area */}
            <div className="relative w-full h-[410px] bg-[#f8fafc] overflow-hidden flex items-center justify-center select-none">
              {/* Subtle Grid Dot Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>

              {/* Central Graph Render */}
              <svg
                viewBox="0 0 700 450"
                className="w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Connecting Edge Lines */}
                {/* Tech to Retail Bridge */}
                <line x1="260" y1="160" x2="480" y2="170" stroke={simulationComplete ? '#f43f5e' : '#94a3b8'} strokeWidth="2.5" strokeDasharray={simulationComplete ? '5 3' : undefined} />
                {/* Tech to Media Bridge */}
                <line x1="260" y1="160" x2="350" y2="330" stroke="#94a3b8" strokeWidth="3" />
                {/* Retail to Campus Bridge */}
                <line x1="480" y1="170" x2="520" y2="340" stroke="#94a3b8" strokeWidth="2" />
                {/* Media to Campus Bridge */}
                <line x1="350" y1="330" x2="520" y2="340" stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Tech Satellite Edges */}
                <line x1="260" y1="160" x2="160" y2="100" stroke="#93c5fd" strokeWidth="1.5" />
                <line x1="260" y1="160" x2="140" y2="200" stroke="#93c5fd" strokeWidth="2" />
                <line x1="260" y1="160" x2="220" y2="70" stroke="#93c5fd" strokeWidth="1" />

                {/* Retail Satellite Edges */}
                <line x1="480" y1="170" x2="570" y2="110" stroke="#86efac" strokeWidth="2" />
                <line x1="480" y1="170" x2="600" y2="210" stroke="#86efac" strokeWidth="1.5" />

                {/* Media Satellite Edges */}
                <line x1="350" y1="330" x2="250" y2="380" stroke="#fed7aa" strokeWidth="1.5" />
                <line x1="350" y1="330" x2="420" y2="400" stroke="#fed7aa" strokeWidth="1.5" />

                {/* Campus Satellite Edges */}
                <line x1="520" y1="340" x2="610" y2="390" stroke="#d8b4fe" strokeWidth="1.5" />

                {/* Satellite Nodes */}
                {/* Tech satellites */}
                <circle cx="160" cy="100" r="10" fill="#3b82f6" />
                <text x="160" y="85" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">#DevRel</text>

                <circle cx="140" cy="200" r="12" fill="#2563eb" />
                <text x="140" y="222" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">@cloudnative</text>

                <circle cx="220" cy="70" r="8" fill="#60a5fa" />

                {/* Retail satellites */}
                <circle cx="570" cy="110" r="14" fill="#10b981" />
                <text x="570" y="90" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">@prime_deals</text>

                <circle cx="600" cy="210" r="10" fill="#34d399" />
                <text x="600" y="230" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">Deals Hub</text>

                {/* Media satellites */}
                <circle cx="250" cy="380" r="11" fill="#f59e0b" />
                <text x="250" y="402" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">@techwire</text>

                <circle cx="420" cy="400" r="9" fill="#fbbf24" />

                {/* Campus satellites */}
                <circle cx="610" cy="390" r="11" fill="#a855f7" />
                <text x="610" y="412" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">@MIT_Labs</text>

                {/* Major Cluster Central Nodes */}
                {/* 1. TECH CLUSTER (Blue) */}
                <g
                  onClick={() => setSelectedNode('techinsider')}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="260"
                    cy="160"
                    r="28"
                    fill="#1d4ed8"
                    className="group-hover:opacity-90 transition-opacity"
                  />
                  <circle cx="260" cy="160" r="34" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="260" y="164" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">
                    TECH
                  </text>

                  {/* Tooltip callout for @techinsider */}
                  <g transform="translate(190, 115)">
                    <rect width="140" height="24" rx="6" fill="#0a1128" />
                    <text x="70" y="15" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="600">
                      Eigenvector: 0.94 • 18.4K Reposts
                    </text>
                  </g>
                </g>

                {/* 2. RETAIL CLUSTER (Green) */}
                <g
                  onClick={() => setSelectedNode('retail')}
                  className="cursor-pointer group"
                >
                  <circle cx="480" cy="170" r="26" fill="#059669" />
                  <circle cx="480" cy="170" r="32" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  <text x="480" y="174" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
                    RETAIL
                  </text>
                  <text x="480" y="215" textAnchor="middle" fontSize="11" fill="#0f172a" fontWeight="bold">
                    Retail Core Value Shoppers
                  </text>
                </g>

                {/* 3. MEDIA CLUSTER (Orange) */}
                <g
                  onClick={() => setSelectedNode('media')}
                  className="cursor-pointer group"
                >
                  <circle cx="350" cy="330" r="24" fill="#d97706" />
                  <circle cx="350" cy="330" r="30" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="350" y="334" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
                    MEDIA
                  </text>
                  <text x="350" y="375" textAnchor="middle" fontSize="11" fill="#0f172a" fontWeight="bold">
                    Media Hub 2.4M reach
                  </text>
                </g>

                {/* 4. CAMPUS CLUSTER (Purple) */}
                <g
                  onClick={() => setSelectedNode('campus')}
                  className="cursor-pointer group"
                >
                  <circle cx="520" cy="340" r="22" fill="#7e22ce" />
                  <circle cx="520" cy="340" r="28" fill="none" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="520" y="344" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
                    EDU
                  </text>
                  <text x="520" y="380" textAnchor="middle" fontSize="10" fill="#0f172a" fontWeight="bold">
                    Campus Chapters 18% network vol
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Canvas Legend & Modularity Q-Score */}
            <div className="p-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white text-xs">
              <div className="flex flex-wrap items-center gap-4 text-slate-600 text-[11px]">
                {/* Node size */}
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800">NODE SIZE:</span>
                  <span>Influence Weight</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-700"></span>
                  </div>
                </div>

                {/* Line stroke */}
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800">LINE STROKE:</span>
                  <span>Repost Volume</span>
                  <div className="flex items-center gap-1 ml-1">
                    <span className="w-3 h-0.5 bg-slate-300"></span>
                    <span className="w-3 h-1 bg-slate-500"></span>
                    <span className="w-3 h-1.5 bg-slate-700"></span>
                  </div>
                </div>

                {/* Industry colors */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">INDUSTRY:</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600"></span>Tech</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Retail</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Media</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Campus</span>
                </div>
              </div>

              {/* Modularity Q-Score Badge */}
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-800 font-semibold px-2.5 py-1 rounded-lg border border-blue-200 text-xs">
                <span>MODULARITY Q-SCORE:</span>
                <span className="font-bold">0.781 (High Cohesion)</span>
              </div>
            </div>
          </div>

          {/* 3 Metric Cards Under Canvas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Bridges Between Hubs</div>
              <div className="text-xl font-bold text-slate-900 mt-1">14 Cross-Chamber</div>
              <div className="text-[11px] text-blue-600 font-medium mt-0.5">+3 this week</div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Mean Cascade Latency</div>
              <div className="text-xl font-bold text-slate-900 mt-1">41.8 Minutes</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Peak: 18m in Tech</div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Polarization Index</div>
              <div className="text-xl font-bold text-slate-900 mt-1">0.24 <span className="text-xs font-normal text-emerald-600 font-medium">(Low Isolation)</span></div>
              <div className="text-[11px] text-slate-500 mt-0.5">Neutral discourse flow</div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 4 Stat Cards, Community Clusters & Cascade Simulator */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4 Stat Cards in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">KEY NODE BRIDGE</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">@techinsider</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Centrality: 0.94</div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">FASTEST EXPANDING</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">GenZ Shoppers</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+44% Velocity</div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">STRONGEST VECTOR</span>
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1 truncate">@tech &lt;=&gt; #AIS...</div>
              <div className="text-[11px] text-slate-500 mt-0.5">18.4K reposts</div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">SIGNAL VELOCITY</span>
                <Compass className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">14.2 nodes/hr</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Optimal Flow</div>
            </div>
          </div>

          {/* Community Clusters Card (Partitioned by Louvain modularity) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Community Clusters</h3>
                <p className="text-[11px] text-slate-500">Partitioned by Louvain modularity algorithm</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                4 Active Hubs
              </span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Technology Pioneers', momentum: '+18%', share: 34, entities: '1,165 active entities', color: 'bg-blue-600' },
                { name: 'Value Shoppers', momentum: '+12%', share: 27, entities: '926 active entities', color: 'bg-emerald-500' },
                { name: 'Green Logistics', momentum: '+31%', share: 21, entities: '720 active entities', color: 'bg-teal-500' },
                { name: 'Campus Tech Chapters', momentum: '+8%', share: 18, entities: '618 active entities', color: 'bg-purple-500' }
              ].map((cluster) => (
                <div key={cluster.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cluster.color}`}></span>
                      <span className="font-bold text-slate-900">{cluster.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-700 font-semibold">{cluster.momentum}</span>
                      <span className="text-slate-400">({cluster.share}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`${cluster.color} h-full rounded-full`} style={{ width: `${cluster.share}%` }}></div>
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">{cluster.entities}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PREDICTIVE TOPOLOGY SANDBOX (Algorithmic Cascade Simulator) */}
          <div className="bg-[#080e22] border border-[#16234f] rounded-xl p-5 shadow-lg text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  PREDICTIVE TOPOLOGY SANDBOX
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Model: EchoCascade-v3</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">Algorithmic Cascade Simulator</h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Project high-order sentiment shock propagation across non-adjacent clusters before release.
              </p>
            </div>

            {/* Active Test Scenario Box */}
            <div className="p-3.5 bg-[#0e193d] border border-blue-900/60 rounded-xl space-y-2.5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">ACTIVE TEST SCENARIO</div>
                  <div className="font-semibold text-slate-200 mt-0.5">
                    "What happens if @techinsider sentiment drops negative?"
                  </div>
                </div>
              </div>

              {/* Spillover Radius */}
              <div className="space-y-1 pt-1 border-t border-blue-950">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Estimated Spillover Radius</span>
                  <span className="font-bold text-rose-400">68% Network Contagion</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-400">Risk to Retail Hub: </span>
                  <span className="font-semibold text-amber-400">Moderate</span>
                </div>
                <div>
                  <span className="text-slate-400">Propagation: </span>
                  <span className="font-semibold text-slate-200">~2.4 hrs</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSimulating ? 'Running Cascade Model...' : 'Run Simulation'}</span>
              </button>
              <button
                onClick={handleResetSimulation}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Simulation feedback toast */}
            {simulationComplete && (
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 space-y-1 animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulation Complete</span>
                </div>
                <p className="text-[11px] leading-snug">
                  Cascade containment recommendation: Direct influencer engagement within 45 mins prevents contagion spread to Retail Shoppers hub.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
