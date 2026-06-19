"use client";

import React, { useState } from "react";
import { uploadResume, optimizeResume } from "@/lib/api";
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResumeStudioPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const [bulletToOptimize, setBulletToOptimize] = useState("");
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadResume(file);
      setAnalysisResult(res);
    } catch (err) {
      alert("Failed to upload resume. Make sure backend is running.");
    } finally {
      setUploading(false);
    }
  };

  const handleOptimize = async () => {
    if (!bulletToOptimize) return;
    setOptimizing(true);
    try {
      const res = await optimizeResume([bulletToOptimize]);
      setOptimizedResult(res);
    } catch (err) {
      alert("Failed to optimize.");
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resume Studio</h1>
        <p className="text-muted-foreground">Upload your resume to get AI-powered insights and optimization.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Analyze Resume
          </h2>
          
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-secondary/30">
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">Drag and drop your resume</p>
            <p className="text-xs text-muted-foreground mb-4">Supports PDF or DOCX</p>
            <input 
              type="file" 
              id="resume-upload" 
              className="hidden" 
              accept=".pdf,.docx" 
              onChange={handleFileChange} 
            />
            <label 
              htmlFor="resume-upload" 
              className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            >
              Select File
            </label>
            {file && <p className="mt-4 text-sm font-semibold text-emerald-600">{file.name}</p>}
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-lg font-semibold hover:bg-foreground/90 transition disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analyze with AI"}
          </button>

          {analysisResult && analysisResult.analysis && (
            <div className="mt-6 space-y-4 border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">ATS Score</span>
                <span className={cn("text-xl font-bold", analysisResult.analysis.ats_score > 75 ? "text-emerald-500" : "text-amber-500")}>
                  {analysisResult.analysis.ats_score}/100
                </span>
              </div>
              <div>
                <span className="font-semibold block mb-2">Detected Skills</span>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.analysis.skills?.map((s: string, i: number) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">{s}</span>
                  ))}
                </div>
              </div>
              {analysisResult.analysis.weaknesses?.length > 0 && (
                <div>
                  <span className="font-semibold block mb-2 text-destructive">Weaknesses</span>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    {analysisResult.analysis.weaknesses.map((w: string, i: number) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Optimize Section */}
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" /> STAR Optimizer
          </h2>
          <p className="text-sm text-muted-foreground">
            Paste a bullet point from your resume. Our AI will rewrite it using the STAR method (Situation, Task, Action, Result) with strong action verbs.
          </p>
          
          <textarea
            value={bulletToOptimize}
            onChange={(e) => setBulletToOptimize(e.target.value)}
            placeholder="e.g., Developed a new feature that made the app faster."
            className="w-full h-32 p-3 border border-border rounded-lg bg-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />

          <button
            onClick={handleOptimize}
            disabled={!bulletToOptimize || optimizing}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {optimizing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Rewrite Bullet"}
          </button>

          {optimizedResult && optimizedResult.optimizations.length > 0 && (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
                <CheckCircle2 className="w-5 h-5" /> Optimized Result
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {optimizedResult.optimizations[0].optimized}
              </p>
              <div className="flex justify-between items-center mt-4 text-xs">
                <span className="text-muted-foreground">Impact Increase</span>
                <span className="font-bold text-emerald-600">+{optimizedResult.optimizations[0].improvement_score}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
