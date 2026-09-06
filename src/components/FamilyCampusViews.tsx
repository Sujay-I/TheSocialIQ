import React, { useState } from 'react';
import { Corporation } from '../types';
import {
  Users,
  GraduationCap,
  Sparkles,
  Heart,
  TrendingUp,
  Download,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Building2,
  Award,
  MessageSquare
} from 'lucide-react';

interface FamilyCampusProps {
  corporation: Corporation;
}

export const FamilyIntelligenceView: React.FC<FamilyCampusProps> = ({ corporation }) => {
  const [activeSubTab, setActiveSubTab] = useState<'kpis' | 'transcripts'>('kpis');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const householdFeedback = [
    {
      user: '@jen_parenting22',
      text: 'Amazon Kids+ and Prime household sharing saved our tablet setup. One subscription covers our twins without duplicate billing.',
      platform: 'Instagram',
      sentiment: '+94% Pos',
      date: '2h ago'
    },
    {
      user: '@family_tech_dad',
      text: 'Combined shipping locker pickup near our elementary school is super convenient. Much safer than porch packages.',
      platform: 'Reddit',
      sentiment: '+88% Pos',
      date: '5h ago'
    },
    {
      user: '@clara_m_home',
      text: 'Wish parental control pin resets were faster on Fire TV, but the family library sharing is rock solid.',
      platform: 'X',
      sentiment: '+76% Pos',
      date: '1d ago'
    }
  ];

  const handleExport = () => {
    const content = JSON.stringify(
      {
        corporation: corporation.name,
        category: 'Family & Household Intelligence Dossier',
        householdRetention: '94.8%',
        sharedPrimeAccounts: '1.8M',
        parentSatisfaction: '89% Pos',
        verifiedDate: new Date().toISOString()
      },
      null,
      2
    );
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${corporation.slug}-family-intelligence-dossier.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('Household Intelligence Dossier exported.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>HOUSEHOLD TELEMETRY</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">Family Multi-User Dynamics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Family & Household Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Analyze family shared accounts, prime household benefits, parenting feedback, and kids product adoption for{' '}
            <strong className="text-slate-800">{corporation.name}</strong>.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Household Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">HOUSEHOLD RETENTION</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">94.8%</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">+3.2% vs single users</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">SHARED PRIME ACCOUNTS</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">1.8M</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">2.4 members avg per household</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">PARENT SATISFACTION</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">89% Pos</div>
          <div className="text-xs text-slate-500 mt-1">Parental approval on content & delivery</div>
        </div>
      </div>

      {/* Tabs Container */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveSubTab('kpis')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                activeSubTab === 'kpis' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Adoption Breakdown
            </button>
            <button
              onClick={() => setActiveSubTab('transcripts')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                activeSubTab === 'transcripts' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parent & Household Feedback
            </button>
          </div>
          <span className="text-xs text-slate-400">Verified Household Telemetry</span>
        </div>

        {activeSubTab === 'kpis' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Prime Kids+ & Parental Controls</span>
              </div>
              <p className="text-slate-600">
                82% of surveyed parents cite robust content curation and device usage time limits as key subscription retention drivers.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Multi-Profile Teen Shopping</span>
              </div>
              <p className="text-slate-600">
                Approvals feature reduced unauthorized family card usage by 68%, generating strong positive trust sentiment.
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'transcripts' && (
          <div className="divide-y divide-slate-100">
            {householdFeedback.map((f, i) => (
              <div key={i} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{f.user}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      {f.platform}
                    </span>
                    <span className="text-[10px] text-slate-400">{f.date}</span>
                  </div>
                  <p className="text-xs text-slate-700">{f.text}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold font-mono">
                  {f.sentiment}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#061735] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-500/30 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};

export const EducationCampusView: React.FC<FamilyCampusProps> = ({ corporation }) => {
  const [activeSubTab, setActiveSubTab] = useState<'hubs' | 'perks'>('hubs');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const campusHubs = [
    { school: 'MIT (Massachusetts Institute of Technology)', state: 'Active Hub', students: '14,200', topTopic: 'AWS Bedrock LLM Tokens' },
    { school: 'Stanford University', state: 'Active Hub', students: '12,800', topTopic: 'Autonomous Rover Delivery' },
    { school: 'IIT Hyderabad & IIT Bombay', state: 'Active Hub', students: '18,500', topTopic: 'Cloud Infrastructure Grants' },
    { school: 'UC Berkeley', state: 'Active Hub', students: '16,100', topTopic: 'Student Prime Textbook Logistics' }
  ];

  const handleExport = () => {
    const content = JSON.stringify(
      {
        corporation: corporation.name,
        category: 'Campus Chapters & University Outreach Audit',
        activeHubs: 142,
        studentDiscountsConversion: '72.4%',
        hackathonSentiment: '91% Pos',
        verifiedDate: new Date().toISOString()
      },
      null,
      2
    );
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${corporation.slug}-campus-audit.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('Campus Chapters Audit exported.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>CAMPUS RADAR</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">University & Developer Outreach</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Education & Campus Chapters
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Monitor university student discourse, Prime Student perks adoption, and academic developer hackathons for{' '}
            <strong className="text-slate-800">{corporation.name}</strong>.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a1128] hover:bg-[#111d44] text-xs font-semibold text-white shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Campus Audit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">ACTIVE CAMPUS HUBS</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">142</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">Top: MIT, Stanford, IIT Hyderabad</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">STUDENT DISCOUNTS CONVERSION</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">72.4%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">+18% YoY signup acceleration</div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">HACKATHON SENTIMENT</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">91% Pos</div>
          <div className="text-xs text-slate-500 mt-1">AWS Bedrock credit sponsorships lauded</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveSubTab('hubs')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                activeSubTab === 'hubs' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Major Campus Hubs
            </button>
            <button
              onClick={() => setActiveSubTab('perks')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                activeSubTab === 'perks' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Program Insights
            </button>
          </div>
          <span className="text-xs text-slate-400">142 Global Campus Nodes</span>
        </div>

        {activeSubTab === 'hubs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">University Campus</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Enrolled Prime Students</th>
                  <th className="py-3 px-4 font-semibold">Key Discourse Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campusHubs.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{c.school}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                        {c.state}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">{c.students}</td>
                    <td className="py-3 px-4 text-slate-600">{c.topTopic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'perks' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Prime Student 6-Month Trial Program</span>
              </div>
              <p className="text-slate-600">
                Free textbook delivery and Grubhub+ campus delivery partnerships drove +34% referral loop growth during back-to-school season.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>University Hackathon API Credits</span>
              </div>
              <p className="text-slate-600">
                Over $250k in AWS cloud credits sponsored across 45 student hackathons, producing 890 open-source AI projects.
              </p>
            </div>
          </div>
        )}
      </div>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#061735] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-500/30 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
