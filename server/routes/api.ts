import { Router } from 'express';
import { DataStore } from '../data/seedData';
import { AnalyticsEngine } from '../services/analyticsEngine';
import { SentimentEngine } from '../services/sentimentEngine';
import { GeminiIntelligenceService } from '../services/geminiService';
import { NetworkEngine } from '../services/networkEngine';
import { ReportService } from '../services/reportService';
import { ModeAnalyticsService } from '../services/modeAnalyticsService';
import { Corporation, IngestionJob, SocialPost, TimeRange } from '../../src/types';

const router = Router();

// Track in-memory ingestion jobs
const activeJobs: IngestionJob[] = [];

// ==========================================
// Unified Mode Analytics API
// GET /api/analytics?mode=corporate&organization=amazon
// GET /api/analytics?mode=personal
// GET /api/analytics?mode=education&institution=stanford
// ==========================================
const handleModeAnalytics = (req: any, res: any) => {
  const mode = (req.query.mode as string) || 'corporate';
  const range = (req.query.range as TimeRange) || '30D';
  const organization = (req.query.organization as string) || 'amazon';
  const institution = (req.query.institution as string) || 'stanford';

  if (mode === 'personal') {
    const data = ModeAnalyticsService.getPersonalAnalytics(range);
    return res.json({ mode: 'personal', data });
  }

  if (mode === 'education') {
    const data = ModeAnalyticsService.getEducationAnalytics(institution, range);
    return res.json({ mode: 'education', data });
  }

  // Corporate Mode
  let corp = DataStore.getCorporationById(organization);
  if (!corp) {
    const allCorps = DataStore.getCorporations();
    corp = allCorps.find(c => c.slug.includes(organization.toLowerCase()) || c.name.toLowerCase().includes(organization.toLowerCase())) || allCorps[0];
  }

  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const posts = DataStore.getPostsByCorporation(corp.id);
  const summary = AnalyticsEngine.calculateSummary(corp, posts, range);
  return res.json({ mode: 'corporate', organization: corp.slug, data: summary });
};

router.get('/v1/analytics', handleModeAnalytics);
router.get('/analytics', handleModeAnalytics);

// ==========================================
// Health & Observability Endpoint
// ==========================================
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    api: true,
    database: true,
    model: true,
    model_version: 'cardiffnlp/twitter-roberta-base-sentiment',
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// Corporation Management APIs
// ==========================================
router.get('/v1/corporations', (req, res) => {
  const corps = DataStore.getCorporations();
  res.json({ data: corps });
});

router.post('/v1/corporations', (req, res) => {
  const { name, description, keywords, hashtags, competitors, logo_url } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: { code: 'INVALID_NAME', message: 'Corporation name is required' } });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const existing = DataStore.getCorporationById(slug);
  if (existing) {
    return res.status(409).json({ error: { code: 'ALREADY_EXISTS', message: 'A corporation with this name or slug already exists' } });
  }

  const newCorp: Corporation = {
    id: `corp-${Date.now()}`,
    name,
    slug,
    description: description || `Corporate intelligence profile for ${name}`,
    logo_url: logo_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80',
    keywords: Array.isArray(keywords) ? keywords : [name.toLowerCase()],
    hashtags: Array.isArray(hashtags) ? hashtags : [`#${name.replace(/\s+/g, '')}`],
    official_social_accounts: [
      { platform: 'x', handle: `@${slug}`, connected: false },
      { platform: 'telegram', handle: `${name}Official`, connected: false },
      { platform: 'instagram', handle: `@${slug}`, connected: false },
      { platform: 'facebook', handle: name, connected: false },
      { platform: 'reddit', handle: `r/${slug}`, connected: false },
      { platform: 'youtube', handle: `${name}HQ`, connected: false }
    ],
    competitors: Array.isArray(competitors) ? competitors : [],
    data_source: 'demo',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  DataStore.addCorporation(newCorp);

  // Generate initial starter social posts for the new corporation
  const starterTexts = [
    `Excited to see how ${name} is accelerating their product roadmap this quarter!`,
    `Just tried the new service from ${name}. Super smooth experience and prompt support.`,
    `Hoping ${name} improves customer turnaround times on the mobile app.`,
    `Impressive innovation and modern tech stack showcased by ${name} team today.`,
    `Great sustainability initiative announced by ${name}. Looking forward to the results.`
  ];

  const starterPosts: SocialPost[] = starterTexts.map((text, idx) => {
    const analysis = SentimentEngine.classify(text);
    return {
      id: `post-${newCorp.id}-${idx + 1}`,
      corporation_id: newCorp.id,
      platform: 'x',
      external_id: `ext-${Date.now()}-${idx}`,
      author_id: `auth-${idx}`,
      author_username: `@analyst_${idx + 1}`,
      author_followers: 12000 + idx * 4500,
      author_verified: idx === 0,
      text,
      timestamp: new Date(Date.now() - idx * 86400000).toISOString(),
      likes: 340 + idx * 120,
      replies: 28 + idx * 8,
      reposts: 45 + idx * 15,
      views: (340 + idx * 120) * 10,
      engagement: (340 + idx * 120) + (28 + idx * 8) + (45 + idx * 15),
      sentiment: analysis.label,
      confidence: analysis.confidence,
      nuance: analysis.nuance,
      topic: newCorp.hashtags[0] || `#${name}`,
      language: 'en',
      data_source: 'demo'
    };
  });

  DataStore.addPosts(starterPosts);

  res.status(201).json({ data: newCorp });
});

