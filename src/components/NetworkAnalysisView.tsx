import React, { useState } from 'react';
import { AnalyticsSummary, CascadeSimulationResult } from '../types';
import { Play, Sparkles, Radio, Share2, Layers, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';

interface NetworkAnalysisViewProps {
  summary: AnalyticsSummary;
}

export const NetworkAnalysisView: React.FC<NetworkAnalysisViewProps> = ({ summary }) => {
  const { topology } = summary;
  const [selectedNode, setSelectedNode] = useState<string | null>('center');
  const [isSimulating, setIsSimulating] = useState(false);
  const [cascadeResult, setCascadeResult] = useState<CascadeSimulationResult | null>(null);

  const handleRunCascade = async () => {
    setIsSimulating(true);
    try {
      const res = await api.simulateCascade(summary.corporation.id, '@techinsider');
      setCascadeResult(res.data);
    } catch (err) {
      console.error('Cascade error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-7xl mx-auto">
      {/* Title & Live Status */}
      <div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            LIVE TELEMETRY GRAPH
          </span>
          <span className="text-xs text-slate-400">Synced 4s ago</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Network Analysis</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Understand how ideas, sentiment and influence spread across communities and clusters.
        </p>
      </div>

      {/* Topology Matrix Canvas Card */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Topology Matrix</h2>
              <p className="text-[11px] text-slate-400">{topology.clusters_count} Clusters • {topology.nodes_active} Nodes Active</p>
            </div>
          </div>
          <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-medium">
            Interactive Visualizer
          </span>
        </div>

        {/* SVG Network Graph Canvas */}
        <div className="relative w-full h-80 sm:h-96 bg-[#070b12] rounded-xl border border-slate-800/60 overflow-hidden flex items-center justify-center">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          <svg viewBox="0 0 500 400" className="w-full h-full">
            {/* Edges */}
            {topology.edges.map((edge) => {
              const src = topology.nodes.find((n) => n.id === edge.source);
              const tgt = topology.nodes.find((n) => n.id === edge.target);
              if (!src || !tgt) return null;
              return (
                <line
                  key={edge.id}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke="#334155"
                  strokeWidth={edge.thickness}
                  strokeDasharray={edge.dashed ? '4 3' : undefined}
                  className="transition-all hover:stroke-blue-400"
                />
              );
            })}

            {/* Nodes */}
            {topology.nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              let fill = '#3b82f6';
              if (node.cluster === 'shopper') fill = '#10b981';
              if (node.cluster === 'media') fill = '#f59e0b';
              if (node.cluster === 'campus') fill = '#a855f7';

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse for anchor */}
                  {node.is_anchor && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.influence_weight + 8}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth={1.5}
                      strokeOpacity={0.4}
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.influence_weight}
                    fill={node.is_anchor ? '#0b1329' : fill}
                    stroke={fill}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-transform group-hover:scale-110"
                  />
                  <text
                    x={node.x}
                    y={node.is_anchor ? node.y - 2 : node.y + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={node.is_anchor ? 9 : 8}
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {node.is_anchor ? '@tech' : node.label}
                  </text>
                  {node.is_anchor && (
                    <text
                      x={node.x}
                      y={node.y + 10}
                      textAnchor="middle"
                      fill="#93c5fd"
                      fontSize={8}
                      fontWeight="bold"
                      className="select-none pointer-events-none"
                    >
                      0.94
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Bottom Canvas Legend */}
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 backdrop-blur-md p-2 rounded-lg border border-slate-800 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Anchor: @techinsider</span>
              <span className="text-slate-500">|</span>
              <span className="text-blue-400 font-semibold">Centrality Index: 0.94</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Tech</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Shopper</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Media</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Campus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Telemetry Metrics (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Key Node Bridge</div>
          <div className="text-base sm:text-lg font-bold text-white mt-1">{topology.key_node_bridge.handle}</div>
          <div className="text-xs text-blue-400 mt-0.5">Centrality {topology.key_node_bridge.centrality}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Fastest Surge</div>
          <div className="text-base sm:text-lg font-bold text-white mt-1">{topology.fastest_surge.segment}</div>
          <div className="text-xs text-emerald-400 mt-0.5">+{topology.fastest_surge.expand_pct}% expand</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Strongest Edge</div>
          <div className="text-base sm:text-lg font-bold text-white mt-1">{topology.strongest_edge.pair}</div>
          <div className="text-xs text-slate-400 mt-0.5">{(topology.strongest_edge.reposts / 1000).toFixed(1)}k reposts</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Signal Speed</div>
          <div className="text-base sm:text-lg font-bold text-white mt-1">{topology.signal_speed.rate} nodes/h</div>
          <div className="text-xs text-emerald-400 mt-0.5">{topology.signal_speed.status}</div>
        </div>
      </div>

      {/* Community Clusters (4) */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">Community Clusters ({topology.clusters.length})</h3>
          <span className="text-xs text-slate-400 font-medium">Ranked by Network Share</span>
        </div>

        <div className="space-y-3">
          {topology.clusters.map((c) => (
            <div key={c.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">{c.name}</div>
                  <div className="text-[11px] text-slate-400">{c.anchor}</div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  +{c.surge}%
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Cluster Penetration</span>
                  <span className="font-semibold text-white">{c.network_share}% network share</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.network_share}%`, backgroundColor: c.color }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulate Cascade Card */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950/40 border border-slate-800/80 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Simulate Cascade</h3>
            <p className="text-xs text-slate-400 mt-0.5">Test propagation if @techinsider goes silent</p>
          </div>
          <button
            onClick={handleRunCascade}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-xs font-bold text-white rounded-lg transition-colors shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isSimulating ? 'Simulating...' : 'Run >'}</span>
          </button>
        </div>

        {cascadeResult && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>Cascade Simulation Results</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Reach Drop</div>
                <div className="text-sm font-bold text-rose-400">-{cascadeResult.reach_reduction_pct}%</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Severed Edges</div>
                <div className="text-sm font-bold text-white">{cascadeResult.severed_edges_count}</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Alternative Bridge</div>
                <div className="text-sm font-bold text-blue-400">{cascadeResult.alternative_bridge}</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Execution Time</div>
                <div className="text-sm font-bold text-emerald-400">{cascadeResult.simulation_duration_ms} ms</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
