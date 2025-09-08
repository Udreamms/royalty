"use client";

import React, { useState, useEffect } from "react";

export default function KnowledgeBasePage() {
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
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md border border-border">
      <h1 className="text-xl font-semibold text-foreground">Knowledge Base Has Been Moved to AI Agents</h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Knowledge Base is now located under AI Agents in the Main Sidebar, giving you access to all AI agents in one place. Rest assured, all your knowledge bases will remain unchanged.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
      >
        Go to AI Agents <span className="text-xl">→</span>
      </button>
    </div>
  );
}