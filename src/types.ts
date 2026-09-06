export type SentimentLabel = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export type DataSourceType = 'live' | 'demo' | 'imported';

export type TimeRange = '7D' | '30D' | '90D' | 'custom';

export type PlatformType = 'x' | 'telegram' | 'instagram' | 'facebook' | 'reddit' | 'youtube';

export type IntelligenceMode = 'corporate' | 'personal' | 'education';

export interface ModeConfig {
  id: IntelligenceMode;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  basePath: string;
  privacyBadge?: string;
}

export interface PersonalAnalyticsSummary {
  mode: 'personal';
  title: string;
  description: string;
  privacy_statement: string;
  metrics: {
    topics_explored: number;
    topics_growth_pct: number;
    interest_trends_index: number;
    interest_growth_pct: number;
    activity_patterns_hours: number;
    activity_growth_pct: number;
    sentiment_positive_pct: number;
    sentiment_growth_pct: number;
    positive_pct: number;
    neutral_pct: number;
    negative_pct: number;
  };
  topics: {
    id: string;
    name: string;
    category: string;
    mentions: string;
    sentiment: string;
    growth: string;
    safety_rating: string;
    tags: string[];
    description: string;
  }[];
  interests: {
    name: string;
    growth: number;
    engagement: string;
    share_pct: number;
  }[];
  activity_patterns: {
    time_slot: string;
    weekday_index: number;
    weekend_index: number;
  }[];
  sentiment_timeline: {
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
  platform_distribution: {
    platform: string;
    share_pct: number;
    avg_minutes: number;
    family_rating: string;
  }[];
  privacy_controls: {
    k_anonymity_factor: number;
    zero_pii_enforced: boolean;
    coppa_compliant: boolean;
    data_retention_days: number;
  };
}

export interface EducationAnalyticsSummary {
  mode: 'education';
  title: string;
  description: string;
  institution: {
    id: string;
    name: string;
    type: string;
    students_count: string;
  };
  metrics: {
    student_sentiment_nps: number;
    sentiment_growth_pct: number;
    campus_engagement_count: string;
    engagement_growth_pct: number;
    trending_topics_count: number;
    topics_growth_pct: number;
    community_discussions_daily: string;
    activity_growth_pct: number;
    positive_pct: number;
    neutral_pct: number;
    negative_pct: number;
  };
  sentiment_timeline: {
    date: string;
    positive: number;
    neutral: number;
    negative: number;
    milestone?: string;
  }[];
  campus_trends: {
    id: string;
    topic: string;
    category: string;
    mentions: string;
    sentiment_score: number;
    sentiment_label: string;
    wow_growth: string;
    status: string;
  }[];
  community_insights: {
    pillar: string;
    score: number;
    change: string;
    highlight: string;
  }[];
  influence_mapping: {
    vector_name: string;
    category: string;
    reach: string;
    sentiment_stance: string;
    focus_area: string;
  }[];
  platform_activity: {
    channel: string;
    active_students: string;
    sentiment_positive: number;
    volume_surge: string;
  }[];
  ai_campus_synthesis: {
    headline: string;
    summary: string;
    recommended_action: string;
    confidence_pct: number;
  };
}

export interface Corporation {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  keywords: string[];
  hashtags: string[];
  official_social_accounts: {
    platform: PlatformType;
    handle: string;
    connected: boolean;
  }[];
  competitors: string[];
  data_source: DataSourceType;
  created_at: string;
  updated_at: string;
}

export interface SocialPost {
  id: string;
  corporation_id: string;
  platform: PlatformType;
  external_id: string;
  author_id: string;
  author_username: string;
  author_avatar?: string;
  author_followers?: number;
  author_verified?: boolean;
  text: string;
  timestamp: string;
  likes: number;
  replies: number;
  reposts: number;
  views?: number;
  engagement: number;
  sentiment: SentimentLabel;
  confidence: number;
  nuance?: 'excitement' | 'frustration' | 'satisfaction' | 'concern' | 'urgency' | 'supportive';
  topic: string;
  cluster?: string;
  url?: string;
  language: string;
  data_source: DataSourceType;
}

export interface SentimentBucket {
  date: string;
  label?: string;
  positive: number;
  neutral: number;
  negative: number;
  total_mentions: number;
  net_score: number;
  peak_event?: string;
}

export interface TopicDriver {
  id: string;
  name: string;
  mentions: number;
  growth_percentage: number;
  sentiment: SentimentLabel;
  category?: string;
}

export interface BreakthroughDriver {
  id: string;
  rank: number;
  title: string;
  subtitle: string;
  spike_confidence: number;
  growth_wow: number;
  mentions: number;
  engagement: number;
  velocity_score: number | string;
  cluster_drivers: string[];
  sparkline: number[];
  category: string;
}

export interface TimelineMilestone {
  time_horizon: '24h' | '48h' | '7d';
  cluster_type: string;
  title: string;
  description: string;
  volume_surge: string;
  tags: string[];
}

export interface TopologyNode {
  id: string;
  label: string;
  cluster: 'tech' | 'shopper' | 'media' | 'campus';
  centrality: number;
  influence_weight: number;
  x: number;
  y: number;
  is_anchor?: boolean;
  active?: boolean;
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
  thickness: number;
  volume: number;
  dashed?: boolean;
}

export interface CommunityCluster {
  id: string;
  name: string;
  anchor: string;
  network_share: number;
  surge: number;
  color: string;
}

export interface KeyOpinionVector {
  handle: string;
  name: string;
  avatar: string;
  verified: boolean;
  followers: number;
  score: number;
  sentiment_stance: string;
}

export interface AudienceDemographics {
  age_distribution: {
    bracket: string;
    percentage: number;
  }[];
  dominant_hub: string;
  affinity_sector: string;
  privacy_standard: string;
}

export interface ChannelTelemetry {
  platform: PlatformType;
  display_name: string;
  mentions: number;
  sentiment_score: number;
  connected: boolean;
  status: 'active' | 'configured' | 'unconnected';
}

export interface AnalyticsSummary {
  corporation: {
    id: string;
    name: string;
    slug: string;
  };
  data_source: DataSourceType;
  period: {
    range: TimeRange;
    from: string;
    to: string;
  };
  metrics: {
    total_mentions: number;
    mentions_previous: number;
    mentions_growth_pct: number;
    net_sentiment_pct: number;
    net_sentiment_status: 'Bullish' | 'Neutral' | 'Bearish';
    net_sentiment_growth_pct: number;
    positive_pct: number;
    neutral_pct: number;
    negative_pct: number;
    total_engagement: number;
    engagement_growth_pct: number;
    total_reach: number;
    reach_growth_pct: number;
    velocity_status: string;
    ai_confidence_pct: number;
  };
  ai_synthesis: {
    headline: string;
    velocity: string;
    confidence: number;
    summary: string;
    updated_at: string;
    model: string;
    early_warning_signal?: {
      virality_timeline: string;
      virality_score_pct: number;
      prediction: string;
      model: string;
    };
  };
  sentiment_timeline: SentimentBucket[];
  high_growth_drivers: TopicDriver[];
  channel_telemetry: ChannelTelemetry[];
  audience_archetype: AudienceDemographics;
  key_opinion_vectors: KeyOpinionVector[];
  breakthrough_drivers: BreakthroughDriver[];
  timeline_milestones: TimelineMilestone[];
  topology: {
    clusters_count: number;
    nodes_active: number;
    key_node_bridge: {
      handle: string;
      centrality: number;
    };
    fastest_surge: {
      segment: string;
      expand_pct: number;
    };
    strongest_edge: {
      pair: string;
      reposts: number;
    };
    signal_speed: {
      rate: number;
      status: string;
    };
    nodes: TopologyNode[];
    edges: TopologyEdge[];
    clusters: CommunityCluster[];
  };
}

export interface IngestionJob {
  id: string;
  corporation_id: string;
  platform: PlatformType;
  status: 'pending' | 'running' | 'completed' | 'failed';
  posts_fetched: number;
  posts_analyzed: number;
  started_at: string;
  completed_at?: string;
  error_message?: string;
}

export interface CascadeSimulationResult {
  node_silenced: string;
  pre_propagation_reach: number;
  post_propagation_reach: number;
  reach_reduction_pct: number;
  severed_edges_count: number;
  alternative_bridge: string;
  affected_clusters: string[];
  simulation_duration_ms: number;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_ALREADY_EXISTS'
  | 'EMAIL_NOT_VERIFIED'
  | 'INVALID_RESET_TOKEN'
  | 'EXPIRED_RESET_TOKEN'
  | 'NETWORK_ERROR'
  | 'SESSION_EXPIRED'
  | 'UNAUTHORIZED'
  | 'ACCOUNT_LOCKED';

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  intelligenceMode?: IntelligenceMode;
  organizationId?: string;
  organizationName?: string;
  role?: string;
  initials?: string;
  avatar?: string;
  avatar_url?: string;
  theme?: string;
  notifications_enabled?: boolean;
  authMethod?: 'credentials' | 'sso' | 'demo';
  createdAt?: string;
  lastLoginAt?: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  agreeTerms?: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface OnboardingSetupData {
  intelligenceMode: IntelligenceMode;
  organizationName?: string;
  industry?: string;
  keywords?: string[];
  competitors?: string[];
  interests?: string[];
  institutionName?: string;
  institutionType?: string;
  monitoringAreas?: string[];
  connectedSources?: string[];
}
