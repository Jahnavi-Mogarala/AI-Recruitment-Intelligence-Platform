"use client";

import React, { useState } from 'react';
import { predictSuccess } from '@/lib/api';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, 
  FileText, 
  Briefcase, 
  Target, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const atSTrendData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 68 },
  { name: 'Week 3', score: 74 },
  { name: 'Week 4', score: 82 },
  { name: 'Week 5', score: 88 },
];

const skillGrowthData = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 75 },
  { name: 'Python', level: 60 },
  { name: 'System Design', level: 45 },
  { name: 'AWS', level: 50 },
];

function StatCard({ title, value, change, trend, icon: Icon }: any) {
  const isPositive = trend === 'up';
  return (
    <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={cn(
          "flex items-center text-sm font-medium",
          isPositive ? "text-emerald-500" : "text-destructive"
        )}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {change}
        </span>
        <span className="text-sm text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [atsScore, setAtsScore] = useState(84);
  const [numSkills, setNumSkills] = useState(15);
  const [predictions, setPredictions] = useState({ interview_probability: 85, offer_probability: 65 });

  const calculatePredictions = async () => {
    try {
      const res = await predictSuccess(atsScore, numSkills);
      setPredictions(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your career growth.</p>
        </div>
        
        <div className="flex gap-4 items-center bg-background p-3 rounded-xl border border-border shadow-sm">
          <div>
            <label className="text-xs font-semibold block text-muted-foreground">ATS Score</label>
            <input type="number" value={atsScore} onChange={e => setAtsScore(Number(e.target.value))} className="w-16 p-1 border rounded" />
          </div>
          <div>
            <label className="text-xs font-semibold block text-muted-foreground">Skills</label>
            <input type="number" value={numSkills} onChange={e => setNumSkills(Number(e.target.value))} className="w-16 p-1 border rounded" />
          </div>
          <button onClick={calculatePredictions} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm">
            Recalculate AI Probability
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Average ATS Score" value={`${atsScore}%`} change="+12%" trend="up" icon={FileText} />
        <StatCard title="Applications Sent" value="142" change="+24" trend="up" icon={Briefcase} />
        <StatCard title="Interview Readiness" value={`${predictions.interview_probability}%`} change="+5%" trend="up" icon={Target} />
        <StatCard title="Offer Probability" value={`${predictions.offer_probability}%`} change="AI Predicted" trend="up" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ATS Trend Chart */}
        <div className="lg:col-span-2 bg-background p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">ATS Score Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={atSTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Growth */}
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Skill Growth</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGrowthData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} width={80} />
                <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="level" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center p-4 border border-border rounded-xl hover:bg-secondary/50 transition">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mr-4">
                  G
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">Google</h4>
                  <p className="text-xs text-muted-foreground">Software Engineer L4</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Oct {24 + i}</p>
                  <p className="text-xs text-muted-foreground">Technical Round</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Daily Learning Goals</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Solve 2 LeetCode Mediums</span>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">DSA</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Review System Design basics</span>
              </div>
              <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-md">Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
