"use client";

import React from 'react';
import { Plus, MoreVertical, Calendar } from 'lucide-react';

const columns = [
  { id: 'applied', title: 'Applied', color: 'bg-blue-500' },
  { id: 'assessment', title: 'Online Assessment', color: 'bg-purple-500' },
  { id: 'interview', title: 'Interview Scheduled', color: 'bg-amber-500' },
  { id: 'offer', title: 'Offer Received', color: 'bg-emerald-500' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-500' },
];

const mockJobs = [
  { id: 1, company: 'Google', role: 'Software Engineer L4', status: 'interview', date: 'Oct 25', salary: '$180k - $220k' },
  { id: 2, company: 'Meta', role: 'Frontend Engineer', status: 'applied', date: 'Oct 10', salary: '$160k - $190k' },
  { id: 3, company: 'Netflix', role: 'Senior UI Engineer', status: 'assessment', date: 'Oct 15', salary: '$250k+' },
];

export default function ApplicationTrackerPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Application Tracker</h1>
          <p className="text-muted-foreground">Manage your job search pipeline.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition shadow-sm">
          <Plus className="w-4 h-4" />
          Add Application
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map(col => (
            <div key={col.id} className="w-80 flex flex-col bg-secondary/50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${col.color}`} />
                  <h3 className="font-semibold">{col.title}</h3>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-md shadow-sm">
                  {mockJobs.filter(j => j.status === col.id).length}
                </span>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {mockJobs.filter(j => j.status === col.id).map(job => (
                  <div key={job.id} className="bg-background p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{job.company}</h4>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{job.role}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {job.date}
                      </div>
                      <span className="font-medium text-foreground bg-secondary px-2 py-0.5 rounded">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
