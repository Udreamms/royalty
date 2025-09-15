"use client";

import React, { useState, useEffect } from "react";

export default function ConversationAiPage() {
  // Initialize theme from localStorage, default to "light" if not set
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Effect to toggle the 'dark' class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground">
      <div className="flex flex-col items-center max-w-xl w-full px-4 py-10 rounded-lg">
        <div className="flex items-center gap-12 mb-6">
          {/* Conversation AI Icon */}
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-2">
              <svg width={48} height={48} fill="none" viewBox="0 0 48 48">
                <rect width="48" height="48" rx="24" fill="#e0e7ff" className="fill-primary/20" />
                <path
                  d="M16 18h16v2H16v-2zm0 6h10v2H16v-2zm0 6h8v2h-8v-2z"
                  fill="#2563eb"
                  className="fill-primary"
                />
                <rect x="20" y="26" width="8" height="2" fill="#2563eb" className="fill-primary" />
                <rect x="20" y="32" width="6" height="2" fill="#2563eb" className="fill-primary" />
              </svg>
            </div>
            <span className="text-muted-foreground font-medium text-sm">Conversation AI</span>
          </div>
          {/* Arrow */}
          <svg width={48} height={24} fill="none" viewBox="0 0 48 24">
            <path
              d="M4 12h40m0 0l-6-6m6 6l-6 6"
              stroke="#2563eb"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-primary"
            />
          </svg>
          {/* AI Agents Icon */}
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-2">
              <svg width={48} height={48} fill="none" viewBox="0 0 48 48">
                <rect width="48" height="48" rx="24" fill="#e0e7ff" className="fill-primary/20" />
                <g>
                  <circle cx="24" cy="24" r="10" stroke="#2563eb" strokeWidth="2" fill="#e0e7ff" className="stroke-primary fill-primary/20" />
                  <rect x="18" y="28" width="12" height="2" rx="1" fill="#2563eb" className="fill-primary" />
                  <circle cx="20.5" cy="23.5" r="1.5" fill="#2563eb" className="fill-primary" />
                  <circle cx="27.5" cy="23.5" r="1.5" fill="#2563eb" className="fill-primary" />
                  <path
                    d="M21 27c1.5 1 4.5 1 6 0"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="stroke-primary"
                  />
                  <rect x="22" y="18" width="4" height="2" rx="1" fill="#2563eb" className="fill-primary" />
                </g>
              </svg>
            </div>
            <span className="text-muted-foreground font-medium text-sm">AI Agents</span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
          Conversation AI Has Moved to AI Agents
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-lg">
          Conversation AI is now located in <b>the "AI Agents" section</b> of the <b>subaccounts menu</b>, giving you access to all AI agents in one place. Rest assured, all your bots will remain intact.
        </p>
        <button
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg flex items-center gap-2 text-base"
        >
          Go to AI Agents <span className="text-xl">&#8594;</span>
        </button>
      </div>
    </div>
  );
}
//listo