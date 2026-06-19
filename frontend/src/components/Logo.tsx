import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-sm">
        {/* Abstract 'T' combined with upward arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Top of T */}
          <path d="M6 6h12" />
          {/* Stem of T / Upward arrow stem */}
          <path d="M12 6v12" />
          {/* Arrow heads */}
          <path d="m8 10 4-4 4 4" />
        </svg>
      </div>
      {!iconOnly && (
        <span className="font-semibold tracking-tight text-xl text-foreground">
          TalentPilot
        </span>
      )}
    </div>
  );
}
