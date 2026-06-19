"use client";

import React, { useState } from 'react';
import { Code, MonitorPlay, Zap, ShieldAlert, CheckCircle2, Play } from 'lucide-react';
import Link from 'next/link';
import Editor from '@monaco-editor/react';

const STARTER_CODE = `import React, { useState } from 'react';

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  // AI Hint: This implementation is currently not accessible.
  // How would you fix the buttons so keyboard users can navigate?
  
  return (
    <div className="carousel-container">
      <div onClick={prev} className="nav-btn">Left</div>
      <img src={images[currentIndex]} alt="carousel item" />
      <div onClick={next} className="nav-btn">Right</div>
    </div>
  );
}`;

export default function FrontendStudioLab() {
  const [code, setCode] = useState(STARTER_CODE);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewScore, setReviewScore] = useState<number | null>(null);

  const handleReview = () => {
    setIsReviewing(true);
    setReviewScore(null);
    setTimeout(() => {
      setIsReviewing(false);
      setReviewScore(85);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-8">
      {/* Header */}
      <div className="h-14 border-b border-border bg-background px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/learning" className="text-sm font-medium hover:text-emerald-500">&larr; Exit Studio</Link>
          <div className="w-px h-4 bg-border" />
          <h1 className="font-bold flex items-center gap-2"><Code className="w-4 h-4 text-emerald-500" /> Accessible Image Carousel</h1>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">REACT CHALLENGE</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleReview} className="bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-600 flex items-center gap-2 transition">
            {isReviewing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play className="w-4 h-4" />} 
            Run AI Review
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane: Editor */}
        <div className="w-1/2 border-r border-border flex flex-col bg-[#0d1117]">
          <div className="h-10 bg-[#010409] border-b border-gray-800 flex items-center px-4">
            <span className="text-sm font-mono text-gray-400">Carousel.jsx</span>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v || '')}
              options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 } }}
            />
          </div>
        </div>

        {/* Right Pane: Split vertically (Preview & Review) */}
        <div className="w-1/2 flex flex-col bg-background">
          
          {/* Top Right: Live Preview */}
          <div className="flex-1 border-b border-border flex flex-col">
            <div className="h-10 bg-secondary/30 border-b border-border flex items-center px-4 gap-2 text-sm font-medium">
              <MonitorPlay className="w-4 h-4 text-muted-foreground" /> Live Preview
            </div>
            <div className="flex-1 flex items-center justify-center p-8 bg-grid-slate-100 dark:bg-grid-slate-900/50">
              <div className="border-4 border-dashed border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center max-w-sm">
                <MonitorPlay className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="font-bold mb-2">Live Rendering Engine</h3>
                <p className="text-sm text-muted-foreground">In a real production environment, this pane would execute the React code live in a sandboxed iframe.</p>
              </div>
            </div>
          </div>

          {/* Bottom Right: AI Review Panel */}
          <div className="h-80 flex flex-col bg-secondary/10">
            <div className="h-10 bg-secondary/30 border-b border-border flex items-center px-4 gap-2 text-sm font-medium justify-between">
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> AI Code Reviewer</div>
              {reviewScore && <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500">Score: {reviewScore}/100</span>}
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              {!reviewScore && !isReviewing ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
                  Click &quot;Run AI Review&quot; to analyze your code for a11y and performance.
                </div>
              ) : isReviewing ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-sm font-medium animate-pulse text-muted-foreground">
                  <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                  Running static analysis and accessibility tree audit...
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-red-500 mb-1">A11y Violation: Interactive elements missing focus</h4>
                      <p className="text-xs text-muted-foreground">You are using a \`&lt;div&gt;\` for the navigation buttons with an \`onClick\` handler. Keyboard users cannot tab to these elements. Change them to \`&lt;button&gt;\` tags.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-500 mb-1">A11y Warning: Missing ARIA controls</h4>
                      <p className="text-xs text-muted-foreground">The carousel should ideally use &quot;aria-roledescription=&apos;carousel&apos;&quot; and the buttons should have &quot;aria-label&quot; for screen readers.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-500 mb-1">Performance check passed</h4>
                      <p className="text-xs text-muted-foreground">No obvious re-render traps or state management issues detected.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
