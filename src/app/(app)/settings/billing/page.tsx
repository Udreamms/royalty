"use client";

import React, { useState, useEffect } from "react";

export default function BillingPage() {
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
    <div className="p-8 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-foreground">Billing Dashboard</h1>
      <div className="bg-card rounded-xl shadow-sm p-12 flex flex-col items-center max-w-4xl mx-auto border border-border">
        {/* Payment illustration */}
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="mb-6">
          <rect x="20" y="30" width="120" height="60" rx="6" fill="#F3F4F6" className="fill-muted" />
          <rect x="30" y="40" width="100" height="40" rx="4" fill="#fff" stroke="#D1D5DB" className="fill-background stroke-border" />
          <rect x="40" y="55" width="40" height="8" rx="2" fill="#E5E7EB" className="fill-muted-foreground/50" />
          <rect x="90" y="55" width="20" height="8" rx="2" fill="#E5E7EB" className="fill-muted-foreground/50" />
          <rect x="60" y="45" width="40" height="6" rx="2" fill="#E0E7FF" className="fill-primary/20" />
          <rect x="70" y="70" width="20" height="6" rx="2" fill="#E5E7EB" className="fill-muted-foreground/50" />
          <rect x="60" y="35" width="40" height="10" rx="2" fill="#3B82F6" className="fill-primary" />
          <text x="80" y="43" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold" className="fill-primary-foreground">PAYMENT</text>
          {/* Hand and card */}
          <rect x="85" y="60" width="30" height="18" rx="3" fill="#fff" stroke="#D1D5DB" className="fill-background stroke-border" />
          <rect x="95" y="65" width="10" height="6" rx="1" fill="#60A5FA" className="fill-primary/70" />
          <rect x="100" y="70" width="6" height="2" rx="1" fill="#E5E7EB" className="fill-muted-foreground/50" />
          <path d="M110 78 Q112 90 100 90 Q98 90 98 78" fill="#111827" className="fill-foreground" />
        </svg>
        {/* Main text */}
        <h2 className="text-lg font-semibold text-center mb-1 text-foreground">No Payment Method Added</h2>
        <p className="text-center text-muted-foreground mb-6">
          A payment method is required to manage subscriptions and the wallet for this account.
        </p>
        {/* Button */}
        <button
          type="button"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2 rounded-lg mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" />
            <path d="M2 11h20" stroke="currentColor" />
            <path d="M7 15h.01" stroke="currentColor" />
          </svg>
          Add Payment Method
        </button>
        {/* Alert */}
        <div className="relative bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 max-w-xl w-full flex flex-col mt-2">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" stroke="currentColor" />
            </svg>
            <span className="font-semibold text-yellow-700 dark:text-yellow-400">Do Not Add Your Own Card to Subaccounts!</span>
            <span className="ml-auto flex items-center text-xs text-yellow-500 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300 px-2 py-0.5 rounded-full">
              Visible Only to You
            </span>
          </div>
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            Please add your client's (subaccount) card, not your own, as it will be used to bill your client on your behalf. Funds will be deposited into your account.
          </p>
        </div>
      </div>
    </div>
  );
}

//listo 