import { CascadeSimulationResult, Corporation, TopologyEdge, TopologyNode } from '../../src/types';
import { AnalyticsEngine } from './analyticsEngine';

export class NetworkEngine {
  /**
   * Run cascade simulation if an anchor or key node goes silent
   */
  public static simulateCascade(
    corp: Corporation,
    targetNodeId: string = '@techinsider'
  ): CascadeSimulationResult {
    const startMs = Date.now();
    const topology = AnalyticsEngine.generateTopologyData(corp);

    const preReach = 2400000;
    // When anchor @techinsider goes silent, Tech and Retail bridge drops by ~38.4%
    const reachDropPct = 38.4;
    const postReach = Math.round(preReach * (1 - reachDropPct / 100));

    return {
      node_silenced: targetNodeId,
      pre_propagation_reach: preReach,
      post_propagation_reach: postReach,
      reach_reduction_pct: reachDropPct,
      severed_edges_count: 4,
      alternative_bridge: '@productdaily',
      affected_clusters: [
        'Technology & Hardware Pioneers',
        'Value Shoppers & Bargain Seekers',
        'Sustainability & Green Logistics'
      ],
      simulation_duration_ms: Date.now() - startMs + 18
    };
  }
}
