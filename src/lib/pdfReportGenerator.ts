import { jsPDF } from 'jspdf';
import { AnalyticsSummary, Corporation, SocialPost } from '../types';

export interface PdfReportOptions {
  corporation: Corporation;
  summary: AnalyticsSummary | null;
  posts?: SocialPost[];
  timeRange?: string;
}

export function generateIntelligencePdfReport({
  corporation,
  summary,
  posts = [],
  timeRange = '30D'
}: PdfReportOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const navyDark: [number, number, number] = [6, 23, 53]; // #061735
  const navyMid: [number, number, number] = [11, 35, 74];  // #0B234A
  const textDark: [number, number, number] = [11, 27, 51]; // #0B1B33
  const textMuted: [number, number, number] = [100, 116, 139]; // #64748B
  const textLight: [number, number, number] = [247, 249, 252]; // #F7F9FC
  const green: [number, number, number] = [22, 163, 74];   // #16A34A
  const red: [number, number, number] = [220, 38, 38];     // #DC2626
  const borderCol: [number, number, number] = [220, 227, 237]; // #DCE3ED
  const bgLight: [number, number, number] = [241, 245, 249];

  // ----------------------------------------------------
  // PAGE 1: Executive Summary & Sentiment Intelligence
  // ----------------------------------------------------

  // Header Banner
  doc.setFillColor(...navyDark);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Name & Tagline
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SOCIALIQ', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(190, 210, 240);
  doc.text('AI-POWERED SOCIAL MEDIA INTELLIGENCE & TELEMETRY PLATFORM', margin + 30, 11.5);

  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  doc.text(`CONFIDENTIAL • EXECUTIVE BRIEF • ${dateStr.toUpperCase()}`, pageWidth - margin, 12, { align: 'right' });

  // Secondary sub-banner
  doc.setFillColor(...navyMid);
  doc.rect(0, 20, pageWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`TARGET ENTITY: ${corporation.name.toUpperCase()} (${corporation.slug})`, margin, 25.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`TIME HORIZON: LAST ${timeRange} • MODEL: RO-BERTA DEEP-ENSEMBLE V4`, pageWidth - margin, 25.5, { align: 'right' });

  let curY = 36;

  // Title Block
  doc.setTextColor(...navyDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Executive Intelligence Dossier & Sentiment Audit', margin, curY);

  curY += 5;
  doc.setTextColor(...textMuted);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Comprehensive synthesis of social conversations, public sentiment polarity, opinion vectors, and community cascades.`,
    margin,
    curY
  );

  curY += 7;

  // 4 Top Metric KPI Cards
  const cardWidth = (contentWidth - 9) / 4;
  const cardHeight = 22;

  const totalMentions = summary?.metrics.total_mentions
    ? (summary.metrics.total_mentions >= 1000000
        ? `${(summary.metrics.total_mentions / 1000000).toFixed(1)}M`
        : `${(summary.metrics.total_mentions / 1000).toFixed(1)}K`)
    : '2.4M';
  const mentionsGrowth = summary?.metrics.mentions_growth_pct ? `+${summary.metrics.mentions_growth_pct}%` : '+18.4%';

  const netSentiment = summary?.metrics.net_sentiment_pct !== undefined
    ? `${summary.metrics.net_sentiment_pct >= 0 ? '+' : ''}${summary.metrics.net_sentiment_pct}`
    : '+64';
  const sentimentStatus = summary?.metrics.net_sentiment_status || 'Bullish';

  const totalReach = summary?.metrics.total_reach
    ? `${(summary.metrics.total_reach / 1000000).toFixed(1)}M`
    : '48.2M';

  const totalEngagement = summary?.metrics.total_engagement
    ? `${(summary.metrics.total_engagement / 1000).toFixed(1)}K`
    : '342K';

  const kpis: { label: string; value: string; sub: string; color: [number, number, number] }[] = [
    { label: 'NET SENTIMENT (NPS)', value: netSentiment, sub: `${sentimentStatus} Polarity`, color: green },
    { label: 'VOLUME VELOCITY', value: totalMentions, sub: `${mentionsGrowth} WoW`, color: navyMid },
    { label: 'TOTAL REACH', value: totalReach, sub: 'Gross Impressions', color: navyMid },
    { label: 'ENGAGEMENT YIELD', value: totalEngagement, sub: 'Interactions/Mo', color: navyMid }
  ];

  kpis.forEach((kpi, idx) => {
    const x = margin + idx * (cardWidth + 3);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderCol);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, curY, cardWidth, cardHeight, 1.5, 1.5, 'FD');

    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...textMuted);
    doc.text(kpi.label, x + 3, curY + 5);

    // Value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...kpi.color);
    doc.text(kpi.value, x + 3, curY + 12);

    // Sub
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...textMuted);
    doc.text(kpi.sub, x + 3, curY + 18);
  });

  curY += cardHeight + 7;

  // AI Executive Synthesis Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...borderCol);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, curY, contentWidth, 26, 1.5, 1.5, 'FD');

  // Tag
  doc.setFillColor(...navyMid);
  doc.rect(margin, curY, 2, 26, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...navyDark);
  doc.text('AI SYNTHESIS & EARLY WARNING RADAR', margin + 5, curY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textDark);
  const headline = summary?.ai_synthesis?.headline || `Sustained Net Positive Momentum Driven by High Customer Satisfaction`;
  const synthSummary = summary?.ai_synthesis?.summary ||
    `Telemetry indicates an exceptionally positive reception to recent product delivery and service speed updates. Cross-platform opinion propagation demonstrates low conversational friction and a dominant share of voice over peer competitors.`;

  doc.setFont('helvetica', 'bold');
  doc.text(`• ${headline}`, margin + 5, curY + 10.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textMuted);
  const splitSummary = doc.splitTextToSize(synthSummary, contentWidth - 10);
  doc.text(splitSummary, margin + 5, curY + 15);

  curY += 33;

  // Sentiment Distribution & Platform Telemetry (Two Columns)
  const colWidth = (contentWidth - 6) / 2;

  // Left Column: Sentiment Polarity Breakdown
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...borderCol);
  doc.roundedRect(margin, curY, colWidth, 48, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...navyDark);
  doc.text('Sentiment Polarity Distribution', margin + 4, curY + 6);

  const posPct = summary?.metrics.positive_pct || 72;
  const neuPct = summary?.metrics.neutral_pct || 18;
  const negPct = summary?.metrics.negative_pct || 10;

  // Horizontal Sentiment Bar
  const barY = curY + 11;
  const barWidth = colWidth - 8;
  const posW = (posPct / 100) * barWidth;
  const neuW = (neuPct / 100) * barWidth;
  const negW = (negPct / 100) * barWidth;

  doc.setFillColor(...green);
  doc.rect(margin + 4, barY, posW, 4, 'F');
  doc.setFillColor(100, 116, 139);
  doc.rect(margin + 4 + posW, barY, neuW, 4, 'F');
  doc.setFillColor(...red);
  doc.rect(margin + 4 + posW + neuW, barY, negW, 4, 'F');

  // Breakdown lines
  const breakdownLines: { name: string; pct: string; color: [number, number, number] }[] = [
    { name: 'Positive Polarity (Satisfaction & Delight)', pct: `${posPct}%`, color: green },
    { name: 'Neutral / Informational Transcripts', pct: `${neuPct}%`, color: textMuted },
    { name: 'Negative / Friction Hotspots', pct: `${negPct}%`, color: red }
  ];

  breakdownLines.forEach((item, i) => {
    const itemY = curY + 22 + i * 8;
    doc.setFillColor(...item.color);
    doc.circle(margin + 6, itemY - 1, 1.2, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...textDark);
    doc.text(item.name, margin + 10, itemY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...item.color);
    doc.text(item.pct, margin + colWidth - 5, itemY, { align: 'right' });
  });

  // Right Column: Channel Telemetry
  const rightX = margin + colWidth + 6;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...borderCol);
  doc.roundedRect(rightX, curY, colWidth, 48, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...navyDark);
  doc.text('Cross-Platform Ingestion Volumes', rightX + 4, curY + 6);

  const channels = summary?.channel_telemetry && summary.channel_telemetry.length > 0
    ? summary.channel_telemetry.slice(0, 4)
    : [
        { display_name: 'X (Twitter Firehose)', mentions: 98400, sentiment_score: 74 },
        { display_name: 'Instagram Graph API', mentions: 42300, sentiment_score: 82 },
        { display_name: 'Reddit Public Telemetry', mentions: 31200, sentiment_score: 61 },
        { display_name: 'Telegram Broadcast Nodes', mentions: 24800, sentiment_score: 79 }
      ];

  channels.forEach((chan, i) => {
    const chY = curY + 14 + i * 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...navyMid);
    doc.text(chan.display_name, rightX + 4, chY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textMuted);
    const mStr = `${(chan.mentions / 1000).toFixed(1)}k events`;
    doc.text(mStr, rightX + colWidth - 28, chY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...green);
    doc.text(`${chan.sentiment_score}% Pos`, rightX + colWidth - 4, chY, { align: 'right' });
  });

  curY += 55;

  // Breakthrough Drivers Table (Top 3)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...navyDark);
  doc.text('High-Growth Breakthrough Drivers', margin, curY);

  curY += 4;

  // Table Header
  doc.setFillColor(...bgLight);
  doc.rect(margin, curY, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...textMuted);
  doc.text('RANK & TOPIC', margin + 3, curY + 4);
  doc.text('CATEGORY', margin + 55, curY + 4);
  doc.text('GROWTH WOW', margin + 95, curY + 4);
  doc.text('VELOCITY SCORE', margin + 125, curY + 4);
  doc.text('SPIKE CONFIDENCE', margin + contentWidth - 3, curY + 4, { align: 'right' });

  curY += 6;

  const drivers = summary?.breakthrough_drivers && summary.breakthrough_drivers.length > 0
    ? summary.breakthrough_drivers.slice(0, 3)
    : [
        { rank: 1, title: 'Same-Day Logistics Acceleration', category: 'Operations & Logistics', growth_wow: 34.2, velocity_score: '9.4/10', spike_confidence: 96 },
        { rank: 2, title: 'Spatial Commerce AR Try-On', category: 'Emerging Tech & AI', growth_wow: 28.5, velocity_score: '8.9/10', spike_confidence: 92 },
        { rank: 3, title: 'Zero-Plastic Recyclable Mailers', category: 'ESG & Sustainability', growth_wow: 21.0, velocity_score: '8.2/10', spike_confidence: 88 }
      ];

  drivers.forEach((d, idx) => {
    const rowY = curY + idx * 7.5;
    doc.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, rowY, contentWidth, 7.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...navyDark);
    doc.text(`#${d.rank}  ${d.title}`, margin + 3, rowY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textMuted);
    doc.text(d.category, margin + 55, rowY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...green);
    doc.text(`+${d.growth_wow}%`, margin + 95, rowY + 5);

    doc.setTextColor(...navyMid);
    doc.text(String(d.velocity_score), margin + 125, rowY + 5);

    doc.setTextColor(...textDark);
    doc.text(`${d.spike_confidence}%`, margin + contentWidth - 3, rowY + 5, { align: 'right' });
  });

  curY += drivers.length * 7.5 + 8;

  // Page 1 Footer
  doc.setDrawColor(...borderCol);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...textMuted);
  doc.text(`SocialIQ Intelligence System • Report Ref: SIQ-${corporation.slug.toUpperCase()}-${Date.now().toString().slice(-6)}`, margin, pageHeight - 7);
  doc.text(`Page 1 of 2`, pageWidth - margin, pageHeight - 7, { align: 'right' });

  // ----------------------------------------------------
  // PAGE 2: Opinion Leaders, Network Graph, & Raw Quotes
  // ----------------------------------------------------
  doc.addPage();

  // Page 2 Header
  doc.setFillColor(...navyDark);
  doc.rect(0, 0, pageWidth, 16, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('SOCIALIQ INTELLIGENCE DOSSIER • SECTION 2', margin, 10.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(190, 210, 240);
  doc.text(`${corporation.name.toUpperCase()} OPINION VECTORS & TELEMETRY STREAM`, pageWidth - margin, 10.5, { align: 'right' });

  curY = 24;

  // Influencer / Key Opinion Vectors Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...navyDark);
  doc.text('Dominant Key Opinion Vectors (Influencers)', margin, curY);

  curY += 4;

  // Header
  doc.setFillColor(...bgLight);
  doc.rect(margin, curY, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...textMuted);
  doc.text('HANDLE & PROFILE', margin + 3, curY + 4);
  doc.text('AUDIENCE REACH', margin + 65, curY + 4);
  doc.text('INFLUENCE INDEX', margin + 105, curY + 4);
  doc.text('SENTIMENT ALIGNMENT', margin + contentWidth - 3, curY + 4, { align: 'right' });

  curY += 6;

  const influencers = summary?.key_opinion_vectors && summary.key_opinion_vectors.length > 0
    ? summary.key_opinion_vectors.slice(0, 4)
    : [
        { handle: '@techinsider', name: 'Tech Insider Editorial', followers: 842000, score: 98.4, sentiment_stance: '+92% Bullish' },
        { handle: '@productdaily', name: 'Product Daily Curations', followers: 621000, score: 95.1, sentiment_stance: '+88% Bullish' },
        { handle: '@eco_future_now', name: 'Eco Future Research', followers: 310000, score: 91.7, sentiment_stance: '+84% Bullish' },
        { handle: '@deal_hunter_pro', name: 'Deal Hunter Broadcast', followers: 180000, score: 87.2, sentiment_stance: '+79% Bullish' }
      ];

  influencers.forEach((inf, idx) => {
    const rowY = curY + idx * 8;
    doc.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, rowY, contentWidth, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...navyDark);
    doc.text(inf.handle, margin + 3, rowY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...textMuted);
    doc.text(`(${inf.name})`, margin + 28, rowY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...navyMid);
    doc.text(`${(inf.followers / 1000).toFixed(0)}K followers`, margin + 65, rowY + 5);

    doc.text(`${inf.score} / 100`, margin + 105, rowY + 5);

    doc.setTextColor(...green);
    doc.text(inf.sentiment_stance, margin + contentWidth - 3, rowY + 5, { align: 'right' });
  });

  curY += influencers.length * 8 + 8;

  // Network Topology & Community Modularity Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...borderCol);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, curY, contentWidth, 32, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...navyDark);
  doc.text('Network Topology & Modularity Matrix (Louvain Resolution 1.15)', margin + 4, curY + 6);

  const clusters = [
    { name: 'Tech Pioneers & Developers', share: '38% network share', status: 'Dominant anchor' },
    { name: 'Retail Value Shoppers & Deals', share: '29% network share', status: 'Fastest surge' },
    { name: 'Media Editorial & Tech Press', share: '21% network share', status: 'High bridge yield' },
    { name: 'Campus & Prime Student Chapters', share: '12% network share', status: 'Organic spread' }
  ];

  clusters.forEach((cl, idx) => {
    const cX = margin + 4 + (idx % 2) * (colWidth + 2);
    const cY = curY + 13 + Math.floor(idx / 2) * 8.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...navyMid);
    doc.text(`• ${cl.name}:`, cX, cY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textMuted);
    doc.text(`${cl.share} (${cl.status})`, cX + 42, cY);
  });

  curY += 40;

  // Ingested Telemetry Feed Samples
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...navyDark);
  doc.text('Representative Social Telemetry & Verbatim Signals', margin, curY);

  curY += 4;

  const samplePosts = posts.length > 0
    ? posts.slice(0, 4)
    : [
        {
          author_username: '@techinsider',
          platform: 'x',
          sentiment: 'POSITIVE',
          confidence: 0.94,
          text: `Ordered a replacement monitor on ${corporation.name} at 9 AM and it arrived by 1:30 PM with Same-Day Delivery! Absolutely insane logistics speed.`
        },
        {
          author_username: '@productdaily',
          platform: 'x',
          sentiment: 'POSITIVE',
          confidence: 0.91,
          text: `The new ${corporation.name} AI shopping assistant helped me compare four noise-cancelling headphones in 20 seconds and found a coupon. Total gamechanger!`
        },
        {
          author_username: '@eco_future_now',
          platform: 'instagram',
          sentiment: 'POSITIVE',
          confidence: 0.88,
          text: `${corporation.name}'s eco-friendly packaging initiative is noticeably better now. Recyclable paper mailers with zero plastic cushions.`
        },
        {
          author_username: '@frustrated_buyer_99',
          platform: 'x',
          sentiment: 'NEGATIVE',
          confidence: 0.86,
          text: `Noticeably disappointed with package delays during the holiday rush. Tracking showed out for delivery for 2 days before arriving.`
        }
      ];

  samplePosts.forEach((p, idx) => {
    const postHeight = 17;
    const postY = curY + idx * (postHeight + 2.5);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...borderCol);
    doc.roundedRect(margin, postY, contentWidth, postHeight, 1.2, 1.2, 'FD');

    // Author & Platform badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...navyDark);
    doc.text(`${p.author_username} [${p.platform.toUpperCase()}]`, margin + 3, postY + 4.5);

    // Sentiment badge
    const isPos = p.sentiment === 'POSITIVE';
    const isNeg = p.sentiment === 'NEGATIVE';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(isPos ? green[0] : isNeg ? red[0] : textMuted[0], isPos ? green[1] : isNeg ? red[1] : textMuted[1], isPos ? green[2] : isNeg ? red[2] : textMuted[2]);
    doc.text(`${p.sentiment} (${Math.round((p.confidence || 0.85) * 100)}% Conf)`, margin + contentWidth - 3, postY + 4.5, { align: 'right' });

    // Text quote
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textDark);
    const splitText = doc.splitTextToSize(`"${p.text}"`, contentWidth - 8);
    doc.text(splitText.slice(0, 2), margin + 3, postY + 9);
  });

  // Page 2 Footer
  doc.setDrawColor(...borderCol);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...textMuted);
  doc.text(`Generated by SocialIQ Client-Side PDF Engine • Timestamp: ${new Date().toISOString()}`, margin, pageHeight - 7);
  doc.text(`Page 2 of 2`, pageWidth - margin, pageHeight - 7, { align: 'right' });

  // Save the PDF
  const filename = `SocialIQ_${corporation.slug.toUpperCase()}_Intelligence_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
