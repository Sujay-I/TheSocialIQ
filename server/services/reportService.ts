import { AnalyticsSummary, Corporation, SocialPost } from '../../src/types';

export class ReportService {
  /**
   * Generates CSV report of analyzed posts
   */
  public static generatePostsCsv(posts: SocialPost[]): string {
    const headers = ['ID', 'Platform', 'Author', 'Timestamp', 'Sentiment', 'Confidence', 'Likes', 'Replies', 'Reposts', 'Engagement', 'Topic', 'Text'];
    const rows = posts.map(p => [
      p.id,
      p.platform,
      `"${p.author_username.replace(/"/g, '""')}"`,
      p.timestamp,
      p.sentiment,
      p.confidence.toFixed(2),
      p.likes,
      p.replies,
      p.reposts,
      p.engagement,
      `"${(p.topic || '').replace(/"/g, '""')}"`,
      `"${p.text.replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  /**
   * Generates structured executive report
   */
  public static generateExecutiveReport(corp: Corporation, summary: AnalyticsSummary) {
    return {
      title: `SocialIQ Executive Intelligence Report — ${corp.name}`,
      corporation: corp.name,
      generated_at: new Date().toISOString(),
      period: summary.period,
      executive_summary: summary.ai_synthesis.headline,
      key_metrics: {
        total_mentions: summary.metrics.total_mentions,
        mentions_growth: `${summary.metrics.mentions_growth_pct}%`,
        net_sentiment: `${summary.metrics.net_sentiment_pct}% (${summary.metrics.net_sentiment_status})`,
        positive_ratio: `${summary.metrics.positive_pct}%`,
        neutral_ratio: `${summary.metrics.neutral_pct}%`,
        negative_ratio: `${summary.metrics.negative_pct}%`,
        total_engagement: summary.metrics.total_engagement,
        estimated_reach: summary.metrics.total_reach
      },
      breakthrough_drivers: summary.breakthrough_drivers.map(d => ({
        rank: d.rank,
        driver: d.title,
        growth: `+${d.growth_wow}% WoW`,
        confidence: `${d.spike_confidence}%`,
        velocity: d.velocity_score
      })),
      early_warning_signal: summary.ai_synthesis.early_warning_signal,
      channel_distribution: summary.channel_telemetry.map(c => ({
        channel: c.display_name,
        mentions: c.mentions,
        status: c.status
      })),
      compliance_notes: 'All public telemetry gathered within terms of service and anonymized under strict privacy standards.'
    };
  }
}
