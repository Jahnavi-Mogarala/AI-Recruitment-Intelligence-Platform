"use client";

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Sparkles, User, Brain } from 'lucide-react';
import Link from 'next/link';

export default function BehavioralInterviewLab() {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [transcript, setTranscript] = useState([
    { speaker: 'ai', text: "Hello! I'm your AI Interviewer. Today we'll be focusing on the Amazon Leadership Principle: 'Customer Obsession'. To start, could you tell me about a time when you didn't meet a customer's expectations? How did you recover?" }
  ]);
  const [bars, setBars] = useState<number[]>(Array(20).fill(10));

  // Simulate audio visualizer
  useEffect(() => {
    if (!isRecording) {
      setBars(Array(20).fill(10));
      return;
    }
    const interval = setInterval(() => {
      setBars(Array.from({ length: 20 }, () => Math.floor(Math.random() * 40) + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setTranscript(prev => [...prev, { speaker: 'user', text: "Yes, in my previous role as a frontend developer, we shipped a major UI update that ended up confusing our enterprise clients..." }]);
      }, 2000);
      setTimeout(() => {
        setIsRecording(false);
        setTranscript(prev => [...prev, { speaker: 'ai', text: "That's a good start using the Situation aspect of the STAR method. Can you elaborate on the specific 'Task' you were responsible for to fix their confusion?" }]);
      }, 6000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-8 bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between shrink-0 bg-black/40 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/learning" className="text-sm font-medium hover:text-blue-400 transition">&larr; Leave Call</Link>
          <div className="w-px h-4 bg-white/20" />
          <h1 className="font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-blue-400" /> Behavioral Mock Interview</h1>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">AUDIO ENABLED</span>
        </div>
        <div className="text-sm font-mono text-white/50">04:12 elapsed</div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video/Audio Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative p-8">
          {/* AI Avatar */}
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-900 to-slate-900 border-4 border-blue-500/30 shadow-[0_0_60px_rgba(59,130,246,0.2)] flex items-center justify-center relative mb-12">
            <Brain className="w-24 h-24 text-blue-400" />
            
            {/* Visualizer Ring (when AI speaking) */}
            {!isRecording && (
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20" />
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2">AI Interviewer</h2>
          <p className="text-white/60 mb-12">Amazon Leadership Principles</p>

          {/* User Audio Visualizer */}
          <div className="h-20 flex items-end gap-1 mb-12">
            {bars.map((height, i) => (
              <div 
                key={i} 
                className={`w-2 rounded-t-sm transition-all duration-75 ${isRecording ? 'bg-emerald-400' : 'bg-white/10'}`}
                style={{ height: `${height}px` }}
              />
            ))}
          </div>

          {/* Call Controls */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl backdrop-blur-md border border-white/10">
            <button 
              onClick={toggleRecording}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition shadow-lg ${isRecording ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
            >
              {isRecording ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition shadow-lg ${isVideoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
            <button className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition shadow-lg">
              <Settings className="w-6 h-6" />
            </button>
            <div className="w-px h-8 bg-white/10 mx-2" />
            <Link href="/dashboard/learning" className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition shadow-lg">
              <PhoneOff className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Live Transcript Sidebar */}
        <div className="w-96 bg-black/60 border-l border-white/10 flex flex-col shrink-0 backdrop-blur-xl">
          <div className="p-6 border-b border-white/10">
            <h3 className="font-bold text-lg mb-1">Live Transcript</h3>
            <p className="text-xs text-white/50">STAR Method Analysis active</p>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {transcript.map((msg, i) => (
              <div key={i} className={`flex flex-col gap-2 ${msg.speaker === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40">
                  {msg.speaker === 'ai' ? <Brain className="w-3 h-3 text-blue-400" /> : <User className="w-3 h-3 text-emerald-400" />}
                  {msg.speaker === 'ai' ? 'Interviewer' : 'You'}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[90%] ${
                  msg.speaker === 'ai' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-50 rounded-tl-sm' : 
                  'bg-white/10 border border-white/5 text-white rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
