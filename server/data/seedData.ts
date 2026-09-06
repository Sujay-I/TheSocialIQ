import { Corporation, SocialPost } from '../../src/types';
import { SentimentEngine } from '../services/sentimentEngine';

export const INITIAL_CORPORATIONS: Corporation[] = [
  {
    id: 'corp-amazon',
    name: 'Amazon',
    slug: 'amazon',
    description: 'Global e-commerce, cloud computing, digital streaming, and artificial intelligence corporation.',
    logo_url: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c2?w=128&auto=format&fit=crop&q=80',
    keywords: ['amazon', 'amazon.com', 'amazon prime', 'prime video', 'aws', 'alexa', 'same-day delivery', 'kindle'],
    hashtags: ['#Amazon', '#AmazonPrime', '#PrimeDelivery', '#AWS', '#ProductX', '#AI', '#Innovation'],
    official_social_accounts: [
      { platform: 'x', handle: '@amazon', connected: true },
      { platform: 'telegram', handle: 'AmazonDealsOfficial', connected: true },
      { platform: 'instagram', handle: '@amazon', connected: true },
      { platform: 'facebook', handle: 'Amazon', connected: true },
      { platform: 'reddit', handle: 'r/amazon', connected: false },
      { platform: 'youtube', handle: 'AmazonOfficial', connected: false }
    ],
    competitors: ['Walmart', 'Target', 'Microsoft', 'Google'],
    data_source: 'demo',
    created_at: '2026-08-01T00:00:00.000Z',
    updated_at: '2026-09-06T00:00:00.000Z'
  },
  {
    id: 'corp-mcdonalds',
    name: "McDonald's",
    slug: 'mcdonalds',
    description: 'Leading global food service retailer with over 38,000 locations serving 68 million customers daily.',
    logo_url: 'https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?w=128&auto=format&fit=crop&q=80',
    keywords: ["mcdonald's", 'mcdonalds', 'mcd', 'big mac', 'mcnuggets', 'happy meal', 'mccafe', 'mcrib'],
    hashtags: ["#McDonalds", '#BigMac', '#McNuggets', '#ImLovinIt', '#McDelivery', '#FastFoodAI'],
    official_social_accounts: [
      { platform: 'x', handle: '@McDonalds', connected: true },
      { platform: 'telegram', handle: 'McDonaldsSpecials', connected: true },
      { platform: 'instagram', handle: '@mcdonalds', connected: true },
      { platform: 'facebook', handle: 'McDonalds', connected: true },
      { platform: 'reddit', handle: 'r/mcdonalds', connected: false },
      { platform: 'youtube', handle: 'McDonaldsGlobal', connected: false }
    ],
    competitors: ['Burger King', "Wendy's", 'KFC', 'Subway'],
    data_source: 'demo',
    created_at: '2026-08-01T00:00:00.000Z',
    updated_at: '2026-09-06T00:00:00.000Z'
  }
];

// Helper to generate realistic date in the past N days
function getTimestampDaysAgo(daysAgo: number, hourOffset: number = 0): string {
  const d = new Date(Date.now() - daysAgo * 86400000 + hourOffset * 3600000);
  return d.toISOString();
}

