import { PersonalAnalyticsSummary, EducationAnalyticsSummary, TimeRange } from '../../src/types';

export class ModeAnalyticsService {
  public static getPersonalAnalytics(range: TimeRange = '30D'): PersonalAnalyticsSummary {
    return {
      mode: 'personal',
      title: 'Family Intelligence',
      description: 'Understand activity patterns, interests and sentiment while keeping insights privacy-first.',
      privacy_statement: 'Privacy-first insights. Insights are strictly aggregated and anonymized to protect individual privacy (COPPA compliant).',
      metrics: {
        topics_explored: 34,
        topics_growth_pct: 12.4,
        interest_trends_index: 86.4,
        interest_growth_pct: 18.2,
        activity_patterns_hours: 4.2,
        activity_growth_pct: -6.4, // screen time balance improved
        sentiment_positive_pct: 82.6,
        sentiment_growth_pct: 5.8,
        positive_pct: 82.6,
        neutral_pct: 12.2,
        negative_pct: 5.2
      },
      topics: [
        {
          id: 'top-1',
          name: 'STEM & Robotics Learning Kits',
          category: 'Education & Play',
          mentions: '14.8K',
          sentiment: '94% Positive',
          growth: '+42% MoM',
          safety_rating: 'Family Verified',
          tags: ['Robotics', 'Coding for Kids', 'Hands-on'],
          description: 'Screen-free logic toys and programmable kits gaining record enthusiasm among household educators.'
        },
        {
          id: 'top-2',
          name: 'Family Camping & Nature Trails',
          category: 'Outdoor Recreation',
          mentions: '12.4K',
          sentiment: '91% Positive',
          growth: '+31% MoM',
          safety_rating: 'Kid Friendly',
          tags: ['National Parks', 'Eco-Travel', 'Weekend Getaway'],
          description: 'Eco-conscious weekend itineraries and tech-light outdoor trips are the top rising interest.'
        },
        {
          id: 'top-3',
          name: 'Digital Wellness & Screen Balance',
          category: 'Family Habits',
          mentions: '9.8K',
          sentiment: '88% Positive',
          growth: '+28% MoM',
          safety_rating: 'Parent Approved',
          tags: ['Screen Breaks', 'Nighttime Routines', 'Focus Mode'],
          description: 'Household routines adopting automatic evening Wi-Fi pause and joint board game hours.'
        },
        {
          id: 'top-4',
          name: 'Cooperative Family Video Games',
          category: 'Entertainment',
          mentions: '8.6K',
          sentiment: '86% Positive',
          growth: '+19% MoM',
          safety_rating: 'E For Everyone',
          tags: ['Local Co-Op', 'Puzzle Games', 'Creative Sandbox'],
          description: 'Multi-generational gaming sessions in creative sandbox platforms like Minecraft Education.'
        },
        {
          id: 'top-5',
          name: 'Home Cooked Clean Nutrition',
          category: 'Health & Wellness',
          mentions: '7.2K',
          sentiment: '93% Positive',
          growth: '+24% MoM',
          safety_rating: 'All Ages',
          tags: ['Meal Prep', 'Zero Sugar Treats', 'Cooking Together'],
          description: 'Kid-involved weekend meal prepping and whole-food snack hacks trending across household channels.'
        }
      ],
      interests: [
        { name: 'STEM & Science Discovery', growth: 42.5, engagement: '18.4K interactions', share_pct: 32 },
        { name: 'Outdoor Hobbies & Nature', growth: 31.0, engagement: '14.2K interactions', share_pct: 26 },
        { name: 'Creative Arts & Music', growth: 22.8, engagement: '10.8K interactions', share_pct: 18 },
        { name: 'Digital Wellness & Reading', growth: 18.4, engagement: '8.6K interactions', share_pct: 14 },
        { name: 'Culinary Cooking at Home', growth: 14.1, engagement: '6.2K interactions', share_pct: 10 }
      ],
      activity_patterns: [
        { time_slot: '07:00 - 09:00', weekday_index: 22, weekend_index: 15 },
        { time_slot: '09:00 - 12:00', weekday_index: 45, weekend_index: 68 },
        { time_slot: '12:00 - 14:00', weekday_index: 38, weekend_index: 54 },
        { time_slot: '14:00 - 17:00', weekday_index: 52, weekend_index: 78 },
        { time_slot: '17:00 - 19:00', weekday_index: 84, weekend_index: 92 },
        { time_slot: '19:00 - 21:00', weekday_index: 62, weekend_index: 74 },
        { time_slot: '21:00 - 23:00', weekday_index: 14, weekend_index: 22 }
      ],
      sentiment_timeline: [
        { date: 'Week 1', positive: 78, neutral: 16, negative: 6 },
        { date: 'Week 2', positive: 81, neutral: 14, negative: 5 },
        { date: 'Week 3', positive: 80, neutral: 15, negative: 5 },
        { date: 'Week 4', positive: 85, neutral: 11, negative: 4 }
      ],
      platform_distribution: [
        { platform: 'YouTube Kids & Learning', share_pct: 34, avg_minutes: 42, family_rating: 'G - High Curated' },
        { platform: 'Duolingo & Language Apps', share_pct: 24, avg_minutes: 25, family_rating: 'Educational' },
        { platform: 'Khan Academy & STEM Labs', share_pct: 18, avg_minutes: 38, family_rating: 'Academic' },
        { platform: 'Roblox Studio (Creative Mode)', share_pct: 14, avg_minutes: 45, family_rating: 'Parent Monitored' },
        { platform: 'Spotify Family Audiobooks', share_pct: 10, avg_minutes: 30, family_rating: 'Wholesome' }
      ],
      privacy_controls: {
        k_anonymity_factor: 50,
        zero_pii_enforced: true,
        coppa_compliant: true,
        data_retention_days: 14
      }
    };
  }

