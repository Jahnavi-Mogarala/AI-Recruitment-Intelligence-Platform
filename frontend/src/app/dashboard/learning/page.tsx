"use client";

import React from 'react';
import { BookOpen, Video, Code, Box, Trophy } from 'lucide-react';

const categories = [
  { name: 'Data Structures & Algorithms', icon: Code, count: 124 },
  { name: 'System Design', icon: Box, count: 45 },
  { name: 'Frontend Architecture', icon: BookOpen, count: 32 },
  { name: 'Behavioral Interviews', icon: Trophy, count: 28 },
];

export default function LearningResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning Hub</h1>
        <p className="text-muted-foreground">Curated resources to bridge your skill gaps.</p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        
        {/* Decorative background element */}
        <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
          <Box className="w-96 h-96" />
        </div>
      </div>
    </div>
  );
}