// Generate realistic posts for Amazon
const rawAmazonPostData = [
  { text: "Ordered a replacement monitor on Amazon at 9 AM and it arrived by 1:30 PM with Same-Day Delivery! Absolutely insane logistics speed.", platform: 'x', author: 'techinsider', followers: 842000, verified: true, likes: 5420, replies: 310, reposts: 1240, topic: '#ProductX', cluster: 'tech', daysAgo: 1 },
  { text: "The new Amazon AI shopping assistant helped me compare four noise-cancelling headphones in 20 seconds and found a coupon. Total gamechanger for checkout!", platform: 'x', author: 'productdaily', followers: 621000, verified: true, likes: 4120, replies: 195, reposts: 890, topic: '#AI', cluster: 'tech', daysAgo: 2 },
  { text: "Amazon's eco-friendly packaging initiative is noticeably better now. Recyclable paper mailers with zero plastic cushions. Huge win for sustainability.", platform: 'instagram', author: 'eco_future_now', followers: 310000, verified: true, likes: 8900, replies: 420, reposts: 1540, topic: '#Innovation', cluster: 'shopper', daysAgo: 3 },
  { text: "Customer service on Amazon resolved my lost package query in under 4 minutes with instant refund to my balance. Very impressed with customer care support.", platform: 'telegram', author: 'deal_hunter_pro', followers: 180000, verified: false, likes: 2100, replies: 140, reposts: 410, topic: '#CustomerSupport', cluster: 'shopper', daysAgo: 4 },
  { text: "Spatial commerce AR sunglasses try-ons on the Amazon app are scarily accurate. Testing real-time virtual mirrors right before clicking 1-click buy.", platform: 'x', author: 'ar_futurist', followers: 145000, verified: true, likes: 3800, replies: 210, reposts: 920, topic: '#AI', cluster: 'tech', daysAgo: 5 },
  { text: "Just witnessed an Amazon Prime Air autonomous drone drop off prescription allergy medication in my suburban backyard. Super quiet and smooth landing!", platform: 'x', author: 'seattle_dan', followers: 42000, verified: false, likes: 6200, replies: 580, reposts: 1800, topic: '#Innovation', cluster: 'campus', daysAgo: 6 },
  { text: "Noticeably disappointed with package delays during the holiday rush. Tracking showed out for delivery for 2 days before arriving crushed.", platform: 'x', author: 'frustrated_buyer_99', followers: 1200, verified: false, likes: 84, replies: 42, reposts: 15, topic: '#CustomerSupport', cluster: 'shopper', daysAgo: 7 },
  { text: "Zero-receipt digital passports on Amazon are a massive deterrent against counterfeit luxury watches. Verifiable cryptographic provenance is the right move.", platform: 'x', author: 'crypto_retailer', followers: 98000, verified: false, likes: 1940, replies: 110, reposts: 490, topic: '#Innovation', cluster: 'tech', daysAgo: 8 },
  { text: "Amazon AWS Lambda and Bedrock integration allowed our startup to deploy an enterprise LLM agent in 3 days. Rock solid infrastructure.", platform: 'x', author: 'cloud_architect_sam', followers: 76000, verified: true, likes: 3200, replies: 140, reposts: 710, topic: '#AI', cluster: 'tech', daysAgo: 9 },
  { text: "Prime Video interface update is clean, fast, and no longer lags when browsing 4K HDR streams on Apple TV.", platform: 'facebook', author: 'streaming_hub', followers: 240000, verified: true, likes: 4500, replies: 310, reposts: 290, topic: '#ProductX', cluster: 'media', daysAgo: 10 },
  { text: "Amazon Prime student membership discount is easily the highest ROI subscription for university students in North America.", platform: 'telegram', author: 'campus_life_deals', followers: 115000, verified: false, likes: 1800, replies: 88, reposts: 320, topic: '#ProductX', cluster: 'campus', daysAgo: 11 },
  { text: "Third-party seller fees feel higher than ever this quarter. Small merchants need fairer margins if Amazon wants to retain boutique makers.", platform: 'x', author: 'merchant_advocate', followers: 52000, verified: false, likes: 890, replies: 145, reposts: 210, topic: '#CustomerSupport', cluster: 'shopper', daysAgo: 12 },
  { text: "The automated checkout with Amazon One palm scan at Whole Foods felt like pure sci-fi. Hovered my hand, walked out with groceries, receipt in email.", platform: 'instagram', author: 'modern_lifestyle', followers: 410000, verified: true, likes: 12400, replies: 670, reposts: 2100, topic: '#AI', cluster: 'tech', daysAgo: 13 },
  { text: "Kindle Paperwhite battery life continues to be unmatched. Reading 2 books a week and haven't charged in a month.", platform: 'facebook', author: 'bookworm_club', followers: 190000, verified: false, likes: 3400, replies: 180, reposts: 290, topic: '#ProductX', cluster: 'media', daysAgo: 14 },
  { text: "Disappointed that Prime same-day delivery cutoff was missed twice this week in our regional hub. Usually reliable though.", platform: 'x', author: 'austin_shopper', followers: 8500, verified: false, likes: 120, replies: 35, reposts: 18, topic: '#CustomerSupport', cluster: 'shopper', daysAgo: 15 },
  { text: "Amazon's automated robotics fulfillment centers are achieving record throughput with 40% less worker strain according to logistics telemetry.", platform: 'x', author: 'robotics_weekly', followers: 128000, verified: true, likes: 4100, replies: 280, reposts: 890, topic: '#Innovation', cluster: 'tech', daysAgo: 16 },
  { text: "Prime gaming free monthly titles this month are actually top tier. Saved $60 on PC games alone.", platform: 'telegram', author: 'gamer_loot_alerts', followers: 290000, verified: true, likes: 7800, replies: 410, reposts: 1450, topic: '#ProductX', cluster: 'media', daysAgo: 17 },
  { text: "Returns at Kohl's and UPS Store for Amazon items remain the most convenient return workflow in all of retail.", platform: 'facebook', author: 'smart_mom_savings', followers: 320000, verified: false, likes: 6200, replies: 340, reposts: 890, topic: '#CustomerSupport', cluster: 'shopper', daysAgo: 18 },
  { text: "Amazon Pharmacy prescription delivery with prime pricing undercut my local drugstore copay by 50%. Incredible service.", platform: 'x', author: 'health_consumer', followers: 34000, verified: false, likes: 2900, replies: 190, reposts: 560, topic: '#Innovation', cluster: 'shopper', daysAgo: 19 },
  { text: "Fake reviews from bot farms are still an issue on generic tech accessories. Glad Amazon is suing syndicates, but need sharper filter algorithms.", platform: 'x', author: 'cyber_auditor', followers: 67000, verified: false, likes: 1450, replies: 180, reposts: 340, topic: '#CustomerSupport', cluster: 'tech', daysAgo: 20 },
  { text: "The 30-day multi-tier Prime Day event broke historical records. Delivered over 375 million items globally with expedited courier dispatch.", platform: 'x', author: 'retail_analyst_wire', followers: 210000, verified: true, likes: 5800, replies: 320, reposts: 1200, topic: '#ProductX', cluster: 'media', daysAgo: 26 }, // Peak delivery day!
  { text: "Amazon Web Services expanding sovereign cloud regions in Europe is a huge regulatory win for GDPR enterprise compliance.", platform: 'x', author: 'eu_tech_policy', followers: 89000, verified: true, likes: 2700, replies: 110, reposts: 640, topic: '#Innovation', cluster: 'tech', daysAgo: 27 },
  { text: "Received an empty parcel box today from Amazon warehouse mix-up. Customer care bot gave replacement code in 2 mins, so fair enough.", platform: 'telegram', author: 'quick_unboxing', followers: 64000, verified: false, likes: 980, replies: 85, reposts: 140, topic: '#CustomerSupport', cluster: 'shopper', daysAgo: 28 },
  { text: "Amazon Fashion virtual fitting room powered by GenAI rendered my exact measurements correctly. No return needed for once!", platform: 'instagram', author: 'fashion_techie', followers: 510000, verified: true, likes: 14200, replies: 780, reposts: 3100, topic: '#AI', cluster: 'shopper', daysAgo: 29 },
  { text: "Prime Music lossless streaming upgrade at no extra charge puts it right up against Spotify and Apple Music.", platform: 'facebook', author: 'audiophile_zone', followers: 140000, verified: false, likes: 3100, replies: 210, reposts: 480, topic: '#ProductX', cluster: 'media', daysAgo: 30 }
];

