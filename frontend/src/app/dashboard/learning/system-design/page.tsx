"use client";

import React, { useState } from 'react';
import { Server, Database, Smartphone, Globe, ArrowRight, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SystemDesignLab() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Welcome to the System Design Canvas! Today's challenge is to design the architecture for WhatsApp. Try dragging some components onto the canvas. I'll provide real-time feedback." }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "That's a valid point. If you add a Redis cache layer for the presence service, it will significantly reduce the load on your primary PostgreSQL cluster. I recommend placing it between your Websocket Gateways and the Database." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-8">
      {/* Header */}
      <div className="h-14 border-b border-border bg-background px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/learning" className="text-sm font-medium hover:text-primary">&larr; Back</Link>
          <div className="w-px h-4 bg-border" />
          <h1 className="font-bold">WhatsApp Architecture Challenge</h1>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold">PREMIUM LAB</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground">Clear Canvas</button>
          <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Submit Design
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="w-16 border-r border-border bg-secondary/20 flex flex-col items-center py-4 gap-4 shrink-0">
          <button className="p-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition"><Smartphone className="w-5 h-5" /></button>
          <button className="p-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition"><Globe className="w-5 h-5" /></button>
          <button className="p-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition"><Server className="w-5 h-5" /></button>
          <button className="p-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition"><Database className="w-5 h-5" /></button>
          <button className="p-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition"><ArrowRight className="w-5 h-5" /></button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#f8fafc] dark:bg-[#0f172a] relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          {/* Mock Canvas Elements */}
          <div className="absolute top-20 left-20 bg-background border-2 border-border shadow-sm rounded-xl p-4 w-40 flex flex-col items-center gap-2 cursor-move hover:border-primary transition">
            <Smartphone className="w-8 h-8 text-blue-500" />
            <span className="text-xs font-semibold">Mobile Client</span>
          </div>

          <div className="absolute top-20 left-80 bg-background border-2 border-primary shadow-sm rounded-xl p-4 w-48 flex flex-col items-center gap-2 cursor-move">
            <Server className="w-8 h-8 text-primary" />
            <span className="text-xs font-semibold">Websocket Gateway</span>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-bounce">!</div>
          </div>

          <div className="absolute top-64 left-80 bg-background border-2 border-border shadow-sm rounded-xl p-4 w-40 flex flex-col items-center gap-2 cursor-move hover:border-primary transition">
            <Database className="w-8 h-8 text-emerald-500" />
            <span className="text-xs font-semibold">Messages DB</span>
          </div>

          {/* Connection Lines (Mocked via SVG) */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <path d="M 230 110 L 320 110" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="text-border" fill="none" />
            <path d="M 400 150 L 400 250" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="text-border" fill="none" />
          </svg>
        </div>

        {/* AI Co-Architect Panel */}
        <div className="w-80 border-l border-border bg-background flex flex-col shrink-0">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">AI Co-Architect</h2>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-3 rounded-xl max-w-[90%] text-sm ${msg.role === 'ai' ? 'bg-secondary/50 text-foreground rounded-tl-none' : 'bg-primary text-primary-foreground rounded-tr-none'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            <div className="flex justify-start">
              <div className="p-3 rounded-xl max-w-[90%] text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-tl-none flex flex-col gap-2">
                <div className="flex items-center gap-1 font-bold"><AlertCircle className="w-4 h-4" /> Architectural Flaw</div>
                Your Websocket Gateway is a single point of failure and will drop all connections if it restarts. Consider adding a Load Balancer and a Redis pub/sub mechanism to route messages across multiple gateway instances.
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-secondary/10">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your design..."
                className="w-full pl-4 pr-10 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button onClick={handleSend} className="absolute right-2 top-2 text-muted-foreground hover:text-primary">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