router.get('/v1/corporations/:id', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }
  res.json({ data: corp });
});

router.put('/v1/corporations/:id', (req, res) => {
  const updated = DataStore.updateCorporation(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }
  res.json({ data: updated });
});

router.delete('/v1/corporations/:id', (req, res) => {
  const ok = DataStore.deleteCorporation(req.params.id);
  res.json({ success: ok });
});

// ==========================================
// Analytics Endpoints
// ==========================================
router.get('/v1/corporations/:id/analytics', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const range = (req.query.range as TimeRange) || '30D';
  const posts = DataStore.getPostsByCorporation(corp.id);
  const summary = AnalyticsEngine.calculateSummary(corp, posts, range);

  res.json(summary);
});

router.get('/v1/corporations/:id/sentiment', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const range = (req.query.range as TimeRange) || '30D';
  const posts = DataStore.getPostsByCorporation(corp.id);
  const summary = AnalyticsEngine.calculateSummary(corp, posts, range);

  res.json({
    sentiment_timeline: summary.sentiment_timeline,
    positive_pct: summary.metrics.positive_pct,
    neutral_pct: summary.metrics.neutral_pct,
    negative_pct: summary.metrics.negative_pct,
    net_sentiment_status: summary.metrics.net_sentiment_status,
    channel_telemetry: summary.channel_telemetry
  });
});

router.get('/v1/corporations/:id/trends', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const range = (req.query.range as TimeRange) || '30D';
  const posts = DataStore.getPostsByCorporation(corp.id);
  const summary = AnalyticsEngine.calculateSummary(corp, posts, range);

  res.json({
    breakthrough_drivers: summary.breakthrough_drivers,
    timeline_milestones: summary.timeline_milestones,
    high_growth_drivers: summary.high_growth_drivers,
    aggregated_platform_index: {
      score: 94.8,
      pts_change: 34.2,
      forecast_horizon: '72h Forecast',
      curve: [
        { time: 'T-48h', ai_shopping: 40, same_day: 30, eco_pack: 22 },
        { time: 'T-24h', ai_shopping: 68, same_day: 52, eco_pack: 38 },
        { time: 'Realtime Peak', ai_shopping: 94.8, same_day: 82, eco_pack: 54 }
      ]
    }
  });
});

router.get('/v1/corporations/:id/network', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const topology = AnalyticsEngine.generateTopologyData(corp);
  res.json({ data: topology });
});

// Cascade simulation endpoint
router.post('/v1/corporations/:id/simulate-cascade', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const target = req.body.node_id || '@techinsider';
  const result = NetworkEngine.simulateCascade(corp, target);
  res.json({ data: result });
});

// ==========================================
// Posts Explorer & Filters
// ==========================================
router.get('/v1/corporations/:id/posts', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  let posts = DataStore.getPostsByCorporation(corp.id);

  // Filter by platform
  if (req.query.platform && req.query.platform !== 'all') {
    posts = posts.filter(p => p.platform === req.query.platform);
  }

  // Filter by sentiment
  if (req.query.sentiment && req.query.sentiment !== 'all') {
    posts = posts.filter(p => p.sentiment === req.query.sentiment);
  }

  // Filter by search keyword
  if (req.query.q) {
    const q = (req.query.q as string).toLowerCase();
    posts = posts.filter(p => p.text.toLowerCase().includes(q) || p.author_username.toLowerCase().includes(q) || (p.topic && p.topic.toLowerCase().includes(q)));
  }

  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 15;
  const total = posts.length;
  const start = (page - 1) * limit;
  const paginated = posts.slice(start, start + limit);

  res.json({
    data: paginated,
    meta: {
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit)
    }
  });
});

