"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Target, 
  Settings,
  Bell,
  Search,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resumes', href: '/dashboard/resumes', icon: FileText },
  { name: 'Applications', href: '/dashboard/applications', icon: Briefcase },
  { name: 'Interview Copilot', href: '/dashboard/interviews', icon: Target },
  { name: 'Learning', href: '/dashboard/learning', icon: BookOpen },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Logo />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              JM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Januvinu</p>
              <p className="text-xs text-muted-foreground truncate">Januvinu@email.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6 z-10">
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search jobs, resumes, or resources..."
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-secondary/50 placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 block w-2 h-2 rounded-full bg-destructive ring-2 ring-background" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