// Replicate variants to reach 125+ Amazon posts with diverse timestamps and sentiments
export function generateAmazonPosts(): SocialPost[] {
  const posts: SocialPost[] = [];
  const platforms = ['x', 'telegram', 'instagram', 'facebook', 'reddit', 'youtube'] as const;

  // Add primary curated set
  rawAmazonPostData.forEach((item, idx) => {
    const analysis = SentimentEngine.classify(item.text);
    posts.push({
      id: `amz-post-${idx + 1}`,
      corporation_id: 'corp-amazon',
      platform: item.platform as any,
      external_id: `ext-amz-${10000 + idx}`,
      author_id: `auth-${item.author}`,
      author_username: `@${item.author}`,
      author_avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${item.author}`,
      author_followers: item.followers,
      author_verified: item.verified,
      text: item.text,
      timestamp: getTimestampDaysAgo(item.daysAgo, (idx * 3) % 24),
      likes: item.likes,
      replies: item.replies,
      reposts: item.reposts,
      views: item.likes * 12 + item.reposts * 25,
      engagement: item.likes + item.replies + item.reposts,
      sentiment: analysis.label,
      confidence: analysis.confidence,
      nuance: analysis.nuance,
      topic: item.topic,
      cluster: item.cluster,
      language: 'en',
      data_source: 'demo'
    });
  });

  // Expand with realistic synthetic cluster posts across the 30-day timeline
  const topics = ['#ProductX', '#AI', '#CustomerSupport', '#Innovation'];
  const clusters = ['tech', 'shopper', 'media', 'campus'];

  const templates = [
    { text: "Amazon's automated delivery drone trial in suburban areas is getting rave reviews on neighbourhood forums.", sentimentBias: 'positive', topic: '#Innovation', cluster: 'tech' },
    { text: "Why does Amazon video player take 5 seconds to load subtitles? Small bug but annoying on smart TV.", sentimentBias: 'negative', topic: '#ProductX', cluster: 'media' },
    { text: "Fastest turnaround yet: returned an ill-fitting jacket at Amazon Fresh store and receipt cleared before I reached my car.", sentimentBias: 'positive', topic: '#CustomerSupport', cluster: 'shopper' },
    { text: "Testing Amazon Q developer assistant for VS Code. Autocomplete suggestions for AWS SDK are noticeably sharp.", sentimentBias: 'positive', topic: '#AI', cluster: 'tech' },
    { text: "Prime delivery driver went above and beyond hiding package behind the flower planter during heavy rain. Great care.", sentimentBias: 'positive', topic: '#CustomerSupport', cluster: 'shopper' },
    { text: "Amazon packaging redesign saves paper, but cardboard corner was bent during courier transit.", sentimentBias: 'neutral', topic: '#Innovation', cluster: 'shopper' },
    { text: "College campus locker stations from Amazon make picking up textbooks between lectures effortless.", sentimentBias: 'positive', topic: '#ProductX', cluster: 'campus' },
    { text: "Can Amazon please fix the search algorithm? Promoted sponsored results outrank exact model numbers.", sentimentBias: 'negative', topic: '#ProductX', cluster: 'tech' },
    { text: "Checking out with Amazon One biometric palm signature at the stadium concessions was blazing fast.", sentimentBias: 'positive', topic: '#AI', cluster: 'tech' },
    { text: "Great customer care assistance via Amazon chat today. Resolved missing rebate voucher in minutes.", sentimentBias: 'positive', topic: '#CustomerSupport', cluster: 'shopper' }
  ];

  for (let i = 0; i < 95; i++) {
    const tpl = templates[i % templates.length];
    const daysAgo = Math.floor((i / 95) * 30);
    const platform = platforms[i % platforms.length];
    const author = `shopper_${i + 10}`;
    const analysis = SentimentEngine.classify(tpl.text);

    posts.push({
      id: `amz-post-gen-${i + 1}`,
      corporation_id: 'corp-amazon',
      platform,
      external_id: `ext-amz-synth-${20000 + i}`,
      author_id: `auth-synth-${i}`,
      author_username: `@${author}`,
      author_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`,
      author_followers: 1200 + (i * 1500) % 85000,
      author_verified: i % 7 === 0,
      text: tpl.text,
      timestamp: getTimestampDaysAgo(daysAgo, (i * 7) % 24),
      likes: 120 + (i * 47) % 3500,
      replies: 10 + (i * 8) % 280,
      reposts: 25 + (i * 18) % 750,
      views: (120 + (i * 47) % 3500) * 15,
      engagement: (120 + (i * 47) % 3500) + (10 + (i * 8) % 280) + (25 + (i * 18) % 750),
      sentiment: analysis.label,
      confidence: analysis.confidence,
      nuance: analysis.nuance,
      topic: tpl.topic,
      cluster: tpl.cluster,
      language: 'en',
      data_source: 'demo'
    });
  }

  return posts;
}

// Generate realistic posts for McDonald's
export function generateMcDonaldsPosts(): SocialPost[] {
  const posts: SocialPost[] = [];
  const platforms = ['x', 'telegram', 'instagram', 'facebook', 'reddit', 'youtube'] as const;

  const rawMcdData = [
    { text: "McDonald's app loyalty rewards just gave me free large fries and a drink. The mobile order deals are unmatched.", platform: 'x', author: 'burger_lover_99', followers: 142000, verified: false, likes: 4800, replies: 280, reposts: 950, topic: '#AppDeals', cluster: 'shopper', daysAgo: 1 },
    { text: "Testing the AI voice drive-thru at McDonald's suburban pilot location. Understood my custom no-pickles order flawlessly on first try!", platform: 'x', author: 'fastfood_reviewer', followers: 510000, verified: true, likes: 6200, replies: 410, reposts: 1400, topic: '#FastFoodAI', cluster: 'tech', daysAgo: 2 },
    { text: "The McRib return has social media completely going viral again. Line wrapped around the drive-thru lane.", platform: 'instagram', author: 'daily_bites', followers: 320000, verified: true, likes: 11400, replies: 690, reposts: 2800, topic: '#McRib', cluster: 'media', daysAgo: 3 },
    { text: "Self-service touchscreen kiosks in McDonald's make customization so much simpler. Split payment and table service worked instantly.", platform: 'facebook', author: 'tech_in_retail', followers: 89000, verified: false, likes: 2100, replies: 140, reposts: 390, topic: '#FastFoodAI', cluster: 'tech', daysAgo: 4 },
    { text: "Love that McDonald's is moving towards 100% renewable packaging and cage-free eggs globally. Sustainability index trending upward.", platform: 'x', author: 'green_eats', followers: 74000, verified: false, likes: 3100, replies: 190, reposts: 620, topic: '#Sustainability', cluster: 'shopper', daysAgo: 5 },
    { text: "Late night ice cream machine was actually working at 1:45 AM! Truly a rare miracle blessing.", platform: 'x', author: 'midnight_craving', followers: 18000, verified: false, likes: 9200, replies: 520, reposts: 2100, topic: '#McFlurry', cluster: 'campus', daysAgo: 6 },
    { text: "Value meal pricing has crept up a bit too high this year compared to regional competitors. Need more $5 meal bundle options.", platform: 'reddit', author: 'budget_eater', followers: 12000, verified: false, likes: 1800, replies: 340, reposts: 190, topic: '#Pricing', cluster: 'shopper', daysAgo: 7 },
    { text: "Spicy McNuggets with sweet chili glaze is hands down the best seasonal release McDonald's has dropped all decade.", platform: 'x', author: 'foodie_influencer', followers: 420000, verified: true, likes: 8900, replies: 580, reposts: 2200, topic: '#McNuggets', cluster: 'media', daysAgo: 8 },
    { text: "Curbside pickup through the McDonald's mobile app saved me 15 minutes during school rush hour. Hot food handed over with a smile.", platform: 'facebook', author: 'family_bites', followers: 150000, verified: false, likes: 2400, replies: 130, reposts: 410, topic: '#AppDeals', cluster: 'shopper', daysAgo: 10 },
    { text: "McDonald's automated beverage dispensers and fryer robotics in the new test kitchen are boosting order velocity by 35%.", platform: 'x', author: 'automation_insider', followers: 195000, verified: true, likes: 4900, replies: 270, reposts: 1100, topic: '#FastFoodAI', cluster: 'tech', daysAgo: 14 },
    { text: "The international menu rotation featuring McDonald's Japan Ebi Shrimp Burger needs to become permanent everywhere.", platform: 'instagram', author: 'wanderlust_food', followers: 380000, verified: true, likes: 14500, replies: 810, reposts: 3400, topic: '#GlobalMenu', cluster: 'media', daysAgo: 18 },
    { text: "Paper straws still get soggy after 20 minutes in a large McCafe iced coffee. Appreciate the eco intent, but need sturdier fiber.", platform: 'x', author: 'coffee_snob_dan', followers: 23000, verified: false, likes: 890, replies: 140, reposts: 85, topic: '#Sustainability', cluster: 'shopper', daysAgo: 22 },
    { text: "Historical nationwide launch of the $5 meal deal boosted store traffic by 14% this month according to Q3 telemetry.", platform: 'x', author: 'restaurant_business_wire', followers: 160000, verified: true, likes: 3900, replies: 210, reposts: 840, topic: '#Pricing', cluster: 'media', daysAgo: 26 }
  ];

  rawMcdData.forEach((item, idx) => {
    const analysis = SentimentEngine.classify(item.text);
    posts.push({
      id: `mcd-post-${idx + 1}`,
      corporation_id: 'corp-mcdonalds',
      platform: item.platform as any,
      external_id: `ext-mcd-${10000 + idx}`,
      author_id: `auth-mcd-${item.author}`,
      author_username: `@${item.author}`,
      author_avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${item.author}`,
      author_followers: item.followers,
      author_verified: item.verified,
      text: item.text,
      timestamp: getTimestampDaysAgo(item.daysAgo, (idx * 4) % 24),
      likes: item.likes,
      replies: item.replies,
      reposts: item.reposts,
      views: item.likes * 14 + item.reposts * 20,
      engagement: item.likes + item.replies + item.reposts,
      sentiment: analysis.label,
      confidence: analysis.confidence,
      nuance: analysis.nuance,
      topic: item.topic,
      cluster: item.cluster,
      language: 'en',
      data_source: 'demo'
    });
  });

  // Expand with synthetic cluster posts to exceed 110+ posts for McDonald's
  const mcdTemplates = [
    { text: "The breakfast hash browns at McDonald's are a culinary staple of human civilization.", sentimentBias: 'positive', topic: '#AppDeals', cluster: 'campus' },
    { text: "Drive-thru AI voice ordering didn't hear my second combo request because the truck engine next to me was idling loud.", sentimentBias: 'neutral', topic: '#FastFoodAI', cluster: 'tech' },
    { text: "McDonald's app reward points add up so fast if you grab coffee every weekday morning.", sentimentBias: 'positive', topic: '#AppDeals', cluster: 'shopper' },
    { text: "Fresh hot fries right out of the fryer at 3 PM hit differently. Golden perfection.", sentimentBias: 'positive', topic: '#McNuggets', cluster: 'campus' },
    { text: "Waited 18 minutes inside for a simple cheeseburger combo today. Short staffed counter.", sentimentBias: 'negative', topic: '#Pricing', cluster: 'shopper' },
    { text: "McDonald's partnering with anime studios for collector cups and sauce packets created massive lines today.", sentimentBias: 'positive', topic: '#GlobalMenu', cluster: 'media' },
    { text: "The automated ordering kiosk screen was cleaned and wiped down promptly by staff. Good hygiene standard.", sentimentBias: 'positive', topic: '#FastFoodAI', cluster: 'shopper' },
    { text: "App crashed right when I was redeeming the free Big Mac coupon at the counter scanner.", sentimentBias: 'negative', topic: '#AppDeals', cluster: 'tech' }
  ];

  for (let i = 0; i < 100; i++) {
    const tpl = mcdTemplates[i % mcdTemplates.length];
    const daysAgo = Math.floor((i / 100) * 30);
    const platform = platforms[i % platforms.length];
    const author = `mcd_fan_${i + 20}`;
    const analysis = SentimentEngine.classify(tpl.text);

    posts.push({
      id: `mcd-post-gen-${i + 1}`,
      corporation_id: 'corp-mcdonalds',
      platform,
      external_id: `ext-mcd-synth-${30000 + i}`,
      author_id: `auth-mcd-synth-${i}`,
      author_username: `@${author}`,
      author_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`,
      author_followers: 800 + (i * 950) % 65000,
      author_verified: i % 8 === 0,
      text: tpl.text,
      timestamp: getTimestampDaysAgo(daysAgo, (i * 5) % 24),
      likes: 90 + (i * 35) % 2800,
      replies: 8 + (i * 6) % 190,
      reposts: 18 + (i * 14) % 620,
      views: (90 + (i * 35) % 2800) * 12,
      engagement: (90 + (i * 35) % 2800) + (8 + (i * 6) % 190) + (18 + (i * 14) % 620),
      sentiment: analysis.label,
      confidence: analysis.confidence,
      nuance: analysis.nuance,
      topic: tpl.topic,
      cluster: tpl.cluster,
      language: 'en',
      data_source: 'demo'
    });
  }

  return posts;
}

// In-memory persistent state holding corporations and posts
let corporations: Corporation[] = [...INITIAL_CORPORATIONS];
let allPosts: SocialPost[] = [...generateAmazonPosts(), ...generateMcDonaldsPosts()];

export const DataStore = {
  getCorporations: () => corporations,
  getCorporationById: (id: string) => corporations.find(c => c.id === id || c.slug === id),
  addCorporation: (corp: Corporation) => {
    corporations.push(corp);
    return corp;
  },
  updateCorporation: (id: string, updates: Partial<Corporation>) => {
    const idx = corporations.findIndex(c => c.id === id || c.slug === id);
    if (idx >= 0) {
      corporations[idx] = { ...corporations[idx], ...updates, updated_at: new Date().toISOString() };
      return corporations[idx];
    }
    return null;
  },
  deleteCorporation: (id: string) => {
    corporations = corporations.filter(c => c.id !== id && c.slug !== id);
    allPosts = allPosts.filter(p => p.corporation_id !== id);
    return true;
  },
  getPostsByCorporation: (corpId: string) => {
    return allPosts.filter(p => p.corporation_id === corpId);
  },
  addPosts: (posts: SocialPost[]) => {
    allPosts.push(...posts);
  },
  resetDemoData: () => {
    corporations = [...INITIAL_CORPORATIONS];
    allPosts = [...generateAmazonPosts(), ...generateMcDonaldsPosts()];
  }
};