// ==========================================
// Ingestion & Manual Import
// ==========================================
router.post('/v1/corporations/:id/ingest', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const platform = req.body.platform || 'x';
  const job: IngestionJob = {
    id: `job-${Date.now()}`,
    corporation_id: corp.id,
    platform,
    status: 'completed',
    posts_fetched: 24,
    posts_analyzed: 24,
    started_at: new Date(Date.now() - 3200).toISOString(),
    completed_at: new Date().toISOString()
  };

  activeJobs.unshift(job);
  res.json({
    message: `Ingestion completed for ${corp.name} on ${platform}`,
    job
  });
});

router.post('/v1/corporations/:id/import', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: { code: 'INVALID_IMPORT', message: 'Array of post items is required' } });
  }

  const importedPosts: SocialPost[] = items.map((item, idx) => {
    const text = SentimentEngine.cleanText(item.text || '');
    const analysis = SentimentEngine.classify(text);

    return {
      id: `imported-${Date.now()}-${idx}`,
      corporation_id: corp.id,
      platform: item.platform || 'x',
      external_id: item.external_id || `imp-${Date.now()}-${idx}`,
      author_id: item.author_id || `imp-auth-${idx}`,
      author_username: item.author_username || `@user_${idx + 1}`,
      author_followers: Number(item.author_followers) || 1200,
      author_verified: Boolean(item.author_verified),
      text,
      timestamp: item.timestamp || new Date().toISOString(),
      likes: Number(item.likes) || 0,
      replies: Number(item.replies) || 0,
      reposts: Number(item.reposts) || 0,
      views: (Number(item.likes) || 0) * 8,
      engagement: (Number(item.likes) || 0) + (Number(item.replies) || 0) + (Number(item.reposts) || 0),
      sentiment: analysis.label,
      confidence: analysis.confidence,
      nuance: analysis.nuance,
      topic: item.topic || corp.hashtags[0] || '#Brand',
      language: item.language || 'en',
      data_source: 'imported'
    };
  });

  DataStore.addPosts(importedPosts);

  // Update corporation data_source indicator to imported
  DataStore.updateCorporation(corp.id, { data_source: 'imported' });

  res.status(201).json({
    message: `Successfully imported and classified ${importedPosts.length} posts`,
    count: importedPosts.length
  });
});

// ==========================================
// AI Insights & Synthesis
// ==========================================
router.get('/v1/corporations/:id/insights', async (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const posts = DataStore.getPostsByCorporation(corp.id);
  const summary = AnalyticsEngine.calculateSummary(corp, posts, '30D');
  res.json({ data: summary.ai_synthesis });
});

router.post('/v1/corporations/:id/insights/generate', async (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const posts = DataStore.getPostsByCorporation(corp.id);
  const summary = AnalyticsEngine.calculateSummary(corp, posts, '30D');

  const generated = await GeminiIntelligenceService.generateExecutiveSynthesis(corp, summary);
  res.json({ data: generated });
});

// ==========================================
// Reports Endpoints
// ==========================================
router.get('/v1/corporations/:id/reports', (req, res) => {
  const corp = DataStore.getCorporationById(req.params.id);
  if (!corp) {
    return res.status(404).json({ error: { code: 'CORPORATION_NOT_FOUND', message: 'Corporation not found' } });
  }

  const posts = DataStore.getPostsByCorporation(corp.id);
  const summary = AnalyticsEngine.calculateSummary(corp, posts, '30D');
  const report = ReportService.generateExecutiveReport(corp, summary);

  if (req.query.format === 'csv') {
    const csvData = ReportService.generatePostsCsv(posts);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="socialiq-${corp.slug}-report.csv"`);
    return res.send(csvData);
  }

  res.json({ data: report });
});

// ==========================================
// Reset Demo Data
// ==========================================
router.post('/v1/corporations/reset-demo', (req, res) => {
  DataStore.resetDemoData();
  res.json({ message: 'Demo data reset successfully' });
});

export default router;
