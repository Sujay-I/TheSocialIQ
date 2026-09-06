import React from 'react';
import { Users, GraduationCap, Sparkles, BookOpen, Compass, Heart, Award } from 'lucide-react';

export const PersonalFamilyView: React.FC = () => {
  return (
    <div className="space-y-4 pb-20 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Personal & Family Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Topic & Interest Discovery</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Discover family-safe trending topics, educational toys, leisure hobbies, and wellness trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Family Wellness & Nutrition</h3>
          <p className="text-xs text-slate-400">Micro-habits, clean eating, and weekend meal prepping gaining +140% positive engagement.</p>
          <div className="flex gap-1 pt-1">
            <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">Healthy Habits</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Meal Prep</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">STEM Toys & Creative Play</h3>
          <p className="text-xs text-slate-400">Robotics kits and screen-free logic puzzles are the top rising trend among parents.</p>
          <div className="flex gap-1 pt-1">
            <span className="text-[10px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded">Robotics</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Screen-Free</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Family Travel & Roadtrips</h3>
          <p className="text-xs text-slate-400">Eco-camping and national park itineraries trending with 92% sentiment satisfaction.</p>
          <div className="flex gap-1 pt-1">
            <span className="text-[10px] bg-slate-800 text-purple-400 px-2 py-0.5 rounded">Camping</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Nature</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EducationView: React.FC = () => {
  return (
    <div className="space-y-4 pb-20 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs text-purple-400 font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Educational Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Campus Voice & Academic Trends</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Track university student sentiment, emerging research discussions, and campus career queries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">AI-Assisted Learning</h3>
          <p className="text-xs text-slate-400">84% of university students actively debate personalized study buddies and code tutor prompts.</p>
          <div className="flex gap-1 pt-1">
            <span className="text-[10px] bg-slate-800 text-purple-400 px-2 py-0.5 rounded">Study AI</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Higher Ed</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Campus Internships & Hiring</h3>
          <p className="text-xs text-slate-400">Discussions on return-to-office policies vs. remote engineering internships.</p>
          <div className="flex gap-1 pt-1">
            <span className="text-[10px] bg-slate-800 text-blue-400 px-2 py-0.5 rounded">Careers</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Tech Jobs</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Open Source Research</h3>
          <p className="text-xs text-slate-400">Computer Science labs and cross-institutional paper reproduction discussions.</p>
          <div className="flex gap-1 pt-1">
            <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">ArXiv</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Open Science</span>
          </div>
        </div>
      </div>
    </div>
  );
};