  public static getEducationAnalytics(institutionId: string = 'stanford', range: TimeRange = '30D'): EducationAnalyticsSummary {
    const institutions: Record<string, { name: string; type: string; students: string }> = {
      stanford: { name: 'Stanford University', type: 'Research University', students: '17,400' },
      mit: { name: 'MIT Tech Institute', type: 'Polytechnic Institute', students: '11,900' },
      berkeley: { name: 'UC Berkeley', type: 'Public Research University', students: '45,300' }
    };

    const inst = institutions[institutionId] || institutions['stanford'];

    return {
      mode: 'education',
      title: 'Student & Institution Intelligence',
      description: 'Understand student sentiment, campus conversations and community trends without individual surveillance.',
      institution: {
        id: institutionId,
        name: inst.name,
        type: inst.type,
        students_count: inst.students
      },
      metrics: {
        student_sentiment_nps: 71,
        sentiment_growth_pct: 8.4,
        campus_engagement_count: `${inst.students} Students Active`,
        engagement_growth_pct: 21.6,
        trending_topics_count: 24,
        topics_growth_pct: 14.8,
        community_discussions_daily: '1,420',
        activity_growth_pct: 18.2,
        positive_pct: 78.4,
        neutral_pct: 14.2,
        negative_pct: 7.4
      },
      sentiment_timeline: [
        { date: 'T-28d', positive: 70, neutral: 20, negative: 10, milestone: 'Semester Kickoff' },
        { date: 'T-21d', positive: 74, neutral: 18, negative: 8, milestone: 'Club Fair' },
        { date: 'T-14d', positive: 72, neutral: 19, negative: 9, milestone: 'Midterm Prep' },
        { date: 'T-7d', positive: 81, neutral: 13, negative: 6, milestone: 'Career & Internship Expo' },
        { date: 'Present', positive: 78.4, neutral: 14.2, negative: 7.4, milestone: 'Annual Hackathon' }
      ],
      campus_trends: [
        {
          id: 'trend-1',
          topic: 'Fall Career & Tech Internship Fair',
          category: 'Placements & Career',
          mentions: '18.4K',
          sentiment_score: 86,
          sentiment_label: 'Positive',
          wow_growth: '+68% WoW',
          status: 'High Impact'
        },
        {
          id: 'trend-2',
          topic: 'Annual 36-Hour Hackathon Registrations',
          category: 'Student Innovation',
          mentions: '14.2K',
          sentiment_score: 95,
          sentiment_label: 'Very Positive',
          wow_growth: '+84% WoW',
          status: 'Trending Surge'
        },
        {
          id: 'trend-3',
          topic: 'Campus Dining & Late Night Study Spaces',
          category: 'Campus Amenities',
          mentions: '11.8K',
          sentiment_score: 79,
          sentiment_label: 'Positive',
          wow_growth: '+38% WoW',
          status: 'Steady Pulse'
        },
        {
          id: 'trend-4',
          topic: 'Midterm Exam Scheduling & Study Rooms',
          category: 'Academics',
          mentions: '9.6K',
          sentiment_score: 68,
          sentiment_label: 'Moderate',
          wow_growth: '+42% WoW',
          status: 'Attention Needed'
        },
        {
          id: 'trend-5',
          topic: 'Autonomous Campus Transit & Bike Lanes',
          category: 'Infrastructure',
          mentions: '8.1K',
          sentiment_score: 84,
          sentiment_label: 'Positive',
          wow_growth: '+22% WoW',
          status: 'Favorable'
        }
      ],
      community_insights: [
        {
          pillar: 'Academic Quality & Tutoring',
          score: 88,
          change: '+4.2%',
          highlight: 'Open AI tutoring pilot received praise from 84% of engineering and humanities undergraduates.'
        },
        {
          pillar: 'Career & Placement Readiness',
          score: 92,
          change: '+8.1%',
          highlight: 'Over 140 enterprise recruiters visited campus; high offer turnout noted in CS and Bioengineering.'
        },
        {
          pillar: 'Campus Life & Mental Wellness',
          score: 81,
          change: '+6.4%',
          highlight: 'Peer counseling workshops and extended library wellness hours drove positive community discourse.'
        },
        {
          pillar: 'Housing & Residential Amenities',
          score: 74,
          change: '+2.1%',
          highlight: 'Students requested faster maintenance responses for heating and campus bike repair racks.'
        }
      ],
      influence_mapping: [
        {
          vector_name: 'Student Government Association (SGA)',
          category: 'Elected Leadership',
          reach: '15.2K Students',
          sentiment_stance: 'Advocacy & Constructive',
          focus_area: 'Housing subsidies & transit expansion'
        },
        {
          vector_name: 'Campus Tech & AI Society',
          category: 'Academic Club',
          reach: '8.4K Students',
          sentiment_stance: 'Highly Collaborative',
          focus_area: 'Hackathons, open source labs, hardware grants'
        },
        {
          vector_name: 'Daily Campus Chronicle (Student Press)',
          category: 'Campus Media',
          reach: '14.6K Readers',
          sentiment_stance: 'Objective & In-depth',
          focus_area: 'University governance & campus sustainability'
        },
        {
          vector_name: 'Graduate Student Council',
          category: 'Postgrad Leadership',
          reach: '6.8K Students',
          sentiment_stance: 'Research-focused',
          focus_area: 'Stipend equity & conference travel funds'
        }
      ],
      platform_activity: [
        { channel: 'Campus Discord Community', active_students: '12.4K', sentiment_positive: 84, volume_surge: '+28%' },
        { channel: 'University Subreddit r/campus', active_students: '18.1K', sentiment_positive: 76, volume_surge: '+19%' },
        { channel: 'X / Twitter Campus Voice', active_students: '7.8K', sentiment_positive: 82, volume_surge: '+14%' },
        { channel: 'Official Student Portal Forums', active_students: '14.9K', sentiment_positive: 89, volume_surge: '+35%' }
      ],
      ai_campus_synthesis: {
        headline: 'Overall student morale is buoyant (+71 NPS) driven by fall career fairs and innovation hackathons.',
        summary: 'Campus sentiment indicates strong appreciation for career recruitment partnerships and expanded 24-hour library study lounges. Midterm examination anxiety is being mitigated by student-led peer study groups. Recommended operational focus: increase late-night transit shuttle frequency around dining commons.',
        recommended_action: 'Increase weekend library shuttle routes and deploy additional power outlets in Science Quad study hubs.',
        confidence_pct: 94.2
      }
    };
  }
}
