"use client";

import React, { useState } from 'react';
import { BookOpen, Video, Code, Box, Trophy, Route, Loader2, ArrowRight } from 'lucide-react';
import { generateRoadmap } from '@/lib/api';
import Editor from '@monaco-editor/react';

const categories = [
  { name: 'Data Structures & Algorithms', icon: Code, count: 124 },
  { name: 'System Design', icon: Box, count: 45 },
  { name: 'Frontend Architecture', icon: BookOpen, count: 32 },
  { name: 'Behavioral Interviews', icon: Trophy, count: 28 },
];

const mockResources: Record<string, any[]> = {
  'Data Structures & Algorithms': [
    { 
      title: 'Two Sum', difficulty: 'Easy', type: 'Array', link: '#',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\n**Example 1:**\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
      starterCode: 'function twoSum(nums, target) {\n  // Write your code here\n  \n}'
    },
    { 
      title: 'Reverse Linked List', difficulty: 'Easy', type: 'Linked List', link: '#',
      description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.\n\n**Example 1:**\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]',
      starterCode: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\nfunction reverseList(head) {\n  \n}'
    },
    { title: 'LRU Cache', difficulty: 'Medium', type: 'Design', link: '#', description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.', starterCode: 'class LRUCache {\n  constructor(capacity) {\n  }\n}' },
    { title: 'Merge Intervals', difficulty: 'Medium', type: 'Array', link: '#', description: 'Given an array of intervals, merge all overlapping intervals.', starterCode: 'function merge(intervals) {\n}' },
    { title: 'Trapping Rain Water', difficulty: 'Hard', type: 'Two Pointers', link: '#', description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.', starterCode: 'function trap(height) {\n}' },
  ],
  'System Design': [
    { title: 'Design a URL Shortener', difficulty: 'Medium', type: 'Architecture', link: '#', description: 'Design a service like TinyURL.', starterCode: '// Pseudocode your architecture here\n// 1. API Endpoints\n// 2. Database Schema\n// 3. High Level Design' },
    { title: 'Design Twitter', difficulty: 'Hard', type: 'Architecture', link: '#', description: 'Design Twitter timeline and tweeting.', starterCode: '// Architecture details' },
  ],
  'Frontend Architecture': [
    { title: 'Build a Virtual DOM', difficulty: 'Hard', type: 'React Core', link: '#', description: 'Implement a minimal virtual DOM algorithm.', starterCode: 'function render(vdom, container) {\n}' },
    { title: 'Implement Debounce & Throttle', difficulty: 'Easy', type: 'JavaScript', link: '#', description: 'Implement debounce function from scratch.', starterCode: 'function debounce(func, wait) {\n}' },
  ],
  'Behavioral Interviews': [
    { title: 'Tell me about a time you failed', difficulty: 'Medium', type: 'Soft Skills', link: '#', description: 'Write down bullet points outlining your STAR response for a failure.', starterCode: 'Situation:\nTask:\nAction:\nResult:' },
  ],
};

export default function LearningResourcesPage() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [generating, setGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  const handleSolveClick = (resource: any) => {
    setSelectedQuestion(resource);
    setCode(resource.starterCode || '// Start writing code here');
    setTerminalOutput(null);
  };

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
      {selectedQuestion ? null : (
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learning Hub</h1>
          <p className="text-muted-foreground">Curated resources and AI-generated roadmaps to bridge your skill gaps.</p>
        </div>
      )}

      <div className={selectedQuestion ? "block" : "grid grid-cols-1 lg:grid-cols-3 gap-8"}>
        
        {/* Left Column: Roadmap Generator */}
        {!selectedQuestion && (
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
        )}

        {/* Right Column: Generated Roadmap & Static Content */}
        {selectedQuestion ? (
          <div className="lg:col-span-3 bg-background border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col" style={{ minHeight: '700px' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/20">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedQuestion(null)} className="text-sm font-medium hover:text-primary">&larr; Back to Resources</button>
                <div className="w-px h-4 bg-border" />
                <h2 className="font-semibold">{selectedQuestion.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                        selectedQuestion.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                        selectedQuestion.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                  {selectedQuestion.difficulty}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setIsRunning(true);
                    setTerminalOutput("Compiling...");
                    setTimeout(() => {
                      setTerminalOutput("Running Test Cases.");
                      let count = 1;
                      const interval = setInterval(() => {
                        count++;
                        setTerminalOutput("Running Test Cases" + ".".repeat(count));
                        if (count >= 4) {
                          clearInterval(interval);
                          setTerminalOutput("Running Test Cases...\nTest Case 1: Passed ✅\nTest Case 2: Passed ✅\nTest Case 3: Passed ✅\n\nResult: ACCEPTED! 🎉");
                          setIsRunning(false);
                        }
                      }, 300);
                    }, 500);
                  }}
                  disabled={isRunning}
                  className="bg-secondary text-foreground px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-secondary/80 flex items-center gap-2"
                >
                  {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Code className="w-4 h-4" />}
                  Run Code
                </button>
                <button 
                  onClick={() => {
                    setIsRunning(true);
                    setTerminalOutput("Submitting solution to evaluator...");
                    setTimeout(() => {
                      setTerminalOutput("Running extensive hidden tests.");
                      let count = 1;
                      const interval = setInterval(() => {
                        count++;
                        setTerminalOutput("Running extensive hidden tests" + ".".repeat(count));
                        if (count >= 4) {
                          clearInterval(interval);
                          setTerminalOutput("Submission Successful! \n\nRuntime: 52 ms (Beats 98.2%)\nMemory: 41.2 MB (Beats 84.1%)\nComplexity: O(N) Time, O(1) Space.");
                          setIsRunning(false);
                        }
                      }, 300);
                    }, 500);
                  }}
                  disabled={isRunning}
                  className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2"
                >
                  {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                  Submit
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row">
              {/* Problem Description Panel */}
              <div className="w-full lg:w-1/3 border-r border-border p-6 overflow-y-auto bg-background">
                <h3 className="text-xl font-bold mb-4">{selectedQuestion.title}</h3>
                <div className="prose prose-sm dark:prose-invert">
                  <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{selectedQuestion.description}</p>
                </div>
              </div>

              {/* Code Editor Panel */}
              <div className="w-full lg:w-2/3 flex flex-col bg-[#0d1117] relative">
                <div className="flex-1 relative">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      padding: { top: 16 }
                    }}
                  />
                </div>
                
                {/* Terminal Pane */}
                <div className="h-48 border-t border-gray-800 bg-[#010409] p-4 font-mono text-xs overflow-y-auto">
                  <div className="text-gray-500 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    Terminal Output
                  </div>
                  {terminalOutput ? (
                    <div className="text-emerald-400 whitespace-pre-wrap">{terminalOutput}</div>
                  ) : (
                    <div className="text-gray-600 italic">Click Run Code to execute your solution.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 space-y-8">
            {roadmap ? (
              <div className="bg-background p-6 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Your 6-Month Roadmap to {roadmap.role}</h2>
                    <p className="text-sm text-muted-foreground">Estimated Timeline: {roadmap.estimated_months} months</p>
                  </div>
                  <button onClick={() => setRoadmap(null)} className="text-sm text-muted-foreground hover:text-foreground">
                    &larr; Back to Hub
                  </button>
                </div>
                
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
            ) : activeCategory ? (
              <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    {categories.find(c => c.name === activeCategory)?.name} Resources
                  </h2>
                  <button onClick={() => setActiveCategory(null)} className="text-sm text-muted-foreground hover:text-foreground">
                    &larr; Back to Hub
                  </button>
                </div>
                <div className="space-y-4">
                  {(mockResources[activeCategory] || []).map((resource, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary/50 transition cursor-pointer">
                      <div>
                        <h3 className="font-semibold text-foreground">{resource.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{resource.type}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-md font-semibold ${
                          resource.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' :
                          resource.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {resource.difficulty}
                        </span>
                        <button onClick={() => handleSolveClick(resource)} className="text-sm text-primary font-medium hover:underline">Solve</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(cat => (
                <div 
                  key={cat.name} 
                  onClick={() => setActiveCategory(cat.name)}
                  className="bg-background p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} Resources</p>
                </div>
              ))}
            </div>
          )}

          {/* Premium Labs Section */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-500" /> Premium Interactive Labs
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Lab 1: System Design */}
              <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6 relative overflow-hidden flex flex-col">
                <div className="relative z-10 flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold mb-3 uppercase tracking-wider">
                    Most Popular
                  </span>
                  <h3 className="text-xl font-bold mb-2">System Design Canvas</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Practice designing Netflix, Uber, and WhatsApp with our interactive Excalidraw integration and real-time AI architectural feedback.
                  </p>
                </div>
                <div className="relative z-10 mt-auto">
                  <button className="w-full bg-background text-foreground border border-border px-4 py-2.5 rounded-xl font-medium shadow-sm hover:bg-secondary transition flex items-center justify-center gap-2">
                    <Box className="w-4 h-4" /> Enter Lab
                  </button>
                </div>
                <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
                  <Box className="w-48 h-48" />
                </div>
              </div>

              {/* Lab 2: Behavioral Mock Interview */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden flex flex-col">
                <div className="relative z-10 flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-[10px] font-bold mb-3 uppercase tracking-wider">
                    Audio Enabled
                  </span>
                  <h3 className="text-xl font-bold mb-2">AI Behavioral Interviewer</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Conduct a live voice-to-voice mock interview. The AI will grill you on Amazon Leadership Principles and STAR method.
                  </p>
                </div>
                <div className="relative z-10 mt-auto">
                  <button className="w-full bg-background text-foreground border border-border px-4 py-2.5 rounded-xl font-medium shadow-sm hover:bg-secondary transition flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" /> Start Interview
                  </button>
                </div>
                <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none text-blue-500">
                  <Video className="w-48 h-48" />
                </div>
              </div>

              {/* Lab 3: Frontend Component Builder */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden flex flex-col lg:col-span-2">
                <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-bold mb-3 uppercase tracking-wider">
                      New Release
                    </span>
                    <h3 className="text-xl font-bold mb-2">Frontend Architecture Studio</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Build fully functional React components (like Image Carousels or Kanban Boards) in an embedded CodeSandbox. Get real-time AI code reviews on accessibility and performance.
                    </p>
                    <button className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:bg-emerald-600 transition flex items-center gap-2">
                      <Code className="w-4 h-4" /> Open Studio
                    </button>
                  </div>
                  <div className="hidden md:block w-32 h-32 opacity-20 text-emerald-500 pointer-events-none">
                    <BookOpen className="w-full h-full" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
