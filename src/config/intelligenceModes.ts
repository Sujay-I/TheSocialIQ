import {
  Building2,
  Users,
  GraduationCap,
  LayoutGrid,
  Smile,
  TrendingUp,
  Award,
  Share2,
  MessageSquare,
  Database,
  BarChart3,
  FileText,
  BellRing,
  Activity,
  Compass,
  Heart,
  ShieldCheck,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { IntelligenceMode } from '../types';

export interface NavItemConfig {
  id: string;
  label: string;
  path: string;
  icon: any;
  badge?: string;
}

export interface NavGroupConfig {
  title: string;
  items: NavItemConfig[];
}

export interface IntelligenceModeConfig {
  id: IntelligenceMode;
  name: string;
  shortName: string;
  subtitle: string;
  workspaceTitle: string;
  description: string;
  basePath: string;
  icon: any;
  hasOrganizationSelector: boolean;
  hasInstitutionSelector: boolean;
  privacyBadge?: string;
  navigation: NavGroupConfig[];
  demoEntities?: { id: string; name: string; type?: string }[];
}

export const INTELLIGENCE_MODES: Record<IntelligenceMode, IntelligenceModeConfig> = {
  corporate: {
    id: 'corporate',
    name: 'Corporate Intelligence',
    shortName: 'Corporate',
    subtitle: 'Consumer & Market Intelligence',
    workspaceTitle: 'Audience & Corporate Intelligence',
    description: 'Understand how your customers think, feel and behave across global omnichannel networks.',
    basePath: '/corporate',
    icon: Building2,
    hasOrganizationSelector: true,
    hasInstitutionSelector: false,
    demoEntities: [
      { id: 'corp-amazon', name: 'Amazon' },
      { id: 'corp-mcdonalds', name: "McDonald's" }
    ],
    navigation: [
      {
        title: 'OVERVIEW',
        items: [
          { id: 'overview', label: 'Overview', path: '/corporate', icon: LayoutGrid }
        ]
      },
      {
        title: 'INTELLIGENCE',
        items: [
          { id: 'sentiment', label: 'Sentiment', path: '/corporate/sentiment', icon: Smile },
          { id: 'trends', label: 'Consumer Trends', path: '/corporate/trends', icon: TrendingUp },
          { id: 'audience', label: 'Audience', path: '/corporate/audience', icon: Users },
          { id: 'influencers', label: 'Influencers', path: '/corporate/influencers', icon: Award },
          { id: 'network', label: 'Network Analysis', path: '/corporate/network', icon: Share2 }
        ]
      },
      {
        title: 'DATA & OPERATIONS',
        items: [
          { id: 'conversations', label: 'Conversation Explorer', path: '/corporate/conversations', icon: MessageSquare },
          { id: 'platforms', label: 'Platform Analytics', path: '/corporate/platforms', icon: BarChart3 },
          { id: 'datasources', label: 'Data Sources', path: '/corporate/datasources', icon: Database }
        ]
      },
      {
        title: 'WORKSPACE',
        items: [
          { id: 'reports', label: 'Reports', path: '/corporate/reports', icon: FileText },
          { id: 'alerts', label: 'Alerts', path: '/corporate/alerts', icon: BellRing }
        ]
      }
    ]
  },

  personal: {
    id: 'personal',
    name: 'Family Intelligence',
    shortName: 'Personal',
    subtitle: 'Family & Personal Intelligence',
    workspaceTitle: 'Family & Household Intelligence',
    description: 'Understand activity patterns, interests and sentiment while keeping insights privacy-first.',
    basePath: '/personal',
    icon: Users,
    hasOrganizationSelector: false,
    hasInstitutionSelector: false,
    privacyBadge: 'Privacy-first insights • Aggregated to protect individual privacy',
    navigation: [
      {
        title: 'OVERVIEW',
        items: [
          { id: 'overview', label: 'Overview', path: '/personal', icon: LayoutGrid }
        ]
      },
      {
        title: 'DISCOVERY & PATTERNS',
        items: [
          { id: 'activity', label: 'Activity Insights', path: '/personal/activity', icon: Activity },
          { id: 'topics', label: 'Topics', path: '/personal/topics', icon: Compass },
          { id: 'interests', label: 'Interests', path: '/personal/interests', icon: Sparkles },
          { id: 'sentiment', label: 'Sentiment Trends', path: '/personal/sentiment', icon: Heart }
        ]
      },
      {
        title: 'TELEMETRY & PRIVACY',
        items: [
          { id: 'platforms', label: 'Platform Activity', path: '/personal/platforms', icon: BarChart3 },
          { id: 'reports', label: 'Reports', path: '/personal/reports', icon: FileText },
          { id: 'privacy', label: 'Privacy Standards', path: '/personal/privacy', icon: ShieldCheck, badge: 'Protected' }
        ]
      }
    ]
  },

  education: {
    id: 'education',
    name: 'Institution Intelligence',
    shortName: 'Education',
    subtitle: 'Student & Institution Intelligence',
    workspaceTitle: 'Student & Institution Intelligence',
    description: 'Understand student sentiment, campus conversations and community trends without individual surveillance.',
    basePath: '/education',
    icon: GraduationCap,
    hasOrganizationSelector: false,
    hasInstitutionSelector: true,
    privacyBadge: 'Aggregated student voices • Zero surveillance compliant',
    demoEntities: [
      { id: 'stanford', name: 'Stanford University', type: 'Research University' },
      { id: 'mit', name: 'MIT Tech Institute', type: 'Polytechnic Institute' },
      { id: 'berkeley', name: 'UC Berkeley', type: 'Public Research University' }
    ],
    navigation: [
      {
        title: 'OVERVIEW',
        items: [
          { id: 'overview', label: 'Overview', path: '/education', icon: LayoutGrid }
        ]
      },
      {
        title: 'CAMPUS VOICE',
        items: [
          { id: 'sentiment', label: 'Student Sentiment', path: '/education/sentiment', icon: Smile },
          { id: 'trends', label: 'Campus Trends', path: '/education/trends', icon: TrendingUp },
          { id: 'community', label: 'Community Insights', path: '/education/community', icon: BookOpen },
          { id: 'influence', label: 'Influence Mapping', path: '/education/influence', icon: Award }
        ]
      },
      {
        title: 'CHANNELS & DATA',
        items: [
          { id: 'conversations', label: 'Conversation Explorer', path: '/education/conversations', icon: MessageSquare },
          { id: 'platforms', label: 'Platform Analytics', path: '/education/platforms', icon: BarChart3 },
          { id: 'datasources', label: 'Data Sources', path: '/education/datasources', icon: Database }
        ]
      },
      {
        title: 'WORKSPACE',
        items: [
          { id: 'reports', label: 'Reports', path: '/education/reports', icon: FileText },
          { id: 'alerts', label: 'Alerts', path: '/education/alerts', icon: BellRing }
        ]
      }
    ]
  }
};
