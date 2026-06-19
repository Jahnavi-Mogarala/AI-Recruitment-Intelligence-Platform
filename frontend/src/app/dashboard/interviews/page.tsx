"use client";

import React, { useState } from "react";
import { generateInterview, evaluateAnswer } from "@/lib/api";
import { MessageSquare, Play, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function InterviewCopilotPage() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Mid-Level");
  const [company, setCompany] = useState("");
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleGenerate = async () => {
    if (!role) return;
    setGenerating(true);
    try {
      const q = await generateInterview(role, experience, company || "general");
      setQuestions(q);
      setCurrentQuestionIdx(0);
      setFeedback(null);
      setAnswer("");
    } catch (err) {
      alert("Failed to generate questions. Make sure backend is running.");
    } finally {
      setGenerating(false);
    }
  };

  const handleEvaluate = async () => {
    if (!answer || questions.length === 0) return;
    setEvaluating(true);
    try {
      const res = await evaluateAnswer(questions[currentQuestionIdx].question, answer);
      setFeedback(res);
    } catch (err) {
      alert("Failed to evaluate answer.");
    } finally {
      setEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setAnswer("");
      setFeedback(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Interview Copilot</h1>
        <p className="text-muted-foreground">Practice tailored interview questions and receive instant AI grading.</p>
      </div>

      {!questions.length ? (
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm max-w-2xl">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" /> Start a Mock Interview
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Target Role</label>
              <input 
                type="text" 
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g., Senior Full Stack Engineer"
                className="w-full p-2 border border-border rounded-lg bg-secondary/50 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Experience Level</label>
                <select 
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-secondary/50 focus:ring-1 focus:ring-primary outline-none"
                >
                  <option>Entry-Level</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                  <option>Lead/Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Company (Optional)</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g., Stripe"
                  className="w-full p-2 border border-border rounded-lg bg-secondary/50 focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!role || generating}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
            >
              {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate Questions"}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-background p-4 rounded-xl border border-border shadow-sm">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Session Progress</h3>
              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div key={idx} className={`p-3 rounded-lg text-sm font-medium border ${idx === currentQuestionIdx ? 'border-primary bg-primary/10 text-primary' : 'border-transparent text-muted-foreground'}`}>
                    Q{idx + 1}: {q.type}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setQuestions([])}
                className="w-full mt-6 text-sm text-destructive hover:underline"
              >
                End Session
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{questions[currentQuestionIdx].question}</h3>
                  <p className="text-sm font-medium text-muted-foreground bg-secondary inline-block px-2 py-1 rounded-md">
                    {questions[currentQuestionIdx].type} Question
                  </p>
                </div>
              </div>

              {!feedback ? (
                <>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-40 p-4 border border-border rounded-xl bg-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary text-sm leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleEvaluate}
                      disabled={!answer || evaluating}
                      className="flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-lg font-semibold hover:bg-foreground/90 transition disabled:opacity-50"
                    >
                      {evaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Answer</>}
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4 border-t border-border pt-6 mt-4">
                  <div className="flex justify-between items-center bg-secondary/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-5 h-5" /> Evaluation Complete
                    </div>
                    <div className="text-2xl font-bold">{feedback.score}/100</div>
                  </div>
                  
                  <div className="p-4 bg-background border border-border rounded-xl">
                    <h4 className="font-semibold text-sm mb-1">Feedback</h4>
                    <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <h4 className="font-semibold text-sm mb-1 text-primary">How to Improve</h4>
                    <p className="text-sm text-muted-foreground">{feedback.improvement}</p>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={nextQuestion}
                      disabled={currentQuestionIdx === questions.length - 1}
                      className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                    >
                      Next Question
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
