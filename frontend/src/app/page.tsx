"use client";

import React, { useState } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { Logo } from '@/components/Logo';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition">How it Works</Link>
            <Link href="#pricing" className="hover:text-foreground transition">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition">Log in</Link>
            <Link href="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-sm hover:bg-primary/90 transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-24 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI Recruitment Intelligence Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            From Resume to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Offer.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Not just a resume checker. A complete ecosystem to improve your resume, ace interviews, track applications, and secure your dream job.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-xl font-medium hover:bg-foreground/90 transition shadow-lg">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Resume Optimizer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Quantify achievements, hit ATS keywords, and identify missing skills using deep NLP.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interview Copilot</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mock interview engine with dynamic RAG-based follow-ups tailored to your target company.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Intelligence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Predict hiring success, track your applications, and build ML-driven learning roadmaps.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TalentPilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
