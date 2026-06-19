"use client";

import React, { useState } from 'react';
import { BookOpen, Video, Code, Box, Trophy, Route, Loader2, ArrowRight } from 'lucide-react';
import { generateRoadmap } from '@/lib/api';

const categories = [
  { name: 'Data Structures & Algorithms', icon: Code, count: 124 },
  { name: 'System Design', icon: Box, count: 45 },
  { name: 'Frontend Architecture', icon: BookOpen, count: 32 },
  { name: 'Behavioral Interviews', icon: Trophy, count: 28 },
];

export default function LearningResourcesPage() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [generating, setGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const handleGenerateRoadmap = async () => {
    if (!role || !skills) return;
    setGenerating(true);
    try {
      const skillsList = skills.split(",").map(s => s.trim());
      const res = await generateRoadmap(role, skillsList);
      setRoadmap(res);
    } catch (err) {
      alert("Failed to generate roadmap.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning Hub</h1>
        <p className="text-muted-foreground">Curated resources and AI-generated roadmaps to bridge your skill gaps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Roadmap Generator */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Route className="w-5 h-5 text-primary" /> AI Career Roadmap
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tell us your target role and current skills, and we&apos;ll generate a step-by-step learning plan for you.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Target Role</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder="e.g., Full Stack Engineer"
                  className="w-full p-2 border border-border rounded-lg bg-secondary/50 focus:ring-1 focus:ring-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Core Skills</label>
                <input 
                  type="text" 
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  placeholder="e.g., React, Node, Python"
                  className="w-full p-2 border border-border rounded-lg bg-secondary/50 focus:ring-1 focus:ring-primary outline-none text-sm"
                />
              </div>
              <button
                onClick={handleGenerateRoadmap}
                disabled={!role || !skills || generating}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 text-sm"
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate Plan"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Generated Roadmap & Static Content */}
        <div className="lg:col-span-2 space-y-8">
          {roadmap ? (
            <div className="bg-background p-6 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
              <h2 className="text-xl font-bold mb-2">Your 6-Month Roadmap to {roadmap.role}</h2>
              <p className="text-sm text-muted-foreground mb-6">Estimated Timeline: {roadmap.estimated_months} months</p>
              
              <div className="space-y-6">
                {roadmap.phases.map((phase: any, idx: number) => (
                  <div key={idx} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] before:w-0.5 before:bg-border last:before:hidden">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="bg-secondary/30 rounded-xl p-4 border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">{phase.name}</h3>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">{phase.duration}</span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skills to Learn</p>
                        <div className="flex flex-wrap gap-2">
                          {phase.skills_to_learn.map((s: string, i: number) => (
                            <span key={i} className="text-xs bg-background border border-border px-2 py-1 rounded-md">{s}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Resources</p>
                        <ul className="space-y-1">
                          {phase.resources.map((r: string, i: number) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-primary" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(cat => (
                <div key={cat.name} className="bg-background p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} Resources</p>
                </div>
              ))}
            </div>
          )}

          {/* System Design Lab Teaser */}
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-4">
                PREMIUM LAB
              </span>
              <h2 className="text-3xl font-bold mb-4">Interactive System Design Lab</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Practice designing Netflix, Uber, and WhatsApp with our interactive Excalidraw integration and real-time AI feedback.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium shadow-sm hover:bg-primary/90 transition">
                Enter Lab
              </button>
            </div>
            
            <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
              <Box className="w-96 h-96" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
